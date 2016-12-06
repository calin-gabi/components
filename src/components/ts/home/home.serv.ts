import {Injectable} from "@angular/core";
import {Http, Headers, Request, RequestOptions, RequestMethod, Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ} from "../core/state.serv";

@Injectable()
export class HomeServ {

    constructor(private http: Http,
                private cfg: Cfg,
                private stateServ: StateServ) {
    }
}
