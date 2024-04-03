/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    cc.BankHistoryView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBank: cc.Node,
            nodeMomo: cc.Node,
            nodeCard: cc.Node,
            nodeTransfer: cc.Node,
        },

        // use this for initialization
        onLoad: function () {
            cc.WithdrawHistoryController.getInstance().setHistoryView(this);
            this.nodeTabActive = this.nodeBank;
            this.currentTab = cc.AccountTab.BANK;
            this.node.zIndex = cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
            var startTab = cc.Tool.getInstance().getItem('@startWithdrawTab');
            this.activeTab(startTab)
        },

        changeTabClicked: function (event, data) {
            if (data.toString() === this.currentTab) return;
            this.activeTab(data.toString());
            //cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.HISTORY_BANK, data.toString(), cc.DDNAUIType.BUTTON);
        },

        activeTab (tabName) {
            this.nodeTabActive.active = false;
            switch (tabName) {
                case cc.HistoryTab.BANK:
                    this.nodeTabActive = this.nodeBank;
                    break;
            }
            this.nodeTabActive.active = true;
            this.currentTab = tabName;
        },

        closeClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyWithdrawHistoryView();
            }, this, 1, 0, delay, false);
        }

    });
}).call(this);
