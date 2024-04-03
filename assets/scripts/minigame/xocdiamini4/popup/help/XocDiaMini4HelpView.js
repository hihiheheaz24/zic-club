
(function () {
    cc.XocDiaMini4HelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        closeFinished: function () {
            cc.XocDiaMini4PopupController.getInstance().destroyHelpView();
        },
    });
}).call(this);
