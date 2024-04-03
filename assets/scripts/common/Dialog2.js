// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        isAnimated: true,

        bg: null,
        container: null,
        showScale: 1.1,
        startScale: 0.7
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

    

    show(needSetTop = true) {
        var _this = this;
        if (!this.bg) this.bg = this.node.getChildByName("Bg");
        if (!this.container) this.container = this.node.getChildByName("Container");
        if (needSetTop) {
            this.setTop();
        }
        this.node.active = true;
        this.isAnimated = false;

        this.bg.stopAllActions();
        this.bg.opacity = 0;
        this.bg.runAction(cc.fadeTo(0.2, 128));

        this.container.stopAllActions();
        this.container.opacity = 0;
        this.container.scale = this.startScale;
        this.container.runAction(cc.sequence(
            cc.spawn(cc.scaleTo(0.2, this.showScale), cc.fadeIn(0.2)),
            cc.scaleTo(0.1, 1),
            cc.callFunc(_this._onShowed.bind(this))
        ));
    },

    dismiss() {
        if (!this.bg) this.bg = this.node.getChildByName("Bg");
        if (!this.container) this.container = this.node.getChildByName("Container");
        var _this = this;
        this.isAnimated = false;

        this.bg.stopAllActions();
        this.bg.opacity = 128;
        this.bg.runAction(cc.fadeOut(0.2));

        this.container.stopAllActions();
        this.container.opacity = 255;
        this.container.scale = 1;
        this.container.runAction(cc.sequence(
            cc.scaleTo(0.1, this.showScale),
            cc.spawn(cc.scaleTo(0.2, this.startScale), cc.fadeOut(0.2)),
            cc.callFunc(_this._onDismissed.bind(this))
        ));
    },

    _onShowed() {
        this.isAnimated = true;
    },

    _onDismissed() {
        this.node.active = false;
        this.isAnimated = true;
    },

    setTop() {
        this.node.setSiblingIndex(this.node.parent.children.length - 1);
        // let length = this.node.parent.children.length;
        // let idx = 0;
        // for (let i = 0; i < length; i++) {
        //     let node = this.node.parent.children[i];
        //     if (node != this.node) {
        //         node.setSiblingIndex(idx++);
        //     }
        // }
        // this.node.setSiblingIndex(length);
    }

    // update (dt) {},
});
