// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        msg: cc.Label
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
    show() {
        this.node.active = true
    },
    onEnable() {
        clearTimeout(this.timeoutExit)
        var that = this
        this.node.y = 230
        this.node.opacity = 0

        cc.tween(this.node)
        .to(0.3, {y: 180, opacity: 255})
        .call(() => {
            this.timeoutExit = setTimeout(() => {
                that.exitAlert()
            }, 2000)
        })
        .start()
    },
    onDestroy() {
        clearTimeout(this.timeoutExit)
    },
    init(msg) {
        this.msg.string = msg
    },
    exitAlert() {
        cc.tween(this.node)
        .to(0.3, {y: 230, opacity: 0})
        .call(() => {
            this.node.active = false
        })
        .start()
    },
    start () {

    },

    // update (dt) {},
});
