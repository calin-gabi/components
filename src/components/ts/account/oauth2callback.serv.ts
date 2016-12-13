import {Injectable} from "@angular/core";
import {Http, Headers, Request, RequestOptions, RequestMethod, Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ} from "../core/state.serv";

@Injectable()
export class Oauth2CallbackServ {

    constructor(private http: Http,
                private cfg: Cfg,
                private stateServ: StateServ) {
    }

    getUserProfile(obj) {
        let url = this.cfg.url + "/oauth/get";
        let body = JSON.stringify(obj);
        let headers = new Headers({"Content-Type": "application/json"});
        let opts = {headers: headers};
        return this.http.post(url, body, opts);
    }

    getUserInfo(access_token) {
        let url = this.cfg.googleOauth.userinfo + access_token;
        return this.http.get(url);
    }

    save(user) {
        let url = this.cfg.url + "/oauth/set";
        let body = JSON.stringify(user);
        let headers = new Headers({"Content-Type": "application/json"});
        let opts = {headers: headers};
        return this.http.post(url, body, opts);
    }
}
