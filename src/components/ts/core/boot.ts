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
import {AccountModule} from "../account/account.module";
import {HomeModule} from "../home/home.module";

import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {OAuthService} from "angular2-oauth2/oauth-service";
import {Cfg} from "./config";

import {CoreModule} from "./core.module";
import {StateServ} from "./state.serv";
import {routing} from "./routing.comp";

// import {Cfg} from "./config";

@Component({
    selector: "main",
    templateUrl: "/template?type=main",
    styleUrls: ["css/main.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [StateServ, OAuthService]
})

@Injectable()
export class MainComp implements OnInit {

    constructor(private stateServ: StateServ,
                private router: Router,
                private oauthService: OAuthService) {

        this.oauthService.loginUrl = "https://accounts.google.com/o/oauth2/v2/auth";
        // this.oauthService.logoutUrl = "https://steyer-identity-server.azurewebsites.net/identity/connect/endsession?id_token={{id_token}}";
        this.oauthService.redirectUri = window.location.origin + "/home";
        this.oauthService.clientId = "198071236552-1rurcpfidu8fmhorrdkk6nb450hfk1b6.apps.googleusercontent.com";
        this.oauthService.scope = "profile";
        // this.oauthService.issuer = "https://steyer-identity-server.azurewebsites.net/identity";
        this.oauthService.setStorage(localStorage);
        this.oauthService.oidc = true;

        this.oauthService.tryLogin({});
    }

    ngOnInit() {
    }
}

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, routing,
            AccountModule, HomeModule, CoreModule],

    exports: [],

    declarations: [MainComp],

    providers: [Cfg, StateServ, OAuthService],

    bootstrap: [MainComp]
})

export class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);

