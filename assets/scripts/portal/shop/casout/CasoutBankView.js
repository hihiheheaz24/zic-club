
cc.Class({
    extends: cc.Component,

    properties: {
        animationMenuBank: cc.Animation,
        animationMenuOTP:cc.Animation,
        lbNameBank:cc.Label,
        itemToggle:cc.Node,
        toggleContainer:cc.Node,
        SoTK:cc.EditBox,
        TenTK:cc.EditBox,
        Amount:cc.EditBox,
        Otp:cc.EditBox,
        CoinCasout:cc.Label,
        lbOTPType:cc.Label
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onLoad: function () {
        this.rate = 0;
        this.isTimer = false;
        this.timer = 0;
        this.timePerGetOTP = 120;
        this.updateInterval = 1;
        this.updateTimer = 0;
        this.otpType = cc.OTPType.TELE_GRAM;
        var CastoutGetListBankCode = new  cc.CastoutGetListBankCode;
        CastoutGetListBankCode.execute(this);
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
    start: function(){
        this.bankSelect = [];
    },
    onEnable: function () {
        this.bankSelect = [];
        this.lbNameBank.string = "Chọn ngân hàng";
    },
    resetInput: function () {
        this.SoTK.string = '';
        this.TenTK.string = '';
        this.Amount.string = '';
        this.Otp.string = '';
		this.CoinCasout.string = "0";
        this.lbNameBank.string = "Chọn ngân hàng";
    },
    activeTimeOTPButton: function () {
        this.isTimer = true;
        this.updateTimer = 1;
        this.timer = this.timePerGetOTP;
    },
    selectBankNameEvent: function(event, data) {
        console.log(event);
        if( this.bankSelect.length > 0){
        
            let _nodeView = this.bankList[this.bankSelect[0]];
            let _varNode = _nodeView.getComponent(cc.VarNode);
            _varNode.nodes[1].active = false;
        }
        var val = data.toString().split("|");
        this.bankSelect  = val;

        this.lbNameBank.string = "("+val[0]+")"+val[1];
        this.animationMenuBank.play('hideDropdownMenu');

        if(val.length > 1){
            var nodeView = this.bankList[val[0]];
            var varNode = nodeView.getComponent(cc.VarNode);
            varNode.nodes[1].active = true;
        }
    },

    openMenuBankNameClicked: function () {
        console.log("openMenuBankNameClicked");
        this.animationMenuBank.play('showDropdownMenu');
    },

    hideMenuBankNameClicked: function () {
        this.animationMenuBank.play('hideDropdownMenu');
    },
    onEnable: function () {
    //    var CastoutGetListBankCode = new  cc.CastoutGetListBankCode;
    //    CastoutGetListBankCode.execute(this);
    },
    onCastOutBankGetListBankCodeResponse:function(data){
		console.log(data);
        this.rate = data.Rate;
        this.bankList = {};
        for(let i =0 ; i < data.Data.length; i++){
            var nodeView = cc.instantiate(this.itemToggle);
            nodeView.active = true;

            var varNode = nodeView.getComponent(cc.VarNode);
            varNode.nodes[0].getComponent(cc.Label).string =  "("+data.Data[i].code+") "+data.Data[i].name;
            varNode.nodes[1].getComponent(cc.Label).string = "("+data.Data[i].code+") "+data.Data[i].name;
            var _toggle = nodeView.getComponent(cc.Button);
         
             _toggle.clickEvents[0].customEventData  = data.Data[i].code+"|"+data.Data[i].name;

            nodeView.parent = this.toggleContainer;
            this.bankList[data.Data[i].code] = nodeView;
        }
    },
    onCastoutBankChargeOutResponse:function(data){
        cc.PopupController.getInstance().showMessage(data.Message);
    },
    onCastoutBankChargeOutResponseError:function(data){
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
    onSubmit : function(){
        if (this.bankSelect.length == 0) {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập chọn ngân hàng');
            return;
        }
        if (this.SoTK.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập Số tài khoản');
            return;
        }
        if (this.TenTK.string === '') {
            cc.PopupController.getInstance().showMessage('Vui lòng nhập Tên tài khoản');
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

        this.VarSoTk = this.SoTK.string;
        this.VarNameTk = this.TenTK.string;
        this.VarAmount = this.Amount.string;
        this.VarOtp = this.Otp.string;
        this.VarBankCode = this.bankSelect[0];
        this.VarBankName = this.bankSelect[1];
        var  CastoutBankChargeOut = new  cc.CastoutBankChargeOut();
        CastoutBankChargeOut.execute(this);
		this.resetInput();
    },

    historyClicked: function (startTab) {
        if (cc.LoginController.getInstance().checkLogin()) {
            cc.LobbyController.getInstance().createWithdrawHistoryView(cc.AccountTab.BANK);
        }
    },
    
    onTotalAmount:function(){
        let coin = this.Amount.string;
        coin = parseFloat(coin); 
        this.CoinCasout.string =  cc.Tool.getInstance().formatNumber(coin + this.rate*coin/100);
    }
    // update (dt) {},
});
