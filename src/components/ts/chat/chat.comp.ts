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
import {UsersFilterPipe} from "./usersfilter.pipe";
import * as moment from "moment";
declare var $: any;

@Component({
    selector: "chat",
    templateUrl: "/template?type=chat",
    styleUrls: ["css/chat.css"],
    encapsulation: ViewEncapsulation.None,
    providers: []
})

export class ChatComp implements OnInit {
    private paramSub: Subscription;
    private url = "ws://localhost:4016/chat";
    private con = new WebSocket(this.url);
    private messages = [];
    private clients = [];
    private client = {username: "", online: false};
    private messageToSend: string = "";
    private id: number;
    private lastmsg_id = 0;
    private users = [];
    private users_filter = "";
    private filterTo = null;

    constructor(private route: ActivatedRoute,
                private router: Router,
                private cfg: Cfg,
                private state: StateServ,
                private authServ: AuthServ,
                private chatServ: ChatServ) {
    }

    myMessage(message) {
        return this.state.cred["user"].username === message.username;
    }

    //  #### DATA
    messagesGet(client) {
        const trainerId = this.state.cred.id;
        const token = this.state.token;
        const obj = {client: client, lastmsg_id: this.lastmsg_id};
        this.chatServ.messagesGet(obj).subscribe(
            (res: Response) => {
                const body = res.json();
                console.log(body);
                this.messages = body.res;
                this.scrollBottom();
            },
            (err: Response) => {
                console.log(err);
            }
        );
    }

    clientsGet() {
        const obj = {};
        this.chatServ.clientsGet(obj).subscribe(
            (res: Response) => {
                const body = res.json();
                this.clients = body.res;
                console.log(this.clients);
                this.scrollBottom();
            },
            (err: Response) => {
                console.log(err);
            }
        );
    }

    filterChange(event) {
        if (event.length < 3) {
            return true;
        }
        this.users_filter = event;
        if (this.filterTo) {
            clearTimeout(this.filterTo);
        }
        this.filterTo = setTimeout(() => {
            this.usersGet();
        }, 500);
    }

    usersGet() {
        const obj = {usersfilter: this.users_filter};
        console.log(obj);
        this.chatServ.usersGet(obj).subscribe(
            (res: Response) => {
                const body = res.json();
                this.users = body.res.map((elem) => {
                    return {username: elem.username, id: elem.id, selected: !!elem.id};
                });
                console.log(body.res);
                this.scrollBottom();
            },
            (err: Response) => {
                console.log(err);
            }
        );
    }

    selectClient(client) {
        this.client = client;
        this.messagesGet(this.client);
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
            const height = container.scrollHeight;
            $(".message-container").scrollTop(height);
        }, 200);
    }

    recieve(msg) {
        let {sUsername, payload} = msg;
        console.log(msg);
        this.messages.unshift({message: msg.payload.msg, status: "", username: sUsername});
        this.scrollBottom();
    }

    send() {
        // var client_id = "1234";// $("#client_id").text();
        const msg = this.messageToSend;
        if (msg === "") {
            return true;
        }
        //  $("#reciever").val();
        const token = this.state.token;
        const obj = JSON.stringify({
            token: token,
            sender: this.state.cred["user"].username,
            receivers: [this.client],
            payload: {msg: msg},
            method: "chat-msg"});
        this.con.send(obj);
        let new_msg = {
            message: msg,
            id: 0, status: "send",
            username: this.state.cred["user"].username,
            created: moment().utc().format("YYYY-MM-DDTHH:mm:ss")};
        console.log(new_msg);
        this.messages.unshift(new_msg);
        this.messageToSend = "";
        this.scrollBottom();
    }

    // #### EVENTS
    ngOnInit() {
        //  ## Websockets
        this.clientsGet();
        this.con.onopen = (e) => {
            const obj = {method: "handshake", sender: this.state.cred["user"].username, token: this.state.token, payload: {msg: "handshake"}};
            const jsonObj = JSON.stringify(obj);
            this.con.send(jsonObj);
        };

        this.con.onerror = (e) => {
            console.log(e);
            console.error("WebSocket-Problem");
        };

        this.con.onmessage = (e) => {
            console.log(e);
            const resp = JSON.parse(e.data);
            console.log(resp);

            switch (resp.method) {
                case "handshake":
                    return;
                case "chat-msg":
                    this.recieve(resp);
                default:
                    return;
            }
        };
    }
}
