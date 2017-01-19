import {Routes, RouterModule} from "@angular/router";
import {HomeComp} from "../home/home.comp";
import {LoginComp} from "../account/login.comp";
import {LogoutComp} from "../account/logout.comp";
import {Oauth2CallbackComp} from "../account/oauth2callback.comp";
import {RegisterComp} from "../account/register.comp";
import {RegisterConfirmationComp} from "../account/registerconfirmation.comp";
import {EmailConfirmationComp} from "../account/emailconfirmation.comp";
import {AuthServ} from "./auth.serv";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/home",
        pathMatch: "full"
    },
    {
        path: "home",
        component: HomeComp,
        canActivate: [AuthServ]
    },
    {
        path: "login",
        component: LoginComp,
        canActivate: [AuthServ]
    },
    {
        path: "register",
        component: RegisterComp,
        canActivate: [AuthServ]
    },
    {
        path: "registerconfirmation",
        component: RegisterConfirmationComp,
        canActivate: [AuthServ]
    },
    {
        path: "emailconfirmation",
        component: EmailConfirmationComp,
        canActivate: [AuthServ]
    },
    {
        path: "logout",
        component: LogoutComp,
        canActivate: [AuthServ]
    },
    {
        path: "oauth2callback",
        component: Oauth2CallbackComp
    }
];

export const routing = RouterModule.forRoot(appRoutes);