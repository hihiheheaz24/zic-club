/**
 * Created by Nofear on 3/15/2019.
 */

 (function () {
    cc.MomoView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeCode: cc.Node,
            lbMoMoName: cc.Label,
            lbMoMoPhone: cc.Label,
            lbMoMoContent: cc.Label,
            editBoxMenhGia: cc.EditBox,
            lbCode: cc.Label,
            lbTimeRemain: cc.Label,
            btnCreateCode: cc.Node,            
        },

        onLoad: function () {
            this._action = false;
            this.countdownTimer = null;
        },
        onEnable: function () {
            this._action = false;
            if(!this._action){
                this.resetUI();
            }
        },
        onDestroy(){
            clearInterval(this.countdownTimer);
        },
        resetUI: function () {
            this._action = false;
            this.nodeCode.active = false;
            this.btnCreateCode.active = true;
            this.lbMoMoName.string = "";
            this.lbMoMoPhone.string = "";
            this.lbMoMoContent.string = "";
        },

        onGetListMomoResponse: function (response) {
            this.lbMoMoName.string = response.Orders.WalletAccountName;
            this.lbMoMoPhone.string = response.Orders.WalletAccount;
            this.lbMoMoContent.string = response.Orders.Message;
            this.lbCode.string = response.Orders.Message;    
            this.progressCountdown(300);      
            this.nodeCode.active = true;
            this.btnCreateCode.active = false;           
        },

        onGetListMomoResponseError: function (response) {
            cc.PopupController.getInstance().showMessageError(response.Message);
        },

        copyMoMoAccountClicked: function () {
            if(cc.Tool.getInstance().copyToClipboard(this.lbMoMoPhone.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép số tài khoản.');
            }
        },

        copyMoMoNameClicked: function () {
            if(cc.Tool.getInstance().copyToClipboard(this.lbMoMoPhone.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép tên tài khoản.');
            }
        },

        copyMoMoContentClicked: function () {
            if(cc.Tool.getInstance().copyToClipboard(this.lbMoMoContent.string)) {
                cc.PopupController.getInstance().showMessage('Đã sao chép nội dung chuyển khoản.');
            }
        },

        napTien: function (event) {
			var val = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
			if(parseInt(val) < 0 || this.editBoxMenhGia.string == ""){
				cc.PopupController.getInstance().showMessage('Vui lòng điền số tiền muốn nạp');
			}else{
				this._action = true;
				this.amountNap = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
                cc.PopupController.getInstance().showBusy();
				var getListMomoCommand = new cc.GetListMomoCommand;
				getListMomoCommand.execute(this);
			}
        },
        onEditingValueChanged: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
            this.editBoxMenhGia.string = cc.Tool.getInstance().formatNumber(val);
           // this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxMenhGia.string;
        },

        onEditingValueDidEnd: function () {
            var val = cc.Tool.getInstance().removeDot(this.editBoxMenhGia.string);
            this.editBoxMenhGia.string = cc.Tool.getInstance().formatNumber(val);
           //this.lbValueTransfer.string = 'Số ' + cc.Config.getInstance().currency() + ' cần chuyển: ' + this.editBoxMenhGia.string;
        },
        expireCodeData:function(){
            clearInterval(this.countdownTimer);
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
