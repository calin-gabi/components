import * as _ from "lodash";
import {OnDestroy, Inject, Injectable} from "@angular/core";
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Http, Response, Headers} from "@angular/http";
import {Cfg} from "./config";
import {StateServ, Cred} from "./state.serv";
import {LocalStorageComp} from "./storage.comp";

@Injectable()
export class AuthServ implements CanActivate {

    constructor(private http: Http,
                private router: Router,
                private cfg: Cfg,
                private stateServ: StateServ,
                private ls: LocalStorageComp) {
    }

    navUpdate(url: string): void {
        const prev = this.stateServ.nav.next;

        if (prev === url) {
            return;
        };

        this.stateServ.nav.prev = prev;
        this.stateServ.nav.next = url;
    }

    sessionRenew() {
        _.merge(this.stateServ.cred, {timestamp: Date.now()});
    }

    sessionClear() {
        this.stateServ.cred = {};
    }

    isNoAuthNeeded(url) {
        if (url === "/login") {
            return true;
        }

        if (url === "/register") {
            return true;
        }

        if (url === "/logout") {
            return true;
        }

        if (url === "/password") {
            return true;
        }

        return false;
    }

    isTokenValid(token: string, async: boolean) {
        if (token) {
            return true;
        } else {
            return true;
        }
    }

    isRespAllowed(resp: Response): boolean {
        try {
            const body = resp.json();
            const stat = body.stat;
            if (stat === "ok") {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    }

    isAuth(): boolean {
        console.log(this.stateServ.cred.token);
        if (this.stateServ.cred
            && this.isTokenValid(this.stateServ.cred.token, false)) {
            console.log(true);
            return true;
        }
        else {
            console.log(false);
            return false;
        }
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // console.log(">>>>>>>>>>>>>>> canActivate");

        this.navUpdate(state.url);

        // console.log("can activate: ");
        // console.log(state.url);

        // console.log(this.isAuth(this.isRuling(state.url)));

        if (this.isNoAuthNeeded(state.url)) {
            return true;
        };

        if (this.isAuth()) {
            return true;
        }

        this.router.navigate(["/login"]);

        return false;
    }
}
