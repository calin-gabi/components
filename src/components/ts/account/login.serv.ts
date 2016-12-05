import {Injectable} from "@angular/core";
import {Http, Headers, Request, RequestOptions, RequestMethod, Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ} from "../core/state.serv";

@Injectable()
export class LoginServ {

    constructor(private http: Http,
                private cfg: Cfg,
                private stateServ: StateServ) {
    }

    login(user) {
        let url = this.cfg.url + "/login";
        let body = JSON.stringify(user);
        let headers = new Headers({"Content-Type": "application/json"});
        let opts = {headers: headers};
        return this.http.post(url, body, opts);
    }
}
