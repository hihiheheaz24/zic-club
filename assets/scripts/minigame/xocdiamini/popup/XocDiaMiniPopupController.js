
(function () {
    var XocDiaMiniPopupController;

    XocDiaMiniPopupController = (function () {
        var instance;

        function XocDiaMiniPopupController() {
        }

        instance = void 0;

        XocDiaMiniPopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        XocDiaMiniPopupController.prototype.setXXPopupView = function (xxPopupView) {
            return this.xxPopupView = xxPopupView;
        };

        XocDiaMiniPopupController.prototype.createSessionDetailView = function () {
            return this.xxPopupView.createSessionDetailView();
        };

        XocDiaMiniPopupController.prototype.destroySessionDetailView = function () {
            return this.xxPopupView.destroySessionDetailView();
        };

        XocDiaMiniPopupController.prototype.createTopView = function () {
            return this.xxPopupView.createTopView();
        };

        XocDiaMiniPopupController.prototype.destroyTopView = function () {
            return this.xxPopupView.destroyTopView();
        };

        XocDiaMiniPopupController.prototype.createHelpView = function () {
            return this.xxPopupView.createHelpView();
        };

        XocDiaMiniPopupController.prototype.destroyHelpView = function () {
            return this.xxPopupView.destroyHelpView();
        };

        XocDiaMiniPopupController.prototype.createHistoryView = function () {
            return this.xxPopupView.createHistoryView();
        };

        XocDiaMiniPopupController.prototype.destroyHistoryView = function () {
            return this.xxPopupView.destroyHistoryView();
        };

        XocDiaMiniPopupController.prototype.createGroupUserView = function () {
            return this.xxPopupView.createGroupUserView();
        };
        XocDiaMiniPopupController.prototype.destroyGroupUserView = function () {
            return this.xxPopupView.destroyGroupUserView();
        };

        //property
        XocDiaMiniPopupController.prototype.setDetailIndex = function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        XocDiaMiniPopupController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };


        XocDiaMiniPopupController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        XocDiaMiniPopupController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return XocDiaMiniPopupController;

    })();

    cc.XocDiaMiniPopupController = XocDiaMiniPopupController;

}).call(this);
