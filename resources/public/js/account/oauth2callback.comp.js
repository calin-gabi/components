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
var config_1 = require("../core/config");
var state_serv_1 = require("../core/state.serv");
var oauth_service_1 = require("angular2-oauth2/oauth-service");
var oauth2callback_serv_1 = require("./oauth2callback.serv");
var Oauth2CallbackComp = (function () {
    function Oauth2CallbackComp(stateServ, fb, oauth2callbackServ, router, cfg, oauthService) {
        this.stateServ = stateServ;
        this.fb = fb;
        this.oauth2callbackServ = oauth2callbackServ;
        this.router = router;
        this.cfg = cfg;
        this.oauthService = oauthService;
        this.submitted = false;
        this.errMsg = "";
        this.claims = {};
        this.waiting = true;
    }
    Oauth2CallbackComp.prototype.waitingLoad = function () {
        return this.waiting;
    };
    Oauth2CallbackComp.prototype.getUserInfo = function () {
        var _this = this;
        var access_token = this.oauthService.getAccessToken();
        this.oauth2callbackServ.getUserInfo(access_token).subscribe(function (res) {
            var body = res.json();
            _this.form.patchValue({ username: body.email });
        }, function (err) {
            console.error(err);
        });
    };
    Oauth2CallbackComp.prototype.getProfile = function () {
        var _this = this;
        this.claims = this.oauthService.getIdentityClaims();
        console.log(this.claims);
        this.oauth2callbackServ.getUserProfile(this.claims).subscribe(function (res) {
            var body = res.json();
            console.log(body);
            if (!!body.res.user) {
                _this.stateServ.cred = body.res;
                _this.stateServ.userProfile = body.res.user.profile;
                window.location.href = "/";
            }
            else {
                _this.waiting = false;
                console.log(body.res.res);
                _this.form.patchValue({ first_name: body.res.res.given_name });
                _this.form.patchValue({ last_name: body.res.res.family_name });
                _this.form.patchValue({ sub: body.res.res.sub });
                _this.form.patchValue({ iss: body.res.res.iss });
                _this.getUserInfo();
            }
            ;
        }, function (err) {
            console.error(err);
        });
    };
    Oauth2CallbackComp.prototype.buildForm = function (profile) {
        this.form = this.fb.group({
            username: new forms_1.FormControl({ value: "" }),
            first_name: new forms_1.FormControl({ value: "" }),
            last_name: new forms_1.FormControl({ value: "" }),
            sub: new forms_1.FormControl({ value: "" }),
            iss: new forms_1.FormControl({ value: "" }),
        });
    };
    Oauth2CallbackComp.prototype.submit = function () {
        this.submitted = true;
        var obj = this.form.value;
        this.oauth2callbackServ.save(obj).subscribe(function (res) {
            var body = res.json();
            console.log(res);
            var stat = body.stat;
            window.location.href = "/";
        }, function (err) {
            console.error(err);
        });
    };
    Oauth2CallbackComp.prototype.ngOnInit = function () {
        this.buildForm({});
        this.getProfile();
    };
    Oauth2CallbackComp = __decorate([
        core_1.Component({
            selector: "oauth2callback",
            templateUrl: "/template?type=oauth2callback",
            styleUrls: ["css/account.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [oauth2callback_serv_1.Oauth2CallbackServ, oauth_service_1.OAuthService]
        }), 
        __metadata('design:paramtypes', [state_serv_1.StateServ, forms_1.FormBuilder, oauth2callback_serv_1.Oauth2CallbackServ, router_1.Router, config_1.Cfg, oauth_service_1.OAuthService])
    ], Oauth2CallbackComp);
    return Oauth2CallbackComp;
}());
exports.Oauth2CallbackComp = Oauth2CallbackComp;
//# sourceMappingURL=oauth2callback.comp.js.map