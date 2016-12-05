import {ReplaySubject} from "rxjs/ReplaySubject";
import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Response} from "@angular/http";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Cfg} from "../core/config";
import {StateServ, Cred} from "../core/state.serv";
import {RegisterServ} from "./register.serv";

@Component({
    selector: "register",
    templateUrl: "/template?type=register",
    styleUrls: ["css/account.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [FormBuilder, RegisterServ]
})

export class RegisterComp implements OnInit, OnDestroy {

    private form: FormGroup;

    private submitted: boolean = false;

    private errMsg: string = "";

    public onCred: ReplaySubject<any> = new ReplaySubject();

    constructor(private router: Router,
                private fb: FormBuilder,
                private stateServ: StateServ,
                private registerServ: RegisterServ) {
    }

    buildForm(): void {
        this.form = this.fb.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]],
            retypepassword: ["", [Validators.required]]
        });
    }

    submit(): void {
        this.submitted = true;
        let obj = this.form.value;
        this.registerServ.register(obj).subscribe(
            (res: Response) => {
                const body = res.json();
                const stat = body.stat;
                if (stat === "ok") {
                    this.errMsg = "";
                    // !!! here also save the id
                    const obj = {
                        token: body.res.token,
                        username: body.res.user.username,
                        userid: body.res.user.userid,
                        timestamp: Date.now()
                    };

                    this.stateServ.cred = obj;
                    this.router.navigate(["/"]);
                }
                else {
                    this.errMsg = body.msg;
                }
            },

            (err: Response) => {
                console.error(err);
            }
        );
    }

    // #### EVENTS
    ngOnInit() {
        this.buildForm();
    }

    ngOnDestroy() {
    }
}
