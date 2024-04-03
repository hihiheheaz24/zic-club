
(function () {
    cc.TaiXiuSieuTocRuleView = cc.Class({
        "extends": cc.PopupBase,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_SIEUTOC;
        },

        closeFinished: function () {
            cc.TaiXiuSieuTocMainController.getInstance().destroyRuleView();
        },
		
		goCheckSieuToc: function () {
			cc.sys.openURL(cc.Config.getInstance().md5Service());
		},
    });
}).call(this);
