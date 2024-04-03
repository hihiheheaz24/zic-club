/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XocDiaMini4HistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XocDiaMini4HistoryListView: cc.XocDiaMini4HistoryListView,
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
            var XocDiaMini4GetHistoryCommand = new cc.XocDiaMini4GetHistoryCommand;
            XocDiaMini4GetHistoryCommand.execute(this);
        },

        onXocDiaMini4GetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XocDiaMini4HistoryListView.resetList();
                this.XocDiaMini4HistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
			
            this.XocDiaMini4HistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XocDiaMini4PopupController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
			
			cc.XocDiaMiniController.getInstance().getShowNodeNho2();
						cc.XocDiaMini2Controller.getInstance().getShowNodeNho();
						cc.XocDiaMini3Controller.getInstance().getShowNodeNho2();
						//cc.XocDiaMini4Controller.getInstance().getShowNodeNho2();
        },
    });
}).call(this);
