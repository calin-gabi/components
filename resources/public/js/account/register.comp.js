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
var register_serv_1 = require("./register.serv");
var RegisterComp = (function () {
    function RegisterComp(router, fb, stateServ, registerServ) {
        this.router = router;
        this.fb = fb;
        this.stateServ = stateServ;
        this.registerServ = registerServ;
        this.submitted = false;
        this.errMsg = "";
        this.showErrMsg = false;
        this.onCred = new ReplaySubject_1.ReplaySubject();
    }
    RegisterComp.prototype.areNotEqual = function (control) {
        var controls = control["controls"];
        var password = controls["password"];
        var password_rep = controls["password_rep"];
        var ok = !password_rep.touched || (password.value === password_rep.value);
        console.log(this);
        if (!!password_rep.touched && (password.value === password_rep.value)) {
        }
        else {
        }
        ;
        if (ok) {
            return { areEqual: false };
        }
        else {
            return { areEqual: true };
        }
        ;
    };
    RegisterComp.prototype.onFocus = function () {
        this.showErrMsg = false;
    };
    RegisterComp.prototype.onBlur = function () {
        this.showErrMsg = true;
    };
    RegisterComp.prototype.usedUsername = function (control) {
        var _this = this;
        var p = new Promise(function (resolve, reject) {
            if (!control.value) {
                resolve(null);
                return;
            }
            var emailRegEx = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
            if (!emailRegEx.test(control.value)) {
                _this.errMsg = "You must provide a valid email address!";
                return;
            }
            else {
                _this.errMsg = "";
            }
            _this.registerServ.isUsedUsername(control.value).subscribe(function (res) {
                var body = res.json();
                var stat = body.stat;
                if (body.res) {
                    _this.errMsg = "User exists!";
                    resolve({ usedUsername: true });
                }
                else {
                    resolve(null);
                }
            }, function (err) {
                console.error(err);
            });
        });
        return p;
    };
    RegisterComp.prototype.buildForm = function () {
        this.form = this.fb.group({
            username: ["", [forms_1.Validators.required,
                    forms_1.Validators.minLength(2),
                    forms_1.Validators.maxLength(100),
                ], this.usedUsername.bind(this)],
            passwords: this.fb.group({
                password: ["", [forms_1.Validators.required,
                        forms_1.Validators.minLength(5)]],
                password_rep: ["", [forms_1.Validators.required,
                        forms_1.Validators.minLength(5)]]
            }, { validator: this.areNotEqual })
        });
    };
    RegisterComp.prototype.submit = function () {
        var _this = this;
        this.submitted = true;
        var obj = this.form.value;
        this.registerServ.save(obj).subscribe(function (res) {
            var body = res.json();
            console.log(res);
            var stat = body.stat;
            _this.router.navigate["/registerconfirmation"];
        }, function (err) {
            console.error(err);
        });
    };
    RegisterComp.prototype.ngOnInit = function () {
        this.buildForm();
    };
    RegisterComp.prototype.ngOnDestroy = function () {
    };
    RegisterComp = __decorate([
        core_1.Component({
            selector: "register",
            templateUrl: "/template?type=register",
            styleUrls: ["css/account.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: [forms_1.FormBuilder, register_serv_1.RegisterServ]
        }), 
        __metadata('design:paramtypes', [router_1.Router, forms_1.FormBuilder, state_serv_1.StateServ, register_serv_1.RegisterServ])
    ], RegisterComp);
    return RegisterComp;
}());
exports.RegisterComp = RegisterComp;
//# sourceMappingURL=register.comp.js.map