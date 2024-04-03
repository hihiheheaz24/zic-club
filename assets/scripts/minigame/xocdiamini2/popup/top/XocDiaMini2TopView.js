/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XocDiaMini2TopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XocDiaMini2TopListView: cc.XocDiaMini2TopListView,
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
            var XocDiaMini2GetBigWinnersCommand = new cc.XocDiaMini2GetBigWinnerCommand;
            XocDiaMini2GetBigWinnersCommand.execute(this);
        },

        onXocDiaMini2GetBigWinnerResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XocDiaMini2TopListView.resetList();
                this.XocDiaMini2TopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XocDiaMini2TopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XocDiaMini2PopupController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
