"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("rxjs/add/observable/forkJoin");
require("rxjs/add/observable/zip");
require("rxjs/add/observable/from");
require("rxjs/add/operator/concat");
require("rxjs/add/operator/filter");
require("rxjs/add/operator/merge");
require("rxjs/add/observable/combineLatest");
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var config_1 = require("../core/config");
var state_serv_1 = require("../core/state.serv");
var auth_serv_1 = require("../core/auth.serv");
var chat_serv_1 = require("./chat.serv");
var ChatComp = (function () {
    function ChatComp(route, router, cfg, state, authServ, chatServ) {
        this.route = route;
        this.router = router;
        this.cfg = cfg;
        this.state = state;
        this.authServ = authServ;
        this.chatServ = chatServ;
        this.url = "ws://localhost:4016/chat";
        this.con = new WebSocket(this.url);
        this.messages = [];
        this.clients = [];
        this.client = { username: "", online: false };
        this.messageToSend = "";
        this.lastmsg_id = 0;
        this.keyDown = function (event) {
            if (event.key === "Enter") {
                this.send();
            }
        };
    }
    ChatComp.prototype.myMessage = function (message) {
        return this.state.cred["user"].username === message.username;
    };
    ChatComp.prototype.messagesGet = function (client) {
        var _this = this;
        var trainerId = this.state.cred.id;
        var token = this.state.token;
        var obj = { client: client, lastmsg_id: this.lastmsg_id };
        this.chatServ.messagesGet(obj).subscribe(function (res) {
            var body = res.json();
            console.log(body);
            _this.messages = body.res;
            _this.scrollBottom();
        }, function (err) {
            console.log(err);
        });
    };
    ChatComp.prototype.clientsGet = function () {
        var _this = this;
        var obj = {};
        this.chatServ.clientsGet(obj).subscribe(function (res) {
            var body = res.json();
            _this.clients = body.res;
            console.log(_this.clients);
            _this.scrollBottom();
        }, function (err) {
            console.log(err);
        });
    };
    ChatComp.prototype.selectClient = function (client) {
        this.client = client;
        this.messagesGet(this.client);
    };
    ChatComp.prototype.messageParse = function (msg) {
        return '<div class="msg">' + msg + "</div>";
    };
    ChatComp.prototype.scrollBottom = function () {
        setTimeout(function () {
            var container = $(".message-container")[0];
            var height = container.scrollHeight;
            $(".message-container").scrollTop(height);
        }, 200);
    };
    ChatComp.prototype.recieve = function (msg) {
        var sUsername = msg.sUsername, payload = msg.payload;
        console.log(msg);
        this.messages.push({ sUsername: sUsername, payload: payload });
        this.scrollBottom();
    };
    ChatComp.prototype.send = function () {
        var msg = this.messageToSend;
        if (msg === "") {
            return true;
        }
        var token = this.state.token;
        var obj = JSON.stringify({ token: token, sender: this.state.cred["user"].username, receivers: [this.client], payload: { msg: msg }, method: "chat-msg" });
        console.log(obj);
        this.con.send(obj);
        this.messages.push({ sUsername: "trainer", payload: { msg: msg } });
        this.messageToSend = "";
        this.scrollBottom();
    };
    ChatComp.prototype.ngOnInit = function () {
        var _this = this;
        this.clientsGet();
        this.con.onopen = function (e) {
            var obj = { method: "handshake", sender: _this.state.cred["user"].username, token: _this.state.token, payload: { msg: "handshake" } };
            var jsonObj = JSON.stringify(obj);
            _this.con.send(jsonObj);
        };
        this.con.onerror = function (e) {
            console.error("WebSocket-Problem");
        };
        this.con.onmessage = function (e) {
            var resp = JSON.parse(e.data);
            console.log(resp);
            switch (resp.method) {
                case "handshake":
                    return;
                case "chat-msg":
                    _this.recieve(resp);
                default:
                    return;
            }
        };
    };
    ChatComp = __decorate([
        core_1.Component({
            selector: "chat",
            templateUrl: "/template?type=chat",
            styleUrls: ["css/chat.css"],
            encapsulation: core_1.ViewEncapsulation.None,
            providers: []
        }), 
        __metadata('design:paramtypes', [router_1.ActivatedRoute, router_1.Router, config_1.Cfg, state_serv_1.StateServ, auth_serv_1.AuthServ, chat_serv_1.ChatServ])
    ], ChatComp);
    return ChatComp;
}());
exports.ChatComp = ChatComp;
//# sourceMappingURL=chat.comp.js.map