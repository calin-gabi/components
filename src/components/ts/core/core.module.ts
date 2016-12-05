import {BrowserModule} from "@angular/platform-browser";
import {NgModule}  from "@angular/core";
import {LocalStorageComp} from "./storage.comp";
import {Cfg} from "./config";
import {AuthServ} from "./auth.serv";
import {StateServ} from "./state.serv";
console.log("core.module");
@NgModule({
    imports: [BrowserModule],

    exports: [],

    declarations: [],

    providers: [LocalStorageComp, AuthServ, StateServ],

    bootstrap: []
})

export class CoreModule {}
