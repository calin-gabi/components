import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/from";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import "rxjs/add/observable/combineLatest";
import {Component, ViewEncapsulation, Inject, forwardRef, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ, Cred} from "../core/state.serv";
import {AuthServ} from "../core/auth.serv";
import {ChatServ} from "./chat.serv";
declare var $: any;

@Component({
    selector: "videochat",
    templateUrl: "/template?type=videochat",
    styleUrls: ["css/chat.css"],
    encapsulation: ViewEncapsulation.None,
    providers: []

})

export class VideoChatComp implements OnInit {

    // public peer = new Peer({key: 'owpderam0b6xyldi'});

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cfg: Cfg,
                private state: StateServ,
                private authServ: AuthServ,
                private chatServ: ChatServ) {
    }

    //  #### DATA

    // #### EVENTS
    ngOnInit() {
        //  ## Websockets
    }
}
