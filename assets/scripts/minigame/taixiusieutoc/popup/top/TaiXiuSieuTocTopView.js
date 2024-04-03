/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuSieuTocTopView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            TaiXiuSieuTocTopListView: cc.TaiXiuSieuTocTopListView,
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
            var txsieutocGetBigWinnersCommand = new cc.TXSIEUTOCGetBigWinnersCommand;
            txsieutocGetBigWinnersCommand.execute(this);
        },

        onTXGetBigWinnersResponse: function (response) {
            var list = response;
            //var list = slotsHistoryListData;
            if (list !== null && list.length > 0) {
                this.TaiXiuSieuTocTopListView.resetList();
                this.TaiXiuSieuTocTopListView.initialize(list);
            }
        },

        closeClicked: function () {
            this.TaiXiuSieuTocTopListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuSieuTocMainController.getInstance().destroyTopView();
            }, this, 1, 0, delay, false);
        },
    });
}).call(this);
