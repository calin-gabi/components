"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _ = require("lodash");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var config_1 = require("./config");
var state_serv_1 = require("./state.serv");
var storage_comp_1 = require("./storage.comp");
var AuthServ = (function () {
    function AuthServ(http, router, cfg, stateServ, ls) {
        this.http = http;
        this.router = router;
        this.cfg = cfg;
        this.stateServ = stateServ;
        this.ls = ls;
    }
    AuthServ.prototype.navUpdate = function (url) {
        var prev = this.stateServ.nav.next;
        if (prev === url) {
            return;
        }
        ;
        this.stateServ.nav.prev = prev;
        this.stateServ.nav.next = url;
    };
    AuthServ.prototype.sessionRenew = function () {
        _.merge(this.stateServ.cred, { timestamp: Date.now() });
    };
    AuthServ.prototype.sessionClear = function () {
        this.stateServ.cred = {};
    };
    AuthServ.prototype.isNoAuthNeeded = function (url) {
        if (url === "/login") {
            return true;
        }
        if (url === "/register") {
            return true;
        }
        if (url === "/logout") {
            return true;
        }
        if (url === "/password") {
            return true;
        }
        return false;
    };
    AuthServ.prototype.isTokenValid = function (token, async) {
        return true;
    };
    AuthServ.prototype.isRespAllowed = function (resp) {
        try {
            var body = resp.json();
            var stat = body.stat;
            if (stat === "ok") {
                return true;
            }
            else {
                return false;
            }
        }
        catch (err) {
            return false;
        }
    };
    AuthServ.prototype.isAuth = function (scopes) {
        if (this.stateServ.cred
            && this.isTokenValid(this.stateServ.cred.token, false)) {
            return true;
        }
        else {
            return false;
        }
    };
    AuthServ.prototype.canActivate = function (route, state) {
        this.navUpdate(state.url);
        if (this.isNoAuthNeeded(state.url)) {
            return true;
        }
        ;
        this.router.navigate(["/login"]);
        return false;
    };
    AuthServ = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http, router_1.Router, config_1.Cfg, state_serv_1.StateServ, storage_comp_1.LocalStorageComp])
    ], AuthServ);
    return AuthServ;
}());
exports.AuthServ = AuthServ;
//# sourceMappingURL=auth.serv.js.map