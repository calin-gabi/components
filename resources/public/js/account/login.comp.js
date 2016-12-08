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
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var oauth_service_1 = require("angular2-oauth2/oauth-service");
var state_serv_1 = require("../core/state.serv");
var login_serv_1 = require("./login.serv");
var LoginComp = (function () {
    function LoginComp(router, fb, stateServ, loginServ, oauthService) {
        this.router = router;
        this.fb = fb;
        this.stateServ = stateServ;
        this.loginServ = loginServ;
        this.oauthService = oauthService;
        this.submitted = false;
        this.errMsg = "";
        this.onCred = new ReplaySubject_1.ReplaySubject();
    }
    LoginComp.prototype.login = function () {
        this.oauthService.initImplicitFlow();
    };
    LoginComp.prototype.logout = function () {
        this.oauthService.logOut();
    };
    Object.defineProperty(LoginComp.prototype, "userName", {
        get: function () {
            var claims = this.oauthService.getIdentityClaims();
            if (!claims)
                return null;
            return claims.given_name;
        },
        enumerable: true,
        configurable: true
    });
    LoginComp.prototype.buildForm = function () {
        this.form = this.fb.group({
            username: ["", [forms_1.Validators.required]],
            password: ["", [forms_1.Validators.required]]
        });
    };
    LoginComp.prototype.submit = function () {
        var _this = this;
        this.submitted = true;
        var obj = this.form.value;
        this.loginServ.login(obj).subscribe(function (res) {
            var body = res.json();
            var stat = body.stat;
            console.log(body.res);
            if (stat === "ok") {
                _this.errMsg = "";
                var obj_1 = {
                    token: body.res.token,
                    username: body.res.user.username,
                    timestamp: Date.now()
                };
                _this.stateServ.cred = obj_1;
                _this.router.navigate(["/"]);
            }
            else {
                _this.errMsg = body.msg;
            }
        }, function (err) {
            console.error(err);
        });
    };
    LoginComp.prototype.ngOnInit = function () {
        this.buildForm();
    };
    LoginComp.prototype.ngOnDestroy = function () {
    };
    LoginComp = __decorate([
        core_1.Component({
            selector: "login",
            templateUrl: "/template?type=login",
            styleUrls: ["css/account.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [forms_1.FormBuilder, login_serv_1.LoginServ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, state_serv_1.StateServ, login_serv_1.LoginServ, oauth_service_1.OAuthService])
    ], LoginComp);
    return LoginComp;
}());
exports.LoginComp = LoginComp;
//# sourceMappingURL=login.comp.js.map