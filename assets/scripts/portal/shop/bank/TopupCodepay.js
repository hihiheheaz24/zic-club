/**
 * Created by Nofear on 3/15/2019.
 */
 
 
(function () {
    cc.TopupCodepay = cc.Class({
        "extends": cc.Component,
        properties: {
            codeNode: cc.Node, 
            //step1
            toggleChooseValue: cc.ToggleChooseValue,
            lbSelectedBank: cc.Label,
            animationMenuBank: cc.Animation,
            editBoxValue: cc.EditBox,
            editBoxCaptcha: cc.EditBox,
            lbMoney: cc.Label,
            imageUrlCaptcha: cc.ImageUrl,
            btnConfirm: cc.Button,
            lbConfirms: [cc.Label],
 
            //step2
            lbInfoBank: cc.Label,
            lbInfoBankAccountNumber: cc.Label,
            lbInfoBankAccountName: cc.Label,
            lbInfoMoney: cc.Label,
            lbInfoTranID: cc.Label,
            lbCode: cc.Label,
            lbTimeRemain: cc.Label,
            btnCreateCode: cc.Node,   
        },
 
        onLoad: function () {
            this.animOpenName = 'showDropdownMenu';
            this.animCloseName = 'hideDropdownMenu'; 
            cc.PopupController.getInstance().showBusy();
            this.depositId = 0;
            this.countdownTimer = null;
            this.getListTopupBank();
        },
 
        onEnable: function () {
            this.animationMenuBank.node.scaleY = 0;
            if(this.depositId == 0){
                this.resetUI();
            }
        },
        onDestroy(){
            clearInterval(this.countdownTimer);
        },
 
        update: function (dt) {

        },
 
        getListTopupBank: function () {
            var getListTopupBankCommand = new cc.GetListTopupBankCommand;
            getListTopupBankCommand.execute(this);
        },
 
        onGetListTopupBankResponse: function (response) {
            cc.BankController.getInstance().setResponseTopupBanks(response); 
            if (response.Type) {
                this.type = response.Type;
            } 
            var list = response.Orders.List;
            this.toggleChooseValue.resetListChooseValue();
            var self = this;
            var posY = -35;// Vi tri dau tien cua Item -> fix bug
            var index = 0;
            list.forEach(function (bank) {
                self.toggleChooseValue.initializeToggleChooseValue(
                    self,
                    "TopupCodepay",
                    "selectBankEvent",
                    bank,
                    bank.name,
                    posY
                );
                posY -= 50;
            })
        },
 
        resetScale: function () {
            this.animationMenuBank.node.scaleY = 0;
            this.animationMenuBank.node.opacity = 255;
        },
 
        restoreScale: function () {
            this.animationMenuBank.node.scaleY = 1;
            this.animationMenuBank.node.opacity = 0;
        },
 
        resetInput: function () {
            if (this.editBoxValue) {
                this.editBoxValue.string = '';
            }
            this.lbInfoBank.string = "Chọn ngân hàng";
            this.lbInfoBankAccountNumber.string = "";
            this.lbInfoBankAccountName.string = "";
            this.lbInfoTranID.string = "";
        },
 
        getCaptcha: function () {
            var getCaptchaCommand = new cc.GetCaptchaCommand;
            getCaptchaCommand.execute(this);
        },
 
        setLBSelectedBank: function (bank) {
            this.lbSelectedBank.string = bank.name;
            this.banks = bank;
			this.bankCode = bank.code;
        },
 
        selectBank: function (value) {
            this.bankType = value;
        },
 
        onGetCaptchaResponse: function (response) {
            if (this.imageUrlCaptcha)
                this.imageUrlCaptcha.get('data:image/png;base64,' + cc.Tool.getInstance().removeStr(response[1], '\r\n'));
        },
 
        onChargeBankResponse: function (response) {
			if(response != null){ 
                var orders = response.Orders;
                console.log(orders);
                //this.orders = orders;
                //this.banks = orders.List;
                //this.lbInfoBank.string = orders.List.bank_provider;
                this.lbInfoBankAccountNumber.string = orders.List.phoneNum;
                this.lbInfoBankAccountName.string = orders.List.phoneName;
                this.lbInfoTranID.string = orders.List.code;
                this.lbCode.string = orders.List.code;
                this.progressCountdown(300);      
                this.codeNode.active = true;      
                this.btnCreateCode.active = false;
                this.depositId = 1;
            }
        },
 
        onChargeBankResponseError: function (response) {
            if (response.Description)
                cc.PopupController.getInstance().showMessageError(response.Description);
            else
                cc.PopupController.getInstance().showMessageError(response.Message, response.ResponseCode);
 
            this.getCaptcha();
            //nap that bai thi reset captcha
            //this.editBoxCaptcha.string = '';
        },
 
        copyBankClicked: function () {
 
        },
 
        copyBankAccountNumberClicked: function () {
            if(this.lbInfoBankAccountNumber != null && cc.Tool.getInstance().copyToClipboard(this.lbInfoBankAccountNumber.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép số tài khoản.');
            }
        },
 
        copyBankAccountNameClicked: function () {
            if(this.lbInfoBankAccountName != null && cc.Tool.getInstance().copyToClipboard(this.lbInfoBankAccountName.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép tên tài khoản.');
            }
        },
 
        copyMoneyValueClicked: function () {
 
        },
 
        copyTranIDClicked: function () {
            if(this.lbInfoTranID != null && cc.Tool.getInstance().copyToClipboard(this.lbInfoTranID.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung chuyển khoản.');
            }
        },
 
        onEditingValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.editBoxValue.string = cc.Tool.getInstance().formatNumber(val);
        },
 
        onEditingValueDidEnd: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            this.editBoxValue.string = cc.Tool.getInstance().formatNumber(val);
        },
 
        openMenuBankClicked: function () {
            this.animationMenuBank.play(this.animOpenName);
        },
 
        hideMenuBankClicked: function () {
            this.animationMenuBank.play(this.animCloseName);
        },
 
        selectBankEvent: function(event, data) {
			this.bankCode = data.bankCode;
            this.selectBank(data.BankName);
            this.setLBSelectedBank(data);
            this.animationMenuBank.play(this.animCloseName);
        },
 
        chooseBankClicked: function (event, data) {
            this.selectBank(data.toString());
            this.setLBSelectedBank(data.toString());
        },
 
        refreshCaptchaClicked: function () {
            this.getCaptcha();
        },
 
        historyClicked: function () {
            cc.LobbyController.getInstance().createHistoryView(cc.HistoryTab.BANK);
        },

        topupClicked: function () {
            if (this.bankCode === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng chọn ngân hàng nạp.');
                return;
            }
            this.amount = cc.Tool.getInstance().removeDot(this.editBoxValue.string);
            if (this.editBoxValue.string === '') {
                cc.PopupController.getInstance().showMessage('Vui lòng nhập số tiền muốn nạp.');
                return;
            }
            cc.PopupController.getInstance().showBusy();
            var chargeBankCommand = new cc.ChargeBankCommand;
            chargeBankCommand.execute(this);
        },

        helpClicked: function () {
            // this.nodeHelp.active = true;
        },

        closeHelpClicked: function () {
            this.nodeHelp.active = false;
        },
        resetUI: function () {
            this.codeNode.active = false;
            this.btnCreateCode.active = true;
            this.bankCode = '';
            this.resetInput();
        },
        expireCodeData:function(){
            clearInterval(this.countdownTimer);
            this.depositId = 0;
            this.resetUI();
        },
        fancyTimeFormat: function(duration)
        {   
            // Hours, minutes and seconds
            var hrs = ~~(duration / 3600);
            var mins = ~~((duration % 3600) / 60);
            var secs = ~~duration % 60;
    
            // Output like "1:01" or "4:03:59" or "123:03:59"
            var ret = "";
    
            if (hrs > 0) {
                ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
            }
    
            ret += "" + mins + ":" + (secs < 10 ? "0" : "");
            ret += "" + secs;
            return ret;
        },
        progressCountdown: function(timeleft) {
            return new Promise((resolve, reject) => {
               this.countdownTimer = setInterval(() => {
                try {
                    timeleft--;
                    this.lbTimeRemain.string = this.fancyTimeFormat(timeleft);
                    if (timeleft <= 0) {
                    this.expireCodeData();
                    clearInterval(this.countdownTimer);
                    resolve(true);
                    }
                } catch (error) {
                    
                }
              }, 1000);
            });
        }
    });
}).call(this);
