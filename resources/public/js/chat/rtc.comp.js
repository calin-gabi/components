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
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/zip");
require("rxjs/add/observable/from");
require("rxjs/add/operator/concat");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/merge");
require("rxjs/add/observable/combineLatest");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var config_1 = require("../core/config");
var state_serv_1 = require("../core/state.serv");
var auth_serv_1 = require("../core/auth.serv");
var chat_serv_1 = require("./chat.serv");
var VideoChatComp = (function () {
    function VideoChatComp(route, router, cfg, state, authServ, chatServ) {
        this.route = route;
        this.router = router;
        this.cfg = cfg;
        this.state = state;
        this.authServ = authServ;
        this.chatServ = chatServ;
    }
    VideoChatComp.prototype.ngOnInit = function () {
    };
    VideoChatComp = __decorate([
        core_1.Component({
            selector: "videochat",
            templateUrl: "/template?type=videochat",
            styleUrls: ["css/chat.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, config_1.Cfg, state_serv_1.StateServ, auth_serv_1.AuthServ, chat_serv_1.ChatServ])
    ], VideoChatComp);
    return VideoChatComp;
}());
exports.VideoChatComp = VideoChatComp;
//# sourceMappingURL=rtc.comp.js.map