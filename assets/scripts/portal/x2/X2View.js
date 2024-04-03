/**
 * Created by Welcome on 4/18/2019.
 */
import Http from "../../common/Http";
(function () {
    cc.X2View = cc.Class({
        "extends": cc.Component,
        properties: {
            imagePopup : cc.Sprite
        },

        onLoad: function () {
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {            
            this.loadConfig();
        },
        loadConfig: function () {
            Http.get('https://raw.githubusercontent.com/baccahcm/camp88/main/popup.json', {}, (err, res) => {
                if (err == null) {
                    console.log(res)
                    if(res.status){
                        this.loadImage(res.image);
                    }else{
                        this.closeFinished();
                    }
                }else{
                    this.closeFinished();
                }
            });
        },
        loadImage: function(imageUrl){
            let self = this;
            cc.loader.load({url: imageUrl, type: 'png'}, function (err, tex) {
                if (err !== null) {
                    self.imagePopup.spriteFrame = new cc.SpriteFrame(tex);
                    self.animation.play('openPopup');
                }else{
                    self.closeFinished();
                }
            });                     
        },        

        cardClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.TOPUP);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        momoClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.MOMO);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        bankClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.BANK);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        agencyClicked: function () {
            cc.LobbyController.getInstance().createShopView(cc.ShopTab.AGENCY);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        helpClicked: function () {
            cc.LobbyController.getInstance().createX2RewardView(cc.X2Tab.RULES);
            cc.LobbyController.getInstance().destroyX2PopupView();
        },

        openEventClicked: function (event, index) {
            if (index) {
                if (cc.LoginController.getInstance().checkLogin()) {
                    cc.Tool.getInstance().setItem('@startTabEvent', index.toString());
                    cc.LobbyController.getInstance().createEventViewTopVP();
                    //cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'EVENT_TOP_VP', cc.DDNAUIType.BUTTON);
                    this.closeFinished();
                }
            }
        },

        closeFinished: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.3;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroyX2PopupView();
            }, this, 1, 0, delay, false);
        },
        foneActiveClicked: function () {
            this.closeFinished();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createActiveFoneView();
                //cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'ACTIVE_FONE', cc.DDNAUIType.BUTTON);
            }
        },
        sugarBabyClicked: function () {
            this.closeFinished();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createSugarBabyView();

            }
        },
        xocdiaTruyenThongClicked: function () {
            this.closeFinished();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().joinGame(77);

            }
        },  
        taixiuLiveClicked: function () {
            this.closeFinished();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().joinGame(78);

            }
        },        
    });
}).call(this);
