/**
 * Created by Nofear on 3/15/2019.
 */

// var topupTransactionListData = require('TopupTransactionListData');

(function () {
    cc.TopupTransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            topupTransactionListView: cc.TopupTransactionListView,        
        },

        onLoad: function () {
            this.getTopupTransactionList();
			this.animation = this.node.getComponent(cc.Animation);
			this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
        },
		
        onEnable: function () {
            //this.animation.play('openPopup');
        },
		
        getTopupTransactionList: function () {
            var topupHistoryCommand = new cc.TopupHistoryCommand;
            topupHistoryCommand.execute(this);
        },

        onTopupHistoryResponse: function (response) {
            var list = response.List;
            //list = topupTransactionListData;
            if (list !== null && list.length > 0) {
                this.topupTransactionListView.resetList();
                this.topupTransactionListView.initialize(list);
            }
        },

        openKhieuNai: function () {
            cc.sys.openURL(cc.Config.getInstance().groupFB());
            //cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'FB_GROUP', cc.DDNAUIType.BUTTON);
        },

        closeClicked: function () {
            //this.showRegister(false);
            //this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyBankHistoryView();
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
