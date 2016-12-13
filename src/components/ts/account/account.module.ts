import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {LoginComp} from "./login.comp";
import {LogoutComp} from "./logout.comp";
import {RegisterComp} from "./register.comp";
import {Oauth2CallbackComp} from "./oauth2callback.comp";
import {UPLOAD_DIRECTIVES} from "ng2-uploader";

@NgModule({
    imports: [CommonModule, ReactiveFormsModule, RouterModule],

    exports: [LoginComp, LogoutComp, RegisterComp, Oauth2CallbackComp],

    declarations: [LoginComp, LogoutComp, RegisterComp, Oauth2CallbackComp, UPLOAD_DIRECTIVES],

    providers: [],

    bootstrap: []
})

export class AccountModule {}