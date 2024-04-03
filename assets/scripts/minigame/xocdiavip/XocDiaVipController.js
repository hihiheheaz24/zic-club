/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var XocDiaVipController;

    XocDiaVipController = (function () {
        var instance;

        function XocDiaVipController() {

        }

        instance = void 0;

        XocDiaVipController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };
		
        //SET VIEW
        XocDiaVipController.prototype.setXocDiaVipView = function (xocdiavipView) {
            return this.xocdiavipView = xocdiavipView;
        };

        XocDiaVipController.prototype.setXocDiaVipSoiCauView = function (xocdiavipSoiCauView) {
            return this.xocdiavipSoiCauView = xocdiavipSoiCauView;
        };

        XocDiaVipController.prototype.setXocDiaVipAssets = function (xocdiavipAssets) {
            return this.xocdiavipAssets = xocdiavipAssets;
        };

        XocDiaVipController.prototype.setXocDiaVipChipPool = function (xocdiavipChipPool) {
            return this.xocdiavipChipPool = xocdiavipChipPool;
        };


        XocDiaVipController.prototype.setXocDiaVipInfoView = function (xocdiavipInfoView) {
            return this.xocdiavipInfoView = xocdiavipInfoView;
        };

        XocDiaVipController.prototype.setXocDiaVipInputView = function (xocdiavipInputView) {
            return this.xocdiavipInputView = xocdiavipInputView;
        };

        XocDiaVipController.prototype.setXocDiaVipResultView = function (xocdiavipResultView) {
            return this.xocdiavipResultView = xocdiavipResultView;
        };

        //PROPERTY
        XocDiaVipController.prototype.setIsNan = function (isNan) {
            return this.isNan = isNan;
        };

        XocDiaVipController.prototype.getIsNan = function () {
            return this.isNan;
        };

        XocDiaVipController.prototype.setLastBetData = function (lastBetData) {
            return this.lastBetData = lastBetData;
        };

        XocDiaVipController.prototype.getLastBetData = function () {
            return this.lastBetData;
        };

        XocDiaVipController.prototype.setSID = function (sID) {
            return this.sID = sID;
        };

        XocDiaVipController.prototype.getSID = function () {
            return this.sID;
        };


        //ASSETS
        XocDiaVipController.prototype.getAssets = function () {
            return this.xocdiavipAssets;
        };

        XocDiaVipController.prototype.getWinFont = function () {
            return this.xocdiavipAssets.getWinFont();
        };

        XocDiaVipController.prototype.getLoseFont = function () {
            return this.xocdiavipAssets.getLoseFont();
        };

        XocDiaVipController.prototype.getChips = function () {
            return this.xocdiavipAssets.getChips();
        };

        XocDiaVipController.prototype.getNans = function () {
            return this.xocdiavipAssets.getNans();
        };

        XocDiaVipController.prototype.getAvatarDef = function () {
            return this.xocdiavipAssets.getAvatarDef();
        };

        //XocDiaVip VIEW
        XocDiaVipController.prototype.sendRequestOnHub = function (method, data1, data2) {
            if (this.xocdiavipView)
                return this.xocdiavipView.sendRequestOnHub(method, data1, data2);
        };

        //INFO
        //HubOn joinGame
        XocDiaVipController.prototype.joinGame = function (info) {
            return this.xocdiavipInfoView.joinGame(info);
        };
        //HubOn playerJoin
        XocDiaVipController.prototype.playerJoin = function (info) {
            return this.xocdiavipInfoView.playerJoin(info);
        };

        //HubOn playerLeave
        XocDiaVipController.prototype.playerLeave = function (info) {
            this.xocdiavipInfoView.playerLeave(info);
            this.xocdiavipView.playerLeave(info);
        };

        //HubOn updateConnectionStatus
        XocDiaVipController.prototype.updateConnectionStatus = function (info) {
            return this.xocdiavipInfoView.updateConnectionStatus(info);
        };

        XocDiaVipController.prototype.updatePlayerStatus = function (status) {
            return this.xocdiavipInfoView.updatePlayerStatus(status);
        };
        //Cap nhat thong tin nguoi choi hien tai
        XocDiaVipController.prototype.updateInfoCurrPlayer = function (data) {
            return this.xocdiavipInfoView.updateInfoCurrPlayer(data);
        };


        XocDiaVipController.prototype.updateChip = function (accID, chip) {
            //neu la owner thi update ca realBal
            if (accID === cc.LoginController.getInstance().getUserId()) {
                cc.BalanceController.getInstance().updateRealBalance(chip);
            }
            return this.xocdiavipInfoView.updateChip(accID, chip);
        };

        XocDiaVipController.prototype.getPositions = function () {
            return this.xocdiavipInfoView.getPositions();
        };

        XocDiaVipController.prototype.updateSessionId = function (sID) {
            return this.xocdiavipInfoView.updateSessionId(sID);
        };

        XocDiaVipController.prototype.updateInfo = function (info, state, time) {
            return this.xocdiavipInfoView.updateInfo(info, state, time);
        };

        XocDiaVipController.prototype.getIndexUIBetByAccID = function (accID) {
            return this.xocdiavipInfoView.getIndexUIBetByAccID(accID);
        };

        XocDiaVipController.prototype.getIndexUIBetByPosition = function (position) {
            return this.xocdiavipInfoView.getIndexUIBetByPosition(position);
        };

        XocDiaVipController.prototype.getTime = function () {
            return this.xocdiavipInfoView.getTime();
        };

        XocDiaVipController.prototype.playerShowBubbleChat = function (message) {
            return this.xocdiavipInfoView.playerShowBubbleChat(message);
        };

        //player vao phong
        XocDiaVipController.prototype.registerPlayer = function (playerIndex) {
            return this.xocdiavipInfoView.registerPlayer(playerIndex);
        };

        //player thoat khoi phong
        XocDiaVipController.prototype.unRegisterPlayer = function (playerIndex) {
            return this.xocdiavipInfoView.unRegisterPlayer(playerIndex);
        };

        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        XocDiaVipController.prototype.resetPlayersResultUI = function () {
            return this.xocdiavipInfoView.resetPlayersResultUI();
        };
        XocDiaVipController.prototype.totalUserWin = function (amout) {
            return this.xocdiavipInfoView.totalUserWin(amout);
        };


        //set ket qua cua player
        XocDiaVipController.prototype.playerResultUI = function (playerIndex, isWin, amount) {
            return this.xocdiavipInfoView.playerResultUI(playerIndex, isWin, amount);
        };

        // HubOn - summaryPlayer
        XocDiaVipController.prototype.summaryPlayer = function (total) {
            return this.xocdiavipInfoView.summaryPlayer(total);
        };
        // HubOn - vipPlayer
        XocDiaVipController.prototype.vipPlayer = function (dataPlayers) {
            return this.xocdiavipInfoView.vipPlayer(dataPlayers);
        };
        // HubOn - winResultVip
        XocDiaVipController.prototype.winResultVip = function (dataPlayers) {
            return this.xocdiavipInfoView.winResultVip(dataPlayers);
        };

        // HubOn - winResult
        XocDiaVipController.prototype.winResult = function (dataPlayers) {
            return this.xocdiavipInfoView.winResult(dataPlayers);
        };

        XocDiaVipController.prototype.updateTimer = function (time) {
            return this.xocdiavipInfoView.updateTimer(time);
        };


        //INPUT
        //HubOn playerBet
        XocDiaVipController.prototype.playerBet = function (info) {
            return this.xocdiavipInputView.playerBet(info);
        };

        XocDiaVipController.prototype.updateInput = function (state) {
            return this.xocdiavipInputView.updateInput(state);
        };

        XocDiaVipController.prototype.getGateChips = function () {
            return this.xocdiavipInputView.getGateChips();
        };


        XocDiaVipController.prototype.showLastInput = function (info) {
            return this.xocdiavipInputView.showLastInput(info);
        };

        XocDiaVipController.prototype.getPlayerBets = function () {
            return this.xocdiavipInputView.getPlayerBets();
        };

        XocDiaVipController.prototype.playFxDealerPay = function (chipBet) {
            return this.xocdiavipInputView.playFxDealerPay(chipBet);
        };

        XocDiaVipController.prototype.initGateChip = function () {
            return this.xocdiavipInputView.initGateChip();
        };


        XocDiaVipController.prototype.playFxPay = function (chipBet) {
            return this.xocdiavipInputView.playFxPay(chipBet);
        };

        XocDiaVipController.prototype.playFxLost = function (playFxLost) {
            return this.xocdiavipInputView.playFxLost(playFxLost);
        };

        XocDiaVipController.prototype.playFxUserBet = function (playerId, indexBet) {
            return this.xocdiavipInputView.playFxUserBet(playerId, indexBet);
        };

        XocDiaVipController.prototype.resetInput = function () {
            return this.xocdiavipInputView.resetInput();
        };

        XocDiaVipController.prototype.activeAllButtonBet = function (enable) {
            return this.xocdiavipInputView.activeAllButtonBet(enable);
        };

        XocDiaVipController.prototype.clearAllChip = function () {
            return this.xocdiavipInputView.clearAllChip();
        };

        //RESULT
        XocDiaVipController.prototype.updateResult = function (players, result, originResult, state, openNow) {
            return this.xocdiavipResultView.updateResult(players, result, originResult, state, openNow);
        };

        //SOI CAU
        XocDiaVipController.prototype.draw = function (list) {
            return this.xocdiavipSoiCauView.draw(list);
        };

        XocDiaVipController.prototype.resetDraw = function () {
            return this.xocdiavipSoiCauView.resetDraw();
        };

        //CHIP POOL
        XocDiaVipController.prototype.createChip = function () {
            return this.xocdiavipChipPool.createChip();
        };

        XocDiaVipController.prototype.putToPool = function (node) {
            return this.xocdiavipChipPool.putToPool(node);
        };

        XocDiaVipController.prototype.clearPool = function () {
            return this.xocdiavipChipPool.clearPool();
        };

        XocDiaVipController.prototype.updatePositionPlayerUI = function (positions) {
            return this.positionsUI = positions;
        };

        XocDiaVipController.prototype.getPositionsUI = function () {
            return this.positionsUI;
        };

        XocDiaVipController.prototype.initLogBet = function () {
            return this.logBet = [];
        };
        XocDiaVipController.prototype.setLogBet = function (betData) {
            return this.logBet.push(betData);
        };
        XocDiaVipController.prototype.getLogBet = function () {
            return this.logBet;
        };
        return XocDiaVipController;

    })();

    cc.XocDiaVipController = XocDiaVipController;

}).call(this);

