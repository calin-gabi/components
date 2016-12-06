import {ReplaySubject} from "rxjs/ReplaySubject";
import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ, Cred} from "../core/state.serv";
import {HomeServ} from "./home.serv";

@Component({
    selector: "home",
    templateUrl: "/template?type=home",
    styleUrls: ["css/main.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [HomeServ]
})

export class HomeComp implements OnInit {

    constructor(private stateServ: StateServ,
                private homeServ: HomeServ) {
    }

    // #### EVENTS
    ngOnInit() {
        console.log("home");
    }
}
