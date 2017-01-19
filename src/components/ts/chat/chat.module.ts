import {BrowserModule} from "@angular/platform-browser";
import {NgModule}  from "@angular/core";
import {ChatComp} from "./chat.comp";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ChatServ} from "./chat.serv";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],

    exports: [ChatComp],

    declarations: [ChatComp],

    providers: [ChatServ],

    bootstrap: []
})

export class ChatModule {}
