/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var TaiXiuSieuTocController;

    TaiXiuSieuTocController = (function () {
        var instance;

        function TaiXiuSieuTocController() {

        }

        instance = void 0;

        TaiXiuSieuTocController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };
        
        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocPortalView = function (taiXiuSieuTocPortalView) {
            return this.taiXiuSieuTocPortalView = taiXiuSieuTocPortalView;
        };
		
        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocView = function (taiXiuSieuTocView) {
            return this.taiXiuSieuTocView = taiXiuSieuTocView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocInfoView = function (taiXiuSieuTocInfoView) {
            return this.taiXiuSieuTocInfoView = taiXiuSieuTocInfoView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocResultView = function (taiXiuSieuTocResultView) {
            return this.taiXiuSieuTocResultView = taiXiuSieuTocResultView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocResultEffectView = function (taiXiuSieuTocResultEffectView) {
            return this.taiXiuSieuTocResultEffectView = taiXiuSieuTocResultEffectView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocInputBetView = function (taiXiuSieuTocInputBetView) {
            return this.taiXiuSieuTocInputBetView = taiXiuSieuTocInputBetView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocButtonView = function (taiXiuSieuTocButtonView) {
            return this.taiXiuSieuTocButtonView = taiXiuSieuTocButtonView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocBetView = function (taiXiuSieuTocBetView) {
            return this.taiXiuSieuTocBetView = taiXiuSieuTocBetView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocSessionHistoryView = function (taiXiuSieuTocSessionHistoryView) {
            return this.taiXiuSieuTocSessionHistoryView = taiXiuSieuTocSessionHistoryView;
        };

        TaiXiuSieuTocController.prototype.setTaiXiuSieuTocEventView = function (taiXiuSieuTocEventView) {
            return this.taiXiuSieuTocEventView = taiXiuSieuTocEventView;
        };

        TaiXiuSieuTocController.prototype.setIsOpen = function (isOpen) {
            return this.isOpen = isOpen;
        };

        TaiXiuSieuTocController.prototype.getIsOpen = function () {
            return this.isOpen;
        };

        TaiXiuSieuTocController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        TaiXiuSieuTocController.prototype.getSID = function () {
            return this.sID;
        };

        //set ket qua Summon Dragon Event
        TaiXiuSieuTocController.prototype.setEventWinnerResult = function (sieutoceventWinnerResult) {
            return this.sieutoceventWinnerResult = sieutoceventWinnerResult;
        };

        TaiXiuSieuTocController.prototype.getEventWinnerResult = function () {
            return this.sieutoceventWinnerResult;
        };

        TaiXiuSieuTocController.prototype.openEndDiaNanView = function () {
            if (this.taiXiuSieuTocResultView)
                return this.taiXiuSieuTocResultView.openEndDiaNan();
        };

        //RESET
        TaiXiuSieuTocController.prototype.reset = function () {
            if (this.taiXiuSieuTocPortalView)
                this.taiXiuSieuTocPortalView.reset();

            if (this.taiXiuSieuTocInfoView)
                this.taiXiuSieuTocInfoView.reset();

            if (this.taiXiuSieuTocResultView)
                this.taiXiuSieuTocResultView.reset();

            if (this.taiXiuSieuTocBetView)
                this.taiXiuSieuTocBetView.reset();

            if (this.taiXiuSieuTocInputBetView)
                this.taiXiuSieuTocInputBetView.reset();

            if (this.taiXiuSieuTocResultEffectView)
                this.taiXiuSieuTocResultEffectView.reset();
        };

        TaiXiuSieuTocController.prototype.resetBetAndResultInfo = function () {
            if (this.taiXiuSieuTocResultEffectView)
                this.taiXiuSieuTocResultEffectView.reset();

            if (this.taiXiuSieuToc5ResultView)
                this.taiXiuSieuTocResultView.reset();

            if (this.taiXiuSieuTocBetView)
                this.taiXiuSieuTocBetView.reset();

            if (this.taiXiuSieuTocInputBetView)
                this.taiXiuSieuTocInputBetView.reset();
        };

        TaiXiuSieuTocController.prototype.resetBetInfo = function () {
            if (this.taiXiuSieuTocBetView)
                this.taiXiuSieuTocBetView.reset();

            if (this.taiXiuSieuTocInputBetView)
                this.taiXiuSieuTocInputBetView.reset();
        };
        //EVENT VIEW
        TaiXiuSieuTocController.prototype.clickUIEventPH = function () {
            if (this.taiXiuSieuTocEventView)
                return this.taiXiuSieuTocEventView.clickUIEventPH();
        };

        TaiXiuSieuTocController.prototype.activeEventPH = function (enable) {
            if (this.taiXiuSieuTocEventView)
                return this.taiXiuSieuTocEventView.activeEventPH(enable);
        };

        TaiXiuSieuTocController.prototype.setUserCord = function (cordWin, cordLost) {
            if (this.taiXiuSieuTocEventView)
                return this.taiXiuSieuTocEventView.setUserCord(cordWin, cordLost);
        };


        //PORTAL VIEW
        //ket noi luc dau chua login
        TaiXiuSieuTocController.prototype.connectHubTxSieuToc = function () {
            if (this.taiXiuSieuTocPortalView)
                return this.taiXiuSieuTocPortalView.connectHubTxSieuToc();
        };

        //ket noi sau khi da Login
        TaiXiuSieuTocController.prototype.connectHubTxSieuTocAuthorize = function () {
            if (this.taiXiuSieuTocPortalView)
                return this.taiXiuSieuTocPortalView.connectHubTxSieuTocAuthorize();
        };

        TaiXiuSieuTocController.prototype.disconnectAndLogout = function () {
            if (this.taiXiuSieuTocPortalView)
                return this.taiXiuSieuTocPortalView.disconnectAndLogout();
        };

        TaiXiuSieuTocController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.taiXiuSieuTocPortalView)
                return this.taiXiuSieuTocPortalView.sendRequestOnHub(method, data1, data2);
        };

        //INFO VIEW
        TaiXiuSieuTocController.prototype.updateInfoView = function (sieutocsessionInfo) {
            if (this.taiXiuSieuTocInfoView)
                return this.taiXiuSieuTocInfoView.updateInfo(sieutocsessionInfo);
        };

        TaiXiuSieuTocController.prototype.updateTimerInfoView = function (time) {
            if (this.taiXiuSieuTocInfoView)
                return this.taiXiuSieuTocInfoView.updateTimerInfo(time);
        };

        //SESSION HISTORY VIEW
        TaiXiuSieuTocController.prototype.updateSessionHistory = function (sieutocgameHistory) {
            if (this.taiXiuSieuTocSessionHistoryView)
            return this.taiXiuSieuTocSessionHistoryView.updateSessionHistory(sieutocgameHistory);
        };

        //BUTTON VIEW
        TaiXiuSieuTocController.prototype.lightOnEvent = function () {
            if (this.taiXiuSieuTocButtonView)
            return this.taiXiuSieuTocButtonView.lightOnEvent();
        };

        //RESULT EFFECT VIEW
        TaiXiuSieuTocController.prototype.playEffectWin = function (amount) {
            if (this.taiXiuSieuTocResultEffectView)
            return this.taiXiuSieuTocResultEffectView.playEffectWin(amount);
        };

        //BET VIEW
        TaiXiuSieuTocController.prototype.updateBetInfoView = function (betInfo) {
            if (this.taiXiuSieuTocBetView)
                return this.taiXiuSieuTocBetView.updateBetInfo(betInfo);
        };

        TaiXiuSieuTocController.prototype.getBetSide = function () {
            if (this.taiXiuSieuTocBetView)
                return this.taiXiuSieuTocBetView.getBetSide();
        };

        //TAI XIU VIEW
        TaiXiuSieuTocController.prototype.resetPositionTX = function () {
            if (this.taiXiuSieuTocView)
                return this.taiXiuSieuTocView.resetPositionTX();
        };

        //RESULT VIEW
        TaiXiuSieuTocController.prototype.getIsBowl = function () {
            if (this.taiXiuSieuTocResultView)
                return this.taiXiuSieuTocResultView.getIsBowl();
        };
		
        TaiXiuSieuTocController.prototype.getIsDia = function () {
            if (this.taiXiuSieuTocResultView)
                return this.taiXiuSieuTocResultView.getIsDia();
        };
		
        TaiXiuSieuTocController.prototype.playAnimation = function (sieutocsessionInfo) {
            if (this.taiXiuSieuTocResultView)
            return this.taiXiuSieuTocResultView.playAnimation(sieutocsessionInfo);
        };

        TaiXiuSieuTocController.prototype.playAnimFinish = function () {
            if (this.taiXiuSieuTocResultView)
            return this.taiXiuSieuTocResultView.playAnimFinish();
        };
		
        TaiXiuSieuTocController.prototype.playAnimationAndSetResult = function (sieutocsessionInfo) {
            if (this.taiXiuSieuTocResultView)
            return this.taiXiuSieuTocResultView.playAnimationAndSetResult(sieutocsessionInfo);
        };
		
        TaiXiuSieuTocController.prototype.diceAnimFinish = function () {
            if (this.taiXiuSieuTocResultView)
            return this.taiXiuSieuTocResultView.diceAnimFinish();
        };

        TaiXiuSieuTocController.prototype.updateResultView = function (sieutocsessionInfo) {
            if (this.taiXiuSieuTocResultView)
                return this.taiXiuSieuTocResultView.updateResult(sieutocsessionInfo);
        };

        //PROPERTY
        TaiXiuSieuTocController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        TaiXiuSieuTocController.prototype.getIsNan = function () {
            return this.isNan;
        };

        TaiXiuSieuTocController.prototype.getSessionId = function () {
            return this.sessionId;
        };

        TaiXiuSieuTocController.prototype.setDetailIndex= function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        TaiXiuSieuTocController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };

        TaiXiuSieuTocController.prototype.setGameHistory = function (sieutocgameHistory) {
            return this.sieutocgameHistory = sieutocgameHistory;
        };

        TaiXiuSieuTocController.prototype.getGameHistory = function () {
            return this.sieutocgameHistory;
        };
        return TaiXiuSieuTocController;

    })();

    cc.TaiXiuSieuTocController = TaiXiuSieuTocController;

}).call(this);

