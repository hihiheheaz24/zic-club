// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Helper = require('Vs.Helper')
var PopupAlert = require('Vs.PopupAlert')
var Dialog = require('Dialog2')
import Configs from "./common/ConfigsXoc";
// var Dialog = require('Dialog')
// import Dialog from "../../../scripts/common/Dialog";

cc.Class({
    extends: cc.Component,
    properties: {
        players: [cc.Node],
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    onEnable() {
        this.data = cc.PlayXocGame.data;
        this.initPlayers();
     },

    start () {
    },

    initPlayers() {
        console.log('initPlayers', cc.PlayXocGame.data.players.length);
        //console.log('initPlayers data', this.data);
        if(this.data.players.length <= 0)
            return
        var players = this.data.players
        var ghe = 0
        for (var i = 0; i < this.players.length; i++) {
            this.players[i] = this.players[i].getComponent('XocDia.Player');
            this.players[i].nickname = undefined;
            this.players[i].hideInfo()
        }
        
        //loop players
        for (var i = 0; i < players.length; i++) {
            if(Configs.Login.Nickname == players[i].nick) {
                continue;
            }
            if(players[i].isView)
                continue;
            if(ghe > 8) {
                continue
            }

            if(!this.players[ghe].nickname) {
                this.players[ghe].init(players[i], false, i==0)
                if(this.data.status == 0 && this.data.cai == Configs.Login.Nickname){
                    this.players[ghe].showKichBtn(true);
                }
                ghe++
            }
        }
        
    },  
    
    hidePLayer(nick){
        for (var i = 0; i < this.players.length; i++) {
            if(this.players[i].nickname){
                if(this.players[i].nickname == nick){
                    this.players[i].hideInfo()
                } 
            }           
        }
    },
    
    actClose() {
        this.node.active = false;
    }
    // update (dt) {},
});
