
(function () {
    cc.BauCuaSetting = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        closeFinished: function () {
            cc.BauCuaPopupController.getInstance().destroySettingView();
        },
    });
}).call(this);
