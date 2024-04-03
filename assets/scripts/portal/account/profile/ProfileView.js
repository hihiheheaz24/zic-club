/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.ProfileView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeInfo: cc.Node,
            nodeAvatar: cc.Node,

            //dành cho update user+pass account FB
            nodeUpdateUsername: cc.Node,
            nodeBtnUpdateUsername: cc.Node,
            nodeBtnChangePass: cc.Node,

            //lbID: cc.Label,
            lbNickName: cc.Label,
            lbBalance: cc.Label,
			lbSafe: cc.Label,
            lbPhoneNumber: cc.Label,
            // lbTeleSafe: cc.Label,
            // lbRank: cc.Label,
            avatar: cc.Avatar,

            nodeButtonPhoneNumber: cc.Node, //bat len khi chua co sdt thay cho lbPhoneNumber
            nodeButtonTeleSafe: cc.Node, //bat len khi chua co TeleSafe

            //#KingViet
            spriteNation: cc.Sprite,
            animationMenuNation: cc.Animation,
        },

        onLoad: function () {
            cc.AccountController.getInstance().setProfileView(this);
        },

        onGetBalanceResponse: function (response) {
			//console.log(response);
            this.lbSafe.string = cc.Tool.getInstance().formatNumber(response.safebalance);
        },
		
        onEnable: function () {
            var getBalanceCommand = new cc.GetBalanceCommand;
            getBalanceCommand.execute(this);
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            //var nextVP = cc.LoginController.getInstance().getNextVPResponse();

            //this.lbID.string = loginResponse.AccountID;
            if(!loginResponse) return;
            this.lbNickName.string = loginResponse.AccountName;
            this.lbBalance.string = cc.Tool.getInstance().formatNumber(loginResponse.Balance);
			//this.lbSafe.string = cc.Tool.getInstance().formatNumber(loginResponse.safebalance);
            if (loginResponse.PhoneNumber === null) {
                this.lbPhoneNumber.node.active = false;
                this.nodeButtonPhoneNumber.active = true;
            } else {
				var phoneNum = loginResponse.PhoneNumber.substring(loginResponse.PhoneNumber.length - 3);
				this.lbPhoneNumber.string = '*******' + phoneNum;
                //this.lbPhoneNumber.string = loginResponse.PhoneNumber;
				this.lbPhoneNumber.node.active = true;
                this.nodeButtonPhoneNumber.active = false;
            }

            //#KingViet
            // if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
            //     if (loginResponse.UserNameSafeNo === null) {
            //         this.nodeButtonTeleSafe.active = true;
            //         this.lbTeleSafe.node.active = false;
            //     } else {
            //         this.lbTeleSafe.string = loginResponse.UserNameSafeNo;
            //         this.nodeButtonTeleSafe.active = false;
            //         this.lbTeleSafe.node.active = true;
            //     }
            // } else {
            //     if (loginResponse.PhoneSafeNo === null) {
            //         this.nodeButtonTeleSafe.active = true;
            //         this.lbTeleSafe.node.active = false;
            //     } else {
            //         this.lbTeleSafe.string = loginResponse.PhoneSafeNo;
            //         this.nodeButtonTeleSafe.active = false;
            //         this.lbTeleSafe.node.active = true;
            //     }
            // }


            // this.lbRank.string = cc.Config.getInstance().formatRank(
            //     loginResponse.RankID,
            //     loginResponse.RankName,
            //     loginResponse.VP,
            //     nextVP ? nextVP.VP : 0,
            // );

            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(loginResponse.AvatarID));

            this.nodeAvatar.active = false;
            this.nodeInfo.active = true;
          
            // if (this.nodeUpdateUsername) {
            //     this.nodeUpdateUsername.active = false;

            //     //la tai khoan FB va chua update Username
            //     if (loginResponse.IsFB) {
            //         if (loginResponse.IsUpdatedFB) {
            //             //Acc FB da update
            //             this.nodeBtnUpdateUsername.active = false;
            //             this.nodeBtnChangePass.active = true;
            //         } else {
            //             //acc FB chua update
            //             this.nodeBtnUpdateUsername.active = true;
            //             this.nodeBtnChangePass.active = false;
            //         }
            //     } else {
            //         //ko phai la TK FB
            //         this.nodeBtnUpdateUsername.active = false;
            //         this.nodeBtnChangePass.active = true;
            //     }
            // }

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nationCode = loginResponse.NationCode;
                var index = cc.Config.getInstance().getIndexByNation(this.nationCode);

                if (this.gameAssets === undefined) {
                    this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
                }

                this.spriteNation.spriteFrame = this.gameAssets.sfNations[index];
                this.spriteNation.node.parent.active = true;
            } else {
                this.spriteNation.node.parent.active = false;
            }

        },

        refreshAvatar: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            this.avatar.setAvatar(cc.AccountController.getInstance().getAvatarImage(loginResponse.AvatarID));
        },

        //#KingViet
        onUpdateNationResponse: function (response) {
            var index = cc.Config.getInstance().getIndexByNation(this.nationCode);
            if (this.gameAssets === undefined) {
                this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
            }

            this.spriteNation.spriteFrame = this.gameAssets.sfNations[index];

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();
            loginResponse.NationCode = this.nationCode;
            cc.LoginController.getInstance().setLoginResponse(loginResponse);

            cc.PopupController.getInstance().showMessage(response.Message);
        },

        onUpdateNationResponseError: function (response) {
            cc.PopupController.getInstance().showMessage(response.Message);
        },

        //clicked
        changePassClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.CHANGE_PASS);
        },

        vipBenefitsClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.VIP);
        },

        changeAvatarClicked: function () {
            this.nodeAvatar.active = true;
        },

        addPhoneNumberClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.SECURITY);
        },

        addTeleSafeClicked: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.SAFE_PLUS);
        },

        showSercurityPopup: function () {
            //cc.AccountController.getInstance().activeTab(cc.AccountTab.SECURITY);
                cc.LobbyController.getInstance().createSecurityView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SECURITY_SHOW', cc.DDNAUIType.BUTTON);
        },
		
        showSafePopup: function () {
            cc.AccountController.getInstance().activeTab(cc.AccountTab.SAFE);
        },

        updateUsernameBackClicked: function () {
            this.nodeInfo.active = true;
            this.nodeUpdateUsername.active = false;
        },

        updateUsernameClicked: function () {
            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                if (loginResponse.UserNameSafeNo === null) {
                    cc.PopupController.getInstance().showMessage('Bạn cần cập nhật App OTP trước.');
                    return;
                }
            } else {
                if (loginResponse.PhoneNumber === null && loginResponse.PhoneSafeNo === null) {
                    cc.PopupController.getInstance().showMessage('Bạn cần cập nhật số điện thoại nhận OTP hoặc App OTP trước.');
                    return;
                }
            }

        
            this.nodeUpdateUsername.active = true;
        },

        //#KingViet
        openMenuNationClicked: function () {
            this.animationMenuNation.play('showDropdownMenu');
        },

        hideMenuNationClicked: function () {
            this.animationMenuNation.play('hideDropdownMenu');
        },

        updateNationClicked: function (event, data) {
            var index = cc.Config.getInstance().getIndexByNation(data.toString());

            // if (this.gameAssets === undefined) {
            //     this.gameAssets = cc.LobbyController.getInstance().getGameAssets();
            // }
            //
            // this.spriteNation.spriteFrame = this.gameAssets.sfNations[index];

            this.nationCode = data.toString();
            var updateNationCommand = new cc.UpdateNationCommand;
            updateNationCommand.execute(this);

            // var nationStr = cc.Config.getInstance().getNationByNationCode(data.toString());
            // this.lbNation.string = nationStr;

            this.animationMenuNation.play('hideDropdownMenu');
        },
        closeClicked: function () {
            //this.showRegister(false);
            //this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                //self.animation.stop();
                cc.LobbyController.getInstance().destroyAccountView();
            }, this, 1, 0, delay, false);
        },
        safeClicked: function () {
			this.closeClicked();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createSafeView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'SAFE', cc.DDNAUIType.BUTTON);
            }
        },
		
        foneActiveClicked: function () {
			this.closeClicked();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createActiveFoneView();
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'ACTIVE_FONE', cc.DDNAUIType.BUTTON);
            }
        },
		
        playHistoryClicked: function () {
			this.closeClicked();
            if (cc.LoginController.getInstance().checkLogin()) {
                cc.LobbyController.getInstance().createPlayhisView(cc.HistoryTab.GAME);
                cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'PLAY_HISTORY', cc.DDNAUIType.BUTTON);
            }
        },
		
        quickLogoutClicked: function () {
            if (this.isCardGame) {
                //thoat game
                cc.LobbyController.getInstance().destroyDynamicView(null);
            } else {
                cc.LobbyController.getInstance().showPopupLogout();
            }
            cc.DDNA.getInstance().uiInteraction(cc.DDNAUILocation.PORTAL, 'BACK', cc.DDNAUIType.BUTTON);
        },

    });
}).call(this);
