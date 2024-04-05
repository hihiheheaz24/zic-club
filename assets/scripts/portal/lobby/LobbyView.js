/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');
import Http from "../../common/Http";
(function () {
    cc.LobbyView = cc.Class({
        "extends": cc.Component,
        properties: {
            //prefab portal
            prefabVip: cc.prefab,
            prefabLoginViewKV: cc.Prefab, //#KingViet
            prefabLoginView: cc.Prefab,
            prefabAccountView: cc.Prefab,
			prefabSafeView: cc.Prefab,
            prefabSecurityView: cc.Prefab,
            prefabVipPoint: cc.Prefab,
			prefabActiveFoneView: cc.Prefab,
			prefabPlayhisView: cc.Prefab,
			prefabBankHistoryView: cc.Prefab,
			prefabTopupTransactionView: cc.Prefab,
			prefabTransferTransactionView: cc.Prefab,
			prefabMailboxView: cc.Prefab,            
            prefabShopView: cc.Prefab,
            prefabShopViewBank: cc.Prefab,
            prefabShopViewKV: cc.Prefab, //#KingViet
            prefabShopTopupView: cc.Prefab,
            prefabShopTopupViewBank: cc.Prefab,
            prefabShopCastOutView: cc.Prefab,
            prefabHistoryView: cc.Prefab,
            prefabHistoryViewBank: cc.Prefab,
            prefabHistoryViewKV: cc.Prefab, //#KingViet
            prefabPopupUpdateUserPass: cc.Prefab,
            prefabGiftcode: cc.Prefab,
            prefabTransferView: cc.Prefab,
            prefabEvent: cc.Prefab,
            prefabVQMM: cc.Prefab,
            prefabAppSafeHelp: cc.Prefab,
            //DNS Help
            prefabDNSHelp: cc.Prefab,
            //Update Account
            prefabUpdateAccount: cc.Prefab,
            prefabMoveBB: cc.Prefab,
            prefabBlockBB: cc.Prefab,
            //event - san kho bau
            prefabTreasure: cc.Prefab,
            prefabCarrotDailyBonus: cc.Prefab,
            prefabBuyCarrot: cc.Prefab,
            prefabTreasureGift: cc.Prefab,
            prefabTreasureRule: cc.Prefab,
            prefabTreasureTop: cc.Prefab,

            //event - x2 Nap
            prefabX2Popup: cc.Prefab,
            prefabX2Reward: cc.Prefab,

            //prefab FX summon Dragon
            prefabFxSummonDragon: cc.Prefab,

            //#KingViet
            prefabEventPopup: cc.Prefab,
            //#GameVN
            prefabEventVNPopup: cc.Prefab,       
            prefabSugarBaby: cc.Prefab,  
            //slots chinh
            lbLoadingEgypt: cc.Label,
            lbLoadingTK: cc.Label,
            lbLoadingAquarium: cc.Label,
            lbLoadingDragonBall: cc.Label,
            lbLoadingBumBum: cc.Label,
            lbLoadingCowboy: cc.Label,

            lbLoadingMonkey: cc.Label,
            lbLoadingDragonTiger: cc.Label,
            lbLoadingXocXoc: cc.Label,
			lbLoadingXocXocMd5: cc.Label,
			lbLoadingXocXocX4: cc.Label,
            lbLoadingXocXocDoiKhang: cc.Label,
            lbLoadingTaiXiuLive: cc.Label,
            lbLoadingBauCua: cc.Label,
			lbLoadingBauCuaMini: cc.Label,
            lbLoadingLoDe: cc.Label,

            //minigame
            lbLoadingTaiXiu: cc.Label,
			lbLoadingTaiXiuMd5: cc.Label,
			lbLoadingSicbo: cc.Label,
			lbLoadingTaiXiuSieuToc: cc.Label,
            lbLoadingMiniPoker: cc.Label,
            lbLoading777: cc.Label,
            lbLoadingTQ: cc.Label,
            lbLoadingLuckyWild: cc.Label,

            //card game
            lbLoadingPoker: cc.Label,
            lbLoadingThreeCards: cc.Label,
            lbLoadingTLMN: cc.Label,
            lbLoadingTLMNSolo: cc.Label,
            lbLoadingMB: cc.Label,
            lbLoadingBaccarat: cc.Label,

            //xo so
            lbLoadingVietlot: cc.Label,

            //ban ca
            lbLoadingShootFish: cc.Label,

            nodeLobbys: [cc.Node],
            nodeTopBar: cc.Node,
            nodeSetting: cc.Node,

            //audio
            audioBg: cc.AudioSource,
            toggleAudio: cc.Toggle,
            lbTopVp: cc.Label,
            prefabEventTop: cc.Prefab,
			prefabSetting: cc.Prefab,
            nodeEventTop: cc.Node,
             //Esports
            lbLoadingEsport: cc.Label,

            //Withdraw
            prefabWithdrawHistoryView : cc.Prefab,
            // lbLinkGame: cc.Label,
			
        },

        // use this for initialization
        onLoad: function () {
            cc.LobbyController.getInstance().setLobbyView(this);
            this.nodeTaiXiu = null;
			this.nodeTaiXiuMd5 = null;
			this.nodeTaiXiuSieuToc = null;
			this.nodeSicbo = null;
            this.nodeTaiXiuLive = null;
            this.nodeEsport = null;
            this.nodeMiniPoker = null;
            this.node777 = null;
            this.nodeTQ = null;
            this.nodeLW = null;
            this.nodeSlotsView = null;
            this.nodeVQMMView = null;
            this.nodeXocDiaDoiKhang = null;
            var tool = cc.Tool.getInstance();
            if (tool.getItem('@onAudioBg') !== null) {
                if (tool.getItem('@onAudioBg') === 'true') {
                    this.IsOnAudioBg = true;
                } else {
                    this.IsOnAudioBg = false;
                }
            } else {
                this.IsOnAudioBg = true;
            }
            this.toggleAudio.isChecked = this.IsOnAudioBg;
        },

        onEnable: function () {
            if (this.IsOnAudioBg) {
                this.audioBg.play();
            } else {
                this.audioBg.stop();
            }
            //this.lbTopVp.string = cc.Tool.getInstance().formatNumber(cc.LoginController.getInstance().getTopVPResponse());
            if(!cc.LoginController.getInstance().getLoginState()) {
                var tool = cc.Tool.getInstance();
                console.log(tool.getItem('@isLanding'));
                if (tool.getItem('@isLanding') !== null) {
                    if (tool.getItem('@isLanding') === 'true') {
                        cc.LobbyController.getInstance().showRegisterView();
                    }
                }   
            }
            // this.lbLinkGame.string = cc.ServerConnector.getInstance().getLinkGame();
			
        },

        //event X2
        createX2PopupView: function () {
            this.nodeX2Popup = this.createView(this.prefabX2Popup);
        },

        destroyX2PopupView: function () {
            if (this.nodeX2Popup)
                this.nodeX2Popup.destroy();
        },

        createX2RewardView: function () {
            this.nodeX2Reward = this.createView(this.prefabX2Reward);
        },

        createSugarBabyView: function () {
            this.nodeSugarBaby = this.createView(this.prefabSugarBaby);
        },


        destroySugarBabyView: function () {
            if (this.nodeSugarBaby)
                this.nodeSugarBaby.destroy();
        },

        destroyX2RewardView: function () {
            if (this.nodeX2Reward)
                this.nodeX2Reward.destroy();
        },

        //event san KHO BAU
        createEventPopupView: function () {
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeEventPopup = this.createView(this.prefabEventPopup);
            } else {
                this.nodeEventPopup = this.createView(this.prefabEventVNPopup);
            }
        },

        destroyEventPopupView: function () {
            if (this.nodeEventPopup)
                this.nodeEventPopup.destroy();
        },

        //event san KHO BAU
        createTreasureView: function () {
            this.nodeTreasureView = this.createView(this.prefabTreasure);
        },

        destroyTreasureView: function () {
            if (this.nodeTreasureView)
                this.nodeTreasureView.destroy();
        },

        //buy carrot
        createBuyCarrotView: function () {
            this.nodeBuyCarrotView = this.createView(this.prefabBuyCarrot);
        },

        destroyBuyCarrotView: function () {
            if (this.nodeBuyCarrotView)
                this.nodeBuyCarrotView.destroy();
        },

        //chon qua vat ly
        createTreasureGiftView: function () {
            this.nodeTreasureGiftView = this.createView(this.prefabTreasureGift);
        },

        destroyTreasureGiftView: function () {
            if (this.nodeTreasureGiftView)
                this.nodeTreasureGiftView.destroy();
        },


        //carrot daily bonus popup
        createCarrotDailyBonusView: function () {
            this.nodeCarrotDailyBonusView = this.createView(this.prefabCarrotDailyBonus);
        },

        destroyCarrotDailyBonusView: function () {
            if (this.nodeCarrotDailyBonusView)
                this.nodeCarrotDailyBonusView.destroy();
        },

        //treasure rule popup
        createTreasureRuleView: function () {
            this.nodeTreasureRuleView = this.createView(this.prefabTreasureRule);
        },

        destroyTreasureRuleView: function () {
            if (this.nodeTreasureRuleView)
                this.nodeTreasureRuleView.destroy();
        },

        //treasure top popup
        createTreasureTopView: function () {
            this.nodeTreasureTopView = this.createView(this.prefabTreasureTopView);
        },

        destroyPlayhisView: function () {
            if (this.nodePlayhisView)
                this.nodePlayhisView.destroy();
        },

        createPlayhisView: function () {
            console.log('createPlayhisView');
            this.nodePlayhisView = this.createView(this.prefabPlayhisView);
        },

        destroyTreasureTopView: function () {
            if (this.nodeTreasureTopView)
                this.nodeTreasureTopView.destroy();
        },
        destroyBankHistoryView: function () {
            if (this.nodeBankHistoryView)
                this.nodeBankHistoryView.destroy();
        },

        createBankHistoryView: function () {
            this.nodeBankHistoryView = this.createView(this.prefabBankHistoryView);
        },

        destroyTopupTransactionView: function () {
            if (this.nodeTopupTransactionView)
                this.nodeTopupTransactionView.destroy();
        },

        createTopupTransactionView: function () {
            this.nodeTopupTransactionView = this.createView(this.prefabTopupTransactionView);
        },
        destroyTransferTransactionView: function () {
            if (this.nodeTransferTransactionView)
                this.nodeTransferTransactionView.destroy();
        },

        createTransferTransactionView: function () {
            this.nodeTransferTransactionView = this.createView(this.prefabTransferTransactionView);
        },

        destroyWithdrawHistoryView: function () {
            if (this.nodeWithdrawHistoryView)
                this.nodeWithdrawHistoryView.destroy();
        },

        createWithdrawHistoryView: function () {
            this.nodeWithdrawHistoryView = this.createView(this.prefabWithdrawHistoryView);
        },

        destroyMailboxView: function () {
            if (this.nodeMailboxView)
                this.nodeMailboxView.destroy();
        },

        createMailboxView: function () {
            this.nodeMailboxView = this.createView(this.prefabMailboxView);
        },		
        //Fx
        createFxSummonDragon: function () {
            this.nodeFxSummonDragon = this.createView(this.prefabFxSummonDragon);
        },

        destroyFxSummonDragon: function () {
            if (this.nodeFxSummonDragon)
                this.nodeFxSummonDragon.destroy();
        },
        //end fx

        //Portal Portal Portal
        createLoginView: function () {
            if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeLoginView = this.createView(this.prefabLoginView);
            } else {
                this.nodeLoginView = this.createView(this.prefabLoginViewKV);
            }
        },

        destroyLoginView: function () {
            if (this.nodeLoginView)
                this.nodeLoginView.destroy();
        },

        createVQMMView: function () {
            if (this.nodeVQMMView === null) {
                this.nodeVQMMView = this.createView(this.prefabVQMM);
            }
        },

        destroyVQMMView: function () {
            if (this.nodeVQMMView) {
                this.nodeVQMMView.destroy();
                this.nodeVQMMView = null;
            }
        },

        createHistoryView: function () {
            // if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3
            //     || cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_2) {
            //     this.nodeHistoryView = this.createView(this.prefabHistoryViewBank);
            // } else {
            //     this.nodeHistoryView = this.createView(this.prefabHistoryView);
            // }

            if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeHistoryView = this.createView(this.prefabHistoryViewBank);
            } else {
                this.nodeHistoryView = this.createView(this.prefabHistoryViewKV);
            }

        },

        destroyHistoryView: function () {

            if (this.nodeHistoryView)
                this.nodeHistoryView.destroy();
        },

        createAccountView: function () {
            this.nodeAccountView = this.createView(this.prefabAccountView);
        },
		
        createSafeView: function () {
            this.nodeSafeView = this.createView(this.prefabSafeView);
        },
		
        destroySafeView: function () {
            if (this.nodeSafeView)
                this.nodeSafeView.destroy();
        },
		
        destroyAccountView: function () {
            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeAccountView)
                this.nodeAccountView.destroy();
        },

        createSecurityView: function () {
            this.nodeSecurityView = this.createView(this.prefabSecurityView);
        },

        createVipPointView: function () {
            this.nodeVipPointView = this.createView(this.prefabVipPoint);
        },


        destroySecurityView: function () {
            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeSecurityView)
                this.nodeSecurityView.destroy();
        },
        createActiveFoneView: function () {
            this.nodeActiveFoneView = this.createView(this.prefabActiveFoneView);
        },
		
        destroyActiveFoneView: function () {
            if (this.nodeActiveFoneView)
                this.nodeActiveFoneView.destroy();
        },

        createPopupUpdateUserPassView: function () {
            this.nodePopupUpdateUserPass = this.createView(this.prefabPopupUpdateUserPass);
        },

        destroyPopupUpdateUserPassView: function () {
            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodePopupUpdateUserPass)
                this.nodePopupUpdateUserPass.destroy();
        },

        createShopTopupView: function () {
            this.nodeShopTopupView = this.createView(this.prefabShopTopupViewBank);
        },

        destroyShopTopupView: function () {
            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeShopTopupView)
                this.nodeShopTopupView.destroy();
            //hide cac node o lobby
        },

        createShopCastOutView: function () {
            console.log("createShopCastOutView:"+1);
            this.nodeShopCastOutView = this.createView(this.prefabShopCastOutView);
        },

        destroyShopCastOutView: function () {
            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeShopCastOutView)
                this.nodeShopCastOutView.destroy();
            //hide cac node o lobby
        },

        createShopView: function () {
            this.nodeShopView = this.createView(this.prefabShopView);
            // if (!cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
            //     if (cc.Config.getInstance().getServiceId() === cc.ServiceId.BLOCK_BUSTER_3) {
            //         this.nodeShopView = this.createView(this.prefabShopViewBank);
            //     } else {
                    
            //     }
            // } else {
            //     this.nodeShopView = this.createView(this.prefabShopViewKV);
            // }
        },

        destroyShopView: function () {
            cc.LobbyController.getInstance().refreshAccountInfo();
            if (this.nodeShopView)
                this.nodeShopView.destroy();
            //hide cac node o lobby
        },

        createGiftcodeView: function () {
            this.nodeGiftcodeView = this.createView(this.prefabGiftcode);
        },

        createTransferView: function () {
            this.nodeTransferView = this.createView(this.prefabTransferView);
        },

        destroyGiftcodeView: function () {
            if (this.nodeGiftcodeView)
                this.nodeGiftcodeView.destroy();
        },

        createEventView: function () {
            this.nodeEventView = this.createView(this.prefabEvent);
        },

        createEventViewTopVP: function () {
            this.nodeEventViewTopVP = this.createView(this.prefabEventTop);
        },
        createLobbySetting: function () {
            this.nodeLobbySetting = this.createView(this.prefabSetting);
        },

        destroyLobbySetting: function () {
            if (this.nodeLobbySetting)
                this.nodeLobbySetting.destroy();
        },        
        createAppSafeHelpView: function () {
            this.createView(this.prefabAppSafeHelp);
        },

        createDNSHelpView: function () {
            this.createView(this.prefabDNSHelp);
        },

        createUpdateAccountView: function () {
            this.createView(this.prefabUpdateAccount);
        },

        createMoveBBView: function () {
            this.createView(this.prefabMoveBB);
        },
        destroyMoveBBView: function () {
            if (this.prefabMoveBB)
                this.prefabMoveBB.destroy();
        },
        createVipView: function () {
            if( this._prefabVip){
                this._prefabVip.active = true;
            }else{
                this._prefabVip = this.createView(this.prefabVip);
                this._prefabVip.zIndex = 100;
            }
           

        },
        destroyVipView: function () {
            if (this._prefabVip)
                this._prefabVip.destroy();
        },
        createBlockBBView: function () {
            this.createView(this.prefabBlockBB);
        },
        //Tao cac game (prefab load dynamic)
        createDynamicView: function (gameId) {
            switch (gameId) {
                case cc.GameId.SHOOT_FISH:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingShootFish.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("shootFish/prefabs/ShootFish",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingShootFish.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingShootFish.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            //hide cac node o lobby
                            self.activeNodeLobby(false);
                        }
                    );

                    break;

                case cc.GameId.EGYPT:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingEgypt.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("egypt/prefabs/egyptView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingEgypt.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingEgypt.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            //hide cac node o lobby
                            self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.THREE_KINGDOM:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTK.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("tk/prefabs/tkView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingTK.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingTK.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    
                    break;

                case cc.GameId.BUM_BUM:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingBumBum.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("bumbum/prefabs/bbView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingBumBum.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingBumBum.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.AQUARIUM:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingAquarium.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("aquarium/prefabs/aquariumView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingAquarium.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingAquarium.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    break;
                    
                case cc.GameId.DRAGON_BALL:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingDragonBall.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("dragonball/prefabs/dbView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingDragonBall.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingDragonBall.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.COWBOY:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingCowboy.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("cowboy/prefabs/cbView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingCowboy.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingCowboy.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.MONKEY:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingMonkey.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("monkey/prefabs/monkeyView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingMonkey.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingMonkey.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.DRAGON_TIGER:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingDragonTiger.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("dragontiger/prefabs/dragonTigerView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingDragonTiger.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingDragonTiger.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.XOC_XOC:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingXocXoc.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("xocxoc/prefabs/xocxocView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingXocXoc.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingXocXoc.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.TAI_XIU:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeTaiXiu !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTaiXiu.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("taixiu/prefabs/taixiuView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingTaiXiu.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingTaiXiu.node.parent.active = false;
                            //Tao game
                            self.nodeTaiXiu = self.createView(prefab);
                        }
                    );
                    break;
					
                case cc.GameId.TAI_XIU_MD5:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeTaiXiuMd5 !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTaiXiuMd5.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("taixiumd5/prefabs/taixiuMd5View",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingTaiXiuMd5.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingTaiXiuMd5.node.parent.active = false;
                            //Tao game
                            self.nodeTaiXiuMd5 = self.createView(prefab);
                        }
                    );
                    break;
					
				case cc.GameId.TAI_XIU_SIEUTOC:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeTaiXiuSieuToc !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTaiXiuSieuToc.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("taixiusieutoc/prefabs/taixiuSieuTocView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingTaiXiuSieuToc.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingTaiXiuSieuToc.node.parent.active = false;
                            //Tao game
                            self.nodeTaiXiuSieuToc = self.createView(prefab);
                        }
                    );
                    break;
					
				case cc.GameId.SICBO:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeSicbo !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingSicbo.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("sicbo/prefabs/SicboView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingSicbo.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingSicbo.node.parent.active = false;
                            //Tao game
                            self.nodeSicbo = self.createView(prefab);
                            //self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.MINI_POKER:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeMiniPoker !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingMiniPoker.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("minipoker/prefabs/minipokerView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingMiniPoker.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingMiniPoker.node.parent.active = false;
                            //Tao game
                            self.nodeMiniPoker = self.createView(prefab);
                        }
                    );
                    break;

                case cc.GameId.SEVEN77:
                    //kiem tra da tao roi -> ko tao them
                    if (this.node777 !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoading777.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("777/prefabs/777View",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoading777.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoading777.node.parent.active = false;
                            //Tao game
                            self.node777 = self.createView(prefab);
                        }
                    );

                    break;

                case cc.GameId.BLOCK_BUSTER:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeTQ !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTQ.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("tq/prefabs/tqView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingTQ.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingTQ.node.parent.active = false;
                            //Tao game
                            self.nodeTQ = self.createView(prefab);
                        }
                    );
                    
                    break;

                //LUCKY WILD
                case cc.GameId.LUCKY_WILD:

                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeLW !== null) return;
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingLuckyWild.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("luckyWild/prefabs/lwView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingLuckyWild.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingLuckyWild.node.parent.active = false;
                            //Tao game
                            self.nodeLW = self.createView(prefab);
                        }
                    );

                    break;

                //CARD GAME
                case cc.GameId.POKER_TEXAS:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingPoker.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("poker/prefabs/pokerView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingPoker.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingPoker.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                            self.activeNodeTopBar(true);
                        }
                    );
                    break;

                case cc.GameId.BA_CAY:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingThreeCards.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("3cay/prefabs/3CLobby",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingThreeCards.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingThreeCards.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                            self.activeNodeTopBar(true);
                        }
                    );
                    break;

                case cc.GameId.TIEN_LEN_MN:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTLMN.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("tienlenMN/prefabs/TLMNLobby",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingTLMN.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingTLMN.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                            self.activeNodeTopBar(true);
                        }
                    );
                    break;

                case cc.GameId.TIEN_LEN_MN_SOLO:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingTLMNSolo.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("tienlenMNSoLo/prefabs/TLMNSoLoLobby",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingTLMNSolo.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingTLMNSolo.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                            self.activeNodeTopBar(true);
                        }
                    );
                    break;

                case cc.GameId.MAU_BINH:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingMB.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("maubinh/prefabs/MBLobby",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingMB.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingMB.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                            self.activeNodeTopBar(true);
                        }
                    );
                    break;

                case cc.GameId.BACCARAT:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingBaccarat.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("bacarat/prefabs/BaCaratView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingBaccarat.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingBaccarat.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);
                            self.activeNodeLobby(false);
                        }
                    );
                    break;
                case cc.GameId.BAUCUA:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingBauCua.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("baucua/prefabs/BauCuaView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingBauCua.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingBauCua.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);
                            // self.activeNodeLobby(false);
                        }
                    );
                    break;
				// Bầu cua mini
				case cc.GameId.BAUCUA_MINI:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingBauCuaMini.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("baucuamini/prefabs/BauCuaMiniView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingBauCuaMini.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingBauCuaMini.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);
                            // self.activeNodeLobby(false);
                        }
                    );
                    break;

                case cc.GameId.LODE:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;

                    //Bat loading
                    self.lbLoadingLoDe.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("lode/prefabs/LoDeLobby",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }
                            self.lbLoadingLoDe.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingLoDe.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                            self.activeNodeTopBar(false);
                        }
                    );
                    break;

                case cc.GameId.VIETLOT:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;

                    //Bat loading
                    self.lbLoadingVietlot.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("vietlot/prefabs/VietlotView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }
                            self.lbLoadingVietlot.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingVietlot.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);
                            self.activeNodeLobby(false);
                        }
                    );
                    break;
                case cc.GameId.ESPORTS:
                    //kiem tra da tao roi -> ko tao them
                    if (this.nodeEsport !== null) return;

                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingEsport.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("eports/prefabs/EsportView",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingEsport.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingEsport.node.parent.active = false;
                            //Tao game
                            self.nodeEsport = self.createView(prefab);
                        }
                    );
                    break;
                case cc.GameId.XOC_DIA_X4:
                    //console.log("0oooooooooooooo34");
                    if (this.nodeXocDiaX4 != null) return;
                    //console.log("0oooooooooooooo342");

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingXocXocX4.node.parent.active = true;
                    var percent = 0;
                    console.log("xocdiax4");
                    cc.resources.load("xocdiax4/xocdiax4",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingXocXocX4.string = percent + '%';
                        },
                        function (err, prefab) {
                            console.log("xocdiax4 prefab", prefab);
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingXocXocX4.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(true);
                        }
                    );
                    break;
                case cc.GameId.XOC_DIA_VIP:
						if (this.nodeSlotsView !== null) return;

						cc.RoomController.getInstance().setGameId(gameId);
						this.isLoading = true;
						var self = this;
						//Bat loading
						self.lbLoadingXocXocMd5.node.parent.active = true;
						var percent = 0;
						cc.resources.load("xocdiavip/prefabs/xocdiavipView",
							function (completedCount, totalCount, item) {
								var tempPercent = Math.round(100 * completedCount / totalCount);

								//dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
								if (tempPercent > percent) {
									percent = tempPercent;
								}

								self.lbLoadingXocXocMd5.string = percent + '%';
							},
							function (err, prefab) {
								//Load xong
								self.isLoading = false;
								//Tat loading
								self.lbLoadingXocXocMd5.node.parent.active = false;
								//Tao game
								self.nodeSlotsView = self.createView(prefab);

								self.activeNodeLobby(false);
							}
						);
						break;
                case cc.GameId.XOC_DIA_DOI_KHANG:
                    if (this.nodeSlotsView !== null) return;

                    cc.RoomController.getInstance().setGameId(gameId);
                    this.isLoading = true;
                    var self = this;
                    //Bat loading
                    self.lbLoadingXocXocDoiKhang.node.parent.active = true;
                    var percent = 0;
                    cc.resources.load("xocdiadoikhang/prefabs/XocDiaDoiKhang",
                        function (completedCount, totalCount, item) {
                            var tempPercent = Math.round(100 * completedCount / totalCount);

                            //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                            if (tempPercent > percent) {
                                percent = tempPercent;
                            }

                            self.lbLoadingXocXocDoiKhang.string = percent + '%';
                        },
                        function (err, prefab) {
                            //Load xong
                            self.isLoading = false;
                            //Tat loading
                            self.lbLoadingXocXocDoiKhang.node.parent.active = false;
                            //Tao game
                            self.nodeSlotsView = self.createView(prefab);

                            self.activeNodeLobby(false);
                        }
                    );
                    break;   
                case cc.GameId.TAI_XIU_LIVE:
                        if (this.nodeTaiXiuLive !== null) return;
    
                        cc.RoomController.getInstance().setGameId(gameId);
                        this.isLoading = true;
                        var self = this;
                        //Bat loading
                        self.lbLoadingTaiXiuLive.node.parent.active = true;
                        var percent = 0;
                        cc.resources.load("taixiulive/prefabs/TaiXiuLive",
                            function (completedCount, totalCount, item) {
                                var tempPercent = Math.round(100 * completedCount / totalCount);
    
                                //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                                if (tempPercent > percent) {
                                    percent = tempPercent;
                                }
    
                                self.lbLoadingTaiXiuLive.string = percent + '%';
                            },
                            function (err, prefab) {
                                //Load xong
                                self.isLoading = false;
                                //Tat loading
                                self.lbLoadingTaiXiuLive.node.parent.active = false;
                                //Tao game
                                self.nodeTaiXiuLive = self.createView(prefab);
    
                                self.activeNodeLobby(false);
                            }
                        );
                        break;                                           
            }
        },

        destroyDynamicView: function (gameId) {
            switch (gameId) {
                case cc.GameId.EVENT_TREASURE:
                    if (this.nodeTreasureView) {
                        this.nodeTreasureView.destroy();
                        this.nodeTreasureView = null;
                    }

                    if (this.nodeTreasureGiftView) {
                        this.nodeTreasureGiftView.destroy();
                        this.nodeTreasureGiftView = null;
                    }

                    if (this.nodeBuyCarrotView) {
                        this.nodeBuyCarrotView.destroy();
                        this.nodeBuyCarrotView = null;
                    }
                    break;
                case cc.GameId.TAI_XIU:
                    if (this.nodeTaiXiu) {
                        this.nodeTaiXiu.destroy();
                        this.nodeTaiXiu = null;
                    }
                    break;
                case cc.GameId.TAI_XIU_LIVE:
                    console.log('thoát game tx live')
                    if (this.nodeTaiXiuLive){
                        this.nodeTaiXiuLive.destroy();
                        this.nodeTaiXiuLive = null;
                        this.activeNodeLobby(true);
                    }
                    break;                   
					
                case cc.GameId.TAI_XIU_MD5:
                    if (this.nodeTaiXiuMd5) {
                        this.nodeTaiXiuMd5.destroy();
                        this.nodeTaiXiuMd5 = null;
                    }
                    break;
					
				case cc.GameId.TAI_XIU_SIEUTOC:
                    if (this.nodeTaiXiuSieuToc) {
                        this.nodeTaiXiuSieuToc.destroy();
                        this.nodeTaiXiuSieuToc = null;
                    }
                    break;
					
				case cc.GameId.SICBO:
                    if (this.nodeSicbo) {
                        console.log("nodeSicbo destroyed");
                        this.nodeSicbo.destroy();
                        this.nodeSicbo = null;
                    }
                    break;
					
                case cc.GameId.MINI_POKER:
                    if (this.nodeMiniPoker) {
                        this.nodeMiniPoker.destroy();
                        this.nodeMiniPoker = null;
                    }
                    break;
                case cc.GameId.SEVEN77:
                    if (this.node777) {
                        this.node777.destroy();
                        this.node777 = null;
                    }
                    break;
                case cc.GameId.BLOCK_BUSTER:
                    if (this.nodeTQ) {
                        this.nodeTQ.destroy();
                        this.nodeTQ = null;
                    }
                    break;
                case cc.GameId.LUCKY_WILD:
                    if (this.nodeLW) {
                        this.nodeLW.destroy();
                        this.nodeLW = null;
                    }
                    break;
                case cc.GameId.ESPORTS:
                    if (this.nodeEsport) {
                        this.nodeEsport.destroy();
                        this.nodeEsport = null;
                    }
                    break; 
				case cc.GameId.XOC_DIA_X4:
                    if (this.nodeXocDiaX4) {
                        this.nodeXocDiaX4.destroy();
                        this.nodeXocDiaX4 = null;
                    }
                    break;                   
                default:
                    this.activeNodeTopBar(false);
                    //bat lai cac node o lobby
                    this.activeNodeLobby(true);

                    //cc.BannerController.getInstance().switchPage();

                    //mac dinh se là cac game slots
                    if (this.nodeSlotsView) {
                        this.nodeSlotsView.destroy();
                        this.nodeSlotsView = null;
                    }
                    
                    if (this.nodeEventView) {
                        this.nodeEventView.destroy();
                        this.nodeEventView = null;
                    }

                    if (this.nodeEventViewTopVP) {
                        this.nodeEventViewTopVP.destroy();
                        this.nodeEventViewTopVP = null;
                    }
                    
                    break;
            }
            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        destroyAllMiniGameView: function () {
            this.destroyDynamicView(cc.GameId.TAI_XIU);
			this.destroyDynamicView(cc.GameId.TAI_XIU_MD5);
			this.destroyDynamicView(cc.GameId.TAI_XIU_SIEUTOC);
			this.destroyDynamicView(cc.GameId.SICBO);
            this.destroyDynamicView(cc.GameId.MINI_POKER);
            this.destroyDynamicView(cc.GameId.SEVEN77);
            this.destroyDynamicView(cc.GameId.BLOCK_BUSTER);
            this.destroyDynamicView(cc.GameId.LUCKY_WILD);

            this.destroyDynamicView(null);
        },


        createView: function (prefab, posY) {
            var nodeView = cc.instantiate(prefab);
            nodeView.parent = this.node;
            if (posY) {
                nodeView.setPosition(0, posY);
            } else {
                nodeView.setPosition(0, 0);
            }

            return nodeView;
        },

        loginSuccess: function () {
            console.log("Login success");
            //cc.OneSignalController.getInstance().sendTag('AccountID', cc.LoginController.getInstance().getUserId());
            //cc.OneSignalController.getInstance().sendTag('AccountName', cc.LoginController.getInstance().getNickname());

            //cap nhat lai trang thai
            cc.LoginController.getInstance().setLoginState(true);
            //hien UI NickName + avatar
            cc.LobbyController.getInstance().updateUILogin(false);
            //open hub portal
            cc.GameController.getInstance().portalNegotiate();

            //connect TX
            cc.TaiXiuController.getInstance().connectHubTx();
            //connect Md5
            cc.TaiXiuMd5Controller.getInstance().connectHubTxMd5();

            cc.LobbyController.getInstance().topBarUpdateInfo();
            //call get jackpot
            cc.LobbyJackpotController.getInstance().pauseUpdateJackpot(false);
            //Kiem tra thu chua doc
            cc.LobbyController.getInstance().getMailUnRead();

            //Bat huong dan appSafe sau khi Login + chua tich hopj AppSafe
            //var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            // if (!cc.DomainController.getInstance().checkErrorDomain()) {
            //     console.log('checkErrorDomain');
            //     cc.DDNA.getInstance().clientDevice();
            //     cc.DDNA.getInstance().gameStarted();

            //     var getChargeDefaultCommand = new cc.GetChargeDefaultCommand;
            //     getChargeDefaultCommand.execute(this);
            // }
            var getUpdateIPCommand = new cc.UpdateIPCommand;
            getUpdateIPCommand.execute(this);
             
            //  if (this.nodeX2Popup == null && loginResponse.PhoneNumber != null)
            //      cc.LobbyController.getInstance().createX2PopupView(); // comment
            cc.LobbyController.getInstance().createX2PopupView();
            
        },

        //EVENT SAN KHO BAU
        checkHaveDailyBonus: function () {
            var treasureGetCarrotNameKnownCommand = new cc.TreasureGetCarrotNameKnownCommand;
            treasureGetCarrotNameKnownCommand.execute(this);
        },

        onTreasureGetCarrotNameKnownResponse: function (response) {
            if (response !== null)
                cc.TreasureController.getInstance().setIsDailyBonus(response.IsInDay); //= true la nhan roi

            //chua nhan thi moi hien
            if (response !== null && !response.IsInDay) {
                cc.LobbyController.getInstance().createCarrotDailyBonusView();
            }
        },

        joinGame: function (gameId) {
            if (cc.LoginController.getInstance().checkLogin()) {
                if (this.isLoading) return;

                if (gameId === undefined) { // || gameId === cc.GameId.BLOCK_BUSTER
                    cc.PopupController.getInstance().showMessage('Sắp ra mắt!');
                    return;
                }

                switch (gameId.toString()) {
                    case cc.GameId.SHOOT_FISH:
                        this.createDynamicView(cc.GameId.SHOOT_FISH);
                        break;
                    case cc.GameId.ESPORTS:
                        this.createDynamicView(cc.GameId.ESPORTS);
                        break;
                    //Game slots chinh
                    case cc.GameId.EGYPT:
                        this.createDynamicView(cc.GameId.EGYPT);
                        break;
                    case cc.GameId.THREE_KINGDOM:
                        this.createDynamicView(cc.GameId.THREE_KINGDOM);
                        break;
                    case cc.GameId.AQUARIUM:
                        this.createDynamicView(cc.GameId.AQUARIUM);
                        break;
                    case cc.GameId.DRAGON_BALL:
                        this.createDynamicView(cc.GameId.DRAGON_BALL);
                        break;
                    case cc.GameId.BUM_BUM:
                        this.createDynamicView(cc.GameId.BUM_BUM);
                        break;
                    case cc.GameId.COWBOY:
                        this.createDynamicView(cc.GameId.COWBOY);
                        break;
                    case cc.GameId.THUONG_HAI:
                        this.createDynamicView(cc.GameId.THUONG_HAI);
                        break;
                    case cc.GameId.GAINHAY:
                        this.createDynamicView(cc.GameId.GAINHAY);
                        break;
                    //Game mini full màn hình
                    case cc.GameId.BACCARAT:
                        this.createDynamicView(cc.GameId.BACCARAT);
                        break;
                    case cc.GameId.MONKEY:
                        this.createDynamicView(cc.GameId.MONKEY);
                        break;
                    case cc.GameId.DRAGON_TIGER:
                        this.createDynamicView(cc.GameId.DRAGON_TIGER);
                        break;
                    case cc.GameId.BAUCUA:
                        this.createDynamicView(cc.GameId.BAUCUA);
                        break;
					case cc.GameId.BAUCUA_MINI:
                        this.createDynamicView(cc.GameId.BAUCUA_MINI);
                        break;	
				
                    //CARD GAME
                    case cc.GameId.XOC_XOC:
                        this.createDynamicView(cc.GameId.XOC_XOC);
                        break;
					case cc.GameId.XOC_DIA_VIP:
                        this.createDynamicView(cc.GameId.XOC_DIA_VIP);
                        break;
					case cc.GameId.XOC_DIA_X4:
                        this.createDynamicView(cc.GameId.XOC_DIA_X4);
                        break;
                    case cc.GameId.XOC_DIA_DOI_KHANG:
                        this.createDynamicView(cc.GameId.XOC_DIA_DOI_KHANG);
                        break;                        
                    case cc.GameId.POKER_TEXAS:
                    case cc.GameId.BA_CAY:
                    case cc.GameId.TIEN_LEN_MN:
                    case cc.GameId.TIEN_LEN_MN_SOLO:
                        if (cc.BalanceController.getInstance().getBalance() < 10000) {
                            cc.PopupController.getInstance().showMessage('Bạn không đủ tiền để vào phòng. Tối thiểu cần 10.000');
                            return;
                        } else {
                            this.createDynamicView(gameId.toString());
                        }
                        break;
                    case cc.GameId.MAU_BINH:
                        if (cc.BalanceController.getInstance().getBalance() < 30000) {
                            cc.PopupController.getInstance().showMessage('Bạn không đủ tiền để vào phòng. Tối thiểu cần 30.000');
                            return;
                        } else {
                            this.createDynamicView(gameId.toString());
                        }
                        break;
                    //MINI game
                    case cc.GameId.TAI_XIU:
                        this.createDynamicView(cc.GameId.TAI_XIU);
                        break;
                    case cc.GameId.TAI_XIU_MD5:
                        this.createDynamicView(cc.GameId.TAI_XIU_MD5);
                        break;
						
					case cc.GameId.TAI_XIU_SIEUTOC:
                        this.createDynamicView(cc.GameId.TAI_XIU_SIEUTOC);
                        break;
                    case cc.GameId.TAI_XIU_LIVE:
                        this.createDynamicView(cc.GameId.TAI_XIU_LIVE);
                        break;    						
					case cc.GameId.SICBO:
                        this.createDynamicView(cc.GameId.SICBO);
                        break;
                    case cc.GameId.MINI_POKER:
                        this.createDynamicView(cc.GameId.MINI_POKER);
                        break;
                    case cc.GameId.SEVEN77:
                        this.createDynamicView(cc.GameId.SEVEN77);
                        break;
                    case cc.GameId.BLOCK_BUSTER:
                        this.createDynamicView(cc.GameId.BLOCK_BUSTER);
                        break;
                    case cc.GameId.LUCKY_WILD:
                        this.createDynamicView(cc.GameId.LUCKY_WILD);
                        break;
                    case cc.GameId.LODE:
                        this.createDynamicView(cc.GameId.LODE);
                        break;
                    case cc.GameId.VIETLOT:
                        this.createDynamicView(cc.GameId.VIETLOT);
                        break;
                    case '100':
                        cc.PopupController.getInstance().showMessage('Sắp ra mắt');
                        break;
                    case '101':
                        cc.PopupController.getInstance().showMessage('Sắp ra mắt');
                        break;
                }
            }
        },

        refreshAccountInfo: function () {
            var getAccountInfoCommand = new cc.GetAccountInfoCommand;
            getAccountInfoCommand.execute(this);
        },

        activeNodeLobby: function (enable) {
            cc.log("chay vao action nodelobby : ", enable)
            if (enable) {
                this.activeNodeTopBar(false);
                this.playAudioBg();
            } else {
                this.audioBg.stop();
            }
            this.nodeEventTop.active = enable;

            this.nodeLobbys.forEach(function (nodeLobby) {
                nodeLobby.active = enable;
            });

            cc.LobbyController.getInstance().setLobbyActive(enable);
        },

        activeNodeTopBar: function (enable) {
            cc.log("chay vao action nodeTopBar : ", enable)
            this.nodeTopBar.active = enable;
            this.nodeSetting.active = enable;
            this.nodeTopBar.getComponent(cc.TopBarView).isCardGame = enable;
            if (enable) {
                this.nodeTopBar.zIndex = cc.NoteDepth.TOP_BAR_CARD_GAME;
                this.refreshAccountInfo();
            } else {
                this.nodeTopBar.zIndex = cc.NoteDepth.TOP_BAR;
            }
        },

        //response
        onGetAccountInfoResponse: function (response) {
            if (response !== null) {
                cc.LoginController.getInstance().setLoginResponse(response.AccountInfo);
                cc.LoginController.getInstance().setNextVPResponse(response.NextVIP);
                cc.LoginController.getInstance().setTopVPResponse(response.TopVP);
            }
            cc.LobbyController.getInstance().topBarUpdateInfo();
            //this.lbTopVp.string = cc.Tool.getInstance().formatNumber(cc.LoginController.getInstance().getTopVPResponse());
        },

        checkVQMMInfo: function () {
            var vqmmGetInfoCommand = new cc.VQMMGetInfoCommand;
            vqmmGetInfoCommand.execute(this);
        },

        onVQMMGetInfoResponse: function (response) {
            //{"Quantity":1,"IsOpen":false,"Response":0}
            if (response !== null && response.Quantity > 0 && response.IsOpen) {
                this.createVQMMView();
            }
        },

        joinGameClicked: function (event, data) {
            if (cc.LoginController.getInstance().checkLogin()) {
                this.joinGame(data);
                //cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, cc.DDNA.getInstance().getGameById(data.toString()), cc.DDNAUIType.BUTTON);
            }
        },

        setIsAudioBg: function () {
            this.IsOnAudioBg = !this.IsOnAudioBg;
            cc.Tool.getInstance().setItem('@onAudioBg', this.IsOnAudioBg);
            if (this.IsOnAudioBg)
                this.audioBg.play();
            else
                this.audioBg.stop();
            this.toggleAudio.isChecked = this.IsOnAudioBg;
        },

        playAudioBg: function () {
            if (this.IsOnAudioBg) {
                this.audioBg.play();
            } else {
                this.audioBg.stop();
            }
        },
        getUserIP: function () {
            Http.get('https://jsonip.com/', {}, (err, res) => {
                if (err == null) {
                    cc.ServerConnector.getInstance().setIP(res.ip);
                }
            });
        }
    });
}).call(this);