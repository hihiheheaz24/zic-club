
(function () {
    cc.TaiXiuSieuTocHelpView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_SIEUTOC;
        },

        closeFinished: function () {
            cc.TaiXiuSieuTocMainController.getInstance().destroyHelpView();
        },
		
		showRuleClicked: function () {
			cc.TaiXiuSieuTocMainController.getInstance().destroyHelpView();
			cc.TaiXiuSieuTocMainController.getInstance().createRuleView();
		},
    });
}).call(this);
