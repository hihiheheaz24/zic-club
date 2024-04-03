
(function () {
    var XocDiaMini3PopupController;

    XocDiaMini3PopupController = (function () {
        var instance;

        function XocDiaMini3PopupController() {
        }

        instance = void 0;

        XocDiaMini3PopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        XocDiaMini3PopupController.prototype.setXXPopupView = function (xxPopupView) {
            return this.xxPopupView = xxPopupView;
        };

        XocDiaMini3PopupController.prototype.createSessionDetailView = function () {
            return this.xxPopupView.createSessionDetailView();
        };

        XocDiaMini3PopupController.prototype.destroySessionDetailView = function () {
            return this.xxPopupView.destroySessionDetailView();
        };

        XocDiaMini3PopupController.prototype.createTopView = function () {
            return this.xxPopupView.createTopView();
        };

        XocDiaMini3PopupController.prototype.destroyTopView = function () {
            return this.xxPopupView.destroyTopView();
        };

        XocDiaMini3PopupController.prototype.createHelpView = function () {
            return this.xxPopupView.createHelpView();
        };

        XocDiaMini3PopupController.prototype.destroyHelpView = function () {
            return this.xxPopupView.destroyHelpView();
        };

        XocDiaMini3PopupController.prototype.createHistoryView = function () {
            return this.xxPopupView.createHistoryView();
        };

        XocDiaMini3PopupController.prototype.destroyHistoryView = function () {
            return this.xxPopupView.destroyHistoryView();
        };

        XocDiaMini3PopupController.prototype.createGroupUserView = function () {
            return this.xxPopupView.createGroupUserView();
        };
        XocDiaMini3PopupController.prototype.destroyGroupUserView = function () {
            return this.xxPopupView.destroyGroupUserView();
        };

        //property
        XocDiaMini3PopupController.prototype.setDetailIndex = function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        XocDiaMini3PopupController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };


        XocDiaMini3PopupController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        XocDiaMini3PopupController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return XocDiaMini3PopupController;

    })();

    cc.XocDiaMini3PopupController = XocDiaMini3PopupController;

}).call(this);
