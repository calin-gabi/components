import {CommonModule} from "@angular/common";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {ReplaySubject} from "rxjs/ReplaySubject";
import {Component, NgModule, ViewChild, OnInit, Injectable, EventEmitter, ViewEncapsulation}
from "@angular/core";
import {Http, Headers, HttpModule, Request, RequestOptions, RequestMethod, Response}
from "@angular/http";
import {Router, Route, ActivatedRoute} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";

// import {Cfg} from "./config";

@Component({
    selector: "main",
    templateUrl: "/template?type=main",
    styleUrls: ["css/main.css"],
    encapsulation: ViewEncapsulation.None,
    providers: []
})

@Injectable()
export class MainComp implements OnInit {

    constructor() {
    }

    ngOnInit() {
    }
}

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule],

    exports: [],

    declarations: [MainComp],

    providers: [],

    bootstrap: [MainComp]
})

export class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);

