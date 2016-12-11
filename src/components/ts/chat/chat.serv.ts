import {Injectable} from "@angular/core";
import {Http,
        Headers,
        Request,
        RequestOptions,
        RequestMethod,
        Response} from "@angular/http";

@Injectable()
export class ChatServ {
    constructor(private http: Http) {
    }

    messagesGet(obj) {
        let url = "/chat/messages/get";
        let body = JSON.stringify(obj);
        let headers = new Headers({"Content-Type": "application/json"});
        let opts = {headers: headers};
        // console.log(body);
        return this.http.post(url, body, opts);
    }
}

