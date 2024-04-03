/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var XocDiaMini3Controller;

    XocDiaMini3Controller = (function () {
        var instance;

        function XocDiaMini3Controller() {

        }

        instance = void 0;

        XocDiaMini3Controller.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        //SET VIEW
        XocDiaMini3Controller.prototype.setXocDiaMini3View = function (xocdiaminiView) {
            return this.xocdiaminiView = xocdiaminiView;
        };

        XocDiaMini3Controller.prototype.setXocDiaMini3SoiCauView = function (xocdiaminiSoiCauView) {
            return this.xocdiaminiSoiCauView = xocdiaminiSoiCauView;
        };

        XocDiaMini3Controller.prototype.setXocDiaMini3Assets = function (xocdiaminiAssets) {
            return this.xocdiaminiAssets = xocdiaminiAssets;
        };

        XocDiaMini3Controller.prototype.setXocDiaMini3ChipPool = function (xocdiaminiChipPool) {
            return this.xocdiaminiChipPool = xocdiaminiChipPool;
        };


        XocDiaMini3Controller.prototype.setXocDiaMini3InfoView = function (xocdiaminiInfoView) {
            return this.xocdiaminiInfoView = xocdiaminiInfoView;
        };

        XocDiaMini3Controller.prototype.setXocDiaMini3InputView = function (xocdiaminiInputView) {
            return this.xocdiaminiInputView = xocdiaminiInputView;
        };

        XocDiaMini3Controller.prototype.setXocDiaMini3ResultView = function (xocdiaminiResultView) {
            return this.xocdiaminiResultView = xocdiaminiResultView;
        };

        //PROPERTY
        XocDiaMini3Controller.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        XocDiaMini3Controller.prototype.getIsNan = function () {
            return this.isNan;
        };

        XocDiaMini3Controller.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        XocDiaMini3Controller.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        XocDiaMini3Controller.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        XocDiaMini3Controller.prototype.getSID = function () {
            return this.sID;
        };


        //ASSETS
        XocDiaMini3Controller.prototype.getAssets = function () {
            return this.xocdiaminiAssets;
        };

        XocDiaMini3Controller.prototype.getWinFont = function () {
            return this.xocdiaminiAssets.getWinFont();
        };

        XocDiaMini3Controller.prototype.getLoseFont = function () {
            return this.xocdiaminiAssets.getLoseFont();
        };

        XocDiaMini3Controller.prototype.getChips = function () {
            return this.xocdiaminiAssets.getChips();
        };

        XocDiaMini3Controller.prototype.getNans = function () {
            return this.xocdiaminiAssets.getNans();
        };

        XocDiaMini3Controller.prototype.getAvatarDef = function () {
            return this.xocdiaminiAssets.getAvatarDef();
        };

        //XocDiaMini3 VIEW
        XocDiaMini3Controller.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.xocdiaminiView)
                return this.xocdiaminiView.sendRequestOnHub(method, data1, data2);
        };

        //INFO
        //HubOn joinGame
        XocDiaMini3Controller.prototype.joinGame = function (info) {
            return this.xocdiaminiInfoView.joinGame(info);
        };
        //HubOn playerJoin
        XocDiaMini3Controller.prototype.playerJoin = function (info) {
            return this.xocdiaminiInfoView.playerJoin(info);
        };

        //HubOn playerLeave
        XocDiaMini3Controller.prototype.playerLeave = function (info) {
            this.xocdiaminiInfoView.playerLeave(info);
            this.xocdiaminiView.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        XocDiaMini3Controller.prototype.updateConnectionStatus = function (info) {
            return this.xocdiaminiInfoView.updateConnectionStatus(info);
        };

        XocDiaMini3Controller.prototype.updatePlayerStatus = function (status) {
            return this.xocdiaminiInfoView.updatePlayerStatus(status);
        };
        //Cap nhat thong tin nguoi choi hien tai
        XocDiaMini3Controller.prototype.updateInfoCurrPlayer = function (data) {
            return this.xocdiaminiInfoView.updateInfoCurrPlayer(data);
        };


        XocDiaMini3Controller.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.xocdiaminiInfoView.updateChip(accID, chip);
        };

        XocDiaMini3Controller.prototype.getPositions = function () {
            return this.xocdiaminiInfoView.getPositions();
        };

        XocDiaMini3Controller.prototype.updateSessionId = function (sID) {
            return this.xocdiaminiInfoView.updateSessionId(sID);
        };

        XocDiaMini3Controller.prototype.updateInfo = function (info, state, time) {
            return this.xocdiaminiInfoView.updateInfo(info, state, time);
        };

        XocDiaMini3Controller.prototype.getIndexUIBetByAccID = function (accID) {
            return this.xocdiaminiInfoView.getIndexUIBetByAccID(accID);
        };

        XocDiaMini3Controller.prototype.getIndexUIBetByPosition = function (position) {
            return this.xocdiaminiInfoView.getIndexUIBetByPosition(position);
        };

        XocDiaMini3Controller.prototype.getTime = function () {
            return this.xocdiaminiInfoView.getTime();
        };

        XocDiaMini3Controller.prototype.playerShowBubbleChat = function (message) {
            return this.xocdiaminiInfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        XocDiaMini3Controller.prototype.registerPlayer = function (playerIndex) {
            return this.xocdiaminiInfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        XocDiaMini3Controller.prototype.unRegisterPlayer = function (playerIndex) {
            return this.xocdiaminiInfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        XocDiaMini3Controller.prototype.resetPlayersResultUI = function () {
            return this.xocdiaminiInfoView.resetPlayersResultUI();
        };
        XocDiaMini3Controller.prototype.totalUserWin = function (amout) {
            return this.xocdiaminiInfoView.totalUserWin(amout);
        };


        //set ket qua cua player
        XocDiaMini3Controller.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.xocdiaminiInfoView.playerResultUI(playerIndex, isWin, amount);
        };

        // HubOn - summaryPlayer
        XocDiaMini3Controller.prototype.summaryPlayer = function (total) {
            return this.xocdiaminiInfoView.summaryPlayer(total);
        };
        // HubOn - vipPlayer
        XocDiaMini3Controller.prototype.vipPlayer = function (dataPlayers) {
            return this.xocdiaminiInfoView.vipPlayer(dataPlayers);
        };
        // HubOn - winResultVip
        XocDiaMini3Controller.prototype.winResultVip = function (dataPlayers) {
            return this.xocdiaminiInfoView.winResultVip(dataPlayers);
        };

        // HubOn - winResult
        XocDiaMini3Controller.prototype.winResult = function (dataPlayers) {
            return this.xocdiaminiInfoView.winResult(dataPlayers);
        };

        XocDiaMini3Controller.prototype.updateTimer = function (time) {
            return this.xocdiaminiInfoView.updateTimer(time);
        };


        //INPUT
        //HubOn playerBet
        XocDiaMini3Controller.prototype.playerBet = function (info) {
            return this.xocdiaminiInputView.playerBet(info);
        };

        XocDiaMini3Controller.prototype.updateInput = function (state) {
            return this.xocdiaminiInputView.updateInput(state);
        };

        XocDiaMini3Controller.prototype.getGateChips = function () {
            return this.xocdiaminiInputView.getGateChips();
        };


        XocDiaMini3Controller.prototype.showLastInput = function (info) {
            return this.xocdiaminiInputView.showLastInput(info);
        };

        XocDiaMini3Controller.prototype.getPlayerBets = function () {
            return this.xocdiaminiInputView.getPlayerBets();
        };

        XocDiaMini3Controller.prototype.playFxDealerPay = function (chipBet) {
            return this.xocdiaminiInputView.playFxDealerPay(chipBet);
        };

        XocDiaMini3Controller.prototype.initGateChip = function () {
            return this.xocdiaminiInputView.initGateChip();
        };


        XocDiaMini3Controller.prototype.playFxPay = function (chipBet) {
            return this.xocdiaminiInputView.playFxPay(chipBet);
        };

        XocDiaMini3Controller.prototype.playFxLost = function (playFxLost) {
            return this.xocdiaminiInputView.playFxLost(playFxLost);
        };

        XocDiaMini3Controller.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.xocdiaminiInputView.playFxUserBet(playerId, indexBet);
        };

        XocDiaMini3Controller.prototype.resetInput = function () {
            return this.xocdiaminiInputView.resetInput();
        };

        XocDiaMini3Controller.prototype.activeAllButtonBet = function (enable) {
            return this.xocdiaminiInputView.activeAllButtonBet(enable);
        };

        XocDiaMini3Controller.prototype.clearAllChip = function () {
            return this.xocdiaminiInputView.clearAllChip();
        };

        //RESULT
        XocDiaMini3Controller.prototype.updateResult = function (players, result, originResult, state, openNow) {
            return this.xocdiaminiResultView.updateResult(players, result, originResult, state, openNow);
        };

        //SOI CAU
        XocDiaMini3Controller.prototype.draw = function (list) {
            if (this.xocdiaminiSoiCauView)
                return this.xocdiaminiSoiCauView.draw(list);
        };

        XocDiaMini3Controller.prototype.resetDraw = function () {
            if (this.xocdiaminiSoiCauView)
                return this.xocdiaminiSoiCauView.resetDraw();
        };

        //CHIP POOL
        XocDiaMini3Controller.prototype.createChip = function () {
            return this.xocdiaminiChipPool.createChip();
        };

        XocDiaMini3Controller.prototype.putToPool = function (node) {
            return this.xocdiaminiChipPool.putToPool(node);
        };

        XocDiaMini3Controller.prototype.clearPool = function () {
            return this.xocdiaminiChipPool.clearPool();
        };

        XocDiaMini3Controller.prototype.updatePositionPlayerUI = function (positions) {
            return this.positionsUI = positions;
        };

        XocDiaMini3Controller.prototype.getPositionsUI = function () {
            return this.positionsUI;
        };

        XocDiaMini3Controller.prototype.initLogBet = function () {
            return this.logBet = [];
        };
        XocDiaMini3Controller.prototype.setLogBet = function (betData) {
            return this.logBet.push(betData);
        };
        XocDiaMini3Controller.prototype.getLogBet = function () {
            return this.logBet;
        };
		
		
		XocDiaMini3Controller.prototype.getShowNodeLon = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeLon();
        };
		XocDiaMini3Controller.prototype.getShowNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeNho();
        };
		XocDiaMini3Controller.prototype.getShowNodeNho2 = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeNho2();
        };
		XocDiaMini3Controller.prototype.getAnNodeLon = function () {
			//console.log("Controller");
            return this.xocdiaminiView.anNodeLon();
        };
		XocDiaMini3Controller.prototype.getAnNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.anNodeNho();
        };
		XocDiaMini3Controller.prototype.getSetPositionNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.setPositionNodeNho();
        };
		
        return XocDiaMini3Controller;

    })();

    cc.XocDiaMini3Controller = XocDiaMini3Controller;

}).call(this);

