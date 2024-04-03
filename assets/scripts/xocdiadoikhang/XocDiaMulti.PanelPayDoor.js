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
        panelPayDoor1: cc.Node,
        panelPayDoor2: cc.Node,
        title1: cc.Label,
        title2: cc.Label,
        lblCoin: cc.Label,
        slider: cc.Slider,
        scrollView: cc.ScrollView

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
    init(data, isShowPayPanel = true, isRemove = true) {
        this.room_id = data.room_id
        if(data.gold) {
            this.gold = data.gold
            this.lblCoin.string = Helper.formatMoney(data.gold);
        }
        this.title1.string = 'BÁN ' + (data.type == 0 ? 'CHẴN' : 'LẺ')+': '+Helper.formatMoney(data.gold);
        this.title2.string = 'MUA ' + (data.type == 0 ? 'CHẴN' : 'LẺ');
        this.slider.progress = 1;
        this.panelPayDoor2.active = isShowPayPanel;

        console.log('panelPayDoor', data);
        if(data.gold == 0 || data.cai == Configs.Login.Nickname)
            this.panelPayDoor2.active = false;

        this.content = this.scrollView.content;
        if(!this.item && this.content.children[0]) {
            this.item = this.content.children[0];
        }
        if(isRemove) {
            this.content.removeAllChildren();
        }
        
    },
    showMuaChanLe() {
        this.panelPayDoor1.active = true;
        this.panelPayDoor2.active = false;
    },    
    start () {

    },
    addUserBuy(data) {
        var item = cc.instantiate(this.item);
        item.getChildByName('lblNickname').getComponent(cc.Label).string = data.nick;
        item.getChildByName('lblCoin').getComponent(cc.Label).string = Helper.formatMoney(data.goldBuy);
        this.content.addChild(item);
    },
    actSlider(event) {
        console.log('this.gold * event.progress', this.gold * parseFloat(event.progress).toFixed(1));
       this.lblCoin.string = Helper.formatMoney(parseInt(this.gold * parseFloat(event.progress).toFixed(1)));
    },
    actBuy() {
        var that = this
        this.node.active = false
        var gold = Math.abs(this.gold) * parseFloat(this.slider.progress).toFixed(1);

        console.log('gold buyy', gold)
        var data = {
            event: 'muaChanLe', 
            data: {
                room_id: this.room_id,
                gold: gold,
                token: Configs.Login.tokenXoc,
                callNum: Helper.getRandom(10000, 9999999)
            }
        }
        Network.getInstance().send('XocDia', data, (error, msg) => {
            that.node.active = true
        })
    }
    // update (dt) {},
});
