import {Routes, RouterModule} from "@angular/router";
import {HomeComp} from "../home/home.comp";
import {LoginComp} from "../account/login.comp";
import {LogoutComp} from "../account/logout.comp";
import {RegisterComp} from "../account/register.comp";
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
        path: "logout",
        component: LogoutComp,
        canActivate: [AuthServ]
    }
];

export const routing = RouterModule.forRoot(appRoutes);