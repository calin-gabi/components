import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";
import {Subscription} from "rxjs/Subscription";
import "rxjs/add/observable/forkJoin";
import "rxjs/add/observable/zip";
import "rxjs/add/observable/from";
import "rxjs/add/operator/concat";
import "rxjs/add/operator/filter";
import "rxjs/add/operator/merge";
import "rxjs/add/observable/combineLatest";
import {Component, ViewEncapsulation, Inject, forwardRef, OnInit, OnDestroy} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {Response} from "@angular/http";
import {Cfg} from "../core/config";
import {StateServ, Cred} from "../core/state.serv";
import {AuthServ} from "../core/auth.serv";
import {ChatServ} from "./chat.serv";
declare var $: any;

@Component({
    selector: "chat",
    templateUrl: "/template?type=chat",
    styleUrls: ["css/chat.css"],
    encapsulation: ViewEncapsulation.None,
    providers: []
})

export class ChatComp implements OnInit, OnDestroy {
    private paramSub: Subscription;
    private url = "ws://localhost:5028/chat";
    private con = new WebSocket(this.url);
    private messages = [];
    private messageToSend: string = "";
    private id: number;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cfg: Cfg,
                private state: StateServ,
                private authServ: AuthServ,
                private chatServ: ChatServ) {
    }

    //  #### DATA
    messagesGet(traineeId) {
        const trainerId = this.state.cred.id;
        const token = this.state.token;
        const obj = {token: token, trainerId: trainerId, traineeId: traineeId};
        this.chatServ.messagesGet(obj).subscribe(
            (res: Response) => {
                const body = res.json();
                this.messages = body.res;
                // console.log(this.messages);
                this.scrollBottom();
            },
            (err: Response) => {
                console.log(err);
            }
        );
    }

    //  #### CHAT
    keyDown = function (event) {
        if (event.key === "Enter") {
            this.send();
        }
    };

    messageParse(msg) {
        return '<div class="msg">' + msg + "</div>";
    }

    scrollBottom() {
        setTimeout(() => {
            const container = $(".message-container")[0];
            console.log(container);
            const height = container.scrollHeight;
            $(".message-container").scrollTop(height);
        }, 200);
    }

    recieve(msg) {
        let {sUsername, payload} = msg;
        // var tag = this.messageParse(msg);
        // $("#chat-board .messages-list").append(tag);
        this.messages.push({sUsername: sUsername, payload: payload});
        this.scrollBottom();
    }

    send() {
        // var client_id = "1234";// $("#client_id").text();
        const msg = this.messageToSend;
        if (msg === "") {
            return true;
        }
        const reciever = "boring";
        //  $("#reciever").val();
        const token = this.state.token;
        const obj = JSON.stringify({token: token, receivers: [reciever], payload: {msg: msg}});
        this.con.send(obj);
        this.messages.push({sUsername: "trainer", payload: {msg: msg}});
        this.messageToSend = "";
        this.scrollBottom();
    }

    // #### EVENTS
    ngOnInit() {
        //  ## Websockets
        this.con.onopen = (e) => {
            const obj = {method: "handshake", token: this.state.token};
            const jsonObj = JSON.stringify(obj);
            this.con.send(jsonObj);
        };

        this.con.onerror = (e) => {
            console.error("WebSocket-Problem");
        };

        this.con.onmessage = (e) => {
            const resp = JSON.parse(e.data);

            if (resp.method === "handshake") {
                // console.log("handshake");
                return;
            };

            this.recieve(resp);
        };
    }

    ngOnDestroy() {
        // this.paramSub.unsubscribe();
    }
}
