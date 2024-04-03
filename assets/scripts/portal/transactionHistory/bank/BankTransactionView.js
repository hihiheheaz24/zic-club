/**
 * Created by Nofear on 3/15/2019.
 */

// var bankTransactionListData = require('BankTransactionListData');

(function () {
    cc.TopupTransactionView = cc.Class({
        "extends": cc.Component,
        properties: {
            bankTransactionListView: cc.BankTransactionListView,
            nextButton: cc.Node,
            prevButton: cc.Node,
            lbPage : cc.Label,
        },

        onLoad: function () {
            this.perPage = 20;
            this.currentPage = 1;
            this.lastPage = 1;
            this.getBankTransactionList();
        },

        getBankTransactionList: function () {
            var bankHistoryCommand = new cc.BankHistoryCommand;
            bankHistoryCommand.execute(this,this.currentPage);
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

        onBankHistoryResponse: function (response) {
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
