import {} from "@angular/core";

declare var $: any;
declare var navigator;


export class Cfg {
    public authUrl: string = "http://localhost:4016";
    // private profile: string = $("main").hasClass("dev") ? "dev" : "";

    public url: string = "http://localhost:4016";

    // public url: string = (this.profile === "dev")
    //     ? "http://localhost:5028"
    //     : "http://t3.humanoo.com";
    public googleOauth = {
        loginUrl: "https://accounts.google.com/o/oauth2/v2/auth",
        redirectUri: window.location.origin + "/oauth2callback",
        clientId: "198071236552-1rurcpfidu8fmhorrdkk6nb450hfk1b6.apps.googleusercontent.com",
        scope: "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.login",
        localStorage: true,
        oidc: true,
        userinfo: "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="
    };

    constructor() {
    }

}