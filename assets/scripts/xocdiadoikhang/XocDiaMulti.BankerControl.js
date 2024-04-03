// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Helper = require('Vs.Helper')
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
cc.Class({
    extends: cc.Component,

    properties: {
        caicanBtn: cc.Button,
        banChanBtn: cc.Button,
        banLeBtn: cc.Button,
        panelSell: cc.Node,
        titlePanel: cc.Label,
        lblCoin: cc.Label,
        slider: cc.Slider
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

    // onLoad () {},
    init(data) {
        console.log('init banker', data)
        this.panelSell.active = false
        this.gold = data.gold
        // if(gold < 0) {
        //     this.banChanBtn.interactable = false
            this.banLeBtn.interactable = this.banChanBtn.interactable = true
        // } else {
        //     this.banChanBtn.interactable = true
        //     this.banLeBtn.interactable = false
        // }
        // this.titlePanel.string = 'BÁN ' + (gold > 0 ? 'CHẴN' : 'LẺ')
    },
    showPanel(position) {
        this.position = parseInt(position)
        this.titlePanel.string = 'BÁN ' + (position == 0 ? 'CHẴN' : 'LẺ')
        this.panelSell.active = true
        this.slider.progress = 1
        this.lblCoin.string = Helper.formatMoney(this.gold[position])
    },
    start () {
    },
    onChangeSlide(event) {
        console.log('progress', parseFloat(event.progress).toFixed(1))
        this.lblCoin.string = Helper.formatMoney(parseInt(Math.abs(this.gold[this.position]) * parseFloat(event.progress).toFixed(1)))
    },
    actSell(event) { //0 sell chan 1 sell le
        var that = this
        var gold = Math.abs(this.gold[this.position]) * parseFloat(this.slider.progress).toFixed(1)
        // console.log('gold selll', gold)
        var data = {
            event: 'banChanLe', 
            data: {
                room_id: this.room_id,
                gold: gold,
                token: Configs.Login.tokenXoc,
                type: this.position,
                callNum: Helper.getRandom(10000, 9999999)
            }
        }
        this.node.active = this.panelSell.active = false
        console.log('this.node', this.node.active)
        Network.getInstance().send('XocDia', data, (error, msg) => {
            that.panelSell.parent.active = true
            console.log('banChanLe Errrrrrrrr', msg)
        })
    },
    actSellBtn(event, position) {//0 chan 1 le
        console.log('position', position, this.gold, this.gold[position])
        if(this.gold[position] <= 0) {
            return
        }
        this.showPanel(position)
    },
    actCloseSellBtn(event) {//0 chan 1 le
        this.panelSell.active = false
    },
    actCanTat() {
        this.node.active = false
        var data = {
            event: 'canTat', 
            data: {
                room_id: this.room_id,
                token: Configs.Login.tokenXoc
            }
        }
        Network.getInstance().send('XocDia', data)
    }

    // update (dt) {},
});
