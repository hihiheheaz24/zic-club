
import Configs from "../common/ConfigsXoc";
import NetworkListener from "./NetworkListener";
//var msgpack = require("msgpack");
//var md5 = require("md5");
//import * as msgpack from 'msgpack-lite';
//import * as md5 from 'md5';
const { ccclass, property } = cc._decorator;


class NotifyListener {
    target: cc.Component;
    callback: (route: string, data: Object) => void;

    constructor(target: cc.Component, callback: (route: string, data: Object) => void) {
        this.target = target;
        this.callback = callback;
    }
}

class RequestListener {
    target: cc.Component;
    callback: (res: Object) => void;

    constructor(target: cc.Component, callback: (res: Object) => void) {
        this.target = target;
        this.callback = callback;
    }
}

@ccclass
export default class XocDiaNetworkClient {
    private static instance: XocDiaNetworkClient;
    private static reqId = 0;
    public static MIN_PING = -1;
    public static PING = 0;
    public static TIME_DISTANCE = 0;
    private static NODE_FIXED = new cc.Node().addComponent(cc.Sprite);
    static initPrototype: any;
    public static serverCurrentTimeMillis(): number {
        //c - s = d
        //-s = d-c
        //s = -(d-c)
        //s = -d + c
        //s = c - d
        return Date.now() - this.TIME_DISTANCE + Math.round(XocDiaNetworkClient.MIN_PING / 2);
    }
    public static systemCurrentTimeMillis(): number {
        return Date.now();
    }

    public isUseWSS: boolean = Configs.App.USE_WSS;
    public isAutoReconnect: boolean = true;

    private ws: WebSocket = null;
    private host: string = Configs.App.HOST.host;
    private port: number = Configs.App.HOST.port;
    // private host: string = "gamebaiyoyo.com";
    // private port: number = 2083;
    private isForceClose = false;
    private onOpenes: Array<NetworkListener> = [];
    private onCloses: Array<NetworkListener> = [];
    private xorKey = "dmVyeSBzZWNyZXQ";
    private requests: Object = new Object();
    private intervalPing: number = -1;

    private listeners: Array<NotifyListener> = new Array<NotifyListener>();

    private isLogining = false;
    private isLogined = false;
    private onLogined: (logined) => void = null;
    private urlRouter = null;
    private isErrorConnect = false;

    public static getInstance(): XocDiaNetworkClient {
        if (this.instance == null) {            
            this.instance = new XocDiaNetworkClient();
        }
        return this.instance;
    }

    public initApi() {
        // this.xhr = new XMLHttpRequest();
        // this.xhr.onreadystatechange = function () {
        //     if (this.readyState == 4 && (this.status >= 200 && this.status < 400)) {
        //         var response = this.responseText;
        //         console.log('response',response);
        //     }
        // };
        console.log('initApi');
        if(cc.sys.isBrowser) {
            if(window.location.href.indexOf('localhost') > -1){
                this.host = '127.0.0.1:9893';
                this.isUseWSS = false;
            }
        }
		cc.view.setResizeCallback(function(){

		});
		cc.game.on(cc.game.EVENT_HIDE, function(){
			this.timeHide = new Date().getTime();
			//this.inGame.newsOn = false;
		}, this);
		cc.game.on(cc.game.EVENT_SHOW, function(){
			//this.inGame.newsOn = true;
			setTimeout(function(){
				let check = new Date().getTime();
				check = (check-this.timeHide)/1000;
				cc.director.getActionManager().update(check);
				cc.director.getAnimationManager().update(check);
			}.bind(this), 100);
		}, this);
		//this.initPrototype();
    }
	public static initPrototypen() {
		String.format || (String.format = function(t){
			var i = Array.prototype.slice.call(arguments, 1);
			return t.replace(/{(\d+)}/g, function(t, e) {
				return void 0 !== i[e] ? i[e] : t
			})
		});
	}     

    public static setHost(host: any): void {
        console.log("setHost");
        Configs.App.HOST.host = 'fish.'+host;
    }

    public checkConnect(onLogined: (isLogined) => void) {
        this.onLogined = onLogined;
        if (!this.isConnected()) {
            if (Configs.App.Debug)
                console.log("Đang kết nối tới server...");
            // App.instance.showErrLoading("Đang kết nối tới server...");
            this.connect();
        } else if (!this.isLogined) {
            if (Configs.App.Debug)
                console.log("checkConnect login...", this.isLogined);
            this.login();
        } else {
            if (Configs.App.Debug)
                console.log("onLogined ...", this.isLogined);
            this.onLogined(this.isLogined);
        }
    }

    getPlatform(): number {
        if (cc.sys.isNative) {
            if (cc.sys.os === cc.sys.OS_IOS) {
                return 3;
            } else {
                return 2;
            }
        } else {
            return 1;
        }
    }

