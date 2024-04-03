import Utils from "../shootFish/common/Utils";
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
const { ccclass, property } = cc._decorator;

@ccclass
export default class Player extends cc.Component {
    @property(cc.Node)
    chat: cc.Node = null;
    @property(sp.Skeleton)
    emoj: sp.Skeleton = null;
    @property(cc.Node)
    chipsPoint: cc.Node = null;
    @property(cc.Node)
    chipsPoint2: cc.Node = null;
    @property(cc.Node)
    isView: cc.Node = null;
    @property(cc.Node)
    info: cc.Node = null;
    @property(cc.Sprite)
    avatar: cc.Sprite = null;
    @property(cc.Label)
    lblUsername: cc.Label = null;
    @property(cc.Label)
    lblCoin: cc.Label = null;
    @property(cc.Animation)
    refunCoin: cc.Animation = null;
    @property(cc.Label)
    lblRefunCoin: cc.Label = null;
    @property(cc.Animation)
    winCoin: cc.Animation = null;
     @property(cc.Label)
     lblWinCoin: cc.Label = null;
     @property(cc.Node)
     icon: cc.Node = null;
     @property(cc.Node)
     kickBtn: cc.Node = null;     
    timeOutChat: number;
    timeoutRefun: number;
    timeoutWin: number;
    nickname: any;
    data: any;
    room_id: any;

     init(data, isView = false, isCai = false) {
        console.log('Player',data);
        this.data = data;
        this.nickname = data.nick;
        this.lblUsername.string = data.nick;
        this.room_id = data.room_id;
        this.setCoin(data.gold);
         this.avatar.spriteFrame = cc.AccountController.getInstance().getAvatarImage(data.avatar);
        // this.avatar.spriteFrame = data.avatar
        this.refunCoin.node.active = this.winCoin.node.active = false;
        if(this.isView) {
            this.isView.active = isView
            if(data.nick != Configs.Login.Nickname) {
                this.info.active = false
            } else {
                this.info.active = true
            }
        } else {
            this.info.active = true
        }
        if(isCai) {
            this.showNhaCai(true)
        }
        //this.showKichBtn(data.status == 0);
    };

    onChat(data) {
        var that = this
        clearTimeout(this.timeOutChat)
        this.chat.active = this.emoj.node.active = false;
        if(data.type == 0) { //msg
            this.chat.active = true;
            this.chat.getComponentInChildren(cc.RichText).string = data.msg;
        } else { //emoj
            this.emoj.node.active = true;
            this.emoj.setAnimation(0, data.msg + 1, true);
        }
        this.timeOutChat = setTimeout(()=>{
            that.chat.active = that.emoj.node.active = false;
        }, 8000)
    }
    hideInfo() {
        this.icon.active = false;
        this.info.active = false;
        this.nickname = undefined;
    }
    setCoin(CoinXoc) {
        this.lblCoin.string = Utils.formatNumber(parseInt(CoinXoc));
    }
    showNhaCai(isShow) {
        this.icon.active = isShow;
    };
    onDestroy() {
        clearTimeout(this.timeoutRefun);
        clearTimeout(this.timeoutWin);
        clearTimeout(this.timeOutChat);
    };
    showRefunCoin(money) {
        var that = this
        this.refunCoin.node.active = true
        this.lblRefunCoin.string = Utils.formatNumber(money)
        this.refunCoin.play()

        this.timeoutRefun = setTimeout(() => {
            that.refunCoin.node.active = false
        }, 2000)
    };
    showWinCoin(money) {
        var that = this
        this.winCoin.node.active = true
        this.lblWinCoin.string = Utils.formatNumber(money)
        this.winCoin.play()

        this.timeoutRefun = setTimeout(() => {
            that.winCoin.node.active = false
        }, 2000)
    };

    showKichBtn(isActive) {
        if(!this.kickBtn)
            return;
        this.kickBtn.active = isActive;
    };   

    actKickUser() {
        let data = {
            room_id: cc.PlayXocGame.room_id,
            token: Configs.Login.tokenXoc,
            nickname: this.nickname
        }
        Network.getInstance().send('XocDia', {event: 'kick_member', data: data})
    };      

    start () {

    };

}
