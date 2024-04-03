// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Helper = require('Vs.Helper')
cc.Class({
    extends: cc.Component,

    properties: {
        bar: cc.Sprite,
        lblTitle: cc.Label,
        audios: {
            default: [],
            type: [cc.AudioClip]
        },
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
    getSound() {
        return (Helper.getSession('xocdia_sound') == undefined || Helper.getSession('xocdia_sound') == "true") ? true : false
    },
    onProgress(value, title = '') {
        // if(this.getSound()) {
        //    this.current = cc.audioEngine.play(this.audios[0], false, 1); 
        // }
        if(this.tween)
            this.tween.stop()
        this.lblTitle.string = title
        // if(!this.node.active)
        this.node.active = true
        this.bar.fillRange = 1
        this.tween = cc.tween(this.bar)
        .to(value, {fillRange: 0})
        .call(() => {
            // this.node.active = false
        })
        .start()
        
    },
    onHide() {
        if(this.tween)
            this.tween.stop()
        this.node.active = false
    },
    start () {

    },

    // update (dt) {},
});
