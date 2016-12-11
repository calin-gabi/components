import {BrowserModule} from "@angular/platform-browser";
import {NgModule}  from "@angular/core";
import {ChatComp} from "./chat.comp";
import {ChatServ} from "./chat.serv";

@NgModule({
    imports: [BrowserModule],

    exports: [ChatComp],

    declarations: [ChatComp],

    providers: [ChatServ],

    bootstrap: []
})

export class ChatModule {}
