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
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var state_serv_1 = require("../core/state.serv");
var auth_serv_1 = require("../core/auth.serv");
var logout_serv_1 = require("./logout.serv");
var RegisterConfirmationComp = (function () {
    function RegisterConfirmationComp(router, stateServ, authServ, logoutServ) {
        this.router = router;
        this.stateServ = stateServ;
        this.authServ = authServ;
        this.logoutServ = logoutServ;
    }
    RegisterConfirmationComp.prototype.ngOnInit = function () {
    };
    RegisterConfirmationComp = __decorate([
        core_1.Component({
            selector: "registerconfirmation",
            templateUrl: "/template?type=registerconfirmation",
            styleUrls: ["css/account.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [forms_1.FormBuilder, logout_serv_1.LogoutServ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, state_serv_1.StateServ, auth_serv_1.AuthServ, logout_serv_1.LogoutServ])
    ], RegisterConfirmationComp);
    return RegisterConfirmationComp;
}());
exports.RegisterConfirmationComp = RegisterConfirmationComp;
//# sourceMappingURL=registerconfirmation.comp.js.map