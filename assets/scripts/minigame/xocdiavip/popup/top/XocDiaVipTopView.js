/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XocDiaVipTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XocDiaVipTopListView: cc.XocDiaVipTopListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
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
            var XocDiaVipGetBigWinnersCommand = new cc.XocDiaVipGetBigWinnerCommand;
            XocDiaVipGetBigWinnersCommand.execute(this);
        },

        onXocDiaVipGetBigWinnerResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XocDiaVipTopListView.resetList();
                this.XocDiaVipTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XocDiaVipTopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XocDiaVipPopupController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
