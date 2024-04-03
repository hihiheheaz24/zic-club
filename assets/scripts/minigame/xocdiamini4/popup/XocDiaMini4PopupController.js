
(function () {
    var XocDiaMini4PopupController;

    XocDiaMini4PopupController = (function () {
        var instance;

        function XocDiaMini4PopupController() {
        }

        instance = void 0;

        XocDiaMini4PopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        XocDiaMini4PopupController.prototype.setXXPopupView = function (xxPopupView) {
            return this.xxPopupView = xxPopupView;
        };

        XocDiaMini4PopupController.prototype.createSessionDetailView = function () {
            return this.xxPopupView.createSessionDetailView();
        };

        XocDiaMini4PopupController.prototype.destroySessionDetailView = function () {
            return this.xxPopupView.destroySessionDetailView();
        };

        XocDiaMini4PopupController.prototype.createTopView = function () {
            return this.xxPopupView.createTopView();
        };

        XocDiaMini4PopupController.prototype.destroyTopView = function () {
            return this.xxPopupView.destroyTopView();
        };

        XocDiaMini4PopupController.prototype.createHelpView = function () {
            return this.xxPopupView.createHelpView();
        };

        XocDiaMini4PopupController.prototype.destroyHelpView = function () {
            return this.xxPopupView.destroyHelpView();
        };

        XocDiaMini4PopupController.prototype.createHistoryView = function () {
            return this.xxPopupView.createHistoryView();
        };

        XocDiaMini4PopupController.prototype.destroyHistoryView = function () {
            return this.xxPopupView.destroyHistoryView();
        };

        XocDiaMini4PopupController.prototype.createGroupUserView = function () {
            return this.xxPopupView.createGroupUserView();
        };
        XocDiaMini4PopupController.prototype.destroyGroupUserView = function () {
            return this.xxPopupView.destroyGroupUserView();
        };

        //property
        XocDiaMini4PopupController.prototype.setDetailIndex = function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        XocDiaMini4PopupController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };


        XocDiaMini4PopupController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        XocDiaMini4PopupController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return XocDiaMini4PopupController;

    })();

    cc.XocDiaMini4PopupController = XocDiaMini4PopupController;

}).call(this);
