
(function () {
    var XocDiaVipPopupController;

    XocDiaVipPopupController = (function () {
        var instance;

        function XocDiaVipPopupController() {
        }

        instance = void 0;

        XocDiaVipPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        XocDiaVipPopupController.prototype.setXXPopupView = function (xxPopupView) {
            return this.xxPopupView = xxPopupView;
        };

        XocDiaVipPopupController.prototype.createSessionDetailView = function () {
            return this.xxPopupView.createSessionDetailView();
        };

        XocDiaVipPopupController.prototype.destroySessionDetailView = function () {
            return this.xxPopupView.destroySessionDetailView();
        };

        XocDiaVipPopupController.prototype.createTopView = function () {
            return this.xxPopupView.createTopView();
        };

        XocDiaVipPopupController.prototype.destroyTopView = function () {
            return this.xxPopupView.destroyTopView();
        };

        XocDiaVipPopupController.prototype.createHelpView = function () {
            return this.xxPopupView.createHelpView();
        };

        XocDiaVipPopupController.prototype.destroyHelpView = function () {
            return this.xxPopupView.destroyHelpView();
        };

        XocDiaVipPopupController.prototype.createHistoryView = function () {
            return this.xxPopupView.createHistoryView();
        };

        XocDiaVipPopupController.prototype.destroyHistoryView = function () {
            return this.xxPopupView.destroyHistoryView();
        };

        XocDiaVipPopupController.prototype.createGroupUserView = function () {
            return this.xxPopupView.createGroupUserView();
        };
        XocDiaVipPopupController.prototype.destroyGroupUserView = function () {
            return this.xxPopupView.destroyGroupUserView();
        };

        //property
        XocDiaVipPopupController.prototype.setDetailIndex = function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        XocDiaVipPopupController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };


        XocDiaVipPopupController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        XocDiaVipPopupController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return XocDiaVipPopupController;

    })();

    cc.XocDiaVipPopupController = XocDiaVipPopupController;

}).call(this);
