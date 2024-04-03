/**
 * Created by Welcome on 4/18/2019.
 */

(function () {
    cc.SugarBabyView = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.node.zIndex =  cc.NoteDepth.POPUP_PORTAL;
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },

        closeFinished: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.3;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.LobbyController.getInstance().destroySugarBabyView();
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
    });
}).call(this);
