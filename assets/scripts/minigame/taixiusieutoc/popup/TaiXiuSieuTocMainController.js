/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuSieuTocMainController;

    TaiXiuSieuTocMainController = (function () {
        var instance;

        function TaiXiuSieuTocMainController() {

        }

        instance = void 0;

        TaiXiuSieuTocMainController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        TaiXiuSieuTocMainController.prototype.setTaiXiuSieuTocMainView = function (TaiXiuSieuTocMainView) {
            return this.TaiXiuSieuTocMainView = TaiXiuSieuTocMainView;
        };

        TaiXiuSieuTocMainController.prototype.createGraphView = function () {
            return this.TaiXiuSieuTocMainView.createGraphView();
        };

        TaiXiuSieuTocMainController.prototype.destroyGraphView = function () {
            return this.TaiXiuSieuTocMainView.destroyGraphView();
        };

        TaiXiuSieuTocMainController.prototype.createSessionDetailView = function () {
            return this.TaiXiuSieuTocMainView.createSessionDetailView();
        };

        TaiXiuSieuTocMainController.prototype.destroySessionDetailView = function () {
            return this.TaiXiuSieuTocMainView.destroySessionDetailView();
        };

        TaiXiuSieuTocMainController.prototype.createTopView = function () {
            return this.TaiXiuSieuTocMainView.createTopView();
        };

        TaiXiuSieuTocMainController.prototype.destroyTopView = function () {
            return this.TaiXiuSieuTocMainView.destroyTopView();
        };

        TaiXiuSieuTocMainController.prototype.createHelpView = function () {
            return this.TaiXiuSieuTocMainView.createHelpView();
        };

        TaiXiuSieuTocMainController.prototype.destroyHelpView = function () {
            return this.TaiXiuSieuTocMainView.destroyHelpView();
        };
		
        TaiXiuSieuTocMainController.prototype.createRuleView = function () {
            return this.TaiXiuSieuTocMainView.createRuleView();
        };

        TaiXiuSieuTocMainController.prototype.destroyRuleView = function () {
            return this.TaiXiuSieuTocMainView.destroyRuleView();
        };

        TaiXiuSieuTocMainController.prototype.createHistoryView = function () {
            return this.TaiXiuSieuTocMainView.createHistoryView();
        };

        TaiXiuSieuTocMainController.prototype.destroyHistoryView = function () {
            return this.TaiXiuSieuTocMainView.destroyHistoryView();
        };
		
        TaiXiuSieuTocMainController.prototype.createJackpotHistoryView = function () {
            return this.TaiXiuSieuTocMainView.createJackpotHistoryView();
        };

        TaiXiuSieuTocMainController.prototype.destroyJackpotHistoryView = function () {
            return this.TaiXiuSieuTocMainView.destroyJackpotHistoryView();
        };
        return TaiXiuSieuTocMainController;

    })();

    cc.TaiXiuSieuTocMainController = TaiXiuSieuTocMainController;

}).call(this);