    private login() {
        console.log("login..." + this.isLogining);
        if (this.isLogining) return;
        this.isLogining = true;
        // App.instance.showErrLoading("Đang đăng nhập...");
        // cc.warn("Đang đăng nhập...");
        if (Configs.App.Debug)
            console.log("Đang đăng nhập...");
            var infoUser = {
                //nick: Configs.Nickname,//name
                username: Configs.Login.Username,//login 
                avatar: Configs.Login.Avatar,//login 
                password: Configs.Login.Password,
                id: 0
            }
            
            this.send('XocDia', {event: 'connect', info: infoUser})            
        // this.request("quickLogin", {
        //     "deviceId": "shoot123456654" + Configs.Login.Nickname,
        //     "platform": "android",
        //     "language": "vi"
        // }, (res) => {

        // console.log(Configs.Login.Username);
        // console.log(Configs.Login.Password);
        // console.log(this.getPlatform());

        // this.request("xxenglogin", {
        //     // "username": 'tabino',
        //     // "password": md5('123123th'),
        //     "username": Configs.Login.Username,
        //     "password": md5(Configs.Login.Password),
        //     "platform": this.getPlatform(),
        //     'access_token': Configs.Login.Token
        //     // "platform": Configs.App.getPlatformName(),
        // }, (res) => {
        //     this.isLogining = false;
        //     // App.instance.showLoading(false);
        //     cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();

        //     if (Configs.App.Debug)
        //         console.log(res);

        //     if (!res["ok"]) {
        //         if (this.onLogined != null) this.onLogined(false);
        //         return;
        //     }
        //     // console.log("login oke");

        //     this.isLogined = true;
        //     Configs.Login.CoinFish = res["cash"];
        //     Configs.Login.UsernameFish = res["username"];
        //     Configs.Login.PasswordFish = res["password"];
        //     Configs.Login.UserIdFish = res["userId"];
        //     Configs.Login.FishConfigs = res["config"];

        //     Configs.Login.isLogined = true;

        //     if (this.onLogined != null) this.onLogined(true);
        // }, XocDiaNetworkClient.NODE_FIXED);
        this.onLogined(true);
    }

    constructor() {

    }

    private onOpen(ev: Event) {
         console.log("onOpen");
         NetworkListener.onOpen(ev);
        this.intervalPing = setInterval(() => this.ping(), 6000);
        this.ping();

        // for (let i = 0; i < this.onOpenes.length; i++) {
        //     let listener = this.onOpenes[i];
        //     if (listener.target && listener.target instanceof Object && listener.target.node) {
        //         listener.callback();
        //     } else {
        //         this.onOpenes.splice(i, 1);
        //         i--;
        //     }
        // }
        //console.log('this.onLogined :'+this.onLogined);
        if (this.onLogined != null) {
            // console.log('call login');
            this.login()
        };
    }

    private onMessage(ev: MessageEvent) {
        let json = JSON.parse(ev.data);
        //console.log(`onMessage : ${JSON.stringify(json)}`);
        cc.InXocGame.onData(json)
        // let data = new Uint8Array(ev.data);
        // data = this.doXOR(data, 0, data.length);
        // let pack: Object = msgpack.decode(data);
        // if (pack.hasOwnProperty("msgId")) {
        //     if (pack["msgId"] == 0) {
        //         if (Configs.App.Debug)
        //             console.log(pack["route"], pack["data"]);
        //         for (let i = 0; i < this.listeners.length; i++) {
        //             let listener = this.listeners[i];
        //             if (listener.target && listener.target instanceof Object && listener.target.node) {
        //                 listener.callback(pack["route"], pack["data"]);
        //             } else {
        //                 this.listeners.splice(i, 1);
        //                 i--;
        //             }
        //         }
        //     } else {
        //         if (Configs.App.Debug)
        //             console.log(pack["data"]);
        //         if (this.requests.hasOwnProperty(pack["msgId"])) {
        //             let listener: RequestListener = this.requests[pack["msgId"]];
        //             if (listener.target && listener.target instanceof Object && listener.target.node) {
        //                 listener.callback(pack["data"]);
        //             }
        //             delete this.requests[pack["msgId"]];
        //         }
        //     }
        // }
    }

    private onError(ev: Event) {
        console.log("onError");
        this.isErrorConnect = true;
        NetworkListener.onError(ev);
    }

    private onClose(ev: Event) {
        console.log("onClose");
        if (this.intervalPing > 0) clearInterval(this.intervalPing);
        NetworkListener.onClose(ev);
        for (var i = 0; i < this.onCloses.length; i++) {
            var listener = this.onCloses[i];
            if (listener.target && listener.target instanceof Object && listener.target.node) {
                listener.callback();
            } else {
                this.onCloses.splice(i, 1);
                i--;
            }
        }
        // if (this.isAutoReconnect && !this.isForceClose) {
        //     setTimeout(() => {
        //         if (!this.isForceClose) this.connect();
        //     }, 3000);
        // }
    }

