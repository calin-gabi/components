import {Component, Injectable, OnInit, EventEmitter, Output, Inject} from "@angular/core";
import {Response, Http, Headers} from "@angular/http";

@Injectable()
export class SmtpServ {

    constructor(private http: Http) {
    }

    sendEmail(obj) {
        let url = "/smtp/send";
        let body = JSON.stringify(obj);
        let headers = new Headers({"Content-Type": "application/json"});
        let opts = {headers: headers};
        return this.http.post(url, body, opts);
    }
}