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
var LocalStorageComp = (function () {
    function LocalStorageComp() {
        if (!localStorage) {
            throw new Error("Current browser does not support Local Storage");
        }
        this.localStorage = localStorage;
    }
    LocalStorageComp.prototype.set = function (key, value) {
        this.localStorage[key] = value;
    };
    LocalStorageComp.prototype.get = function (key) {
        return this.localStorage[key];
    };
    LocalStorageComp.prototype.setObject = function (key, value) {
        this.localStorage[key] = JSON.stringify(value);
    };
    LocalStorageComp.prototype.getObject = function (key) {
        var val = this.localStorage[key];
        return val !== undefined ? JSON.parse(val) : undefined;
    };
    LocalStorageComp.prototype.remove = function (key) {
        this.localStorage.removeItem(key);
    };
    LocalStorageComp = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], LocalStorageComp);
    return LocalStorageComp;
}());
exports.LocalStorageComp = LocalStorageComp;
//# sourceMappingURL=storage.comp.js.map