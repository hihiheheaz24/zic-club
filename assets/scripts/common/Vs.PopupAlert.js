// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
// import Dialog from "./Dialog";
var Dialog = require('Dialog2')
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
    init(msg, callback) {
        this.msg.string = msg
        if(callback)
            this.callback = callback
    },
    start () {

    },
    actOk() {
        this.dismiss()
        this.callback()
    },
    actCancel() {
        this.dismiss()
    }

    // update (dt) {},
});
