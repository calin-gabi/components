"use strict";
var Cfg = (function () {
    function Cfg() {
        this.authUrl = "http://localhost:4016";
        this.url = "http://localhost:4016";
        this.googleOauth = {
            loginUrl: "https://accounts.google.com/o/oauth2/v2/auth",
            redirectUri: window.location.origin + "/oauth2callback",
            clientId: "198071236552-1rurcpfidu8fmhorrdkk6nb450hfk1b6.apps.googleusercontent.com",
            scope: "openid https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/plus.login",
            localStorage: true,
            oidc: true,
            userinfo: "https://www.googleapis.com/oauth2/v1/tokeninfo?access_token="
        };
    }
    return Cfg;
}());
exports.Cfg = Cfg;
//# sourceMappingURL=config.js.map