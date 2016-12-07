import {Injectable} from "@angular/core";
import {Http, Headers, Request, RequestOptions, RequestMethod, Response} from "@angular/http";
import {Cfg} from "../core/config";

@Injectable()
export class LogoutServ {

    constructor(private http: Http,
                private cfg: Cfg) {
    }

    logout(user) {
        let url = this.cfg.url + "/logout";
        let body = JSON.stringify(user);
        let headers = new Headers({"Content-Type": "application/json"});
        let opts = {headers: headers};
        return this.http.post(url, body, opts);
    }
}
