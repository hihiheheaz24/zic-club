// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

var Helper = require('Vs.Helper')
var PopupAlert = require('Vs.PopupAlert')
var Dialog = require('Dialog2')
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
// var Dialog = require('Dialog')
// import Dialog from "../../../scripts/common/Dialog";

cc.Class({
    extends: Dialog,

    properties: {
        room_input: cc.EditBox,
        password_input: cc.EditBox,
        popupAlert: PopupAlert,
        backDrop: cc.Node,

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

    start () {
    },
    
    actJoinRoom() {
        var that = this;
        var room_id = parseInt(this.room_input.string);
        var password = this.password_input.string;
        if(room_id <= 0) {
            this.popupAlert.show()
            this.popupAlert.init('Số phòng không đúng')
            return
        }
        this.backDrop.active = true
        this.dismiss()
        var data = {
            room_id: room_id,
            password,
            token: Configs.Login.tokenXoc,
            callNum: Helper.getRandom(100000, 9999999)
        }
        
        Network.getInstance().send('XocDia', {event: 'joinRoom', data: data}, (err, msg) => {
            that.popupAlert.show()
            that.popupAlert.init(msg)
            return
        })
    },
    actClose() {
        this.node.active = false
    }
    // update (dt) {},
});
