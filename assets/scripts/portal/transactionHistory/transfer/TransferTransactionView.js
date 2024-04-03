/**
 * Created by Nofear on 3/15/2019.
 */
// var transferTransactionListData = require('TransferTransactionListData');

(function () {
    cc.TransferTransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            transferTransactionListView: cc.TransferTransactionListView,
        },

        onLoad: function () {
            this.getTransferTransactionList();
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },
		
		onEnable: function () {
			this.animation.play('openPopup');
		},

        getTransferTransactionList: function () {
            var transferHistoryCommand = new cc.TransferHistoryCommand;
            transferHistoryCommand.execute(this);
        },

        onTransferHistoryResponse: function (response) {
            var list = response.List;
            //list = transferTransactionListData;
            if (list !== null && list.length > 0) {
                this.transferTransactionListView.resetList();
                this.transferTransactionListView.initialize(list);
            }
        },
		
        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyTransferTransactionView();
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
