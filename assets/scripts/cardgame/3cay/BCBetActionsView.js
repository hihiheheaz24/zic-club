/*
 * Generated by BeChicken
 * on 7/24/2019
 * version v1.0
 */

(function () {
    cc.BCBetActionsView = cc.Class({
        "extends": cc.Component,
        properties: {
            //Slide cuoc
            sliderBetValue: cc.Slider,
            // Btn cuoc
            nodeBtnBet: cc.Node,
            // Btn Bien
            nodeBtnBetSide1: cc.Node,
            nodeBtnBetSide2: cc.Node,
            // Btn Gop ga
            nodeBtnFedChicken: cc.Node,
            // Btn Nhan Bien
            nodeBtnReceivSide: cc.Node,

            // Lb tien cuoc
            lbCurrentBet: cc.Label,

            groupBet: cc.Node,
            groupBien: cc.Node

        },
        onLoad: function () {
            cc.BCController.getInstance().setBCBetActionsView(this);
            this.isBetted = false;
            cc.BCController.getInstance().isBetted = this.isBetted;
            this.currBetValue = cc.BCController.getInstance().getBetRoom();
            this.lbCurrentBet.string = cc.Tool.getInstance().formatNumber(this.currBetValue);
            this.enableLayoutBet(true);

            // Trang thai nhan bien
            this.stateReievBetSide = false;
            cc.BCController.getInstance().setStateReiecvBetSide(this.stateReievBetSide);

            this.initBienBtn();

        },

        onDestroy: function () {
            cc.BCController.getInstance().setBCBetActionsView(null);
        },

        resetSliderBet:function() {
          this.sliderBetValue.progress = 0;
            this.sliderBetValue.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = 0;
        },
        initBienBtn: function() {
            //Set gia tri danh bien
            this.valBien1 = cc.BCController.getInstance().getBetRoom();
            this.valBien2 = 2 * this.valBien1;

            let lbBien1 = this.nodeBtnBetSide1.getComponentInChildren(cc.Label);
            let lbBien2 = this.nodeBtnBetSide2.getComponentInChildren(cc.Label);

            lbBien1.string = this.formatValueRoom(this.valBien1);
            lbBien2.string = this.formatValueRoom(this.valBien2);
        },
        //cap nhat UI view bet theo state
        updateUIActionBet: function (state) {

            this.initBienBtn();

            switch (state) {
                case cc.BCState.WAITING: //wating
                case cc.BCState.CONFIRM: //confirm
                case cc.BCState.DEALER: //chia bài
                case cc.BCState.FLIP://lat bai
                case cc.BCState.FINISH://xem ket qua. ket thuc -> hoi chuong
                case cc.BCState.ASK_OTHER: //ket thuc hoi chuong -> hoi nguoi khac
                case cc.BCState.FINISH_ASKED://het thoi gian hoi nguoi muon lam chuong.
                    // an het cac button
                    this.groupBet.active = false;
                    this.groupBien.active = false;
                    break;
                case cc.BCState.BETTING://dat tien
                    this.enableLayoutBet(true);
                    break;

            }
        },
        //event cuoc
        onBet: function () {
            let strMoney = this.lbCurrentBet.string;
            strMoney = strMoney.replace(/\./g, '');
            let money = parseInt(strMoney);
            // Kiem tra so du neu false return
            if (!this.checkBalance(money))
                return;
            cc.BCController.getInstance().isBetted = true;
            // Hien thi btn Bien
            cc.BCController.getInstance().showBtnBien();
            cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, money);
            this.enableLayoutBet(false);
            cc.BCController.getInstance().showBtnBien();
        },
        // Kiem tra so du
        checkBalance: function (money) {
            if (money > cc.BalanceController.getInstance().getBalance()) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ.');
                return false;
            }
            return true;
        },
        //event danh bien 1
        onBetSide1: function () {
            let money = parseInt(this.valBien1);
            this.betSide(money);
        },
        //event danh bien 2
        onBetSide2: function () {
            let money = parseInt(this.valBien2);
            this.betSide(money);
        },
        betSide: function (money) {
            if (!this.checkBalance(money))
                return;
            cc.BCController.getInstance().hideBtnBien();
            let listUser = cc.BCController.getInstance().getPositions();
            let ownerId = cc.BCController.getInstance().getOwnerID();
            let currentAcc = cc.LoginController.getInstance().getUserId();
            let listAcceptedBet = cc.BCController.getInstance().getAcceptedBet();
            // Lay accID khong phai la chuong
            let otherList = listUser.filter(accID => accID != ownerId && accID != currentAcc && accID != 0 && !listAcceptedBet.includes(accID));

            //an btn danh bien
            this.nodeBtnBetSide1.active = false;
            this.nodeBtnBetSide2.active = false;
            this.nodeBtnReceivSide.active = false;

            if (otherList.length == 0)
                return;
            otherList.map(accId => {
                cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.BET_OTHERS, accId, money);
            });
        },
        //event gop ga
        onFeedChicken: function () {
            cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.FEED_CHICKEN);
            this.nodeBtnFedChicken.active = false;
        },
        //bat trang thai nhan bien
        onActiveRecievBetSide: function () {
            this.stateReievBetSide = true;
            cc.BCController.getInstance().setStateReiecvBetSide(this.stateReievBetSide);
            // Kiem tra co yeu danh bien hay khong, neu co tu dong accept
            let lstRequestBetOther = cc.BCController.getInstance().getRequestBetOther();
            if(lstRequestBetOther.length > 0) {
                lstRequestBetOther.map(fromAccId => {
                    cc.BCController.getInstance().sendRequestOnHub(cc.MethodHubName.ACCEPT_BET, fromAccId, true);
                })
            }

            this.nodeBtnReceivSide.active = false;
        },

        setUpUIBetByPharse: function(pharse) {
          switch (pharse) {
              case cc.BCState.BETTING:
                  this.enableLayoutBet(true);
                  break;
              default:
                  this.enableLayoutBet(false);
                  break;
          }
        },
        enableLayoutBet: function (enable) {


            this.groupBet.active = enable;
            this.nodeBtnBet.active = enable;

            this.groupBien.active = !enable;
            this.nodeBtnBetSide1.active = !enable;
            this.nodeBtnBetSide2.active = !enable;
            this.nodeBtnFedChicken.active = !enable;
            this.nodeBtnReceivSide.active = !enable;

            let ownerId = cc.BCController.getInstance().getOwnerID();

            if(ownerId && ownerId == cc.LoginController.getInstance().getUserId()) {
                this.nodeBtnFedChicken.active = enable;
                this.groupBien.active = enable;
                this.groupBet.active = !enable;
            }

        },

        enableOnLyFeedChicken: function() {
            this.nodeBtnFedChicken.active = true;
            this.nodeBtnBetSide1.active = false;
            this.nodeBtnBetSide2.active = false;
            this.nodeBtnReceivSide.active = false;
        },
        onSetBetValue: function (slider) {
            let value = cc.BCController.getInstance().getBetRoom() * slider.progress.toFixed(1);
            this.sliderBetValue.node.getChildByName('progressBar').getComponent(cc.ProgressBar).progress = slider.progress.toFixed(1);
            this._updateCurrentBetValue(value);
        },

        _updateCurrentBetValue: function (value) {
            this.currBetValue = cc.BCController.getInstance().getBetRoom() + value;
            this.lbCurrentBet.string = cc.Tool.getInstance().formatNumber(this.currBetValue);
        },

        //Thu bai
        onCollectCard: function () {
            cc.BCController.getInstance().collectCards();
        },
        formatValueRoom: function (value) {
            if (value >= 1000) {
                value = (value / 1000) + "K";

            }
            return value;

        }

    });
}).call(this)