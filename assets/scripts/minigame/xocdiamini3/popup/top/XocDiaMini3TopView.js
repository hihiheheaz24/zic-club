/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.XocDiaMini3TopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            XocDiaMini3TopListView: cc.XocDiaMini3TopListView,
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
            var XocDiaMini3GetBigWinnersCommand = new cc.XocDiaMini3GetBigWinnerCommand;
            XocDiaMini3GetBigWinnersCommand.execute(this);
        },

        onXocDiaMini3GetBigWinnerResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.XocDiaMini3TopListView.resetList();
                this.XocDiaMini3TopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.XocDiaMini3TopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.XocDiaMini3PopupController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
