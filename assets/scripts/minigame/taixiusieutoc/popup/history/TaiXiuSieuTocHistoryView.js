/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuSieuTocHistoryView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            TaiXiuSieuTocHistoryListView: cc.TaiXiuSieuTocHistoryListView,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_SIEUTOC;
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
            var txsieutocGetHistoryCommand = new cc.TXSIEUTOCGetHistoryCommand;
            txsieutocGetHistoryCommand.execute(this);
        },

        onTXGetHistoryResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.TaiXiuSieuTocHistoryListView.resetList();
                this.TaiXiuSieuTocHistoryListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.TaiXiuSieuTocHistoryListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuSieuTocMainController.getInstance().destroyHistoryView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
