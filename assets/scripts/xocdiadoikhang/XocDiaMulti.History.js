// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Helper = require('Vs.Helper')
cc.Class({
    extends: cc.Component,

    properties: {
        lblChan: cc.Label,
        lblLe: cc.Label,
        items: cc.Node,
        sprChan: cc.SpriteFrame,
        sprLe: cc.SpriteFrame,
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
    init(data, tongChan, tongLe) {
        var children = this.items.children
        
        for (var i = 0; i < children.length; i++) {
            if(data[i]) {
                var item = data[i]
                var dem = this.demKq(0, item)
                children[i].getComponent(cc.Sprite).spriteFrame = (dem == 0 || dem == 2 || dem == 4) ? this.sprChan : this.sprLe
                children[i].active = true
                
            } else {
                children[i].active = false
            }
        }
        this.lblChan.string = Helper.formatMoney(tongChan) + ''
        this.lblLe.string = Helper.formatMoney(tongLe) + ''
    },
    demKq(value, kq) {
        var count = 0
        for (var i of Object.keys(kq)) {
            if(kq[i] == value) {
                count++
            }
        }
        return count
    },
    start () {

    },

    // update (dt) {},
});
