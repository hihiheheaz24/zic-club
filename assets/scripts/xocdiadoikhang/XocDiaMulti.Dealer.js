// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        lblMsg: cc.Node
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
        // this.dealerSp = this.node.getComponent(sp.Skeleton)
        
    },
    talk(msg) {
        // this.dealerSp.setAnimation(0, "noti", false);
        // this.dealerSp.addAnimation(0, "cho", true);
        
        this.lblMsg.getComponentInChildren(cc.RichText).string = '   ' + msg + '   ';
        this.lblMsg.active = false;
        this.scheduleOnce(() => {
            this.lblMsg.active = true;
            this.scheduleOnce(() => {
                this.lblMsg.active = false;
            }, 3);
        }, 0.3);

    },
    start () {

    },

    // update (dt) {},
});
