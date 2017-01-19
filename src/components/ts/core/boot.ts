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
import {ChatModule} from "../chat/chat.module";
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
    private testng = "";
    constructor(private stateServ: StateServ,
                private router: Router,
                private oauthService: OAuthService,
                private cfg: Cfg) {

        this.oauthService.loginUrl = cfg.googleOauth.loginUrl;
        // this.oauthService.logoutUrl = "https://steyer-identity-server.azurewebsites.net/identity/connect/endsession?id_token={{id_token}}";
        this.oauthService.redirectUri = cfg.googleOauth.redirectUri;
        this.oauthService.clientId = cfg.googleOauth.clientId;
        this.oauthService.scope = cfg.googleOauth.scope;
        // this.oauthService.issuer = "https://steyer-identity-server.azurewebsites.net/identity";
        if (cfg.googleOauth.localStorage) {
            this.oauthService.setStorage(localStorage);
        };
        this.oauthService.oidc = cfg.googleOauth.oidc;

        this.oauthService.tryLogin({});
    }

    ngOnInit() {
        this.cfg.url = window.location.origin;
        // console.log(window.location);
        // console.log(this.cfg.url);
    }
}

@NgModule({
    imports: [BrowserModule, HttpModule, FormsModule, ReactiveFormsModule, routing,
            AccountModule, HomeModule, ChatModule, CoreModule],

    exports: [],

    declarations: [MainComp],

    providers: [Cfg, StateServ, OAuthService],

    bootstrap: [MainComp]
})

export class MainModule {}

platformBrowserDynamic().bootstrapModule(MainModule);

