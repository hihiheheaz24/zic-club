// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
import Utils from "../shootFish/common/Utils";
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
const {ccclass, property} = cc._decorator;

@ccclass
export default class XocDiaItem extends cc.Component {
    @property(cc.Animation)
    lblChan: cc.Animation = null;
    @property(cc.Animation)
    lblLe: cc.Animation = null;    
    @property(cc.Label)
    totalBetChan: cc.Label = null;   
    @property(cc.Label)
    totalBetLe: cc.Label = null;   
    @property(cc.Label)
    totalChan: cc.Label = null;   
    @property(cc.Label)
    totalLe: cc.Label = null;   
    @property(cc.Label)
    timmer: cc.Label = null;     
    @property(cc.Label)
    session: cc.Label = null;     
    @property(cc.Label)
    lblBet: cc.Label = null;     
    @property(cc.Label)
    lblMin: cc.Label = null;   
    @property(cc.Label)
    lblPlayers: cc.Label = null;   
    @property(cc.Node)
    lock: cc.Node = null;   
    @property(cc.Node)
    popupPassword: cc.Node = null;                                         
    data: any;


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    setText(text) {
        this.timmer.string = text + ''
    }
    countdown(data) {
        this.timmer.string = data.time + ''
        this.onCuoc(data)
    }
    onCuoc(data) {
        this.totalChan.string = Utils.formatMoney2(data.tongUserChan) + ''
        this.totalLe.string = Utils.formatMoney2(data.tongUserLe) + ''
        this.totalBetChan.string = Utils.formatMoney2(data.tongCuocChan) + ''
        this.totalBetLe.string = Utils.formatMoney2(data.tongCuocLe) + ''
    }
    onKetQua(data) {
        if(data.isChan) {
            this.lblChan.play()
        } else {
            this.lblLe.play()
        }
    }
    onReset() {
        this.totalChan.string = '0'
        this.totalLe.string = '0'
        this.totalBetChan.string = '0'
        this.totalBetLe.string = '0'
        this.timmer.string = '--'
        this.lblChan.stop()
        this.lblChan.setCurrentTime(0);
        this.lblLe.stop()
        this.lblLe.setCurrentTime(0);
    }
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}
    init(data) {
        if(data.id == 2){
            console.log(data);
        }
        this.timmer.string = '--'
        this.node.room_id = data.id
        this.data = data;
        this.session.string = '#' + data.id;
        this.lblBet.string = Utils.formatMoney(data.cuoc)
        this.lblMin.string = Utils.formatMoney(data.cuoc)
        var countPlayer = this.getNotViewPlayers(data.players)
        if(countPlayer < 0)
            countPlayer = 0

        var max_user = data.max_user
        if(max_user == 0)
            max_user = 1000
        // this.sprPlayers.fillRange =  countPlayer / max_user
        this.lblPlayers.string = max_user == 1000 ? 'Không giới hạn' : countPlayer + '/' + max_user
        this.lock.active = data.password != ''
    }
    getNotViewPlayers(players) {
        var count = 0
        for (var i = 0; i < players.length; i++) {
            if(!players[i].isView) {
                count++
            }
        }
        return count
    }
    start () {
        this.node.on('click', ()=> {
            if(this.data.password != ''){
                cc.InXocGame.showPopupPassword(this.data.id);
            }else{
                Network.getInstance().send('XocDia', {event: 'joinRoom', data: { room_id: this.data.id, token: Configs.Login.tokenXoc}})
            }
        })
    }

    // update (dt) {}
}
