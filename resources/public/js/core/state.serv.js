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
var _ = require("lodash");
var ReplaySubject_1 = require("rxjs/ReplaySubject");
var core_1 = require("@angular/core");
var storage_comp_1 = require("../core/storage.comp");
var StateServ = (function () {
    function StateServ(ls) {
        this.ls = ls;
        this.lang = "en";
        this.userProfile = {};
        this.chan = new core_1.EventEmitter();
        this._cred = {};
        this.onCred = new ReplaySubject_1.ReplaySubject();
        this._nav = { prev: "", next: "" };
    }
    Object.defineProperty(StateServ.prototype, "cred", {
        get: function () {
            var storedCred = this.ls.getObject("cred");
            if (storedCred) {
                _.merge(this._cred, storedCred);
            }
            return this._cred;
        },
        set: function (cred) {
            var saveableCred = _.cloneDeep(cred);
            delete saveableCred.password;
            this._cred = cred;
            this.ls.setObject("cred", saveableCred);
            if (this._cred.token) {
                this.onCred.next({ method: "token-valid", stat: "ok" });
            }
            else {
                this.onCred.next({ method: "token-unset", stat: "ok" });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateServ.prototype, "token", {
        get: function () {
            return this.cred.token;
        },
        set: function (token) {
            this.cred.token = token;
            if (token) {
                this.onCred.next({ method: "token-set", stat: "ok" });
            }
            else {
                this.onCred.next({ method: "token-set", stat: "err" });
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StateServ.prototype, "nav", {
        get: function () {
            return this._nav;
        },
        set: function (nav) {
            this._nav = nav;
        },
        enumerable: true,
        configurable: true
    });
    StateServ.prototype.msg = function (obj) {
        console.log(">>>>>");
        console.log(obj);
        console.log("<<<<<");
        this.chan.next(obj);
    };
    StateServ.prototype.ngOnInit = function () {
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], StateServ.prototype, "chan", void 0);
    StateServ = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [storage_comp_1.LocalStorageComp])
    ], StateServ);
    return StateServ;
}());
exports.StateServ = StateServ;
//# sourceMappingURL=state.serv.js.map