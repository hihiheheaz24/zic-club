/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var XocDiaMini4Controller;

    XocDiaMini4Controller = (function () {
        var instance;

        function XocDiaMini4Controller() {

        }

        instance = void 0;

        XocDiaMini4Controller.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        //SET VIEW
        XocDiaMini4Controller.prototype.setXocDiaMini4View = function (xocdiaminiView) {
            return this.xocdiaminiView = xocdiaminiView;
        };

        XocDiaMini4Controller.prototype.setXocDiaMini4SoiCauView = function (xocdiaminiSoiCauView) {
            return this.xocdiaminiSoiCauView = xocdiaminiSoiCauView;
        };

        XocDiaMini4Controller.prototype.setXocDiaMini4Assets = function (xocdiaminiAssets) {
            return this.xocdiaminiAssets = xocdiaminiAssets;
        };

        XocDiaMini4Controller.prototype.setXocDiaMini4ChipPool = function (xocdiaminiChipPool) {
            return this.xocdiaminiChipPool = xocdiaminiChipPool;
        };


        XocDiaMini4Controller.prototype.setXocDiaMini4InfoView = function (xocdiaminiInfoView) {
            return this.xocdiaminiInfoView = xocdiaminiInfoView;
        };

        XocDiaMini4Controller.prototype.setXocDiaMini4InputView = function (xocdiaminiInputView) {
            return this.xocdiaminiInputView = xocdiaminiInputView;
        };

        XocDiaMini4Controller.prototype.setXocDiaMini4ResultView = function (xocdiaminiResultView) {
            return this.xocdiaminiResultView = xocdiaminiResultView;
        };

        //PROPERTY
        XocDiaMini4Controller.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        XocDiaMini4Controller.prototype.getIsNan = function () {
            return this.isNan;
        };

        XocDiaMini4Controller.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        XocDiaMini4Controller.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        XocDiaMini4Controller.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        XocDiaMini4Controller.prototype.getSID = function () {
            return this.sID;
        };


        //ASSETS
        XocDiaMini4Controller.prototype.getAssets = function () {
            return this.xocdiaminiAssets;
        };

        XocDiaMini4Controller.prototype.getWinFont = function () {
            return this.xocdiaminiAssets.getWinFont();
        };

        XocDiaMini4Controller.prototype.getLoseFont = function () {
            return this.xocdiaminiAssets.getLoseFont();
        };

        XocDiaMini4Controller.prototype.getChips = function () {
            return this.xocdiaminiAssets.getChips();
        };

        XocDiaMini4Controller.prototype.getNans = function () {
            return this.xocdiaminiAssets.getNans();
        };

        XocDiaMini4Controller.prototype.getAvatarDef = function () {
            return this.xocdiaminiAssets.getAvatarDef();
        };

        //XocDiaMini4 VIEW
        XocDiaMini4Controller.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.xocdiaminiView)
                return this.xocdiaminiView.sendRequestOnHub(method, data1, data2);
        };

        //INFO
        //HubOn joinGame
        XocDiaMini4Controller.prototype.joinGame = function (info) {
            return this.xocdiaminiInfoView.joinGame(info);
        };
        //HubOn playerJoin
        XocDiaMini4Controller.prototype.playerJoin = function (info) {
            return this.xocdiaminiInfoView.playerJoin(info);
        };

        //HubOn playerLeave
        XocDiaMini4Controller.prototype.playerLeave = function (info) {
            this.xocdiaminiInfoView.playerLeave(info);
            this.xocdiaminiView.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        XocDiaMini4Controller.prototype.updateConnectionStatus = function (info) {
            return this.xocdiaminiInfoView.updateConnectionStatus(info);
        };

        XocDiaMini4Controller.prototype.updatePlayerStatus = function (status) {
            return this.xocdiaminiInfoView.updatePlayerStatus(status);
        };
        //Cap nhat thong tin nguoi choi hien tai
        XocDiaMini4Controller.prototype.updateInfoCurrPlayer = function (data) {
            return this.xocdiaminiInfoView.updateInfoCurrPlayer(data);
        };


        XocDiaMini4Controller.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.xocdiaminiInfoView.updateChip(accID, chip);
        };

        XocDiaMini4Controller.prototype.getPositions = function () {
            return this.xocdiaminiInfoView.getPositions();
        };

        XocDiaMini4Controller.prototype.updateSessionId = function (sID) {
            return this.xocdiaminiInfoView.updateSessionId(sID);
        };

        XocDiaMini4Controller.prototype.updateInfo = function (info, state, time) {
            return this.xocdiaminiInfoView.updateInfo(info, state, time);
        };

        XocDiaMini4Controller.prototype.getIndexUIBetByAccID = function (accID) {
            return this.xocdiaminiInfoView.getIndexUIBetByAccID(accID);
        };

        XocDiaMini4Controller.prototype.getIndexUIBetByPosition = function (position) {
            return this.xocdiaminiInfoView.getIndexUIBetByPosition(position);
        };

        XocDiaMini4Controller.prototype.getTime = function () {
            return this.xocdiaminiInfoView.getTime();
        };

        XocDiaMini4Controller.prototype.playerShowBubbleChat = function (message) {
            return this.xocdiaminiInfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        XocDiaMini4Controller.prototype.registerPlayer = function (playerIndex) {
            return this.xocdiaminiInfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        XocDiaMini4Controller.prototype.unRegisterPlayer = function (playerIndex) {
            return this.xocdiaminiInfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        XocDiaMini4Controller.prototype.resetPlayersResultUI = function () {
            return this.xocdiaminiInfoView.resetPlayersResultUI();
        };
        XocDiaMini4Controller.prototype.totalUserWin = function (amout) {
            return this.xocdiaminiInfoView.totalUserWin(amout);
        };


        //set ket qua cua player
        XocDiaMini4Controller.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.xocdiaminiInfoView.playerResultUI(playerIndex, isWin, amount);
        };

        // HubOn - summaryPlayer
        XocDiaMini4Controller.prototype.summaryPlayer = function (total) {
            return this.xocdiaminiInfoView.summaryPlayer(total);
        };
        // HubOn - vipPlayer
        XocDiaMini4Controller.prototype.vipPlayer = function (dataPlayers) {
            return this.xocdiaminiInfoView.vipPlayer(dataPlayers);
        };
        // HubOn - winResultVip
        XocDiaMini4Controller.prototype.winResultVip = function (dataPlayers) {
            return this.xocdiaminiInfoView.winResultVip(dataPlayers);
        };

        // HubOn - winResult
        XocDiaMini4Controller.prototype.winResult = function (dataPlayers) {
            return this.xocdiaminiInfoView.winResult(dataPlayers);
        };

        XocDiaMini4Controller.prototype.updateTimer = function (time) {
            return this.xocdiaminiInfoView.updateTimer(time);
        };


        //INPUT
        //HubOn playerBet
        XocDiaMini4Controller.prototype.playerBet = function (info) {
            return this.xocdiaminiInputView.playerBet(info);
        };

        XocDiaMini4Controller.prototype.updateInput = function (state) {
            return this.xocdiaminiInputView.updateInput(state);
        };

        XocDiaMini4Controller.prototype.getGateChips = function () {
            return this.xocdiaminiInputView.getGateChips();
        };


        XocDiaMini4Controller.prototype.showLastInput = function (info) {
            return this.xocdiaminiInputView.showLastInput(info);
        };

        XocDiaMini4Controller.prototype.getPlayerBets = function () {
            return this.xocdiaminiInputView.getPlayerBets();
        };

        XocDiaMini4Controller.prototype.playFxDealerPay = function (chipBet) {
            return this.xocdiaminiInputView.playFxDealerPay(chipBet);
        };

        XocDiaMini4Controller.prototype.initGateChip = function () {
            return this.xocdiaminiInputView.initGateChip();
        };


        XocDiaMini4Controller.prototype.playFxPay = function (chipBet) {
            return this.xocdiaminiInputView.playFxPay(chipBet);
        };

        XocDiaMini4Controller.prototype.playFxLost = function (playFxLost) {
            return this.xocdiaminiInputView.playFxLost(playFxLost);
        };

        XocDiaMini4Controller.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.xocdiaminiInputView.playFxUserBet(playerId, indexBet);
        };

        XocDiaMini4Controller.prototype.resetInput = function () {
            return this.xocdiaminiInputView.resetInput();
        };

        XocDiaMini4Controller.prototype.activeAllButtonBet = function (enable) {
            return this.xocdiaminiInputView.activeAllButtonBet(enable);
        };

        XocDiaMini4Controller.prototype.clearAllChip = function () {
            return this.xocdiaminiInputView.clearAllChip();
        };

        //RESULT
        XocDiaMini4Controller.prototype.updateResult = function (players, result, originResult, state, openNow) {
            return this.xocdiaminiResultView.updateResult(players, result, originResult, state, openNow);
        };

        //SOI CAU
        XocDiaMini4Controller.prototype.draw = function (list) {
            if (this.xocdiaminiSoiCauView)
                return this.xocdiaminiSoiCauView.draw(list);
        };

        XocDiaMini4Controller.prototype.resetDraw = function () {
            if (this.xocdiaminiSoiCauView)
                return this.xocdiaminiSoiCauView.resetDraw();
        };

        //CHIP POOL
        XocDiaMini4Controller.prototype.createChip = function () {
            return this.xocdiaminiChipPool.createChip();
        };

        XocDiaMini4Controller.prototype.putToPool = function (node) {
            return this.xocdiaminiChipPool.putToPool(node);
        };

        XocDiaMini4Controller.prototype.clearPool = function () {
            return this.xocdiaminiChipPool.clearPool();
        };

        XocDiaMini4Controller.prototype.updatePositionPlayerUI = function (positions) {
            return this.positionsUI = positions;
        };

        XocDiaMini4Controller.prototype.getPositionsUI = function () {
            return this.positionsUI;
        };

        XocDiaMini4Controller.prototype.initLogBet = function () {
            return this.logBet = [];
        };
        XocDiaMini4Controller.prototype.setLogBet = function (betData) {
            return this.logBet.push(betData);
        };
        XocDiaMini4Controller.prototype.getLogBet = function () {
            return this.logBet;
        };
		
		XocDiaMini4Controller.prototype.initLogBet = function () {
            return this.logBet = [];
        };
        XocDiaMini4Controller.prototype.setLogBet = function (betData) {
            return this.logBet.push(betData);
        };
        XocDiaMini4Controller.prototype.getLogBet = function () {
            return this.logBet;
        };
		
		
		XocDiaMini4Controller.prototype.getShowNodeLon = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeLon();
        };
		XocDiaMini4Controller.prototype.getShowNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeNho();
        };
		XocDiaMini4Controller.prototype.getShowNodeNho2 = function () {
			//console.log("Controller");
            return this.xocdiaminiView.showNodeNho2();
        };
		XocDiaMini4Controller.prototype.getAnNodeLon = function () {
			//console.log("Controller");
            return this.xocdiaminiView.anNodeLon();
        };
		XocDiaMini4Controller.prototype.getAnNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.anNodeNho();
        };
		XocDiaMini4Controller.prototype.getSetPositionNodeNho = function () {
			//console.log("Controller");
            return this.xocdiaminiView.setPositionNodeNho();
        };
		
        return XocDiaMini4Controller;

    })();

    cc.XocDiaMini4Controller = XocDiaMini4Controller;

}).call(this);

