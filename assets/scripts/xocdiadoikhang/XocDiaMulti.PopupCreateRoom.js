// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Select = require('Vs.Select')
var Helper = require('Vs.Helper')
var PopupAlert = require('Vs.PopupAlert')
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
var Dialog = require('Dialog2')
// var Dialog = require('Dialog')
// import Dialog from "../../../scripts/common/Dialog";
cc.Class({
    extends: Dialog,
    properties: {
        player_input: cc.EditBox,
        password_input: cc.EditBox,
        cuoc: Select,
        note: cc.RichText,
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
        var that = this
        this.chonCuoc = 0
        this.listCuoc = [10000,100000, 200000,500000,1000000,5000000, 10000000, 50000000]
        this.cuoc.init(this.listCuoc, (position) => {
            that.chonCuoc = position
            that.updateNote()
            console.log('chonCuoc', that.chonCuoc)
        })
        this.updateNote()
    },
    updateNote() {
        this.note.string = '<i>Cần <color=#F5FF00>'+Helper.formatMoney(this.listCuoc[this.chonCuoc]*10)+'</color> để tạo phòng</i>'
    },
    actCreateRoom() {
        var max_player = parseInt(this.player_input.string)
        var password = this.password_input.string
        var cuoc = parseInt(this.listCuoc[this.chonCuoc])

        if(cuoc * 10 > Configs.Login.CoinXoc) {
            this.popupAlert.show()
            this.popupAlert.init('Số dư không đủ, vui lòng nạp thêm')
            return
        }

        this.backDrop.active = true
        this.dismiss()
        var data = {
            cuoc: cuoc,
            max_player: max_player,
            password: password,
            token: Configs.Login.tokenXoc
        }
        Network.getInstance().send('XocDia', {event: 'createRoom', data: data})
    },
    actClose() {
        this.node.active = false
    }
    // update (dt) {},
});
