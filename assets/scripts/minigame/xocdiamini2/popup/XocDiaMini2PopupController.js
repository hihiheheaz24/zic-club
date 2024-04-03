
(function () {
    var XocDiaMini2PopupController;

    XocDiaMini2PopupController = (function () {
        var instance;

        function XocDiaMini2PopupController() {
        }

        instance = void 0;

        XocDiaMini2PopupController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        XocDiaMini2PopupController.prototype.setXXPopupView = function (xxPopupView) {
            return this.xxPopupView = xxPopupView;
        };

        XocDiaMini2PopupController.prototype.createSessionDetailView = function () {
            return this.xxPopupView.createSessionDetailView();
        };

        XocDiaMini2PopupController.prototype.destroySessionDetailView = function () {
            return this.xxPopupView.destroySessionDetailView();
        };

        XocDiaMini2PopupController.prototype.createTopView = function () {
            return this.xxPopupView.createTopView();
        };

        XocDiaMini2PopupController.prototype.destroyTopView = function () {
            return this.xxPopupView.destroyTopView();
        };

        XocDiaMini2PopupController.prototype.createHelpView = function () {
            return this.xxPopupView.createHelpView();
        };

        XocDiaMini2PopupController.prototype.destroyHelpView = function () {
            return this.xxPopupView.destroyHelpView();
        };

        XocDiaMini2PopupController.prototype.createHistoryView = function () {
            return this.xxPopupView.createHistoryView();
        };

        XocDiaMini2PopupController.prototype.destroyHistoryView = function () {
            return this.xxPopupView.destroyHistoryView();
        };

        XocDiaMini2PopupController.prototype.createGroupUserView = function () {
            return this.xxPopupView.createGroupUserView();
        };
        XocDiaMini2PopupController.prototype.destroyGroupUserView = function () {
            return this.xxPopupView.destroyGroupUserView();
        };

        //property
        XocDiaMini2PopupController.prototype.setDetailIndex = function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        XocDiaMini2PopupController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };


        XocDiaMini2PopupController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        XocDiaMini2PopupController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        return XocDiaMini2PopupController;

    })();

    cc.XocDiaMini2PopupController = XocDiaMini2PopupController;

}).call(this);
