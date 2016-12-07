import {ReplaySubject} from "rxjs/ReplaySubject";
import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {Response} from "@angular/http";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Cfg} from "../core/config";
import {StateServ, Cred} from "../core/state.serv";
import {LoginServ} from "./login.serv";

@Component({
    selector: "login",
    templateUrl: "/template?type=login",
    styleUrls: ["css/account.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [FormBuilder, LoginServ]
})

export class LoginComp implements OnInit, OnDestroy {

    private form: FormGroup;

    private submitted: boolean = false;

    private errMsg: string = "";

    public onCred: ReplaySubject<any> = new ReplaySubject();

    constructor(private router: Router,
                private fb: FormBuilder,
                private stateServ: StateServ,
                private loginServ: LoginServ) {
    }

    buildForm(): void {
        this.form = this.fb.group({
            username: ["", [Validators.required]],
            password: ["", [Validators.required]]
        });
    }

    submit(): void {
        this.submitted = true;
        let obj = this.form.value;
        this.loginServ.login(obj).subscribe(
            (res: Response) => {
                console.log(res);
                if (res.status === 200) {
                    this.router.navigate(["/home"]);
                }
                // const body = res.json();
                // const stat = body.stat;
                // if (stat === "ok") {
                //     this.errMsg = "";
                //     // !!! here also save the id
                //     const obj = {
                //         token: body.res.token,
                //         username: body.res.user.username,
                //         timestamp: Date.now()
                //     };
                //     this.stateServ.cred = obj;
                // }
                // else {
                //     this.errMsg = body.msg;
                // }
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
