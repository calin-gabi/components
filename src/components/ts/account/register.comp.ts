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

    public errMsg: string = "";

    private showErrMsg = false;

    public onCred: ReplaySubject<any> = new ReplaySubject();

    constructor(private router: Router,
                private fb: FormBuilder,
                private stateServ: StateServ,
                private registerServ: RegisterServ) {
    }

    areNotEqual(control: FormControl): {[s: string]: boolean} {
        const controls = control["controls"];
        const password = controls["password"];
        const password_rep = controls["password_rep"];
        const ok = !password_rep.touched || (password.value === password_rep.value);
        console.log(this);
        if (!!password_rep.touched && (password.value === password_rep.value)) {
            // console.log(this.errMsg);
            // this.errMsg = "";
        } else {
            // console.log(this.errMsg);
            // this.errMsg = "The passwords provided are not the same!";
        };
        if (ok) {
            return {areEqual: false};
        } else {
            return {areEqual: true};
        };
    }

    onFocus() {
        this.showErrMsg = false;
    }

    onBlur() {
        this.showErrMsg = true;
    }

    usedUsername(control: FormControl): Promise<any> {

        let p = new Promise((resolve, reject) => {

            if (!control.value) {
                resolve(null);
                return;
            }

            const emailRegEx = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$");
            if (!emailRegEx.test(control.value)) {
                this.errMsg = "You must provide a valid email address!";
                return;
            } else {
                this.errMsg = "";
            }

            this.registerServ.isUsedUsername(control.value).subscribe(
                (res: Response) => {
                    const body = res.json();
                    const stat = body.stat;
                    if (body.res) {
                        this.errMsg = "User exists!";
                        resolve({usedUsername: true});
                    }
                    else {
                        resolve(null);
                    }
                },

                (err: Response) => {
                    console.error(err);
                }
            );
        });

        return p;
    }

    buildForm(): void {
        this.form = this.fb.group({
                username: ["", [Validators.required,
                                Validators.minLength(2),
                                Validators.maxLength(100),
                ], this.usedUsername.bind(this)],

                passwords: this.fb.group({
                    password: ["", [Validators.required,
                                    Validators.minLength(5)]],

                    password_rep: ["", [Validators.required,
                                        Validators.minLength(5)]]
                }, {validator: this.areNotEqual})
        });
    }

    submit(): void {
        this.submitted = true;
        let obj = this.form.value;
        this.registerServ.save(obj).subscribe(

            (res: Response) => {
                const body = res.json();
                console.log(res);
                const stat = body.stat;
                this.router.navigate["/registerconfirmation"];
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
