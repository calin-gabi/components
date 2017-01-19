import {Injectable} from "@angular/core";
import {StateServ, Cred} from "../core/state.serv";

import {Http,
        Headers,
        Request,
        RequestOptions,
        RequestMethod,
        Response} from "@angular/http";

@Injectable()
export class ChatServ {
    constructor(private http: Http,
                private state: StateServ) {
    }

    messagesGet(obj) {
        let url = "/chat/messages";
        let body = JSON.stringify(obj);
        const token = this.state.cred.token;
        let headers = new Headers({"Content-Type": "application/json",
                                   "Authorization": "Token " +  token});
        let opts = {headers: headers};
        // console.log(body);
        return this.http.post(url, body, opts);
    }

    clientsGet(obj) {
        let url = "/chat/clients";
        let body = JSON.stringify(obj);
        const token = this.state.cred.token;
        let headers = new Headers({"Content-Type": "application/json",
                                   "Authorization": "Token " +  token});
        let opts = {headers: headers};
        return this.http.post(url, body, opts);
    }
}

