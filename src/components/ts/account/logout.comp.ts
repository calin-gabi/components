import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Response} from "@angular/http";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Cfg} from "../core/config";
import {StateServ} from "../core/state.serv";
import {AuthServ} from "../core/auth.serv";
import {LogoutServ} from "./logout.serv";

@Component({
    selector: "logout",
    template: "",
    styleUrls: ["css/main.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [FormBuilder, LogoutServ]
})

export class LogoutComp implements OnInit, OnDestroy {

    constructor(private router: Router,
                private stateServ: StateServ,
                private authServ: AuthServ,
                private logoutServ: LogoutServ) {
    }

    logout() {
        if (!this.stateServ.cred
            || !this.stateServ.cred.username
            || !this.stateServ.cred.token) {
            this.router.navigate(["/login"]);
            return;
        }

        const obj = {username: this.stateServ.cred.username,
                     token: this.stateServ.cred.token};

        this.logoutServ.logout(obj).subscribe(
            (res: Response) => {
                const body = res.json();
                console.log(body);
                const stat = body.stat;
                this.authServ.sessionClear();
                this.router.navigate(["/login"]);
            },

            (err: Response) => {
                console.error(err);
            });
    }


    // #### EVENTS
    ngOnInit() {
        this.logout();
    }

    ngOnDestroy() {
    }
}
