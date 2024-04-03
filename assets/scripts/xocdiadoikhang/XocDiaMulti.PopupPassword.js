// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var PopupAlert = require('Vs.PopupAlert')
var Dialog = require('Dialog2')
// var Dialog = require('Dialog')
// import Dialog from "../../../scripts/common/Dialog";
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
cc.Class({
    extends: Dialog,

    properties: {
        password_input: cc.EditBox,
        popupAlert: PopupAlert
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
        this.data = data;
        console.log(data);
    },
    start () {

    },
    actJoinRoom() {
        var password = this.password_input.string
        if(!password) {
            this.popupAlert.show()
            this.popupAlert.init('Vui lòng nhập mật khẩu')
            return
        }
        this.dismiss()
        Network.getInstance().send('XocDia', {event: 'joinRoom', data: { room_id: this.data.id, password: password, token: Configs.Login.tokenXoc}})
    }

    // update (dt) {},
});
