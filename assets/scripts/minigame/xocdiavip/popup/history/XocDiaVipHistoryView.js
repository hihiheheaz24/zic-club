/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XocDiaVipHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XocDiaVipHistoryListView: cc.XocDiaVipHistoryListView,
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
            var XocDiaVipGetHistoryCommand = new cc.XocDiaVipGetHistoryCommand;
            XocDiaVipGetHistoryCommand.execute(this);
        },

        onXocDiaVipGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XocDiaVipHistoryListView.resetList();
                this.XocDiaVipHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XocDiaVipHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XocDiaVipPopupController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
