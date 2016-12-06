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
var state_serv_1 = require("../core/state.serv");
var home_serv_1 = require("./home.serv");
var HomeComp = (function () {
    function HomeComp(stateServ, homeServ) {
        this.stateServ = stateServ;
        this.homeServ = homeServ;
    }
    HomeComp.prototype.ngOnInit = function () {
        console.log("home");
    };
    HomeComp = __decorate([
        core_1.Component({
            selector: "home",
            templateUrl: "/template?type=home",
            styleUrls: ["css/main.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [home_serv_1.HomeServ]
        }), 
        __metadata('design:paramtypes', [state_serv_1.StateServ, home_serv_1.HomeServ])
    ], HomeComp);
    return HomeComp;
}());
exports.HomeComp = HomeComp;
//# sourceMappingURL=home.comp.js.map