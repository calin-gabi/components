import {ReplaySubject} from "rxjs/ReplaySubject";
import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ, Cred} from "../core/state.serv";
import {OAuthService} from "angular2-oauth2/oauth-service";
import {HomeServ} from "./home.serv";
import {ChatComp} from "../chat/chat.comp";

@Component({
    selector: "home",
    templateUrl: "/template?type=home",
    styleUrls: ["css/main.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [HomeServ, OAuthService]
})

export class HomeComp implements OnInit {

    constructor(private stateServ: StateServ,
                private homeServ: HomeServ,
                private oauthService: OAuthService) {
    }

    googleLogout() {
        this.oauthService.logOut();
    }

    public get user() {

        let claims = this.oauthService.getIdentityClaims();
        if (!claims) return null;
        console.log(claims);
        return claims;
    }

    // #### EVENTS
    ngOnInit() {
        console.log("home");
    }
}
