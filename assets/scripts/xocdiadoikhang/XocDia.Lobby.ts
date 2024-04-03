//import Play from "./XocDia.Play";
import Configs from "./common/ConfigsXoc";
import popupTransfer from "./XocDia.PopupCoinTransfer";
import popupPassword from "./XocDiaMulti.PopupPassword"
import Utils from "../shootFish/common/Utils";
import BroadcastReceiver from "../shootFish/common/BroadcastReceiver";
// import MiniGameNetworkClient from "../../../scripts/networks/MiniGameNetworkClient";
// import InPacket from "../../../scripts/networks/Network.InPacket";
// import cmd from "../../../Lobby/src/Lobby.Cmd";
import XocDiaNetworkClient from "./networks/XocDiaNetworkClient";
import AudioManager from "../shootFish/common/Common.AudioManager";
import NetworkListener from "./networks/NetworkListener";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Lobby extends cc.Component {

    public static instance: Lobby = null;
    @property([cc.AudioClip])
    audios: cc.AudioClip[] = [];

    @property({type: cc.ScrollView})
    scroll: cc.ScrollView = null;
    @property(popupTransfer)
    popupTransfer: popupTransfer = null;
    @property(cc.Node)
    popupPassword: cc.Node = null;    
    @property(cc.Node)
    popupCreateRoom: cc.Node = null;
    @property(cc.Label)
    lblCoin: cc.Label = null;
    @property(cc.Label)
    lblName: cc.Label = null;
    @property(cc.Sprite)
    avatar: cc.Sprite = null;
    @property(cc.Node)
    playNode: cc.Node = null;
    @property({type: cc.AudioClip})
    clipClick: cc.AudioClip = null;
    @property(cc.Node)
    popupConnect: cc.Node = null;   
    @property(cc.Node)
    popupLogin: cc.Node = null;    
    current: number;
    template: any;
    play: any;
    @property(cc.Node)
    popupAlert: cc.Node = null;
    @property(cc.Node)
    popupAlertSmall: cc.Node = null;  
    @property(cc.Node)
    popupNotEnoughMoney: cc.Node = null;       
    @property(cc.Node)
    backDrop: cc.Node = null;          
    isBack: boolean;

    // LIFE-CYCLE CALLBACKS:
    protected start(): void {
        this.isBack = false;
        NetworkListener.onOpen = function() {
            console.log('NetworkListener onOpen Lobby')
            // that.backDrop.active = false
            // console.log('xxxxxxxxx')
            //Network.send('XocDia', {event: 'connect', info: infoUser})
        }
        NetworkListener.onClose = function() {
            if(cc.InXocGame.isBack){
                return;
            }
            console.log('NetworkListener onClose Lobby')
            cc.InXocGame.actBack();
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Mất kết nối đến server, vui lòng thử lại sau.");
            //this.popupConnect.active = true;
        }
        
        NetworkListener.onError = function() {
            console.log('NetworkListener onError Lobby')
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Thao tác thất bại, vui lòng thử lại sau.");
        }         
    }
    onLoad() {
        //Lobby.instance = this;
        //XocDiaNetworkClient.getInstance().connect();
        this.play = this.playNode.getComponent('XocDia.Play');
        this.popupAlert = this.popupAlert.getComponent('Vs.PopupAlert');
        this.popupPassword = this.popupPassword.getComponent('XocDiaMulti.PopupPassword');
        this.popupNotEnoughMoney = this.popupNotEnoughMoney.getComponent('Vs.PopupAlert');
        this.popupAlertSmall = this.popupAlertSmall.getComponent('Vs.PopupAlertSmall');
        //this.play.node.active = false;

        this.lblCoin.string = Utils.formatNumber(Configs.Login.CoinXoc);
        var loginResponse = cc.LoginController.getInstance().getLoginResponse();
        //var node = cc.find('Canvas/widget-top-view').getChildByName("group-loginSuccess");    
        //this.lblUserName.string = node.getChildByName("lbNickName").getComponent(cc.Label).string;
        console.log(JSON.stringify(loginResponse));
        this.lblName.string = loginResponse.AccountName;
        Configs.Login.Username = loginResponse.AccountName;
        Configs.Login.Password = loginResponse.AccountName;
        Configs.Login.Nickname = loginResponse.AccountName;
        Configs.Login.Coin = loginResponse.Balance;
        Configs.Login.Avatar = loginResponse.AvatarID;
        var spriteAvar = cc.AccountController.getInstance().getAvatarImage(loginResponse.AvatarID);
        this.avatar.spriteFrame = spriteAvar;

        BroadcastReceiver.register(BroadcastReceiver.USER_UPDATE_COIN, () => {
            console.log("BroadcastReceiver USER_UPDATE_COIN");
            this.updateCoin();
       } this);
        cc.InXocGame = this;
        cc.find('Canvas/popupView-noHide').getComponent('PopupView').showBusy();
        XocDiaNetworkClient.getInstance().initApi();
        this.connectToServer();
        //AudioManager.getInstance().playBackgroundMusic(this.audios[0]);
    }

    private init(data) {
        console.log('init', data)
        this.play.node.active = false;
        //this.lobby.active = true
        this.addTables(data.tables);
        Configs.Login.CoinXoc = parseInt(data.user.gold);
        Configs.Login.tokenXoc = data.token; //save your token
        Configs.Login.Token = cc.ServerConnector.getInstance().getToken();
        Configs.Login.Nickname = data.user.nick;
        BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
        //this.updateCoin();
        if(data.joinRoom) {
            this.joinRoom(data.joinRoom, data.user);
        }
        if (Configs.Login.CoinXoc <= 0) {
            this.popupTransfer.show();
        } 
        //this.startSound();       
    }

    onDestroy() {
        cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
        //AudioManager.getInstance().stopBackgroundMusic();
        //cc.audioEngine.stop(this.current);
        console.log('onDestroy stopBackgroundMusic');
    }

    private connectToServer() {
        XocDiaNetworkClient.getInstance().checkConnect((isLogined) => {
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
             console.log('checkConnect', isLogined);
            if (!isLogined) {
                cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Đăng nhập thất bại, vui lòng thử lại.");

                // App.instance.alertDialog.showMsgWithOnDismissed("Đăng nhập thất bại, vui lòng thử lại.", () => {
                //     this.actBack();
                // });
                return;
            }
        });

    //     XocDiaNetworkClient.getInstance().addOnClose(() => {        
    //         cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
    //         if (XocDiaNetworkClient.getInstance().getUrlRequest() == "quit") {
    //             this.actBack();
    //         } else if (XocDiaNetworkClient.getInstance().getIsErrorConnect()){
    //             cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Hệ thống đang bận, vui lòng vào lại sau!");
    //         }
    //         // App.instance.showErrLoading("Mất kết nối, đang thử kết nối lại...");
    //         // cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage("Mất kết nối, đang thử kết nối lại...");
    //    } this);
    }

    private countdownLobby(data) {
        var children = this.scroll.content.children
        for (var i = 0; i < children.length; i++) {
            if(children[i].room_id == data.room_id) {
                children[i].getComponent('XocDia.Item').countdown(data)
                break
            }
        }
   }
   private muaChanLeLobby(data) {
        var children = this.scroll.content.children
        for (var i = 0; i < children.length; i++) {
            if(children[i].room_id == data.room_id) {
                children[i].getComponent('XocDia.Item').setText('BÁN')
                break
            }
        }
   }
   private cuocLobby(data) {
        var children = this.scroll.content.children
        for (var i = 0; i < children.length; i++) {
            if(children[i].room_id == data.room_id) {
                children[i].getComponent('XocDia.Item').onCuoc(data)
                break
            }
        }
   }
   private startCuocBuLobby(data) {
        var children = this.scroll.content.children
        for (var i = 0; i < children.length; i++) {
            if(children[i].room_id == data.room_id) {
                children[i].getComponent('XocDia.Item').setText('THỪA')
                break
            }
        }
   }
   private ketquaLobby(data) {
        var children = this.scroll.content.children
        for (var i = 0; i < children.length; i++) {
            if(children[i].room_id == data.room_id) {
                children[i].getComponent('XocDia.Item').onKetQua(data)
                break
            }
        }
   }
   private endGame(data) {
        this.play.endGame(data)
   }
   private endGameLobby(room_id) {
        var children = this.scroll.content.children
        for (var i = 0; i < children.length; i++) {
            if(children[i].room_id == room_id) {
                children[i].getComponent('XocDia.Item').onReset()
                break
            }
        }
   }
   private startLobby(room_id) {
        var children = this.scroll.content.children
        for (var i = 0; i < children.length; i++) {
            if(children[i].room_id == room_id) {
                children[i].getComponent('XocDia.Item').onReset()
                break
            }
        }
   }
   private addTables(tables) {
        var content = this.scroll.content
        if(!this.template)
            this.template = content.children[0]
        content.removeAllChildren()
        tables.reverse()
        for (var i = 0; i < tables.length; i++) {
            var table = tables[i]
            var item = cc.instantiate(this.template)
            item.room_id = table.id
            item.getComponent('XocDia.Item').init(table)
            content.addChild(item)
        }
        // content.children[0].destroy()
   }
   private updateCoin() {
        this.lblCoin.string = Utils.formatMoney(Math.floor(Configs.Login.CoinXoc))
   }

   public callUpdateXocCoin() {
    // App.instance.showLoading(true);
    cc.find('Canvas/popupView-noHide').getComponent('PopupView').showBusy();
    XocDiaNetworkClient.getInstance().post("updateMyCoin", {
        'access_token': Configs.Login.Token,
        'token': Configs.Login.tokenXoc
    }, (res) => {
        // App.instance.showLoading(false);
        cc.find('Canvas/popupView-noHide').getComponent('PopupView').hideBusy();
        // console.log(res);
        if (!res["ok"]) {
            cc.find('Canvas/popupView-noHide').getComponent('PopupView').showMessage(res["msg"]);
            return;
        }
        Configs.Login.CoinXoc = res["newCash"];
        BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
        // App.instance.alertDialog.showMsg("Thao tác thành công.");
    });
}   
   
   private showAlert(data) {
        if(data.coin) {
            Configs.Login.CoinXoc = data.coin
            this.updateCoin()
        }
        if(!data.type) {
            this.popupAlert.show()
            this.popupAlert.init(data.msg)
        } else {
            this.popupAlertSmall.show()
            this.popupAlertSmall.init(data.msg)
        }
   }
   private showAlertCoin(data) {
        console.log(data);
        var that = this
        if(data.coin) {
            Configs.Login.CoinXoc = data.coin
            this.updateCoin()
        }
        this.popupNotEnoughMoney.show()
        this.popupNotEnoughMoney.init(data.msg, () => {
            that.popupTransfer.show()
        })
   }
   private joinRoom(data, user) {
        if(user.nick == Configs.Login.Nickname) { //me
            this.stopSound()
            this.backDrop.active = false;
            //this.lobby.active = false
            this.play.node.active = true
            this.play.init(data)
        } else { //different
            this.play.joinRoom(data, user)
        }
        
        // this.room_id = data.id
        // console.log('room_id', this.room_id)
   }
   private leaveRoom(data) {
        this.play.leaveRoom(data)
   }
   private refeshRoom(data) {
        var type = data.type
        var table = data.item
        var content = this.scroll.content
        if(type == 'new') {
            var item = cc.instantiate(content.children[0])
            item.getComponent('XocDia.Item').init(table)
            content.insertChild(item, 0);
        } else if(type == 'old') {
            var children = content.children
            for (var i = 0; i < children.length; i++) {
                if(children[i].room_id == table.id) {
                    children[i].getComponent('XocDia.Item').init(table)
                    break
                }
            }
        } else if(type == 'delete') {
            var children = content.children
            for (var i = 0; i < children.length; i++) {
                if(children[i].room_id == table.id) {
                    children[i].destroy()
                    break
                }
            }
        }
   }
   private onCuoc(data) {
        this.play.onCuoc(data)
   }
   private onCuocThua(data) {
        this.play.onCuocThua(data)
   }

   private xinLamCai(data) {
        this.play.xinLamCai(data)
   }
   private onChat(data) {
        this.play.onChat(data)
   }
   private startCuoc(data) {
        this.play.startCuoc(data)
   }
   private countDown(data) {
        this.play.countDown(data)
   }
   private ketqua(data) {
        this.play.ketqua(data)
   }
   private startCanCuaOrSell(data) {
        this.play.startCanCuaOrSell(data)
   }
   private startCanCua(data) {
        this.play.startCanCua(data)
   }
   private startCanCuaTraVe(data) {
        this.play.startCanCuaTraVe(data)
   }
   private startCanCuaDu(data) {
        this.play.startCanCuaDu(data)
    }
   private startCanCuaBtn(data) {
        this.play.startCanCuaBtn(data)
   }
   private stopCanCuaOrSell(data) {
        this.play.stopCanCuaOrSell(data)
   }
   private updateTien(data) {
        this.play.updateTien(data)
   }
   private muaChanLe(data) {
        this.play.muaChanLe(data)
   }
   private muaChanLeOn(data) {
        this.play.muaChanLeOn(data)
   }
   private onWin(data) {
        this.play.onWin(data)
   }
   private refeshCai(data) {
        this.play.refeshCai(data)
   }
   private showProgress(data) {
        this.play.showProgress(data)
   }
   private startCuocBu(data) {
        this.play.startCuocBu(data)
   }

   public onData(data) {
        var that = this
        //console.log('data', data)
        var dt = data.data
        var game = dt.game
        if(game!='xocdia')
            return
        var event = data.event
        if(event != 'pong' && event != 'countdown_lobby'){
            //console.log('data', data);
        }
        switch(event) {
            case 'connect':
                console.log('inittttttttttt')
                this.backDrop.active = false;
                this.init(dt)
            break;
            case 'pong':
                console.log('pong from server')
            break;            
            case 'logout':
                console.log('loutttttttttttttt')
                this.actBack()
            break;
            case 'message':
                this.backDrop.active = false;
                this.showAlert(dt)
                // if(dt.callNum)
                //     this.callback(dt.callNum, dt.error, dt.msg);
            break;
            case 'message_login':
                this.backDrop.active = false;
                this.popupLogin.show();
                this.showAlert(dt);
            break;            
            case 'message_nap':
                this.backDrop.active = false;
                this.showAlertCoin(dt);
                // if(dt.callNum)
                //     this.callback(dt.callNum, dt.error, dt.msg)
            break;
            case 'joinRoom':
                dt.dt.history = dt.history
                this.joinRoom(dt.dt, dt.user)
            break;
            case 'refeshRoom':
                this.refeshRoom(dt)
            break;
            case 'ketqua':
                this.ketqua(dt.ketqua)
            break;
            case 'countdown':
                this.countDown(dt)
            break;
            case 'startCuoc':
                this.startCuoc(dt.data)
            break;
            case 'endGame':
                this.endGame(dt)
            break;
            case 'cuoc':
                this.onCuoc(dt.data)
            break;
            case 'cuocthua':
                this.onCuocThua(dt.data)
            break;
            case 'startCuocBu_lobby':
                this.startCuocBuLobby(dt)
            break;
            case 'stopCanCuaOrSell':
                this.stopCanCuaOrSell(dt.data)
            break;
            case 'startCanCuaOrSell': //bắt đầu show nút cái cân, sell chẵn lẽ -> show chủ room
                this.startCanCuaOrSell(dt.data)
            break;
            case 'startCanCua'://bat dau hệ thống cân cửa 2 bên
                this.startCanCua(dt.data)
            break;
            case 'startCanCuaTraVe'://bat dau hệ thống cân cửa 2 bên
                this.startCanCuaTraVe(dt.data)
            break;
            case 'startCanCuaDu'://bat dau hệ thống cân cửa 2 bên
                this.startCanCuaDu(dt.data)
            break;
            case 'startCanCuaBtn'://bat dau hệ thống cân cửa 2 bên
                this.startCanCuaBtn(dt.data)
            break;
            case 'muaChanLe':
                this.muaChanLe(dt.data)
            break;
            case 'chat':
                this.onChat(dt.data)
            break;
            case 'win':
                this.onWin(dt.data)
            break;
            case 'muaChanLeOn':
                this.muaChanLeOn(dt.data)
            break;
            case 'cuoc_lobby':
                this.cuocLobby(dt.data)
            break;
            case 'muaChanLe_lobby':
                this.muaChanLeLobby(dt)
            break;
            case 'countdown_lobby':
                this.countdownLobby(dt.data)
            break;
            case 'ketqua_lobby':
                this.ketquaLobby(dt.ketqua)
            break;
            case 'start_lobby':
                this.startLobby(dt.room_id)
            break;
            case 'xinlamcai':
                this.xinLamCai(dt.data)
            break;
            case 'endgame_lobby':
                this.endGameLobby(dt.room_id)
            break;
            case 'refeshCai':
                this.refeshCai(dt.data)
            break;
            case 'progress':
                this.showProgress(dt.data)
            break;
            case 'startCuocBu':
                this.startCuocBu(dt.data)
            break;
            case 'updateTien':
                this.updateTien(dt.data)
            break;
            case 'leaveRoom':
                this.leaveRoom(dt)
            default:
        }
    }

    public showPopupPassword(room_id:any){
        this.popupPassword.show();
        const data = {
            id : room_id
        }
        this.popupPassword.init(data);
    }

    private actBack() {
        AudioManager.getInstance().playEffect(this.clipClick);
        this.isBack = true;
        XocDiaNetworkClient.getInstance().disconnect();
        cc.find('Canvas').getComponent('LobbyView').destroyDynamicView('77');
    }
    public stopSound() {
        // cc.audioEngine.stop(this.current);
        //BroadcastReceiver.send(BroadcastReceiver.ON_AUDIO_CHANGED);
    }
    public startSound() {
        // cc.audioEngine.stop(this.current);
        //if(this.getSound())
            //this.current = cc.audioEngine.play(this.audios[0], true, 1);
            //BroadcastReceiver.send(BroadcastReceiver.ON_AUDIO_CHANGED);
    }
    private getSound() {
        return (Utils.getSession('xocdia_sound') == undefined || Utils.getSession('xocdia_sound') == "true") ? true : false
    }
    private setSound(isSound) {
        Utils.setSession('xocdia_sound', isSound)
    }      
}
