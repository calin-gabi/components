import {BrowserModule} from "@angular/platform-browser";
import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {RouterModule} from "@angular/router";
import {HomeComp} from "./home.comp";
import {ChatModule} from "../chat/chat.module";

@NgModule({
    imports: [BrowserModule, CommonModule, RouterModule, ChatModule],

    exports: [HomeComp],

    declarations: [HomeComp],

    providers: [],

    bootstrap: []
})

export class HomeModule {}
