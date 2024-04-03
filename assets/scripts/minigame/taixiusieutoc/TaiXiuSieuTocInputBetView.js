/**
 * Input dat cuoc
 */

(function () {
    cc.TaiXiuSieuTocInputBetView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeInput: cc.Node, //node input
            nodeInputValue: cc.Node, //node chon so tien de bet
            nodeInputFree: cc.Node, //node tu do chon so tien
            lbBetTaiTemp: cc.Label,
            lbBetXiuTemp: cc.Label,
            audioChonSo: cc.AudioSource,
            editBoxDatTai: cc.EditBox,
            editBoxDatXiu: cc.EditBox,
            nodeTaiSelect:cc.Node,
            nodeXiuSelect:cc.Node,
        },

        onLoad: function () {
            this.resetInput();

            this.animation = this.node.getComponent(cc.Animation);
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocInputBetView(this);

            this.reset();
        },
        onClickTaiSelect:function(){
            this.nodeTaiSelect.active = false;
            this.openInputBetTaiClicked();
        },
        onClickXiuSelect:function(){
            this.nodeXiuSelect.active = false;
            this.openInputBetXiuClicked();
        },
        onDestroy: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocInputBetView(null);
        },

        reset: function () {
            if (cc.sys.isNative) {
                //this.editBoxDatTai.active = false;
                //this.editBoxDatXiu.active = false;
            }
        },

        //reset lai gia tri input
        resetInput: function () {
            this.nodeXiuSelect.active = true;
            this.nodeTaiSelect.active = true;

            //this.editBoxDatXiu.string = '';
            //this.editBoxDatTai.string = '';

            this.betValue = 0;
        },

        //mo cua so input
        openInput: function () {
            cc.TaiXiuSieuTocController.getInstance().resetPositionTX();

            this.nodeInput.active = true;
            this.nodeInputValue.active = true;
            this.nodeInputFree.active = false;
            this.isInputValue = true;
            this.animation.play('openBetInput');
        },

        //dong input
        closeInput: function () {
            this.resetInput();
            this.animation.play('closeBetInput');
        },

        //animation trigger goi sau khi dong cua so input
        closeBetInputEvent: function () {
            this.nodeInput.active = false;
			this.nodeTaiSelect.active = true;
			this.nodeXiuSelect.active = true;
        },

        //cap nhat gia tri bet dua tren so tien Bet
        updateValueBetUI: function () {
            if (this.betSide === cc.TaiXiuSieuTocBetSide.TAI) {
                this.lbBetTaiTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            } else {
                this.lbBetXiuTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            }
        },

        //click mo cua so input Tai
        openInputBetTaiClicked: function () {
            if (this.nodeInput.active && this.betSide === cc.TaiXiuSieuTocBetSide.TAI) {
                this.closeInput();
            } else if (this.nodeInput.active && this.betSide === cc.TaiXiuSieuTocBetSide.XIU) {
                this.betSide = cc.TaiXiuSieuTocBetSide.TAI;
                this.lbBetXiuTemp.string = '0';
				this.nodeXiuSelect.active = true;
                this.lbBetTaiTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            } else {
                this.betSide = cc.TaiXiuSieuTocBetSide.TAI;
                this.lbBetTaiTemp.string = 0;
                this.openInput();
                if (!cc.sys.isNative) {
                    //this.editBoxDatTaifocus();
                }
            }
        },

        //click mo cua so input Xiu
        openInputBetXiuClicked: function () {
            if (this.nodeInput.active && this.betSide === cc.TaiXiuSieuTocBetSide.XIU) {
                this.closeInput();
            } else if (this.nodeInput.active && this.betSide === cc.TaiXiuSieuTocBetSide.TAI) {
                this.betSide = cc.TaiXiuSieuTocBetSide.XIU;
                this.lbBetTaiTemp.string = '0';
				this.nodeTaiSelect.active = true;
                this.lbBetXiuTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            } else {
                this.betSide = cc.TaiXiuSieuTocBetSide.XIU;
                this.lbBetXiuTemp.string = 0;
                this.openInput();
                if (!cc.sys.isNative) {
                    //this.editBoxDatXiufocus();
                }
            }
        },

        //chon gia tri
        betValueClicked: function (event, data) {
            this.betValue += parseInt(data.toString());

            this.updateValueBetUI();
            this.audioChonSo.play();
        },

        //them so
        addValueClicked: function (event, data) {
            this.betValue += data.toString();
            this.betValue = parseInt(this.betValue);

            this.updateValueBetUI();
            this.audioChonSo.play();
        },

        //lui 1 so
        deleteClicked: function () {
            this.betValue = (this.betValue.toString().substring(0, this.betValue.toString().length - 1));
            if (this.betValue === '') {
                this.betValue = 0;
            } else {
                this.betValue = parseInt(this.betValue);
            }

            this.updateValueBetUI();
            this.audioChonSo.play();
        },

        //huy input
        cancelClicked: function () {
            this.closeInput();
            this.audioChonSo.play();
        },
        allInClick(){
            let coin = cc.BalanceController.getInstance().getBalance();
            if(this.betSide ==cc.TaiXiuSieuTocBetSide.XIU){
                this.onTextXiuChange(coin)
            }else{
                this.onTextTaiChange(coin)
            }
        },
        //xac nhan bet
        confirmClicked: function (e,val) {
            //goi len Hub params(bet, betValue, betSide)
            
           
            
            if (this.betValue < 1000) {
                cc.PopupController.getInstance().showMessage('Đặt tối thiểu 1.000 ' + cc.Config.getInstance().currency());
            } else if (cc.BalanceController.getInstance().getBalance() < this.betValue) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ');
            } else {
                cc.TaiXiuSieuTocController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, this.betValue, this.betSide);
            }

            this.closeInput();
            this.audioChonSo.play();
        },

        //chuyen kieu input
        otherClicked: function () {
            this.betValue = 0;
            this.updateValueBetUI();

            this.nodeInputValue.active = !this.isInputValue;
            this.nodeInputFree.active = this.isInputValue;
            this.isInputValue = !this.isInputValue;
            this.audioChonSo.play();
        },

        //text xiu change
        onTextXiuChange: function(data) {
            this.betValue = data.toString();
            this.betValue = parseInt(this.betValue);
            this.lbBetXiuTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            this.audioChonSo.play();
        },
        //text tai change
        onTextTaiChange: function(data) {
            this.betValue = data.toString();
            this.betValue = parseInt(this.betValue);
            this.lbBetTaiTemp.string = cc.Tool.getInstance().formatNumber(this.betValue);
            this.audioChonSo.play();
        }

    });
}).call(this);
