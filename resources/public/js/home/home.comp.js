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
var state_serv_1 = require("../core/state.serv");
var oauth_service_1 = require("angular2-oauth2/oauth-service");
var home_serv_1 = require("./home.serv");
var HomeComp = (function () {
    function HomeComp(state, homeServ, router, oauthService) {
        this.state = state;
        this.homeServ = homeServ;
        this.router = router;
        this.oauthService = oauthService;
    }
    HomeComp.prototype.logout = function () {
        this.oauthService.logOut();
        this.router.navigate(["/logout"]);
    };
    Object.defineProperty(HomeComp.prototype, "user", {
        get: function () {
            var claims = this.oauthService.getIdentityClaims();
            if (!claims)
                return null;
            console.log(claims);
            return claims;
        },
        enumerable: true,
        configurable: true
    });
    HomeComp.prototype.ngOnInit = function () {
        this.state.userProfile = this.state.cred["user"]["profile"];
    };
    HomeComp = __decorate([
        core_1.Component({
            selector: "home",
            templateUrl: "/template?type=home",
            styleUrls: ["css/home.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [home_serv_1.HomeServ, oauth_service_1.OAuthService]
        }), 
        __metadata('design:paramtypes', [state_serv_1.StateServ, home_serv_1.HomeServ, router_1.Router, oauth_service_1.OAuthService])
    ], HomeComp);
    return HomeComp;
}());
exports.HomeComp = HomeComp;
//# sourceMappingURL=home.comp.js.map