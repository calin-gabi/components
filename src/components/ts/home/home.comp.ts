import {ReplaySubject} from "rxjs/ReplaySubject";
import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ, Cred} from "../core/state.serv";
import {SmtpServ} from "../core/smtp.serv";
import {OAuthService} from "angular2-oauth2/oauth-service";
import {HomeServ} from "./home.serv";
import {ChatComp} from "../chat/chat.comp";

@Component({
    selector: "home",
    templateUrl: "/template?type=home",
    styleUrls: ["css/home.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [HomeServ, OAuthService]
})

export class HomeComp implements OnInit {

    private emailTo = "";
    private name = "";

    constructor(private state: StateServ,
                private homeServ: HomeServ,
                private router: Router,
                private oauthService: OAuthService,
                private smtp: SmtpServ) {
    }

    logout() {
        this.oauthService.logOut();
        this.router.navigate(["/logout"]);
    }

    sendTestEmail() {
        // this.emailTo = "gabimunteanu.sdt@gmail.com";
        console.log(this.emailTo);
        let obj = {from: "office@softdata.ro",
                    to: [this.emailTo],
                    subject: "Test",
                    name: this.name};
        this.smtp.sendEmail(obj).subscribe(
            (res: Response) => {
                const body = res.json();
                console.log(body);
            },
            (err: Response) => {
                console.log(err);
            }
        );
    }
    public get user() {
        let claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        console.log(claims);
        return claims;
    }

    // #### EVENTS
    ngOnInit() {
        console.log(this.state.cred);
        this.state.userProfile = this.state.cred["user"]["profile"];
    }
}
