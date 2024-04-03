/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            taiXiuHistoryListView: cc.TaiXiuHistoryListView,
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
            var txGetHistoryCommand = new cc.TXGetHistoryCommand;
            txGetHistoryCommand.execute(this);
        },

        onTXGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.taiXiuHistoryListView.resetList();
                this.taiXiuHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.taiXiuHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuMainController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
