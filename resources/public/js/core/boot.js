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
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var account_module_1 = require("../account/account.module");
var platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic");
var config_1 = require("./config");
var core_module_1 = require("./core.module");
var state_serv_1 = require("./state.serv");
var routing_comp_1 = require("./routing.comp");
console.log("boot");
var MainComp = (function () {
    function MainComp(stateServ, router) {
        this.stateServ = stateServ;
        this.router = router;
    }
    MainComp.prototype.ngOnInit = function () {
        console.log("main");
    };
    MainComp = __decorate([
        core_1.Component({
            selector: "main",
            templateUrl: "/template?type=main",
            styleUrls: ["css/main.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [state_serv_1.StateServ]
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [state_serv_1.StateServ, router_1.Router])
    ], MainComp);
    return MainComp;
}());
exports.MainComp = MainComp;
var MainModule = (function () {
    function MainModule() {
    }
    MainModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule, forms_1.ReactiveFormsModule, routing_comp_1.routing,
                account_module_1.AccountModule, core_module_1.CoreModule],
            exports: [],
            declarations: [MainComp],
            providers: [config_1.Cfg, state_serv_1.StateServ],
            bootstrap: [MainComp]
        }), 
        __metadata('design:paramtypes', [])
    ], MainModule);
    return MainModule;
}());
exports.MainModule = MainModule;
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(MainModule);
//# sourceMappingURL=boot.js.map