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

    constructor() {
    }

}