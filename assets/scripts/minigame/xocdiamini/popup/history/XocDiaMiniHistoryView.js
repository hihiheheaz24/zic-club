/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XocDiaMiniHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XocDiaMiniHistoryListView: cc.XocDiaMiniHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getTopSessionWinners();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');
        },

        getTopSessionWinners: function () {
            var XocDiaMiniGetHistoryCommand = new cc.XocDiaMiniGetHistoryCommand;
            XocDiaMiniGetHistoryCommand.execute(this);
        },

        onXocDiaMiniGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XocDiaMiniHistoryListView.resetList();
                this.XocDiaMiniHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XocDiaMiniHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XocDiaMiniPopupController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
			
			//cc.XocDiaMiniController.getInstance().getShowNodeNho2();
						// cc.XocDiaMini2Controller.getInstance().getShowNodeNho();
						// cc.XocDiaMini3Controller.getInstance().getShowNodeNho2();
						// cc.XocDiaMini4Controller.getInstance().getShowNodeNho2();
        },
		
		
    });
}).call(this);
