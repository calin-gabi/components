import {BrowserModule} from "@angular/platform-browser";
import {NgModule}  from "@angular/core";
import {LocalStorageComp} from "./storage.comp";
import {Cfg} from "./config";
import {AuthServ} from "./auth.serv";
import {StateServ} from "./state.serv";
import {SmtpServ} from "./smtp.serv";

@NgModule({
    imports: [BrowserModule],

    exports: [],

    declarations: [],

    providers: [LocalStorageComp, AuthServ, StateServ, SmtpServ],

    bootstrap: []
})

export class CoreModule {}
