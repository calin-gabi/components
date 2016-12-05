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
        return true;
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

    isAuth(scopes: string[]): boolean {
        if (this.stateServ.cred
            && this.isTokenValid(this.stateServ.cred.token, false)) {
            return true;
        }
        else {
            return false;
        }
    }

    // ruleGet(route) {
    //     const rules: any = [
    //         ["/home", ["s100-user"]],
    //         ["/calendar", ["s100-user"]],
    //         ["/admin?.+", ["s100-user"]],
    //         ["/trainee", ["s100-trainer"]]
    //     ];

    //     const matching = (rule, route) => {
    //         // console.log("rule: " + rule);
    //         // console.log("route: " + route);
    //         const re = new RegExp(rule, "i");
    //         const matches_array = re.exec(route);
    //         // console.log(matches_array);
    //         return (matches_array && matches_array[0]) ? true : false;
    //     };

    //     let result = [];

    //     for (let rule of rules) {
    //         if (matching(rule[0], route)) {
    //             result = rule[1];
    //             break;
    //         }
    //     }

    //     // console.log(result);

    //     return result;
    // }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        // console.log(">>>>>>>>>>>>>>> canActivate");

        this.navUpdate(state.url);

        // console.log("can activate: ");
        // console.log(state.url);

        // console.log(this.isAuth(this.isRuling(state.url)));

        if (this.isNoAuthNeeded(state.url)) {
            return true;
        };

        // if (this.isAuth(this.ruleGet(state.url))) {
        //     return true;
        // }

        this.router.navigate(["/login"]);

        return false;
    }
}
