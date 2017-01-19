import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Response} from "@angular/http";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Cfg} from "../core/config";
import {StateServ} from "../core/state.serv";
import {AuthServ} from "../core/auth.serv";
import {LogoutServ} from "./logout.serv";

@Component({
    selector: "registerconfirmation",
    templateUrl: "/template?type=registerconfirmation",
    styleUrls: ["css/account.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [FormBuilder, LogoutServ]
})

export class RegisterConfirmationComp implements OnInit {

    constructor(private router: Router,
                private stateServ: StateServ,
                private authServ: AuthServ,
                private logoutServ: LogoutServ) {
    }


    // #### EVENTS
    ngOnInit() {
    }
}
