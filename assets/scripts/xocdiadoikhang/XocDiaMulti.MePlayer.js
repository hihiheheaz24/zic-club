var Configs = require('Configs')

var Helper = require('Vs.Helper')
cc.Class({
    extends: cc.Component,

    properties: {
        avatar: cc.Sprite,
        lblUsername: cc.Label,
        lblCoin: cc.Label,
        refunCoin: cc.Animation,
        lblRefunCoin: cc.Label,
        winCoin: cc.Animation,
        lblWinCoin: cc.Label,
        icon: cc.Node,
        

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
    init() {
        this.lblUsername.string = Configs.Username
        this.lblCoin.string = Helper.formatMoney(Math.floor(Configs.CoinXoc))
        this.refunCoin.node.active = this.winCoin.node.active = false
    },
    showNhaCai(isShow) {
        this.icon.active = isShow
    },
    onDestroy() {
        clearTimeout(this.timeoutRefun)
        clearTimeout(this.timeoutWin)
    },
    showRefunCoin(money) {
        var that = this
        this.refunCoin.node.active = true
        this.lblRefunCoin.string = Helper.formatMoney(Math.floor(money))
        this.refunCoin.play()

        this.timeoutRefun = setTimeout(() => {
            that.refunCoin.node.active = false
        }, 2000)
    },
    showWinCoin(money) {
        var that = this
        this.winCoin.node.active = true
        this.lblWinCoin.string = Helper.formatMoney(Math.floor(money))
        this.winCoin.play()

        this.timeoutRefun = setTimeout(() => {
            that.winCoin.node.active = false
        }, 2000)
    },
    start () {

    },

    // update (dt) {},
});
