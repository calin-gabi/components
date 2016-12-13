import {ReplaySubject} from "rxjs/ReplaySubject";
import {Component, ViewEncapsulation, OnInit, OnDestroy, Inject} from "@angular/core";
import {Router, ActivatedRoute, NavigationEnd} from "@angular/router";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ, Cred} from "../core/state.serv";
import {OAuthService} from "angular2-oauth2/oauth-service";
import {Oauth2CallbackServ} from "./oauth2callback.serv";
import {ChatComp} from "../chat/chat.comp";

@Component({
    selector: "oauth2callback",
    templateUrl: "/template?type=oauth2callback",
    styleUrls: ["css/account.css"],
    encapsulation: ViewEncapsulation.None,
    providers: [Oauth2CallbackServ, OAuthService]
})

export class Oauth2CallbackComp implements OnInit {

    private form: FormGroup;

    private submitted: boolean = false;

    private errMsg: string = "";

    private claims = {};

    private waiting = true;

    constructor(private stateServ: StateServ,
                private fb: FormBuilder,
                private oauth2callbackServ: Oauth2CallbackServ,
                private router: Router,
                private cfg: Cfg,
                private oauthService: OAuthService) {
    }

    waitingLoad () {
        return this.waiting;
    }

    getUserInfo() {
        let access_token = this.oauthService.getAccessToken();
        this.oauth2callbackServ.getUserInfo(access_token).subscribe(
            (res: Response) => {
                const body = res.json();
                this.form.patchValue({username: body.email});
            },

            (err: Response) => {
                console.error(err);
            });
    }

    getProfile() {
        this.claims = this.oauthService.getIdentityClaims();
        console.log(this.claims);
        this.oauth2callbackServ.getUserProfile(this.claims).subscribe(
            (res: Response) => {
                const body = res.json();
                console.log(body);
                if (!!body.res.user) {
                    this.stateServ.cred = body.res;
                    this.stateServ.userProfile = body.res.user.profile;
                    window.location.href = "/";
                } else {
                    this.waiting = false;
                    console.log(body.res.res);
                    this.form.patchValue({first_name: body.res.res.given_name});
                    this.form.patchValue({last_name: body.res.res.family_name});
                    this.form.patchValue({sub: body.res.res.sub});
                    this.form.patchValue({iss: body.res.res.iss});
                    this.getUserInfo();
                };
            },

            (err: Response) => {
                console.error(err);
            });
    }

    buildForm(profile): void {
        this.form = this.fb.group({
                username: new FormControl({value: ""}),

                first_name: new FormControl({value: ""}),

                last_name: new FormControl({value: ""}),

                sub: new FormControl({value: ""}),

                iss: new FormControl({value: ""}),
        });
    }

    submit(): void {
        this.submitted = true;
        let obj = this.form.value;
        this.oauth2callbackServ.save(obj).subscribe(

            (res: Response) => {
                const body = res.json();
                console.log(res);
                const stat = body.stat;
                window.location.href = "/";
            },

            (err: Response) => {
                console.error(err);
            }
        );
    }

    // #### EVENTS
    ngOnInit() {
        this.buildForm({});
        this.getProfile();
    }
}
