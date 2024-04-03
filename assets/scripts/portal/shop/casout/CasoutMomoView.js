// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        animationMenuOTP:cc.Animation,
        Phone:cc.EditBox,
        Amount:cc.EditBox,
        Name:cc.EditBox,
        Otp:cc.EditBox,
        lbOTPType:cc.Label,
        lbCasoutCoin:cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },
    onLoad: function () {
        this.rate = 0;
        this.isTimer = false;
        this.timer = 0;
        this.timePerGetOTP = 120;
        this.updateInterval = 1;
        this.updateTimer = 0;
        this.otpType = cc.OTPType.TELE_GRAM;
    },
    activeTimeOTPButton: function () {
        this.isTimer = true;
        this.updateTimer = 1;
        this.timer = this.timePerGetOTP;
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
    onSubmit : function(){
        if (this.Phone.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập Số điện thoại Momo');
            return;
        }
        
        if (this.Otp.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập Otp');
            return;
        }
        if (this.Amount.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập số ' + cc.Config.getInstance().currency() + ' cần rút');
            return;
        }

        this.VarPhone = this.Phone.string;
        this.VarName = this.Name.string;
        this.VarAmount = this.Amount.string;
        this.VarOtp = this.Otp.string;
        var  CastoutMomoChargeOut = new  cc.CastoutMomoChargeOut();
        CastoutMomoChargeOut.execute(this);
    },
    onEnable: function () {
        var CastoutGetMomo = new  cc.CastoutGetMomo;
        CastoutGetMomo.execute(this);
     },
    onGetMomoResponse:function(data){
        this.rate = data.Rate;
    },
    onGetMomoError:function(data){
      
    },
    onCastoutMomoChargeOutResponse:function(data){
        cc.PopupController.getInstance().showMessage(data.Message);
    },
    onCastoutMomoChargeOutResponseError:function(data){
       
        cc.PopupController.getInstance().showMessageError(data.Message);
    },
    selectOTPEvent: function(event, data) {
        this.otpType = "";
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
    getOTPClicked: function () {
        this.activeTimeOTPButton();
        var getOTPCommand = new cc.GetOTPCommand;
        getOTPCommand.execute(this, '', this.otpType);
    },
    onTotalAmount:function(){
        let coin = this.Amount.string;
        coin = parseFloat(coin); 
        this.lbCasoutCoin.string =  cc.Tool.getInstance().formatNumber(coin + this.rate*coin/100);
    },
    historyClicked: function (startTab) {
        if (cc.LoginController.getInstance().checkLogin()) {
            cc.LobbyController.getInstance().createWithdrawHistoryView(cc.AccountTab.MOMO);
        }
    },
    // update (dt) {},
});
