/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XocDiaMiniTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XocDiaMiniTopListView: cc.XocDiaMiniTopListView,
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
            var XocDiaMiniGetBigWinnersCommand = new cc.XocDiaMiniGetBigWinnerCommand;
            XocDiaMiniGetBigWinnersCommand.execute(this);
        },

        onXocDiaMiniGetBigWinnerResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XocDiaMiniTopListView.resetList();
                this.XocDiaMiniTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XocDiaMiniTopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XocDiaMiniPopupController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
