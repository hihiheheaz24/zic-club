/**
 * Created by Nofear on 3/14/2019.
 */

(function () {
    var WithdrawHistoryController;

    WithdrawHistoryController = (function () {
        var instance;

        function WithdrawHistoryController() {
        }

        instance = void 0;

        WithdrawHistoryController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        WithdrawHistoryController.prototype.setHistoryView = function (historyView) {
            return this.historyView = historyView;
        };

        WithdrawHistoryController.prototype.setRedeemTransactionView = function (redeemTransactionView) {
            return this.redeemTransactionView = redeemTransactionView;
        };

        WithdrawHistoryController.prototype.activeTab = function (tabName) {
            return this.historyView.activeTab(tabName);
        };

        WithdrawHistoryController.prototype.refreshRedeemTransactionList = function () {
            return this.redeemTransactionView.refreshRedeemTransactionList();
        };

        return WithdrawHistoryController;

    })();

    cc.WithdrawHistoryController = WithdrawHistoryController;

}).call(this);

