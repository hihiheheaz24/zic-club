// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// import Dialog from "./Dialog";
var Dialog = require('Dialog2')
import Network from "../xocdiadoikhang/networks/XocDiaNetworkClient";
cc.Class({
    extends: Dialog,

    properties: {
        msg: cc.RichText
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
    onDestroy() {
        clearInterval(this.timeOut)
    },
    onEnable() {
        this.node.active = true
        clearInterval(this.timeOut)
        var that = this
        
        let time = 5
        this.msg.string = 'Mất kết nối tới máy chủ\nTự động kết nối sau ' + time + 's'
        this.timeOut = setInterval(() => {
            time--
            that.msg.string = 'Mất kết nối tới máy chủ\nTự động kết nối sau ' + time + 's'
            if(time <= 0) {
                that.actConnect()
            }
        }, 1000)
        
    },
    start () {

    },
    actOk() {
        // this.dismiss()
    },
    actCancel() {
        this.dismiss()
    },
    actConnect() {
        clearInterval(this.timeOut)
        this.dismiss()
        Network.getInstance().connect()
    }

    // update (dt) {},
});
