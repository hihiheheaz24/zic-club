/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var XocDiaMini2Controller;

    XocDiaMini2Controller = (function () {
        var instance;

        function XocDiaMini2Controller() {

        }

        instance = void 0;

        XocDiaMini2Controller.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        //SET VIEW
        XocDiaMini2Controller.prototype.setXocDiaMini2View = function (xocdiaminiView) {
            return this.xocdiaminiView = xocdiaminiView;
        };

        XocDiaMini2Controller.prototype.setXocDiaMini2SoiCauView = function (xocdiaminiSoiCauView) {
            return this.xocdiaminiSoiCauView = xocdiaminiSoiCauView;
        };

        XocDiaMini2Controller.prototype.setXocDiaMini2Assets = function (xocdiaminiAssets) {
            return this.xocdiaminiAssets = xocdiaminiAssets;
        };

        XocDiaMini2Controller.prototype.setXocDiaMini2ChipPool = function (xocdiaminiChipPool) {
            return this.xocdiaminiChipPool = xocdiaminiChipPool;
        };


        XocDiaMini2Controller.prototype.setXocDiaMini2InfoView = function (xocdiaminiInfoView) {
            return this.xocdiaminiInfoView = xocdiaminiInfoView;
        };

        XocDiaMini2Controller.prototype.setXocDiaMini2InputView = function (xocdiaminiInputView) {
            return this.xocdiaminiInputView = xocdiaminiInputView;
        };

        XocDiaMini2Controller.prototype.setXocDiaMini2ResultView = function (xocdiaminiResultView) {
            return this.xocdiaminiResultView = xocdiaminiResultView;
        };

        //PROPERTY
        XocDiaMini2Controller.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        XocDiaMini2Controller.prototype.getIsNan = function () {
            return this.isNan;
        };

        XocDiaMini2Controller.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        XocDiaMini2Controller.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        XocDiaMini2Controller.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        XocDiaMini2Controller.prototype.getSID = function () {
            return this.sID;
        };


        //ASSETS
        XocDiaMini2Controller.prototype.getAssets = function () {
            return this.xocdiaminiAssets;
        };

        XocDiaMini2Controller.prototype.getWinFont = function () {
            return this.xocdiaminiAssets.getWinFont();
        };

        XocDiaMini2Controller.prototype.getLoseFont = function () {
            return this.xocdiaminiAssets.getLoseFont();
        };

        XocDiaMini2Controller.prototype.getChips = function () {
            return this.xocdiaminiAssets.getChips();
        };

        XocDiaMini2Controller.prototype.getNans = function () {
            return this.xocdiaminiAssets.getNans();
        };

        XocDiaMini2Controller.prototype.getAvatarDef = function () {
            return this.xocdiaminiAssets.getAvatarDef();
        };

        //XocDiaMini2 VIEW
        XocDiaMini2Controller.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.xocdiaminiView)
                return this.xocdiaminiView.sendRequestOnHub(method, data1, data2);
        };

        //INFO
        //HubOn joinGame
        XocDiaMini2Controller.prototype.joinGame = function (info) {
            return this.xocdiaminiInfoView.joinGame(info);
        };
        //HubOn playerJoin
        XocDiaMini2Controller.prototype.playerJoin = function (info) {
            return this.xocdiaminiInfoView.playerJoin(info);
        };

        //HubOn playerLeave
        XocDiaMini2Controller.prototype.playerLeave = function (info) {
            this.xocdiaminiInfoView.playerLeave(info);
            this.xocdiaminiView.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        XocDiaMini2Controller.prototype.updateConnectionStatus = function (info) {
            return this.xocdiaminiInfoView.updateConnectionStatus(info);
        };

        XocDiaMini2Controller.prototype.updatePlayerStatus = function (status) {
            return this.xocdiaminiInfoView.updatePlayerStatus(status);
        };
        //Cap nhat thong tin nguoi choi hien tai
        XocDiaMini2Controller.prototype.updateInfoCurrPlayer = function (data) {
            return this.xocdiaminiInfoView.updateInfoCurrPlayer(data);
        };


        XocDiaMini2Controller.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.xocdiaminiInfoView.updateChip(accID, chip);
        };

        XocDiaMini2Controller.prototype.getPositions = function () {
            return this.xocdiaminiInfoView.getPositions();
        };

        XocDiaMini2Controller.prototype.updateSessionId = function (sID) {
            return this.xocdiaminiInfoView.updateSessionId(sID);
        };

        XocDiaMini2Controller.prototype.updateInfo = function (info, state, time) {
            return this.xocdiaminiInfoView.updateInfo(info, state, time);
        };

        XocDiaMini2Controller.prototype.getIndexUIBetByAccID = function (accID) {
            return this.xocdiaminiInfoView.getIndexUIBetByAccID(accID);
        };

        XocDiaMini2Controller.prototype.getIndexUIBetByPosition = function (position) {
            return this.xocdiaminiInfoView.getIndexUIBetByPosition(position);
        };

        XocDiaMini2Controller.prototype.getTime = function () {
            return this.xocdiaminiInfoView.getTime();
        };

        XocDiaMini2Controller.prototype.playerShowBubbleChat = function (message) {
            return this.xocdiaminiInfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        XocDiaMini2Controller.prototype.registerPlayer = function (playerIndex) {
            return this.xocdiaminiInfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        XocDiaMini2Controller.prototype.unRegisterPlayer = function (playerIndex) {
            return this.xocdiaminiInfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        XocDiaMini2Controller.prototype.resetPlayersResultUI = function () {
            return this.xocdiaminiInfoView.resetPlayersResultUI();
        };
        XocDiaMini2Controller.prototype.totalUserWin = function (amout) {
            return this.xocdiaminiInfoView.totalUserWin(amout);
        };


        //set ket qua cua player
        XocDiaMini2Controller.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.xocdiaminiInfoView.playerResultUI(playerIndex, isWin, amount);
        };

        // HubOn - summaryPlayer
        XocDiaMini2Controller.prototype.summaryPlayer = function (total) {
            return this.xocdiaminiInfoView.summaryPlayer(total);
        };
        // HubOn - vipPlayer
        XocDiaMini2Controller.prototype.vipPlayer = function (dataPlayers) {
            return this.xocdiaminiInfoView.vipPlayer(dataPlayers);
        };
        // HubOn - winResultVip
        XocDiaMini2Controller.prototype.winResultVip = function (dataPlayers) {
            return this.xocdiaminiInfoView.winResultVip(dataPlayers);
        };

        // HubOn - winResult
        XocDiaMini2Controller.prototype.winResult = function (dataPlayers) {
            return this.xocdiaminiInfoView.winResult(dataPlayers);
        };

        XocDiaMini2Controller.prototype.updateTimer = function (time) {
            return this.xocdiaminiInfoView.updateTimer(time);
        };


        //INPUT
        //HubOn playerBet
        XocDiaMini2Controller.prototype.playerBet = function (info) {
            return this.xocdiaminiInputView.playerBet(info);
        };

        XocDiaMini2Controller.prototype.updateInput = function (state) {
            return this.xocdiaminiInputView.updateInput(state);
        };

        XocDiaMini2Controller.prototype.getGateChips = function () {
            return this.xocdiaminiInputView.getGateChips();
        };


        XocDiaMini2Controller.prototype.showLastInput = function (info) {
            return this.xocdiaminiInputView.showLastInput(info);
        };

        XocDiaMini2Controller.prototype.getPlayerBets = function () {
            return this.xocdiaminiInputView.getPlayerBets();
        };

        XocDiaMini2Controller.prototype.playFxDealerPay = function (chipBet) {
            return this.xocdiaminiInputView.playFxDealerPay(chipBet);
        };

        XocDiaMini2Controller.prototype.initGateChip = function () {
            return this.xocdiaminiInputView.initGateChip();
        };


        XocDiaMini2Controller.prototype.playFxPay = function (chipBet) {
            return this.xocdiaminiInputView.playFxPay(chipBet);
        };

        XocDiaMini2Controller.prototype.playFxLost = function (playFxLost) {
            return this.xocdiaminiInputView.playFxLost(playFxLost);
        };

        XocDiaMini2Controller.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.xocdiaminiInputView.playFxUserBet(playerId, indexBet);
        };

        XocDiaMini2Controller.prototype.resetInput = function () {
            return this.xocdiaminiInputView.resetInput();
        };

        XocDiaMini2Controller.prototype.activeAllButtonBet = function (enable) {
            return this.xocdiaminiInputView.activeAllButtonBet(enable);
        };

        XocDiaMini2Controller.prototype.clearAllChip = function () {
            return this.xocdiaminiInputView.clearAllChip();
        };

        //RESULT
        XocDiaMini2Controller.prototype.updateResult = function (players, result, originResult, state, openNow) {
            return this.xocdiaminiResultView.updateResult(players, result, originResult, state, openNow);
        };

        //SOI CAU
        XocDiaMini2Controller.prototype.draw = function (list) {
            if (this.xocdiaminiSoiCauView)
                return this.xocdiaminiSoiCauView.draw(list);
        };

        XocDiaMini2Controller.prototype.resetDraw = function () {
            if (this.xocdiaminiSoiCauView)
                return this.xocdiaminiSoiCauView.resetDraw();
        };

        //CHIP POOL
        XocDiaMini2Controller.prototype.createChip = function () {
            return this.xocdiaminiChipPool.createChip();
        };

        XocDiaMini2Controller.prototype.putToPool = function (node) {
            return this.xocdiaminiChipPool.putToPool(node);
        };

        XocDiaMini2Controller.prototype.clearPool = function () {
            return this.xocdiaminiChipPool.clearPool();
        };

        XocDiaMini2Controller.prototype.updatePositionPlayerUI = function (positions) {
            return this.positionsUI = positions;
        };

        XocDiaMini2Controller.prototype.getPositionsUI = function () {
            return this.positionsUI;
        };

        XocDiaMini2Controller.prototype.initLogBet = function () {
            return this.logBet = [];
        };
        XocDiaMini2Controller.prototype.setLogBet = function (betData) {
            return this.logBet.push(betData);
        };
        XocDiaMini2Controller.prototype.getLogBet = function () {
            return this.logBet;
        };
		
		
		XocDiaMini2Controller.prototype.getShowNodeLon = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeLon();
        };
		XocDiaMini2Controller.prototype.getShowNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeNho();
        };
		XocDiaMini2Controller.prototype.getShowNodeNho2 = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeNho2();
        };
		XocDiaMini2Controller.prototype.getAnNodeLon = function () {
			//console.log("Controller");
            return this.xocdiaminiView.anNodeLon();
        };
		XocDiaMini2Controller.prototype.getAnNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.anNodeNho();
        };
		XocDiaMini2Controller.prototype.getSetPositionNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.setPositionNodeNho();
        };
		
		
        return XocDiaMini2Controller;

    })();

    cc.XocDiaMini2Controller = XocDiaMini2Controller;

}).call(this);

