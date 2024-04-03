// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var PopupAlert = require('Vs.PopupAlert')
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
cc.Class({
    extends: cc.Component,

    properties: {
        bg: cc.Node,
        input_chat: cc.EditBox,
        popupAlert: PopupAlert,
        layout: cc.Node,
        chatTemplate: cc.Node,
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

    onLoad () {
        this.chatTemplate.active = false
        for (let i = 0; i < this.layout.children.length; i++) {
            var child = this.layout.children[i]
            child.on('click', () => {
                var data = {
                    room_id: this.room_id,
                    token: Configs.Login.tokenXoc,
                    msg: i
                }
                Network.getInstance().send('XocDia', {event: 'chat_emoj', data: data})
                this.actClose()
            })
        }
    },
    onEnable() {
        console.log('onEnable')
        this.bg.x = (cc.winSize.width + this.bg.width + 100) / 2
        cc.tween(this.bg)
        .to(0.2, {x: (cc.winSize.width - this.bg.width - 100) / 2})
        .start()
    },
    start () {

    },
    actSendChat() {
        var msg = this.input_chat.string;
        if(msg.length <= 1) {
            this.popupAlert.show();
            this.popupAlert.init('Độ dài quá ít');
            return;
        }
        if(msg.length >= 30) {
            this.popupAlert.show();
            this.popupAlert.init('Không được quá 30 kí tự');
            return;
        }

        var data = {
            room_id: this.room_id,
            token: Configs.Login.tokenXoc,
            msg: msg
        };
        Network.getInstance().send('XocDia', {event: 'chat', data: data});
        this.input_chat.string = ''
        // this.actClose()
    },
    actClose() {
        cc.tween(this.bg)
        .to(0.2, {x: (cc.winSize.width + this.bg.width + 100) / 2})
        .call(() => {
            this.node.active = false
        })
        .start();
    },
    actShowEmoj() {
        this.layout.active = !this.layout.active;
    },
    onChat(data) {
        if(data.type == 1)
            return
        var newItem = cc.instantiate(this.chatTemplate);
        newItem.active = true;
        var layout = this.scrollView.content;
        newItem.getComponent(cc.RichText).string = '<color=#FFFF00>' + data.nick + '</color>' + ': ' + data.msg;
        layout.addChild(newItem);

    }

    // update (dt) {},
});
