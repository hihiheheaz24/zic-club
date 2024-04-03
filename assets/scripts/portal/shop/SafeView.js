/**
 * Created by Nofear on 3/15/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.SafeView = cc.Class({
        "extends": cc.Component,
        properties: {
            availableBalance: cc.Label,
            freezeBalance: cc.Label,

            editBoxValueIn: cc.EditBox,

            editBoxValueOut: cc.EditBox,
            editBoxOTP: cc.EditBox,

            btnGetOTPs: [cc.Button],
            lbBtnGetOTPs: [cc.Label],

            //menu otp
            nodeTeleSafes: [cc.Node],

            animationMenuOTP: cc.Animation,
            lbOTPType: cc.Label,
        },

        onLoad: function () {
            this.isTimer = false;
            this.timer = 0;
            this.timePerGetOTP = 30;
            this.updateInterval = 1;
            this.updateTimer = 0;

            this.freezeBalance.string = '0';
            this.availableBalance.string = '0';

            this.otpType = cc.OTPType.TELE_SAFE;

            // this.editBoxValue.placeholder = 'Số ' + cc.Config.getInstance().currency() + ' đóng băng';
            // this.editBoxValue.placeholder = 'Số ' + cc.Config.getInstance().currency() + ' giao dịch';
			this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
			this.animation.play('openPopup');
            this.editBoxValueOut.string = '';
            this.editBoxValueIn.string = '';
            this.editBoxOTP.string = '';
            this.timer = parseInt(cc.Tool.getInstance().getItem("@TimeGetOTPSafe"));
            this.processTimeOTPButton();

            var getBalanceCommand = new cc.GetBalanceCommand;
            getBalanceCommand.execute(this);

            var loginResponse = cc.LoginController.getInstance().getLoginResponse();

            //#KingViet
            if (cc.Config.getInstance().getDomainVK().includes(netConfig.HOST)) {
                this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                    nodeTeleSafe.active = false;
                });
                this.otpType = cc.OTPType.TELE_SAFE;
                this.lbOTPType.string = 'App OTP';
            } else {
                if (loginResponse.PhoneSafeNo === null) {
                    this.nodeTeleSafes.forEach(function (nodeTeleSafe) {
                        nodeTeleSafe.active = false;
                    });
                    this.otpType = cc.OTPType.TELE_GRAM;
                    this.lbOTPType.string = 'OTP TELE';
                }
            }

        },

        onDisable: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPSafe", Math.round(this.timer));
        },

        onDestroy: function () {
            cc.Tool.getInstance().setItem("@TimeGetOTPSafe", Math.round(this.timer));
        },

        update: function (dt) {
            if (this.isTimer) {
                this.timer -= dt;
                this.updateTimer += dt;

                if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
                this.updateTimer = 0;
                this.processTimeOTPButton();
            }
        },

        activeTimeOTPButton: function () {
            this.isTimer = true;
            this.updateTimer = 1;
            this.timer = this.timePerGetOTP;
        },

        processTimeOTPButton: function () {
            if (this.timer <= 0) {
                this.isTimer = false;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = true;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = 'Lấy OTP';
                });
            } else {
                this.isTimer = true;
                var timeBtn = this.timer;
                this.btnGetOTPs.forEach(function (btnGetOTP) {
                    btnGetOTP.interactable = false;
                });
                this.lbBtnGetOTPs.forEach(function (lbBtnGetOTP) {
                    lbBtnGetOTP.string = Math.round(timeBtn);
                });
            }
        },

        onEditingFreezeValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValueIn.string);
            this.editBoxValueIn.string = cc.Tool.getInstance().formatNumber(val);
        },

        onEditingOpenValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValueOut.string);
            this.editBoxValueOut.string = cc.Tool.getInstance().formatNumber(val);
        },

        onGetBalanceResponse: function (response) {
			console.log(response);
            this.availableBalance.string = cc.Tool.getInstance().formatNumber(response.balance);
            this.freezeBalance.string = cc.Tool.getInstance().formatNumber(response.safebalance);
        },

        onGetOTPResponse: function (response) {
            if (response.Message) {
                cc.PopupController.getInstance().showMessage(response.Message);
            } else {
                cc.PopupController.getInstance().showMessage('Lấy OTP thành công');
            }
        },

        onGetOTPResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
        },

        onDepositResponse: function (response) {
            this.editBoxValueIn.string = '';
            cc.PopupController.getInstance().showMessage('Đóng băng thành công');
            this.availableBalance.string = cc.Tool.getInstance().formatNumber(response.AccountSafeInfo.Balance);
            this.freezeBalance.string = cc.Tool.getInstance().formatNumber(response.AccountSafeInfo.SafeBalance);

            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        onWithdrawResponse: function (response) {
            this.editBoxValueOut.string = '';
            //this.editBoxOTP.string = '';
            cc.PopupController.getInstance().showMessage('Mở băng thành công');
            this.availableBalance.string = cc.Tool.getInstance().formatNumber(response.AccountSafeInfo.Balance);
            this.freezeBalance.string = cc.Tool.getInstance().formatNumber(response.AccountSafeInfo.SafeBalance);

            cc.LobbyController.getInstance().refreshAccountInfo();
        },

        selectOTPEvent: function(event, data) {
            if(data.toString() === 'App OTP'){
                this.otpType = cc.OTPType.TELE_SAFE;
            }else if(data.toString() === 'OTP TELE'){
                this.otpType = cc.OTPType.TELE_GRAM;
            }else{
                this.otpType = cc.OTPType.SMS;
            }
            this.lbOTPType.string = data.toString();
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        openMenuOTPClicked: function () {
            this.animationMenuOTP.play('showDropdownMenu');
        },

        hideMenuOTPClicked: function () {
            this.animationMenuOTP.play('hideDropdownMenu');
        },

        getOTPClicked: function () {
            this.activeTimeOTPButton();

            var getOTPCommand = new cc.GetOTPCommand;
            getOTPCommand.execute(this, '', this.otpType);
        },
        
        freezeClicked: function () {
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxValueIn.string);
            if (this.amount === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số ' + cc.Config.getInstance().currency() + ' đóng băng');
                return;
            }

            var depositCommand = new cc.DepositCommand;
            depositCommand.execute(this);
        },
        
        openClicked: function () {
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxValueOut.string);
            this.otp = this.editBoxOTP.string;

            if (this.amount === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số ' + cc.Config.getInstance().currency() + ' mở băng');
                return;
            }

            if (this.otp === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập mã OTP');
                return;
            }

            var withdrawCommand = new cc.WithdrawCommand;
            withdrawCommand.execute(this);
        },
         backClicked: function () {
            //this.showRegister(false);
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                if (self.isOpenFromLobby) {
                    cc.LobbyController.getInstance().destroySafeView();
                } else
                    self.node.active = false;
            }, this, 1, 0, delay, false);
        }
    });
}).call(this);
