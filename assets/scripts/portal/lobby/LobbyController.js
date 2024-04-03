/**
 * Created by Nofear on 6/21/2017.
 */

(function () {
    var LobbyController;

    LobbyController = (function () {
        var instance;

        function LobbyController() {

        }

        instance = void 0;

        LobbyController.getInstance = function () {
            if (instance === void 0) {
                instance = this;
                instance.prototype.isLobbyActive = true;
            }
            return instance.prototype;
        };

        LobbyController.prototype.setLobbyView = function (lobbyView) {
            return this.lobbyView = lobbyView;
        };

        LobbyController.prototype.setTopBarView = function (topBarView) {
            return this.topBarView = topBarView;
        };

        LobbyController.prototype.setBottomBarView = function (bottomBarView) {
            return this.bottomBarView = bottomBarView;
        };
		
        LobbyController.prototype.setLobbySettingView = function (LobbySettingView) {
            return this.LobbySettingView = LobbySettingView;
        };

        LobbyController.prototype.setSettingView = function (settingView) {
            return this.settingView = settingView;
        };

        LobbyController.prototype.setLobbyEffectView = function (lobbyEffectView) {
            return this.lobbyEffectView = lobbyEffectView;
        };

        LobbyController.prototype.setGameAssets = function (gameAssets) {
            return this.gameAssets = gameAssets;
        };

        LobbyController.prototype.getGameAssets = function () {
            return this.gameAssets;
        };

        LobbyController.prototype.showFxWinJackpot = function (user) {
            return this.lobbyEffectView.showFxWinJackpot(user);
        };

        LobbyController.prototype.openSetting = function () {
            return this.settingView.openSetting();
        };

        LobbyController.prototype.closeSetting = function () {
            return this.settingView.closeSetting();
        };

        LobbyController.prototype.showPopupLogout = function () {
            return this.settingView.showPopupLogout();
        };

        LobbyController.prototype.callLogout = function () {
            return this.settingView.confirmLogoutClicked();
        };

        LobbyController.prototype.joinGame = function (gameId) {
            return this.lobbyView.joinGame(gameId);
        };

        // Event - x2
        LobbyController.prototype.createX2PopupView = function () {
            return this.lobbyView.createX2PopupView();
        };

        LobbyController.prototype.destroyX2PopupView = function () {
            return this.lobbyView.destroyX2PopupView();
        };

        LobbyController.prototype.createX2RewardView = function (startTab) {
            cc.Tool.getInstance().setItem('@startTabX2', startTab);
            return this.lobbyView.createX2RewardView();
        };

        LobbyController.prototype.destroyX2RewardView = function () {
            return this.lobbyView.destroyX2RewardView();
        };

        //Event - san kho bau
        LobbyController.prototype.createTreasureView = function () {
            return this.lobbyView.createTreasureView();
        };

        LobbyController.prototype.destroyTreasureView = function () {
            return this.lobbyView.destroyTreasureView();
        };

        LobbyController.prototype.createBuyCarrotView = function () {
            return this.lobbyView.createBuyCarrotView();
        };

        LobbyController.prototype.destroyBuyCarrotView = function () {
            return this.lobbyView.destroyBuyCarrotView();
        };

        LobbyController.prototype.createTreasureGiftView = function () {
            return this.lobbyView.createTreasureGiftView();
        };

        LobbyController.prototype.destroyTreasureGiftView = function () {
            return this.lobbyView.destroyTreasureGiftView();
        };

        LobbyController.prototype.createCarrotDailyBonusView = function () {
            return this.lobbyView.createCarrotDailyBonusView();
        };

        LobbyController.prototype.destroyCarrotDailyBonusView = function () {
            return this.lobbyView.destroyCarrotDailyBonusView();
        };

        LobbyController.prototype.createTreasureRuleView = function () {
            return this.lobbyView.createTreasureRuleView();
        };

        LobbyController.prototype.destroyTreasureRuleView = function () {
            return this.lobbyView.destroyTreasureRuleView();
        };

        LobbyController.prototype.createTreasureTopView = function () {
            return this.lobbyView.createTreasureTopView();
        };

        LobbyController.prototype.destroyTreasureTopView = function () {
            return this.lobbyView.destroyTreasureTopView();
        };
        //Event - san kho bau end

        LobbyController.prototype.createFxSummonDragon = function () {
            return this.lobbyView.createFxSummonDragon();
        };

        LobbyController.prototype.destroyFxSummonDragon = function () {
            return this.lobbyView.destroyFxSummonDragon();
        };

        LobbyController.prototype.createLoginView = function () {
            return this.lobbyView.createLoginView();
        };

        LobbyController.prototype.destroyLoginView = function () {
            return this.lobbyView.destroyLoginView();
        };

        LobbyController.prototype.createVQMMView = function () {
            return this.lobbyView.createVQMMView();
        };

        LobbyController.prototype.destroyVQMMView = function () {
            return this.lobbyView.destroyVQMMView();
        };

        LobbyController.prototype.createAccountView = function (startTab) {
            cc.Tool.getInstance().setItem('@startTab', startTab);
            return this.lobbyView.createAccountView();
        };
		
        LobbyController.prototype.createSafeView = function () {
            return this.lobbyView.createSafeView();
        };

        LobbyController.prototype.destroySafeView = function () {
            return this.lobbyView.destroySafeView();
        };
		
        LobbyController.prototype.createActiveFoneView = function () {
            return this.lobbyView.createActiveFoneView();
        };

        LobbyController.prototype.destroyActiveFoneView = function () {
            return this.lobbyView.destroyActiveFoneView();
        };

        LobbyController.prototype.destroyAccountView = function () {
            return this.lobbyView.destroyAccountView();
        };

        LobbyController.prototype.createSecurityView = function (startTab) {
            cc.Tool.getInstance().setItem('@startTabSecurity', startTab);
            return this.lobbyView.createSecurityView();
        };

        LobbyController.prototype.createVipPointView = function () {
            return this.lobbyView.createVipPointView();
        };

        LobbyController.prototype.destroySecurityView = function () {
            return this.lobbyView.destroySecurityView();
        };

        LobbyController.prototype.createPopupUpdateUserPassView = function () {
            return this.lobbyView.createPopupUpdateUserPassView();
        };

        LobbyController.prototype.destroyPopupUpdateUserPassView = function () {
            return this.lobbyView.destroyPopupUpdateUserPassView();
        };

        LobbyController.prototype.destroyShopTopupView = function () {
            return this.lobbyView.destroyShopTopupView();
        };

        LobbyController.prototype.destroyShopCastOutView = function () {
            return this.lobbyView.destroyShopCastOutView();
        };
        LobbyController.prototype.createShopCastOutView = function (startTab) {
            cc.Tool.getInstance().setItem('@startShopCastOutTab', startTab);

            // return this.lobbyView.createShopView();
            console.log("createShopCastOutView:"+startTab);
            if (startTab === cc.ShopTab.TOPUP || startTab === cc.ShopTab.BANK || startTab === cc.ShopTab.LOAN || startTab === cc.ShopTab.MOMO
                || startTab === cc.ShopTab.TRANSFER || startTab === cc.ShopTab.REDEEM_REWARD) {
                return this.lobbyView.createShopCastOutView();
            } else {
                //return this.lobbyView.createShopView();
            }
        };
        LobbyController.prototype.createShopView = function (startTab) {
            cc.Tool.getInstance().setItem('@startShopTab', startTab);

            return this.lobbyView.createShopTopupView();

            if (startTab === cc.ShopTab.TOPUP || startTab === cc.ShopTab.BANK || startTab === cc.ShopTab.LOAN || startTab === cc.ShopTab.MOMO
                || startTab === cc.ShopTab.TRANSFER || startTab === cc.ShopTab.REDEEM_REWARD) {
                return this.lobbyView.createShopTopupView();
            } else {
                return this.lobbyView.createShopView();
            }
        };

        LobbyController.prototype.destroyShopView = function () {
            return this.lobbyView.destroyShopView();
        };

        LobbyController.prototype.createHistoryView = function (startTab) {
            cc.Tool.getInstance().setItem('@startHistoryTab', startTab);
            return this.lobbyView.createHistoryView();
        };

        LobbyController.prototype.destroyHistoryView = function () {
            return this.lobbyView.destroyHistoryView();
        };
		
        LobbyController.prototype.createPlayhisView = function (startTab) {
            cc.Tool.getInstance().setItem('@startHistoryTab', startTab);
            return this.lobbyView.createPlayhisView();
        };

        LobbyController.prototype.destroyPlayhisView = function () {
            return this.lobbyView.destroyPlayhisView();
        };

        LobbyController.prototype.createBankHistoryView = function (startTab) {
            console.log("@startHistoryTab:"+startTab);
            cc.Tool.getInstance().setItem('@startHistoryTab', startTab);
            return this.lobbyView.createBankHistoryView();
        };

        LobbyController.prototype.destroyBankHistoryView = function () {
            return this.lobbyView.destroyBankHistoryView();
        };
		
        LobbyController.prototype.createTopupTransactionView = function () {
            return this.lobbyView.createTopupTransactionView();
        };

        LobbyController.prototype.destroyTopupTransactionView = function () {
            return this.lobbyView.destroyTopupTransactionView();
        };

        LobbyController.prototype.createWithdrawHistoryView = function (startTab) {
            cc.Tool.getInstance().setItem('@startWithdrawTab', startTab);
            return this.lobbyView.createWithdrawHistoryView();
        };

        LobbyController.prototype.destroyWithdrawHistoryView = function () {
            return this.lobbyView.destroyWithdrawHistoryView();
        };

        LobbyController.prototype.createTransferTransactionView = function () {
            return this.lobbyView.createTransferTransactionView();
        };

        LobbyController.prototype.destroyTransferTransactionView = function () {
            return this.lobbyView.destroyTransferTransactionView();
        };

		
        LobbyController.prototype.createMailboxView = function () {
            return this.lobbyView.createMailboxView();
        };

        LobbyController.prototype.destroyMailboxView = function () {
            return this.lobbyView.destroyMailboxView();
        };
		
        LobbyController.prototype.createGiftcodeView = function () {
            return this.lobbyView.createGiftcodeView();
        };

        LobbyController.prototype.createTransferView = function () {
            return this.lobbyView.createTransferView();
        };
		
        LobbyController.prototype.createLobbySetting = function () {
            return this.lobbyView.createLobbySetting();
        };

        LobbyController.prototype.destroyLobbySetting = function () {
            return this.lobbyView.destroyLobbySetting();
        };

        LobbyController.prototype.createEventView = function () {
            return this.lobbyView.createEventView();
        };

        LobbyController.prototype.createEventViewTopVP = function () {
            return this.lobbyView.createEventViewTopVP();
        };

        LobbyController.prototype.createAppSafeHelpView = function () {
            return this.lobbyView.createAppSafeHelpView();
        };

        LobbyController.prototype.createDNSHelpView = function () {
            return this.lobbyView.createDNSHelpView();
        };

        LobbyController.prototype.createUpdateAccountView = function () {
            return this.lobbyView.createUpdateAccountView();
        };

        LobbyController.prototype.createMoveBBView= function () {
            return this.lobbyView.createMoveBBView();
        };
        LobbyController.prototype.destroyMoveBBView= function () {
            return this.lobbyView.destroyMoveBBView();
        };
        LobbyController.prototype.createDynamicView = function (gameId) {
            return this.lobbyView.createDynamicView(gameId);
        };

        LobbyController.prototype.destroyDynamicView = function (gameId) {
            return this.lobbyView.destroyDynamicView(gameId);
        };

        LobbyController.prototype.destroyAllMiniGameView = function () {
            return this.lobbyView.destroyAllMiniGameView();
        };

        //#KingViet
        LobbyController.prototype.createEventPopupView = function () {
            return this.lobbyView.createEventPopupView();
        };

        LobbyController.prototype.destroyEventPopupView = function () {
            return this.lobbyView.destroyEventPopupView();
        };

        LobbyController.prototype.loginSuccess = function () {
            return this.lobbyView.loginSuccess();
        };

        LobbyController.prototype.createSugarBabyView = function () {
            return this.lobbyView.createSugarBabyView();
        };

        LobbyController.prototype.destroySugarBabyView = function () {
            return this.lobbyView.destroySugarBabyView();
        };

        LobbyController.prototype.refreshAccountInfo = function () {
            return this.lobbyView.refreshAccountInfo();
        };

        LobbyController.prototype.activeNodeLobby = function (enable) {
            return this.lobbyView.activeNodeLobby(enable);
        };

        LobbyController.prototype.activeNodeTopBar = function (enable) {
            return this.lobbyView.activeNodeTopBar(enable);
        };

        LobbyController.prototype.setLobbyActive = function (enable) {
            return this.isLobbyActive = enable;
        };

        LobbyController.prototype.setBBOffCheckData = function (data) {
            return this.bbOffCheckData = data;
        };
        LobbyController.prototype.getBBOffCheckData = function () {
            return this.bbOffCheckData;
        };
        LobbyController.prototype.checkLobbyActive = function () {
            return this.bbOffCheckData;
        };

        LobbyController.prototype.topBarUpdateInfo = function () {
            return this.topBarView.topBarUpdateInfo();
        };

        LobbyController.prototype.refreshAvatar = function () {
            return this.topBarView.refreshAvatar();
        };

        LobbyController.prototype.updateUILogin = function (enable) {
            return this.topBarView.updateUILogin(enable);
        };

        LobbyController.prototype.resetTopBar = function () {
            return this.topBarView.resetTopBar();
        };

        LobbyController.prototype.getMailUnRead = function () {
            return this.topBarView.getMailUnRead();
        };

        LobbyController.prototype.setIsOnAudioBg = function () {        
            return this.lobbyView.setIsAudioBg();
        };

        LobbyController.prototype.showRegisterView = function () {
            return this.topBarView.registerClicked();
        };

        LobbyController.prototype.getUserIP = function () {
            return this.lobbyView.getUserIP();
        };

        return LobbyController;

    })();

    cc.LobbyController = LobbyController;

}).call(this);

