import {Routes, RouterModule} from "@angular/router";
import {LoginComp} from "../account/login.comp";
import {RegisterComp} from "../account/register.comp";
import {AuthServ} from "./auth.serv";

const appRoutes: Routes = [
    {
        path: "",
        redirectTo: "/login",
        pathMatch: "full"
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
    }
];

export const routing = RouterModule.forRoot(appRoutes);