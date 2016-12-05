import * as _ from "lodash";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Component, Injectable, OnInit, EventEmitter, Output, Inject} from "@angular/core";
import {Response} from "@angular/http";
import {CoreModule} from "./core.module";
import {LocalStorageComp} from "../core/storage.comp";

export interface Cred {
    id?: number;
    username?: string;
    password?: string;
    token?: string;
    timestamp?: number;
}

@Injectable()
export class StateServ implements OnInit {

    // #### VARS
    public lang: string = "en";

    @Output() public chan = new EventEmitter();

    private _cred: Cred = {};

    public onCred: ReplaySubject<any> = new ReplaySubject();

    public _nav = {prev: "", next: ""};

    // #### CONSTRUCTOR
    constructor(private ls: LocalStorageComp) {
    }

    // #### CRED
    get cred(): Cred {
        const storedCred: Cred = this.ls.getObject("cred");

        if (storedCred) {
            _.merge(this._cred, storedCred);
        }

        return this._cred;
    }

    set cred(cred: Cred) {
        let saveableCred = _.cloneDeep(cred);

        delete saveableCred.password;

        this._cred = cred;

        this.ls.setObject("cred", saveableCred);

        if (this._cred.token) {
            this.onCred.next({method: "token-valid", stat: "ok"});
        }
        else {
            this.onCred.next({method: "token-unset", stat: "ok"});
        }
    }

    // #### TOKEN
    get token(): string {
        return this.cred.token;
    }

    set token(token: string) {
        this.cred.token = token;

        if (token) {
            this.onCred.next({method: "token-set", stat: "ok"});
        }
        else {
            this.onCred.next({method: "token-set", stat: "err"});
        }
    }

    // #### NAV
    get nav() {
        return this._nav;
    }

    set nav(nav) {
        this._nav = nav;
    }

    // #### MSG
    msg(obj) {
        console.log(">>>>>");
        console.log(obj);
        console.log("<<<<<");
        this.chan.next(obj);
    }

    ngOnInit() {
    }
}
