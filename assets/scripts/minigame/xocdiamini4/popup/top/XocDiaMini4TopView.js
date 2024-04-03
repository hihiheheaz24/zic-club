/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XocDiaMini4TopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XocDiaMini4TopListView: cc.XocDiaMini4TopListView,
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
            var XocDiaMini4GetBigWinnersCommand = new cc.XocDiaMini4GetBigWinnerCommand;
            XocDiaMini4GetBigWinnersCommand.execute(this);
        },

        onXocDiaMini4GetBigWinnerResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XocDiaMini4TopListView.resetList();
                this.XocDiaMini4TopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XocDiaMini4TopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XocDiaMini4PopupController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