    public ping(callback: () => void = null, target: cc.Component = null) {
        let t = Date.now();
        this.requestPing("ping", null, (res) => {
            console.log('ping-res :'+res);
            XocDiaNetworkClient.PING = Date.now() - t;
            if (XocDiaNetworkClient.MIN_PING < 0 || XocDiaNetworkClient.PING < XocDiaNetworkClient.MIN_PING) {
                XocDiaNetworkClient.MIN_PING = XocDiaNetworkClient.PING;
                XocDiaNetworkClient.TIME_DISTANCE = Date.now() - res["time"];
            }
            if (callback != null) callback();
        }, target != null ? target : XocDiaNetworkClient.NODE_FIXED);
    }    

    private request(data) {
        //console.log(`Send socket data :${JSON.stringify(data)}`);
        if(this.isConnected()){
            this.ws.send(JSON.stringify(data));
        }else{
            this.connect();
        }
        
    }    

    public requestPing(route: string, data: any, callback: (res: Object) => void, target: cc.Component) {
        this.urlRouter = route;
        XocDiaNetworkClient.reqId++;
        if (XocDiaNetworkClient.reqId > 64999) {
            XocDiaNetworkClient.reqId = 1;
        }
        this.requests[XocDiaNetworkClient.reqId] = new RequestListener(target, callback);
        var infoUser = {
            username: Configs.Login.Username,//login 
            token: Configs.Login.tokenXoc
        }        
        this.send('XocDia', {event: 'ping', info: infoUser})    
        // console.log({ data: typeof data != "object" || data == null || !data ? {} : data, msgId: XocDiaNetworkClient.reqId, route: route });
        //this.request({ data: typeof data != "object" || data == null || !data ? {} : data, msgId: XocDiaNetworkClient.reqId, route: route });
    }    

    send(event, data, callback = null) {
        
        if(callback && data.data.callNum) {
            NetworkListener.setCallFuntion(callback, data.data.callNum)
        }
        this.request({
            event: event + '_Hub', 
            data: data
        })
    }   

    public connect(path = 'socketUser') {
        const socketURL = this.host + '/' + path;
        if (Configs.App.Debug)
            console.log("start connect: " + socketURL);
        this.isForceClose = false;
        if (this.ws == null) {
            // this.ws = new WebSocket("wss://" + host + ":" + port + "/websocket");
            if (this.isUseWSS) {
                if (cc.sys.isNative && cc.sys.os == cc.sys.OS_ANDROID) {
                    this.ws = new (Function.prototype.bind.apply(WebSocket, [null, "wss://" + socketURL, [], cc.url.raw("resources/cacert.pem")]));
                } else {
                    this.ws = new WebSocket("wss://" + socketURL);
                }
            } else {
                this.ws = new WebSocket("ws://" + socketURL);
            }
            this.ws.binaryType = "arraybuffer";
            this.ws.onopen = this.onOpen.bind(this);
            this.ws.onmessage = this.onMessage.bind(this);
            this.ws.onerror = this.onError.bind(this);
            this.ws.onclose = this.onClose.bind(this);
        }else {
            if (this.ws.readyState !== WebSocket.OPEN) {
                this.ws.close();
                this.ws = null;
                this.connect();
            }
        }
    }

    public disconnect() {
        console.log("disconnect xocdiadoikhang");
        this.isForceClose = true;
        this.urlRouter = null;
        this.isLogining = false;
        this.isErrorConnect = false;
        if (this.ws !== null) {
            console.log("close xocdiadoikhang socket");
            this.ws.close();
            this.ws = null;
        }
    }

    public addOnOpen(callback: () => void, target: cc.Component) {
        this.onOpenes.push(new NetworkListener(target, callback));
    }

    public addOnClose(callback: () => void, target: cc.Component) {
        this.onCloses.push(new NetworkListener(target, callback));
    }

    public close() {
        this.isForceClose = true;
        if (this.ws) {
            this.ws.close();
        }
    }

    public getIp() {
        return this.host
    }   

    public post(path, param, callback, header = null) {
        var that = this
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://'+this.getIp()+'/'+path);
        if(window.location.href.indexOf('localhost') > -1){
            xhr.open("POST", 'http://'+this.getIp()+'/'+path);
        }else{
            xhr.open("POST", 'https://'+this.getIp()+'/'+path);
        }        
        
        xhr.setRequestHeader("Content-type", "application/json");
        if(header) {
            for (var key of Object.keys(header)) {
                xhr.setRequestHeader(key, header[key]);
            }
        }
        xhr.send(JSON.stringify(param))
        xhr.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                if(callback) {
                    try {
                        var json = JSON.parse(this.responseText)
                        callback(json)
                    } catch(e) {
                        console.log(e)
                        callback(this.responseText)
                    }
                }
            }
        };
    } 

    public isConnected() {
        if (this.ws) {
            return this.ws.readyState == WebSocket.OPEN;
        }
        return false;
    }

    public addListener(callback: (route: string, data: Object) => void, target: cc.Component) {
        this.listeners.push(new NotifyListener(target, callback));
    }
}
