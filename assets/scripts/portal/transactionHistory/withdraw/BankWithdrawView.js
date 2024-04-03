/**
 * Created by Nofear on 3/15/2019.
 */

// var bankTransactionListData = require('BankTransactionListData');

(function () {
    cc.BankWithdrawView = cc.Class({
        "extends": cc.Component,
        properties: {
            bankTransactionListView: cc.BankWithdrawTransactionListView,
            nextButton: cc.Node,
            prevButton: cc.Node,
            lbPage : cc.Label,
        },

        onLoad: function () {
            var startTab = cc.Tool.getInstance().getItem('@startWithdrawTab');
            this.viewType = startTab;
            this.perPage = 20;
            this.currentPage = 1;
            this.lastPage = 1;
            this.getBankTransactionList();
        },

        getBankTransactionList: function () {
            if(this.viewType == cc.AccountTab.BANK){
                var WithdrawBankHistoryCommand = new cc.WithdrawBankHistoryCommand;
                WithdrawBankHistoryCommand.execute(this,this.currentPage);
            }else{
                var WithdrawMomoHistoryCommand = new cc.WithdrawMomoHistoryCommand;
                WithdrawMomoHistoryCommand.execute(this,this.currentPage);
            }
        },

        onNext: function (){
            this.currentPage++;
            this.getBankTransactionList();
        },

        onPrev: function (){
            if(this.currentPage >1){
                this.currentPage--;
                this.getBankTransactionList();
            }
        },

        onCancelClicked: function (event,data) {
            var item = event.target._parent._parent.getComponent(cc.BankWithdrawTransactionItem);
            console.log(item);
            this.requestCancel(item.item.ItemType,item.item.Id);
        },

        requestCancel: function (type,Id) {
            if(type == 'bank'){
                var WithdrawBankCancelCommand = new cc.WithdrawBankCancelCommand;
                WithdrawBankCancelCommand.execute(this,Id);
            }else{
                var WithdrawMomoCancelCommand = new cc.WithdrawMomoCancelCommand;
                WithdrawMomoCancelCommand.execute(this,Id);
            }
        },

        onWithdrawBankCancelResponse: function (response) {
            cc.PopupController.getInstance().showPopupMessage(response.Message);
            this.getBankTransactionList();
        },

        onWithdrawMomoCancelResponse: function (response) {
            cc.PopupController.getInstance().showPopupMessage(response.Message);
            this.getBankTransactionList();
        },

        onWithdrawHistoryResponse: function (response) {
            var list = response.List;
            this.currentPage = response.currentPage;
            if(this.currentPage == 1){
                this.prevButton.active = false;
            }
            if(this.currentPage > 1){
                this.prevButton.active = true;
            }
            if(response.TotalRecord <= this.perPage*this.currentPage ){
                this.nextButton.active = false;
            }else{
                this.nextButton.active = true;
            }
            this.lbPage.string = "Trang "+this.currentPage;
            // var list = bankTransactionListData;
            if (list !== null && list.length > 0) {
                this.bankTransactionListView.resetList();
                this.bankTransactionListView.initialize(list);
            }
        }
    });
}).call(this);
