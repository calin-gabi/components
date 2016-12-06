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

    areNotEqual(control: FormControl): {[s: string]: boolean} {
        const controls = control["controls"];
        const password = controls["password"];
        const password_rep = controls["password_rep"];
        const ok = !password_rep.touched || (password.value === password_rep.value);

        return ok ? null : {areEqual: true};
    }


    usedUsername(control: FormControl): Promise<any> {
        let p = new Promise((resolve, reject) => {

            if (!control.value) {
                resolve(null);
                return;
            }

            this.registerServ.isUsedUsername(control.value).subscribe(
                (res: Response) => {
                    const body = res.json();
                    const stat = body.stat;
                    if (body.res) {
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
