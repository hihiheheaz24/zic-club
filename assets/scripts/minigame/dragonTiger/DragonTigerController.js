/*
 * Generated by BeChicken
 * on 6/10/2019
 * version v1.0
 */
(function () {
    var DragonTigerController;

    DragonTigerController = (function () {
        var instance;

        function DragonTigerController() {

        }

        instance = void 0;

        DragonTigerController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        DragonTigerController.prototype.setDragonTigerView = function (dragonTigerView) {
            return this.dragonTigerView = dragonTigerView;
        };

        DragonTigerController.prototype.setDragonTigerResultView = function (dragonTigerResultView) {
            return this.dragonTigerResultView = dragonTigerResultView;
        };

        DragonTigerController.prototype.setDragonTigerResultEffectView = function (dragonTigerResultEffectView) {
            return this.dragonTigerResultEffectView = dragonTigerResultEffectView;
        };


        DragonTigerController.prototype.setDragonTigerBetView = function (dragonTigerBetView) {
            return this.dragonTigerBetView = dragonTigerBetView;
        };

        DragonTigerController.prototype.setDragonTigerSessionHistoryView = function (dragonTigerSessionHistoryView) {
            return this.dragonTigerSessionHistoryView = dragonTigerSessionHistoryView;
        };

        DragonTigerController.prototype.setDragonTigerEventView = function (dragonTigerEventView) {
            return this.dragonTigerEventView = dragonTigerEventView;
        };
        DragonTigerController.prototype.updateGameHistoryUI = function (lstSessions) {
            if (this.dragonTigerSessionHistoryView)
                return this.dragonTigerSessionHistoryView.updateGameHistoryUI(lstSessions)
        };

        //RESET
        DragonTigerController.prototype.reset = function () {
            try {
                this.dragonTigerView.reset();
                // this.dragonTigerResultView.reset();
                this.dragonTigerBetView.reset();
                this.dragonTigerResultEffectView.reset();
            } catch (e) {
                console.log(e);
            }
        };

        DragonTigerController.prototype.stopResultEffect = function () {
            return this.dragonTigerResultEffectView.stopEffect();
        };

        DragonTigerController.prototype.resetBetAndResultInfo = function () {
            if (this.dragonTigerResultEffectView)
                this.dragonTigerResultEffectView.reset();

            if (this.dragonTigerResultView)
                this.dragonTigerResultView.reset();

            if (this.dragonTigerBetView)
                this.dragonTigerBetView.reset();

        };

        DragonTigerController.prototype.resetBetInfo = function () {
            if (this.dragonTigerBetView)
                this.dragonTigerBetView.reset();

        };
        //Active bet lai
        DragonTigerController.prototype.disableBetAgain = function (enable) {
            return this.dragonTigerBetView.disableBetAgain(enable);
        };

        DragonTigerController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.dragonTigerView)
                return this.dragonTigerView.sendRequestOnHub(method, data1, data2);
        };

        //INFO VIEW
        DragonTigerController.prototype.updateBetInfoFromServer = function (listBet) {
            return this.dragonTigerBetView.updateBetInfoFromServer(listBet);
        };
        //Cap nhat tong tien bet cua player
        DragonTigerController.prototype.updateTotalBetValue = function (betSide, totalBet) {
            return this.dragonTigerBetView.updateTotalBetValue(betSide, totalBet);
        };
        //SESSION HISTORY VIEW
        DragonTigerController.prototype.updateSessionHistory = function (gameHistory) {
            if (this.dragonTigerSessionHistoryView)
                return this.dragonTigerSessionHistoryView.updateSessionHistory(gameHistory);
        };


        //RESULT EFFECT VIEW
        DragonTigerController.prototype.playEffectWin = function (sideWin) {
            if (this.dragonTigerResultEffectView)
                return this.dragonTigerResultEffectView.playEffectWin(sideWin);
        };

        //BET VIEW
        DragonTigerController.prototype.updateBetInfoView = function (betInfo) {
            if (this.dragonTigerBetView)
                return this.dragonTigerBetView.updateBetInfo(betInfo);
        };

        DragonTigerController.prototype.getBetSide = function () {
            if (this.dragonTigerBetView)
                return this.dragonTigerBetView.getBetSide();
        };

        //InfoView
        DragonTigerController.prototype.setInfoView = function (infoView) {
            return this.infoView = infoView;
        };
        //Hien thi thong tin chat
        DragonTigerController.prototype.playerShowBubbleChat = function (data) {
            return this.infoView.playerShowBubbleChat(data);
        };

        //Cap nhat thong tin nguoi choi
        DragonTigerController.prototype.updatePlayerInfor = function (data) {
            return this.infoView.updatePlayerInfor(data);
        };
        //Hien thi thong tin thang cua nguoi choi
        DragonTigerController.prototype.winResult = function (data) {
            return this.infoView.winResult(data);
        };
        //Hien thi thong tin vip win
        DragonTigerController.prototype.winResultVip = function (data) {
            return this.infoView.winResultVip(data);
        };
        //Cap nhat balance player hien tai
        DragonTigerController.prototype.updateBalanceCurrPlayer = function (data) {
            return this.infoView.updateBalanceCurrPlayer(data);
        };
        //Cap nhat so du cua nguoi choi
        DragonTigerController.prototype.updatePlayerBalance = function (data) {
            return this.infoView.updatePlayerBalance(data);
        };

        //Hubob PlayerLeave
        DragonTigerController.prototype.unRegisterAllPlayer = function () {
            return this.infoView.unRegisterAllPlayer();
        };

        //Cap nhat danh sach vip player
        DragonTigerController.prototype.updatePlayersUI = function (data) {
            return this.infoView.updatePlayersUI(data);
        };

        //Reset lai UI player
        DragonTigerController.prototype.resetPlayerUI = function () {
            return this.infoView.resetPlayerUI();
        };

        //Cap nhat vi tri player trong ban
        DragonTigerController.prototype.updatePositionPlayerUI = function (positionUI) {
            return this.positionUI = positionUI;
        };
        DragonTigerController.prototype.getPositionUI = function () {
            return this.positionUI;
        };
        /*
        //Set thong tin vip player thang
        DragonTigerController.prototype.setWinVipResult = function (winResult) {
            return this.winVipResult = winResult;
        };
        DragonTigerController.prototype.getWinVipResult = function () {
            return this.winVipResult;
        };
        */
        //Set thong tin  thang
        DragonTigerController.prototype.setWinResult = function (positionUI) {
            return this.positionUI = positionUI;
        };
        DragonTigerController.prototype.getWinResult = function () {
            return this.positionUI;
        };


        //RESULT VIEW

        DragonTigerController.prototype.updateResultView = function (sessionInfo) {
            if (this.dragonTigerResultView)
                return this.dragonTigerResultView.updateResult(sessionInfo);
        };


        //PROPERTY
        DragonTigerController.prototype.clearBetLog = function (sessionID) {
            this.betLog = this.betLog.filter(log => log.sessionID > (sessionID - 1));
        };
        DragonTigerController.prototype.getBetLogBySessionID = function (sessionID) {
            return this.betLog.filter(log => log.sessionID == sessionID - 1);
        };
        //Set betBlog
        DragonTigerController.prototype.setBetLog = function (betInfo) {
            return this.betLog.push(betInfo);
        };
        //Lay thong tin betLog
        DragonTigerController.prototype.getBetLog = function () {
            return this.betLog;
        };
        //Khoi tao/ reset betLog
        DragonTigerController.prototype.initBetLog = function () {
            return this.betLog = [];
        };

        //Set betBlogSession
        DragonTigerController.prototype.setBetLogSession = function (sessionId) {
            return this.betLogSession = sessionId;
        };
        //Lay thong tin betLogSession
        DragonTigerController.prototype.getBetLogSession = function () {
            return this.betLogSession;
        };

        //Set CurrentState
        DragonTigerController.prototype.setCurrentState = function (state) {
            return this.currentState = state;
        };
        //Get CurrentState
        DragonTigerController.prototype.getCurrentState = function () {
            return this.currentState;
        };

        DragonTigerController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        DragonTigerController.prototype.getIsNan = function () {
            return this.isNan;
        };

        DragonTigerController.prototype.getSessionId = function () {
            return this.sessionId;
        };

        DragonTigerController.prototype.setDetailIndex = function (detailIndex) {
            return this.detailIndex = detailIndex;
        };

        DragonTigerController.prototype.getDetailIndex = function () {
            return this.detailIndex;
        };

        DragonTigerController.prototype.setGameHistory = function (gameHistory) {
            return this.gameHistory = gameHistory;
        };

        DragonTigerController.prototype.getGameHistory = function () {
            return this.gameHistory;
        };

        DragonTigerController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        DragonTigerController.prototype.getSID = function () {
            return this.sID;
        };

        return DragonTigerController;

    })();

    cc.DragonTigerController = DragonTigerController;

}).call(this);