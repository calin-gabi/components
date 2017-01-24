import {BrowserModule} from "@angular/platform-browser";
import {NgModule}  from "@angular/core";
import {ChatComp} from "./chat.comp";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {UsersFilterPipe} from "./usersfilter.pipe";
import {ChatServ} from "./chat.serv";

@NgModule({
    imports: [BrowserModule, FormsModule, ReactiveFormsModule],

    exports: [ChatComp],

    declarations: [ChatComp, UsersFilterPipe],

    providers: [ChatServ],

    bootstrap: []
})

export class ChatModule {}
