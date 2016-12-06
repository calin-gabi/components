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
var register_serv_1 = require("./register.serv");
var Register2Comp = (function () {
    function Register2Comp(router, fb, stateServ, registerServ) {
        this.router = router;
        this.fb = fb;
        this.stateServ = stateServ;
        this.registerServ = registerServ;
    }
    Register2Comp.prototype.ngOnInit = function () {
    };
    Register2Comp.prototype.ngOnDestroy = function () {
    };
    Register2Comp = __decorate([
        core_1.Component({
            selector: "register2",
            templateUrl: "/template?type=register2",
            styleUrls: ["css/account.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [forms_1.FormBuilder, register_serv_1.RegisterServ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, state_serv_1.StateServ, register_serv_1.RegisterServ])
    ], Register2Comp);
    return Register2Comp;
}());
exports.Register2Comp = Register2Comp;
//# sourceMappingURL=register2.comp.js.map