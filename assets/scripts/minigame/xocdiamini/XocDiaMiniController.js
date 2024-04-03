/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var XocDiaMiniController;

    XocDiaMiniController = (function () {
        var instance;

        function XocDiaMiniController() {

        }

        instance = void 0;

        XocDiaMiniController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        //SET VIEW
        XocDiaMiniController.prototype.setXocDiaMiniView = function (xocdiaminiView) {
            return this.xocdiaminiView = xocdiaminiView;
        };

        XocDiaMiniController.prototype.setXocDiaMiniSoiCauView = function (xocdiaminiSoiCauView) {
            return this.xocdiaminiSoiCauView = xocdiaminiSoiCauView;
        };

        XocDiaMiniController.prototype.setXocDiaMiniAssets = function (xocdiaminiAssets) {
            return this.xocdiaminiAssets = xocdiaminiAssets;
        };

        XocDiaMiniController.prototype.setXocDiaMiniChipPool = function (xocdiaminiChipPool) {
            return this.xocdiaminiChipPool = xocdiaminiChipPool;
        };


        XocDiaMiniController.prototype.setXocDiaMiniInfoView = function (xocdiaminiInfoView) {
            return this.xocdiaminiInfoView = xocdiaminiInfoView;
        };

        XocDiaMiniController.prototype.setXocDiaMiniInputView = function (xocdiaminiInputView) {
            return this.xocdiaminiInputView = xocdiaminiInputView;
        };

        XocDiaMiniController.prototype.setXocDiaMiniResultView = function (xocdiaminiResultView) {
            return this.xocdiaminiResultView = xocdiaminiResultView;
        };

        //PROPERTY
        XocDiaMiniController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        XocDiaMiniController.prototype.getIsNan = function () {
            return this.isNan;
        };

        XocDiaMiniController.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        XocDiaMiniController.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        XocDiaMiniController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        XocDiaMiniController.prototype.getSID = function () {
            return this.sID;
        };


        //ASSETS
        XocDiaMiniController.prototype.getAssets = function () {
            return this.xocdiaminiAssets;
        };

        XocDiaMiniController.prototype.getWinFont = function () {
            return this.xocdiaminiAssets.getWinFont();
        };

        XocDiaMiniController.prototype.getLoseFont = function () {
            return this.xocdiaminiAssets.getLoseFont();
        };

        XocDiaMiniController.prototype.getChips = function () {
            return this.xocdiaminiAssets.getChips();
        };

        XocDiaMiniController.prototype.getNans = function () {
            return this.xocdiaminiAssets.getNans();
        };

        XocDiaMiniController.prototype.getAvatarDef = function () {
            return this.xocdiaminiAssets.getAvatarDef();
        };

        //XocDiaMini VIEW
        XocDiaMiniController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.xocdiaminiView)
                return this.xocdiaminiView.sendRequestOnHub(method, data1, data2);
        };

        //INFO
        //HubOn joinGame
        XocDiaMiniController.prototype.joinGame = function (info) {
            return this.xocdiaminiInfoView.joinGame(info);
        };
        //HubOn playerJoin
        XocDiaMiniController.prototype.playerJoin = function (info) {
            return this.xocdiaminiInfoView.playerJoin(info);
        };

        //HubOn playerLeave
        XocDiaMiniController.prototype.playerLeave = function (info) {
            this.xocdiaminiInfoView.playerLeave(info);
            this.xocdiaminiView.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        XocDiaMiniController.prototype.updateConnectionStatus = function (info) {
            return this.xocdiaminiInfoView.updateConnectionStatus(info);
        };

        XocDiaMiniController.prototype.updatePlayerStatus = function (status) {
            return this.xocdiaminiInfoView.updatePlayerStatus(status);
        };
        //Cap nhat thong tin nguoi choi hien tai
        XocDiaMiniController.prototype.updateInfoCurrPlayer = function (data) {
            return this.xocdiaminiInfoView.updateInfoCurrPlayer(data);
        };


        XocDiaMiniController.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.xocdiaminiInfoView.updateChip(accID, chip);
        };

        XocDiaMiniController.prototype.getPositions = function () {
            return this.xocdiaminiInfoView.getPositions();
        };

        XocDiaMiniController.prototype.updateSessionId = function (sID) {
            return this.xocdiaminiInfoView.updateSessionId(sID);
        };

        XocDiaMiniController.prototype.updateInfo = function (info, state, time) {
            return this.xocdiaminiInfoView.updateInfo(info, state, time);
        };

        XocDiaMiniController.prototype.getIndexUIBetByAccID = function (accID) {
            return this.xocdiaminiInfoView.getIndexUIBetByAccID(accID);
        };

        XocDiaMiniController.prototype.getIndexUIBetByPosition = function (position) {
            return this.xocdiaminiInfoView.getIndexUIBetByPosition(position);
        };

        XocDiaMiniController.prototype.getTime = function () {
            return this.xocdiaminiInfoView.getTime();
        };

        XocDiaMiniController.prototype.playerShowBubbleChat = function (message) {
            return this.xocdiaminiInfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        XocDiaMiniController.prototype.registerPlayer = function (playerIndex) {
            return this.xocdiaminiInfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        XocDiaMiniController.prototype.unRegisterPlayer = function (playerIndex) {
            return this.xocdiaminiInfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        XocDiaMiniController.prototype.resetPlayersResultUI = function () {
            return this.xocdiaminiInfoView.resetPlayersResultUI();
        };
        XocDiaMiniController.prototype.totalUserWin = function (amout) {
            return this.xocdiaminiInfoView.totalUserWin(amout);
        };


        //set ket qua cua player
        XocDiaMiniController.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.xocdiaminiInfoView.playerResultUI(playerIndex, isWin, amount);
        };

        // HubOn - summaryPlayer
        XocDiaMiniController.prototype.summaryPlayer = function (total) {
            return this.xocdiaminiInfoView.summaryPlayer(total);
        };
        // HubOn - vipPlayer
        XocDiaMiniController.prototype.vipPlayer = function (dataPlayers) {
            return this.xocdiaminiInfoView.vipPlayer(dataPlayers);
        };
        // HubOn - winResultVip
        XocDiaMiniController.prototype.winResultVip = function (dataPlayers) {
            return this.xocdiaminiInfoView.winResultVip(dataPlayers);
        };

        // HubOn - winResult
        XocDiaMiniController.prototype.winResult = function (dataPlayers) {
            return this.xocdiaminiInfoView.winResult(dataPlayers);
        };

        XocDiaMiniController.prototype.updateTimer = function (time) {
            return this.xocdiaminiInfoView.updateTimer(time);
        };


        //INPUT
        //HubOn playerBet
        XocDiaMiniController.prototype.playerBet = function (info) {
            return this.xocdiaminiInputView.playerBet(info);
        };

        XocDiaMiniController.prototype.updateInput = function (state) {
            return this.xocdiaminiInputView.updateInput(state);
        };

        XocDiaMiniController.prototype.getGateChips = function () {
            return this.xocdiaminiInputView.getGateChips();
        };


        XocDiaMiniController.prototype.showLastInput = function (info) {
            return this.xocdiaminiInputView.showLastInput(info);
        };

        XocDiaMiniController.prototype.getPlayerBets = function () {
            return this.xocdiaminiInputView.getPlayerBets();
        };

        XocDiaMiniController.prototype.playFxDealerPay = function (chipBet) {
            return this.xocdiaminiInputView.playFxDealerPay(chipBet);
        };

        XocDiaMiniController.prototype.initGateChip = function () {
            return this.xocdiaminiInputView.initGateChip();
        };


        XocDiaMiniController.prototype.playFxPay = function (chipBet) {
            return this.xocdiaminiInputView.playFxPay(chipBet);
        };

        XocDiaMiniController.prototype.playFxLost = function (playFxLost) {
            return this.xocdiaminiInputView.playFxLost(playFxLost);
        };

        XocDiaMiniController.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.xocdiaminiInputView.playFxUserBet(playerId, indexBet);
        };

        XocDiaMiniController.prototype.resetInput = function () {
            return this.xocdiaminiInputView.resetInput();
        };

        XocDiaMiniController.prototype.activeAllButtonBet = function (enable) {
            return this.xocdiaminiInputView.activeAllButtonBet(enable);
        };

        XocDiaMiniController.prototype.clearAllChip = function () {
            return this.xocdiaminiInputView.clearAllChip();
        };

        //RESULT
        XocDiaMiniController.prototype.updateResult = function (players, result, originResult, state, openNow) {
            return this.xocdiaminiResultView.updateResult(players, result, originResult, state, openNow);
        };

        //SOI CAU
        XocDiaMiniController.prototype.draw = function (list) {
            if (this.xocdiaminiSoiCauView)
                return this.xocdiaminiSoiCauView.draw(list);
        };

        XocDiaMiniController.prototype.resetDraw = function () {
            if (this.xocdiaminiSoiCauView)
                return this.xocdiaminiSoiCauView.resetDraw();
        };

        //CHIP POOL
        XocDiaMiniController.prototype.createChip = function () {
            return this.xocdiaminiChipPool.createChip();
        };

        XocDiaMiniController.prototype.putToPool = function (node) {
            return this.xocdiaminiChipPool.putToPool(node);
        };

        XocDiaMiniController.prototype.clearPool = function () {
            return this.xocdiaminiChipPool.clearPool();
        };

        XocDiaMiniController.prototype.updatePositionPlayerUI = function (positions) {
            return this.positionsUI = positions;
        };

        XocDiaMiniController.prototype.getPositionsUI = function () {
            return this.positionsUI;
        };

        XocDiaMiniController.prototype.initLogBet = function () {
            return this.logBet = [];
        };
        XocDiaMiniController.prototype.setLogBet = function (betData) {
            return this.logBet.push(betData);
        };
        XocDiaMiniController.prototype.getLogBet = function () {
            return this.logBet;
        };
		
		XocDiaMiniController.prototype.getShowNodeLon = function () {
			///console.log("Controller");
            return this.xocdiaminiView.showNodeLon();
        };
		XocDiaMiniController.prototype.getShowNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeNho();
        };
		XocDiaMiniController.prototype.getShowNodeNho2 = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeNho2();
        };
		XocDiaMiniController.prototype.getAnNodeLon = function () {
			//console.log("Controller");
            return this.xocdiaminiView.anNodeLon();
        };
		XocDiaMiniController.prototype.getAnNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.anNodeNho();
        };
		XocDiaMiniController.prototype.getSetPositionNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.setPositionNodeNho();
        };
		XocDiaMiniController.prototype.getSetPositionNodeNhoTop1 = function () {
			//console.log("Controller");
            return this.xocdiaminiView.setPositionNodeNhoTop1();
        };
		

        return XocDiaMiniController;

    })();

    cc.XocDiaMiniController = XocDiaMiniController;

}).call(this);

