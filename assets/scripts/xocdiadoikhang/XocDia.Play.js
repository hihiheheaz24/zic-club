//var Network = require('./networks/XocDiaNetworkClient')
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
//import PopupCoinTransfer from './XocDiaMulti.PopupCoinTransfer'

// var MePlayer = require('./XocDiaMulti.MePlayer')
//var Player = require('./XocDia.Player')
var PopupAlert = require('Vs.PopupAlert')


var Helper = require('Vs.Helper')
var History = require('./XocDiaMulti.SoiCau')
var Progress = require('./XocDiaMulti.Progress')
var Dealer = require('./XocDiaMulti.Dealer')
var BankerControl = require('./XocDiaMulti.BankerControl')
var PanelPayDoor = require('./XocDiaMulti.PanelPayDoor')
var PopupPassword = require('./XocDiaMulti.PopupPassword')
var PanelChat = require('./XocDiaMulti.PanelChat')
// var Controller = require('./XocDiaMulti.Controller')
cc.Class({
    extends: cc.Component,

    properties: {
        controller: cc.Node,
        lobby: cc.Node,
        btn_mobat: cc.Node,
        audios: {
            default: [],
            type: [cc.AudioClip]
        },
        panelChat: PanelChat,
        popupPassword: PopupPassword,
        sessionLbl: cc.Label,
        panelPayDoor: PanelPayDoor,
        dealerHandPoint: cc.Node,
        nguoichoi: cc.Node,
        sprChipSmalls: [cc.SpriteFrame],
        chips: cc.Node,
        chipTemplate: cc.Node,
        lblRoomId: cc.Label,
        lblMyBetLe: cc.Label,
        lblMyBetChan: cc.Label,
        players: [cc.Node],
        doorChan: cc.Button,
        doorLe: cc.Button,
        doorChanThua: cc.Button,
        doorLeThua: cc.Button,
        btnBanChan: cc.Node,
        btnBanLe: cc.Node,
        dealer: Dealer,
        progress: Progress,
        bowl: sp.Skeleton,
        lblTime: cc.Label,
        vaoban_btn: cc.Node,
        start_btn: cc.Node,
        popupConfirm: PopupAlert,
        popupAlert: PopupAlert,
        popupNotEnoughMoney: PopupAlert,
        popupCoinTransfer: cc.Node,
        popupRule: cc.Node,
        popupListUser: cc.Node,
        backDrop: cc.Node,
        btnXinLamCai: cc.Node,
        btnHuyLamCai: cc.Node,
        btnMenu: cc.Node,
        // panelMenu: cc.Node,
        betBtns: [cc.Node],
        historyNode: History,
        bankerControl: BankerControl,
        _nhacai: false,
        sound: cc.Toggle
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
       
    },
    onEnable() {
        console.log("onEnable XocDia.Player");
        for (var i = 0; i < this.players.length; i++) {
            this.players[i] = this.players[i].getComponent('XocDia.Player');
            this.players[i].nickname = undefined;
            //console.log('player'+i+':'+this.players[i].nickname);
            //this.players[i].hideInfo()
        }        
    },
    start () {
    },    
    getSound() {
        return (Helper.getSession('xocdia_sound') == undefined || Helper.getSession('xocdia_sound') == "true") ? true : false
    },
    setSound(isSound) {
        Helper.setSession('xocdia_sound', isSound);
        console.log("setSound",isSound);
        if(isSound) {
            //this.current = cc.audioEngine.play(this.audios[4], false, 1);
            cc.InXocGame.startSound();
        }
        else {
            cc.InXocGame.stopSound();
         }
    },
    actSound(event) {
        console.log(event.isChecked)
        this.setSound(event.isChecked)
        console.log('getSound', this.getSound(), Helper.getSession('xocdia_sound'))
    },
    init(data) {
        var that = this;
        this.lobby.active = false;                
        this.data = data;
        this.btnXinLamCai.active = false;
        this.btnHuyLamCai.active = false;
        this.vaoban_btn.active = this.data.cai != Configs.Login.Nickname;
        this.sound.isChecked = this.getSound();
        this.betPage = 0;
        this.sessionLbl.string = data.session ? '#' + data.session : '--';
        this.nguoichoi.active = false;
        this.chipsInDoors = {};
        this.listChip = [];
        this.mybet_chan = 0;
        this.mybet_le = 0;
        this.btn_mobat.active = this.data.status == 5;
        this.panelPayDoor.node.active = false;
        this.doorChan.interactable = this.doorLe.interactable = true
        this.doorChan.node.getChildByName('active').active = this.doorLe.node.getChildByName('active').active = this.doorChanThua.node.active = this.doorLeThua.node.active = false
        this.doorChan.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.tongCuocChan)
        this.doorLe.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.tongCuocLe)
        this.bowl.animation = 'default'
        this.progress.node.active = this.bankerControl.node.active = false
        this.activeBet = 0
        this.room_id = data.id;
        this.popupCoinTransfer = this.popupCoinTransfer.getComponent('XocDia.PopupCoinTransfer');
        console.log('data', data)
        // this.panelMenu.active = false
        this.initBtnBet()
        this.initBtnBetPage()
        this.initNhaCai()
        this.initLogs()
        this.initBowl()
        //this.players[this.players.length - 1].init(Configs.Login.Nickname, Configs.CoinXoc, Configs.Avatar, this.data.players[0].nick != Configs.Login.Nickname) //mePlayer
        this.initPlayers()
        cc.PlayXocGame = this;
        this.lblRoomId.string = 'Phòng: #' + this.room_id
        this.backDrop.active = false
        if(data.status == 1) {
            if(data.time <= 4) {
                if(this.getSound())
                    this.current = cc.audioEngine.play(this.audios[2], false, 1);
            } else {
                this.timeOutProgress = setTimeout(() => {
                    if(that.getSound())
                        that.current = cc.audioEngine.play(that.audios[2], false, 1);
                }, (data.time - 4) * 1000)

                this.timeOutStopProgress = setTimeout(() => {
                    if(that.getSound())
                        that.current = cc.audioEngine.play(that.audios[14], false, 1);
                }, (data.time-2) * 1000)                
            }
            this.progress.onProgress(data.time, 'CHỜ ĐẶT CƯỢC')
        } else if(data.status == 0) {
            this.progress.onProgress(data.time, 'CHỜ SẴN SÀNG')
        }
            
    },
    onWin(data) {
        this.scheduleOnce(() => {
            for (let i = 0; i < data.user_win.length; i++) {
                let playerData = data.user_win[i];
                if(playerData.nick == Configs.Login.Nickname)
                    Configs.Login.CoinXoc = playerData["gold"] //update money
                let player = this.getPlayer(playerData["nick"]);
                if (player != null) {
                	if(playerData["winGold"] < 0) {
                		player.showRefunCoin(playerData["winGold"]);
                	} else {
                		player.showWinCoin(playerData["winGold"]);
                	}
                    player.setCoin(playerData["gold"]);
                }
            }
            // BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
        }, 3);
    },
    onChat(data) {
        for (var i = 0; i < this.players.length; i++) {
            if(this.players[i].nickname == data.nick) {
                this.players[i].onChat(data)
                break
            }
        }
        this.panelChat.onChat(data)
        
    },
    actNextBet() {
        this.betPage++
        if(this.betPage > 2)
            this.betPage = 0
        this.activeBet = this.betPage * 4
        this.initBtnBet()
    },
    actPrevBet() {
        this.betPage--
        if(this.betPage < 0)
            this.betPage = 2
        this.activeBet = this.betPage * 4
        this.initBtnBet()
    },
    initBtnBetPage() {
        for (var i = 0; i < this.betBtns.length; i++) {
            this.betBtns[i].active = Math.floor(i / 4) == this.betPage
        }
    },
    resetAll() {
        this.data.status = 0;
        this.doorChan.interactable = this.doorLe.interactable = false;
        this.bankerControl.node.active = false;
        this.panelPayDoor.node.active = false;
        this.doorChan.node.getChildByName('active').active = this.doorLe.node.getChildByName('active').active = false;
        this.doorChan.node.getComponentInChildren(cc.Label).string = this.doorLe.node.getComponentInChildren(cc.Label).string = '0';
        this.mybet_chan = this.mybet_le = 0;
        this.lblMyBetChan.string = this.lblMyBetLe.string = '0';        
        // this.bowl.animation = 'bat up'
    },
    endGame(data) {
        this.dealer.talk('Chờ nhà cái bắt đầu')
        this.btn_mobat.active = false;
        this.doorLeThua.node.active = this.doorChanThua.node.active = false;
        this.start_btn.active = this.data.players[0].nick == Configs.Login.Nickname;
        if(this.data.cai == Configs.Login.Nickname){
            this.showKickButton(true);
            this.btnHuyLamCai.active =true;
        }
        this.bowl.animation = 'default'
        // console.log('time endddddd', data.table.time)
        this.progress.onProgress(data.table.time, 'CHỜ SẴN SÀNG')
        this.resetAll()
    },
    showKickButton(isShow){
        for (var i = 0; i < this.players.length; i++) {
            if(this.players[i]){
                if(this.players[i].nickname != this.data.cai){
                    this.players[i].showKichBtn(isShow);
                }
            }
          }
    },
    countPlayers(players) {
      var count = 0
      for (var i = 0; i < players.length; i++) {
        if(!players[i].isView)
          count++
      }
      return count
    },
    initPlayers() {
        //console.log('initPlayers', this.data.players.length);
        //console.log('initPlayers data', this.data);
        if(this.data.players.length <= 0)
            return
        var players = this.data.players
        var ghe = 0
        //if(this.countPlayers(players) > 10) {
            this.nguoichoi.active = true
            this.nguoichoi.getComponentInChildren(cc.Label).string = Helper.formatMoney((players.length))
        //}
        for (var i = 0; i < this.players.length; i++) {
            this.players[i] = this.players[i].getComponent('XocDia.Player');
            this.players[i].nickname = undefined;
            this.players[i].hideInfo()
        }

        //cai
        if(Configs.Login.Nickname == this.data.cai) {
            this.dealerHandPoint = this.players[0].chipsPoint;
            this.players[9].node.active = false; //hide userplayer
            this.players[0].init(players[0], false, true);
            this.dealerHandPoint = this.players[0].chipsPoint;
            ghe++
        }
        
        //loop players
        for (var i = 0; i < players.length; i++) {
            if(Configs.Login.Nickname == players[i].nick) {
                if(i == 0 && this.data.cai != '') { //nha cai
                    // this.dealerHandPoint = this.players[0].chipsPoint
                    // this.players[9].node.active = false //hide userplayer
                    // this.players[0].init(players[i], false, true)
                    // this.dealerHandPoint = this.players[0].chipsPoint
                    // ghe++
                } else {
                    this.vaoban_btn.active = players[i].isView;
                    this.players[9].node.active = true;
                    this.players[9].init(players[i], players[i].isView, false);
                }
                continue;
            }
            if(players[i].isView)
                continue;
            if(ghe > 8) {
                continue
            }
            console.log('initttt ghe:', ghe, i, this.players[ghe].nickname)
            if(!this.players[ghe].nickname) {
                this.players[ghe].init(players[i], false, i==0)
                ghe++
            }
        }
        if(this.data.status == 0 && this.players[0].nickname && this.players[0].nickname != Configs.Login.Nickname) {
            this.players[0].node.getComponent('XocDiaMulti.Dealer').talk('Chờ nhà cái bắt đầu');
        }
        if(this.data.status == 0 && this.players[0].nickname && this.players[0].nickname == Configs.Login.Nickname){
            this.btnHuyLamCai.active = true;
        }
        
    },
    initBowl() {
        if(this.data.status == 6) {
            this.setBowlAnimation(this.data.history[this.data.history.length - 1])
        }
    },
    initBtnBet() {
        // console.log('this.betBtns.length', this.betBtns.length)
        for (var i = 0; i < this.betBtns.length; i++) {
            this.betBtns[i].active = Math.floor(i / 4) == this.betPage
            var betBtns = this.betBtns[i].children
            var active = betBtns[0]
            var betBtn = betBtns[1]
            var lbl = betBtns[2]
            active.active = this.activeBet == i
            // console.log('lbl', lbl)
            lbl.getComponent(cc.Label).string = Helper.formatMoney2(this.data.cuoc*(i+1))
        }
    },
    initNhaCai() {
        console.log('initNhaCai');
        var players = this.data.players
        if(players.length > 0) {
            if(this.data.cai == Configs.Login.Nickname) {
                this.dealer.talk('Nhấn bắt đầu')
                this.nhacai = true
                this.start_btn.active = this.data.status == 0;
                //this.players[0] = this.players[0].getComponent('XocDia.Player');
                this.players[0].showNhaCai(true)
            } else {
                this.start_btn.active = false;
                // this.players[this.players.length - 1].showNhaCai(false)
            }
        }
    },
    initLogs() {
        console.log('initLogs',this.data);
        this.initSoiCau(this.data.history);
    },
    initSoiCau(data){
        console.log('initSoiCau',data);
        let list = [];
        let that = this;
        this.historyNode.resetDraw();
        if(data.length > 0) {
            data.slice().reverse()
            .forEach(function(item) {
                list.push(that.calculateSum(item));
            });            
        }
        console.log(list);
        this.historyNode.draw(list);
    },
    calculateSum(array) {
        return array.reduce((accumulator, value) => {
          return accumulator + value;
        }, 0);
    },    
    updateActive() {
        for (var i = 0; i < this.betBtns.length; i++) {
            var betBtns = this.betBtns[i].children
            var active = betBtns[0]
            active.active = this.activeBet == i
        }
    },
    onDestroy() {
        clearInterval(this.timeoutLacBat)
        clearTimeout(this.timeOutProgress)
        clearTimeout(this.timeOutStopProgress)
        
    },

    startCuoc(data) { //enable cuoc
        var that = this;
        this.data.status = 1;
        this.sessionLbl.string = '#'+data.session;
        this.start_btn.active = false;
        this.btnHuyLamCai.active = false;
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[9], false, 1);
        if(that.getSound())
            that.current = cc.audioEngine.play(that.audios[1], false, 1);        
        if(data.totalTime <= 4) {
            if(this.getSound())
                this.current = cc.audioEngine.play(this.audios[2], false, 1);
        } else {
            this.timeOutProgress = setTimeout(() => {
                if(that.getSound())
                    that.current = cc.audioEngine.play(that.audios[2], false, 1);
            }, (data.totalTime - 4) * 1000)
            this.timeOutStopProgress = setTimeout(() => {
                if(that.getSound())
                    that.current = cc.audioEngine.play(that.audios[14], false, 1);
            }, (data.time-2) * 1000)               
        }
        this.progress.onProgress(data.totalTime, 'CHỜ ĐẶT CƯỢC');
        this.progressCountdown(data.totalTime);
        this.clearChips();
        //this.lblMyBetChan.string = lblMyBetLe.string = '0';
        this.mybet_chan = this.mybet_le = 0;
        this.doorChan.interactable = this.doorLe.interactable = true;
        this.doorChan.node.getChildByName('active').active = this.doorLe.node.getChildByName('active').active = false;
        this.btn_mobat.active = false;
        this.doorChanThua.node.active = this.doorLeThua.node.active = false;
        this.doorChanThua.node.getComponentInChildren(cc.Label).string = this.doorLeThua.node.getComponentInChildren(cc.Label).string = "0";
        // this.bowl.animation = this.animName + ' up'
        this.dealer.talk('Bắt đầu đặt cửa');
        that.bowl.animation = 'lac bat';
        this.doorChan.node.getComponentInChildren(cc.Label).string = this.doorLe.node.getComponentInChildren(cc.Label).string = '0';
        this.showKickButton(false);
    },
    startCuocBu(data) {
        this.data.status = 5
        this.dealer.talk('Bắt đầu cược ngoài')
        console.log('Bắt đầu cược ngoài');
        console.log(data);
        this.bankerControl.node.active = false;
        if(data.user_mua_chanle.length > 0){
            console.log('showPanelPayDoor2');
            this.panelPayDoor.node.active = true;
            this.panelPayDoor.showMuaChanLe();

        }else{
            this.panelPayDoor.node.active = false;
        }
        this.popupNotEnoughMoney.dismiss();
        this.doorChanThua.node.active = this.doorLeThua.node.active = this.doorChanThua.interactable = this.doorLeThua.interactable = true;
        this.btn_mobat.active = this.data.cai != Configs.Login.Nickname && !this.players[9].isView.active;
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[11], false, 1);        
        this.progress.onProgress(data.totalTime, 'CƯỢC NGOÀI');
        this.progressCountdown(data.totalTime);
    },
    stopCanCuaOrSell(data) {
        this.dealer.talk('Đợi người chơi mua cửa')
        this.bankerControl.node.active = false
        this.panelPayDoor.node.active = true
        this.panelPayDoor.init(data, false)
        this.popupNotEnoughMoney.dismiss()
        this.progress.onProgress(data.totalTime, 'CHỜ MUA CỬA')
    },
    startCanCua(data) {
        this.dealer.talk('Đang cân cửa trả lại tiền')
        this.doorChan.interactable = this.doorLe.interactable = false
        this.doorChan.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.gold)
        this.doorLe.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.gold)
        this.doorChan.node.getChildByName('active').active = this.doorLe.node.getChildByName('active').active = false
        this.progress.onHide()
        //this.bankerControl.node.active = this.panelPayDoor.node.active = false
        this.bankerControl.node.active = false;
        var userTras = data.userTra
        for (var nick in userTras) {
            var gold = userTras[nick].gold
            var goldRefun = userTras[nick].goldRefun
            for (var i = 0; i < this.players.length; i++) {
                if(this.players[i].nickname == nick) {
                    if(this.getSound())
                        this.current = cc.audioEngine.play(this.audios[3], false, 1);
                    this.players[i].setCoin(gold)
                    this.players[i].showRefunCoin(goldRefun)
                }
            }
        }
    },
    startCanCuaTraVe(data) {
        var table = data.table;
        this.dealer.talk('Đang cân cửa trả lại tiền');
        this.doorChan.interactable = this.doorLe.interactable = false;
        //this.doorChan.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(table.tongCuocChan - table.tongMuaChan)
        //this.doorLe.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(table.tongCuocLe - table.tongMuaLe)
        this.doorChan.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(table.tongCuocChan);
        this.doorLe.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(table.tongCuocLe);   
        this.doorChan.node.getChildByName('active').active = this.doorLe.node.getChildByName('active').active = false;
        this.progress.onHide();
        this.bankerControl.node.active = this.panelPayDoor.node.active = false;
        var userTras = data.userTra;
        for (var nick in userTras) {
            var gold = userTras[nick].gold
            var goldRefun = userTras[nick].goldRefun
            for (var i = 0; i < this.players.length; i++) {
                if(this.players[i].nickname == nick) {
                    if(this.getSound())
                        this.current = cc.audioEngine.play(this.audios[3], false, 1);
                    this.players[i].setCoin(gold)
                    this.players[i].showRefunCoin(goldRefun)
                }
            }
        }
    },
    startCanCuaBtn(data) {
        this.dealer.talk('Đợi mở bát')
        this.btn_mobat.active = Configs.Login.Nickname == data.nick;
        this.progress.onProgress(data.totalTime);
    },
    startCanCuaDu(data) {
        this.dealer.talk('Đang cân cửa dư trả lại tiền');
        this.doorChanThua.interactable = this.doorLeThua.interactable = false;
        this.doorChanThua.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.gold);
        this.doorLeThua.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.gold);
        this.btn_mobat.active = false
        // this.doorChanThua.node.getChildByName('active').active = this.doorLeThua.node.getChildByName('active').active = false
        this.progress.onHide()
        //this.bankerControl.node.active = this.panelPayDoor.node.active = false;
        this.bankerControl.node.active = false;
        var userTras = data.userTra;
        for (var nick in userTras) {
            var gold = userTras[nick].gold;
            var goldRefun = userTras[nick].goldRefun;
            for (var i = 0; i < this.players.length; i++) {
                if(this.players[i].nickname == nick) {
                    if(this.getSound())
                        this.current = cc.audioEngine.play(this.audios[3], false, 1);
                    this.players[i].setCoin(gold);
                    this.players[i].showRefunCoin(goldRefun);
                }
            }
        }
    },
    showProgress(data) {
        this.progress.onProgress(data.totalTime, data.title);
    },
    showTimeCounter(data) {
        this.progressCountdown(data);
    },
    progressCountdown(timeleft) {
        return new Promise((resolve, reject) => {
           this.countdownTimer = setInterval(() => {
            try {
                timeleft--;
                this.lblTime.string = timeleft;
                this.lblTime.node.active = true;
                if (timeleft <= 0) {
                    //this.expireCodeData();
                    clearInterval(this.countdownTimer);
                    this.lblTime.node.active = false;
                    resolve(true);
                }
            } catch (error) {
                
            }
          }, 1000);
        });
    },       
    startCanCuaOrSell(data) {
        var gold = data.gold;
        this.dealer.talk('Chờ cái cân tất hoặc bán')
        this.progress.onProgress(data.totalTime, 'CHỜ')
        this.doorChan.interactable = this.doorLe.interactable = false
        this.doorChan.node.getChildByName('active').active = this.doorLe.node.getChildByName('active').active = false
        // this.progress.onHide()

        //if chu cai
        if(data.chu == Configs.Login.Nickname) { //show banker
            this.bankerControl.node.active = true;
            this.bankerControl.room_id = this.room_id;
            this.bankerControl.init(data);
        }
        
    },
    updateTien(data) {
        var players = data.players
        // for (var i = 0; i < this.players.length; i++) {
        //     this.players[i]
        // }
        for (var i = 0; i < players.length; i++) {
            var player = players[i]
            var gold = player.gold
            var nick = player.nick
            console.log('update nickkk', nick, gold)
            for (var j = 0; j < this.players.length; j++) {
                if(this.players[j].nickname == nick) {
                    console.log('this.players[j].nickname', this.players[j].nickname, nick, gold, i, j)
                    this.players[j].setCoin(gold)
                    break
                }
            }
        }
    },
    muaChanLe(data) {
        console.log("muaChanLe", data);
        console.log("cai:", this.data.cai);        
        if(this.getSound()){
            if(data.type == 0){ // Bán chẵn
                this.current = cc.audioEngine.play(this.audios[12], false, 1);   
            }else if(data.type == 1){// Bán lẻ
                this.current = cc.audioEngine.play(this.audios[13], false, 1);   
            }
        }
        this.progress.onProgress(data.totalTime, 'MUA CỬA')
        this.doorChan.interactable = this.doorLe.interactable = false
        this.doorChan.node.getChildByName('active').active = this.doorLe.node.getChildByName('active').active = false
        // this.progress.onHide()
        this.panelPayDoor.node.active = true;
        this.panelPayDoor.init(data,this.data.cai != Configs.Login.Nickname);

        if(data.countSell == 2) {
            this.popupAlert.show()
            this.popupAlert.init('Nhà cái không đủ khả năng để Cân cửa, bán Chẵn Lẻ được tiếp tục lần 2, nếu người chơi không mua thì hệ thống cân cửa trả tiền')
        }
        // console.log("muaChanLemuaChanLe", data.countSell)
    },
    muaChanLeOn(data) {
        console.log("muaChanLeOn", data);
        console.log("cai:", this.data.cai);
        this.doorChan.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.tongCuocChan)
        this.doorLe.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.tongCuocLe)
        this.doorChan.interactable = this.doorLe.interactable = false
        this.doorChan.node.getChildByName('active').active = this.doorLe.node.getChildByName('active').active = false
        // this.progress.onHide()
        this.panelPayDoor.node.active = true
        this.panelPayDoor.init(data, this.data.cai != Configs.Login.Nickname, false)
        this.panelPayDoor.addUserBuy(data)
        let player = this.getPlayer(data.nick);
        if (player != null) {
            player.setCoin(data.goldUser);            
        } 
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[15], false, 1);               
    },
    countDown(data) {
        var that = this
        console.log(data);
        // this.data.status = data.status
        
        // this.progress.onProgress(data.time / data.totalTime)
        

    }, 
    ketqua(data) {
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[10], false, 1);
        this.popupAlert.dismiss();
        this.popupNotEnoughMoney.dismiss();
        this.dealer.talk('Mở bát');
        this.data.status = 6;
        this.progress.node.active = this.bankerControl.node.active = this.panelPayDoor.node.active = this.btn_mobat.active = false;
        //this.historyNode.init(data.logs, data.tongChan, data.tongLe);
        this.initSoiCau(data.logs);
        var isChan = this.setBowlAnimation(data.dices);
        clearInterval(this.countdownTimer);
        this.lblTime.node.active = false;
        this.ketquaChip(data, isChan);
        // console.log('ketqua', data)
    },
    ketquaChip(data, isChan) {
        var doorWins = []
        if(isChan) {
            doorWins.push(0);
        } else {
            doorWins.push(1)
        }
        let chipsWithNickname = {};
        console.log('chipsInDoors', this.chipsInDoors)
        for (let k in this.chipsInDoors) {
            let doorId = parseInt(k);
            let chips = this.chipsInDoors[doorId];
            if (doorWins.indexOf(doorId) == -1) {
                var btnPayBet = isChan ? this.doorChan : this.doorLe
                let position = btnPayBet.node.position.clone();
                position.y -= 10;
                let positionAdd = position.clone();
                for (let i = 0; i < chips.length; i++) {
                    chips[i].runAction(cc.moveTo(0.5, position).easing(cc.easeSineOut()));
                }
                this.scheduleOnce(() => {
                    let node = new cc.Node();
                    node.parent = this.chips;
                    node.opacity = 0;
                    for (let i = 0; i < chips.length; i++) {
                        chips[i].parent = node;
                        chips[i].position = positionAdd;
                        positionAdd.y += 3;
                    }
                    node.runAction(cc.sequence(
                        cc.fadeIn(0.1),
                        cc.delayTime(0.3),
                        cc.spawn(
                            cc.scaleTo(0.5, 0),
                            cc.moveTo(0.5, this.dealerHandPoint.position)
                        ),
                        cc.fadeOut(0.1),
                        cc.callFunc(() => {
                            for (let i = 0; i < chips.length; i++) {
                                chips[i].parent = this.chips;
                                chips[i].opacity = 255;
                                chips[i].active = false;
                            }
                            node.destroy();
                        })
                    ))
                }, 0.8);
            } else {
                for (let i = 0; i < chips.length; i++) {
                    let chip = chips[i];
                    let nickname = chip.name;
                    if (!chipsWithNickname.hasOwnProperty(nickname)) {
                        chipsWithNickname[nickname] = [];
                    }
                    chipsWithNickname[nickname].push(chip);
                }
            }
        }

        this.scheduleOnce(() => {
            for (let k in chipsWithNickname) {
                let player = this.getPlayer(k);
                if (player != null) {
                    let chips = chipsWithNickname[k];
                    let positionAdd = player.chipsPoint.position.clone();
                    let positionAdd2 = player.chipsPoint2.position.clone();
                    for (let i = 0; i < chips.length; i++) {
                        let chip = chips[i];
                        chip.runAction(cc.sequence(
                            cc.moveTo(0.5, positionAdd).easing(cc.easeSineOut()),
                            cc.delayTime(1 + (chips.length * 0.03 - i * 0.03)),
                            cc.moveTo(0.5, player.node.position).easing(cc.easeSineOut()),
                            cc.callFunc(() => {
                                chip.active = false;
                            })
                        ));

                        let dealerChip = this.getChip(0);
                        dealerChip.getComponent(cc.Sprite).spriteFrame = chip.getComponent(cc.Sprite).spriteFrame;
                        dealerChip.opacity = 0;
                        dealerChip.position = this.dealerHandPoint.position;
                        dealerChip.runAction(cc.sequence(
                            cc.delayTime(0.5),
                            cc.fadeIn(0.2),
                            cc.moveTo(0.5, positionAdd2).easing(cc.easeSineOut()),
                            cc.delayTime(0.3 + (chips.length * 0.03 - i * 0.03)),
                            cc.moveTo(0.5, player.node.position).easing(cc.easeSineOut()),
                            cc.callFunc(() => {
                                dealerChip.active = false;
                            })
                        ));

                        positionAdd.y += 3;
                        positionAdd2.y += 3;
                    }
                }
            }
        }, 1.5);

        // this.scheduleOnce(() => {
        //     for (let i = 0; i < res.playerInfoWin.length; i++) {
        //         let playerData = res.playerInfoWin[i];
        //         let player = this.getPlayer(playerData["nickname"]);
        //         if (player != null) {
        //             player.showWinCoin(playerData["moneyWin"]);
        //             player.setCoin(playerData["currentMoney"]);
        //         }
        //     }
        //     BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
        // }, 3);
    },
    setBowlAnimation(dices) {
        var dem = this.demKq(0, dices)
        this.animName = ''
        var isChan = false
        if(dem == 0) {
            this.animName = '4 trang'
            isChan = true
        } else if(dem == 1) {
            this.animName = '3 trang 1 do'
        } else if(dem == 2) {
            this.animName = '2 trang 2 do'
            isChan = true
        } else if(dem == 3) {
            this.animName = '3 do 1 trang'
        } else {
            this.animName = '4 do'
            isChan = true
        }
        this.bowl.animation = this.animName + ' mo'
        this.scheduleOnce(() => {
            if(isChan) {
                this.doorChan.node.getChildByName('active').active = true
            } else {
                this.doorLe.node.getChildByName('active').active = true
            }
        }, 0.5);
        return isChan
    },
    demKq(value, kq) {
        var count = 0
        for (var i = 0; i < kq.length; i++) {
            if(kq[i] == value) {
                count++
            }
        }
        
        return count
    },
    getChip(bet) {
        let ret = null;
        for (let i = 0; i < this.listChip.length; i++) {
            if (!this.listChip[i].active) {
                ret = this.listChip[i];
                break;
            }
        }
        if (ret == null) {
            ret = cc.instantiate(this.chipTemplate);
            ret.parent = this.chips;
            ret.parent.active = true
            this.listChip.push(ret);
        }
        let chipIdx = bet;
        
        // chipIdx -= this.pageBet * this.betIdx;
        ret.getComponent(cc.Sprite).spriteFrame = this.sprChipSmalls[chipIdx];
        ret.opacity = 255;
        ret.active = true;
        ret.setSiblingIndex(this.chips.childrenCount - 1);
        return ret;
    },
    clearChips() {
        this.chipTemplate.active = false;
        for (let i = 0; i < this.listChip.length; i++) {
            this.listChip[i].active = false;
        }
        this.chipsInDoors = {};
    },
    getPlayer(nickname) {
        console.log("getPlayer: " + nickname);
        for (let i = 0; i < this.players.length; i++) {
            let player = this.players[i];
            if (player.nickname != "" && player.nickname == nickname) return player;
        }
        return null;
    },
    leaveRoom(data) {
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[0], false, 1);
        this.backDrop.active = false;
        if(!data.nick || data.nick == Configs.Login.Nickname) { //minh out room
            clearInterval(this.timeoutLacBat)
            this.lobby.active = true;
            this.node.active = false;
            //this.controller.getComponent('XocDiaMulti.Controller').startSound();
            cc.InXocGame.startSound();
            cc.InXocGame.callUpdateXocCoin();
            //BroadcastReceiver.send(BroadcastReceiver.USER_UPDATE_COIN);
        } else { //user khac out room
            for (var i = 0; i < this.players.length; i++) {
                if(this.players[i].nickname == data.nick) {
                    this.players[i].hideInfo()
                }
            }
        }
        this.popupListUser.getComponent('XocDiaMulti.PopupListUser').hidePLayer(data.nick);
        this.removePlayInArray(data.nick);
        this.nguoichoi.getComponentInChildren(cc.Label).string = Helper.formatMoney((this.data.players.length));
        
    },
    removePlayInArray(nick){
        for (var i = 0; i < this.data.players.length; i++) {
            if(this.data.players[i].nick == nick) {
                this.data.players.splice(i,1);
            }
        }
    },
    onCuoc(data) {
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[8], false, 1);
        console.log('onCuoc',data)
        this.doorChan.interactable = this.doorLe.interactable = true
        // console.log("this.doorChan.node.getChildByName('lblTotalBet').getComponent(cc.Label)", Helper.formatMoney(data.tongCuocChan))
        this.doorChan.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.tongCuocChan)
        this.doorLe.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.tongCuocLe)
        var btnPayBet = data.position == 0 ? this.doorChan : this.doorLe;
        let player = this.getPlayer(data.nick);
        if(data.nick == Configs.Login.Nickname){
            if(data.position == 0){
                this.mybet_chan+= parseInt(data.tiencuoc);
                this.lblMyBetChan.string = Helper.formatMoney(this.mybet_chan);
            }else{
                this.mybet_le+= parseInt(data.tiencuoc);
                this.lblMyBetLe.string = Helper.formatMoney(this.mybet_le);
            }
        }
        console.log('player onCuoc', player, data.nick)
        if (player != null) {
            player.setCoin(data.gold);
            
            let chip = this.getChip(data.bet);
            chip.name = player.nickname;
            chip.position = player.node.position;
            if (!this.chipsInDoors.hasOwnProperty(data.position)) {
                this.chipsInDoors[data.position] = [];
            }
            this.chipsInDoors[data.position].push(chip);

            let position = btnPayBet.node.position.clone();
            position.x += Helper.getRandom(-btnPayBet.node.width / 2 + 60, btnPayBet.node.width / 2 - 60);
            position.y += Helper.getRandom(-btnPayBet.node.height / 2 + 100, btnPayBet.node.height / 2 - 30);
            chip.runAction(cc.moveTo(0.5, position).easing(cc.easeSineOut()));
        }
    },
    onCuocThua(data) {
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[8], false, 1);
        console.log('onCuocThua',data)
        this.doorChanThua.interactable = this.doorLeThua.interactable = true
        // console.log("this.doorChan.node.getChildByName('lblTotalBet').getComponent(cc.Label)", Helper.formatMoney(data.tongCuocChan))
        this.doorChanThua.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.tongCuocChan)
        this.doorLeThua.node.getComponentInChildren(cc.Label).string = Helper.formatMoney(data.tongCuocLe)
        
        var btnPayBet = data.position == 0 ? this.doorChanThua : this.doorLeThua
        let player = this.getPlayer(data.nick);
        console.log('plaerrrrrrrrr', player, data.nick)
        if (player != null) {
            player.setCoin(data.gold);
            
            let chip = this.getChip(data.bet);
            chip.name = player.nickname;
            chip.position = player.node.position;
            if (!this.chipsInDoors.hasOwnProperty(data.position)) {
                this.chipsInDoors[data.position] = [];
            }
            this.chipsInDoors[data.position].push(chip);

            let position = btnPayBet.node.position.clone();
            position.x += Helper.getRandom(-btnPayBet.node.width / 2 + 60, btnPayBet.node.width / 2 - 60);
            position.y += Helper.getRandom(-btnPayBet.node.height / 2 + 100, btnPayBet.node.height / 2 - 30);
            chip.runAction(cc.moveTo(0.5, position).easing(cc.easeSineOut()));
            
        }
    },
    actBtnMenu() {
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[4], false, 1);
        // this.panelMenu.active = true
    },
    actClosePanel() {
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[4], false, 1);
        // this.panelMenu.active = false
    },
    actHelp() {

    },
    actSetting() {

    },
    actLeaveRoom() {
        var that = this
        // if(this.getSound())
        //     this.current = cc.audioEngine.play(this.audios[0], false, 1);
        this.popupConfirm.show()
        this.popupConfirm.init('Bạn có muốn thoát khỏi?', () => {
            that.backDrop.active = true
            var data = {
                room_id: that.room_id,
                token: Configs.Login.tokenXoc
            }
            Network.getInstance().send('XocDia', {event: 'leaveRoom', data: data});
             //that.lobby.active = true
             //that.playNode.active = false;
        })
    },
    actMoBat() {
        if(this.data.status != 5) {
            this.popupAlert.show()
            this.popupAlert.init('Lỗi')
            return
        }
        this.btn_mobat.active = false
        var data = {
            event: 'mobat', 
            data: {
                room_id: this.room_id,
                token: Configs.Login.tokenXoc
            }
        }

        Network.getInstance().send('XocDia', data)
    },
    actBet(event, position) {//active bet cuoc
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[4], false, 1);
        this.activeBet = parseInt(position)
        this.updateActive()
    },
    actBetDor(event, position) {//position = 0: chan, 1: le
        var that = this
        // if(this.nhacai) {
        //     this.popupAlert.show()
        //     this.popupAlert.init('Nhà cái không được cược')
        //     return
        // }
        // console.log(event)

        if(this.data.status == 1) {
            console.log('position', position == 0?'chan':'le')
            var cuoc = this.data.cuoc*(this.activeBet + 1)
            //if(Configs.Login.CoinXoc >= cuoc) {
                Configs.Login.CoinXoc -= cuoc
                console.log('cuoc', cuoc)
                this.doorChan.interactable = this.doorLe.interactable = false
                var data = {
                    event: 'cuoc', 
                    data: {
                        room_id: that.room_id,
                        position: position, 
                        bet: this.activeBet,
                        token: Configs.Login.tokenXoc,
                        callNum: Helper.getRandom(10000, 9999999)
                    }
                }

                Network.getInstance().send('XocDia', data, (error, msg) => {
                    Configs.Login.CoinXoc += cuoc
                    that.doorChan.interactable = that.doorLe.interactable = true
                    // console.log('cuoc errrorrrr', error, msg)
                })
            // } else {
            //     this.popupNotEnoughMoney.show()
            //     this.popupNotEnoughMoney.init('Không đủ tiền', () => {
            //         that.popupCoinTransfer.show()
            //     })
            //     return
            // }

        }
    },
    actBetDorDu(event, position) {//position = 0: chan, 1: le
        var that = this
        // if(this.nhacai) {
        //     this.popupAlert.show()
        //     this.popupAlert.init('Nhà cái không được cược')
        //     return
        // }
        // console.log(event)

        if(this.data.status == 5) {
            console.log('position', position == 0?'chan':'le')
            var cuoc = this.data.cuoc*(this.activeBet + 1)
            // if(Configs.Login.CoinXoc >= cuoc) {
                Configs.Login.CoinXoc -= cuoc
                console.log('cuoc', cuoc)
                this.doorChan.interactable = this.doorLe.interactable = false
                var data = {
                    event: 'cuocdu', 
                    data: {
                        room_id: that.room_id,
                        position: position, 
                        bet: this.activeBet,
                        token: Configs.Login.tokenXoc,
                        callNum: Helper.getRandom(10000, 9999999)
                    }
                }

                Network.getInstance().send('XocDia', data, (error, msg) => {
                    Configs.Login.CoinXoc += cuoc
                    that.doorChan.interactable = that.doorLe.interactable = true
                    // console.log('cuoc errrorrrr', error, msg)
                })
            // } else {
            //     this.popupNotEnoughMoney.show()
            //     this.popupNotEnoughMoney.init('Không đủ tiền', () => {
            //         that.popupCoinTransfer.show()
            //     })
            //     return
            // }

        }
    },
    xinLamCai(data) {
        console.log('xinLamCai', data);
        console.log('Configs.Login.Nickname', Configs.Login.Nickname);
        if(data.oldCai != Configs.Login.Nickname){
            this.data.players.splice(0,1);
            this.players[0].hideInfo();
            this.btnXinLamCai.active = true;
            this.vaoban_btn.active = false;
            this.popupAlert.show();
            this.popupAlert.init(data.msg);
        }else{
            this.btnHuyLamCai.active = false;
        }
    },
    actHuyLamCai(data) {
        var data = {
            event: 'huyLamCai', 
            data: { 
                room_id: this.room_id, 
                token: Configs.Login.tokenXoc, 
                callNum: Helper.getRandom(100000, 9999999)
            }
        }
        Network.getInstance().send('XocDia', data, (error, msg) => {
            //event.target.active = true
        })
    },    
    joinRoom(data, user) {
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[0], false, 1);
        this.data = data

        if(user.isView)
            return
        console.log("JoinRoom:"+user.nick);
        this.nguoichoi.getComponentInChildren(cc.Label).string = Helper.formatMoney((this.data.players.length))
        for (var i = 0; i < this.players.length; i++) {
            this.players[i] = this.players[i].getComponent('XocDia.Player')
            if(!this.players[i].nickname) {
                this.players[i].init(user, user.isView, false);
                this.players[i].showKichBtn(data.status == 0);
                break;
            }
        }
    },
    actStartRoom(event) {
        console.log('act start', event)
        //event.target.active = false
        var data = {
            room_id: this.room_id,
            token: Configs.Login.tokenXoc,
            callNum: Helper.getRandom(100000, 9999999)
        }
        Network.getInstance().send('XocDia', {event: 'startRoom', data: data}, () => {
            //event.target.active = true
        })
    },
    actCanCua() {

    },
    actBanChanLe() {

    },
    actVaoBan(event) {
        // if(this.getSound())
        //     this.current = cc.audioEngine.play(this.audios[9], false, 1);
        // if(this.data.password) {
        //     this.popupPassword.show()
        //     this.popupPassword.init(this.data)
        //     return
        // }
        event.target.active = false;
        var data = {
            event: 'joinRoomView', 
            data: { 
                room_id: this.room_id, 
                token: Configs.Login.tokenXoc, 
                callNum: Helper.getRandom(100000, 9999999)
            }
        }
        Network.getInstance().send('XocDia', data, (error, msg) => {
            event.target.active = true;
        })
    },
    refeshCai(data) {
        this.data = data.table
        this.vaoban_btn.active = false;
        this.initNhaCai()
        this.initPlayers()
    },
    actXinLamCai(event) {
        if(this.getSound())
            this.current = cc.audioEngine.play(this.audios[9], false, 1);
        event.target.active = false
        var data = {
            event: 'xinLamCai', 
            data: { 
                room_id: this.room_id, 
                token: Configs.Login.tokenXoc, 
                callNum: Helper.getRandom(100000, 9999999)
            }
        }
        Network.getInstance().send('XocDia', data, (error, msg) => {
            event.target.active = true
        })
    },
    showChat() {
        this.panelChat.node.active = true
        this.panelChat.room_id = this.room_id
    },
    actShowTransfer() {
        console.log('show transfer', this.data, Configs.Login.Nickname)
        if(this.data.cai == Configs.Login.Nickname) {
            this.popupCoinTransfer.show()
        }
    },
    actShowRule() {
        this.popupRule.active = true;
    },

    actShowListUser() {
        this.popupListUser.active = true;
    },    
    
    actHideRule() {
        this.popupRule.active = false;
    }    

    // update (dt) {},
});
