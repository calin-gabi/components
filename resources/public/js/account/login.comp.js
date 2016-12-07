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
var state_serv_1 = require("../core/state.serv");
var login_serv_1 = require("./login.serv");
var LoginComp = (function () {
    function LoginComp(router, fb, stateServ, loginServ) {
        this.router = router;
        this.fb = fb;
        this.stateServ = stateServ;
        this.loginServ = loginServ;
        this.submitted = false;
        this.errMsg = "";
        this.onCred = new ReplaySubject_1.ReplaySubject();
    }
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
            console.log(res);
            if (res.status === 200) {
                _this.router.navigate(["/home"]);
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
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, state_serv_1.StateServ, login_serv_1.LoginServ])
    ], LoginComp);
    return LoginComp;
}());
exports.LoginComp = LoginComp;
//# sourceMappingURL=login.comp.js.map