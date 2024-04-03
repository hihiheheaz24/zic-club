// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Helper = require('./Vs.Helper')
cc.Class({
    extends: cc.Component,

    properties: {
        scroll: cc.ScrollView,
        label: cc.Label,
        backdrop: cc.Node
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
        this.layout = this.scroll.content
        this.backdrop.width = cc.winSize.width * 2
        this.backdrop.height = cc.winSize.height * 2
    },

    start () {

    },
    init(list, callback) {

        for (let i = 0; i < list.length; i++) {
            let value = list[i]
            var newNode = cc.instantiate(this.layout.children[0])
            var label = newNode.getChildByName('label')
            if(!isNaN(value)) {
                label.getComponent(cc.Label).string = Helper.formatMoney(value)
            } else {
                label.getComponent(cc.Label).string = value
            }
            newNode.on('click', () => {
                this.actClose()
                this.label.string = !isNaN(value) ? Helper.formatMoney(value) : value
                callback(i)
            })
            this.layout.addChild(newNode)
        }
        this.layout.children[0].destroy()
    },
    // onSelect(index) {

    // },
    actClose() {
        this.scroll.node.active = this.backdrop.active = false
    },
    actToggle() {
        // console.log('xxxxx', this.scroll.active)
        this.scroll.node.active = this.backdrop.active = !this.scroll.node.active
    }

    // update (dt) {},
});
