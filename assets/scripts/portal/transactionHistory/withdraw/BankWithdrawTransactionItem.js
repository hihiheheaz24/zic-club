/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.BankWithdrawTransactionItem = cc.Class({
        "extends": cc.Component,
        properties: {
            lbTranID: cc.Label, //Ma giao dich
            lbTime: cc.Label,
			lbGate: cc.Label,
            lbType: cc.Label, //Loai giao dich (NAP, RUT)
            lbValue: cc.Label, //Gia tri
            lbRequestID: cc.Label, //Ma giao dich
            lbStatus: cc.Label, //Trang thai
            lbNote: cc.Label, //Trang thai
            btnCancel : cc.Node,
        },

        onLoad: function () {
            this.lbValue.node.color = cc.Color.YELLOW;
            this.btnCancel.active = false;
        },

        updateItem: function(item, itemID) {
            this.lbTime.string = cc.Tool.getInstance().convertUTCTime(item.RequestDate ); //UpdateDate
            this.lbType.string = item.Type;
            this.lbRequestID.string = '#' + item.Id;
			this.lbGate.string = item.BankCode;
            this.lbTranID.string = '#'+item.Id;
            this.lbValue.string = cc.Tool.getInstance().formatNumber(item.AmountGame);
            this.lbStatus.string = item.StatusStr;
            this.lbNote.string = item.Note;
            if(item.Note == "" || item.Note == null){
                this.lbNote.string = item.BankCode + '|'+item.BankAccount;
            }
            switch (item.Status.toString()) {
                //Thành công
                case cc.BankState.SUCCESS:
                    this.lbStatus.node.color = cc.Color.GREEN;
                    break;
                //Chờ xử lý
                case cc.BankState.PENDING:
                case cc.BankState.PENDING_BANK:
                case cc.BankState.PENDING_API:
                    this.lbStatus.node.color = cc.Color.ORANGE;
                    break;
                //Thất bại
                case cc.BankState.FAILED:
                case cc.BankState.FAILED2:
                case cc.BankState.FAILED1:
                case cc.BankState.ADMIN_CANCEL:
                case cc.BankState.BANK_CANCEL:
                    this.lbStatus.node.color = cc.Color.RED;
                    break;
                //Thất bại
                default:
                    this.lbStatus.node.color = cc.Color.RED;
                    break;
            }
            switch (item.Status.toString()) {
                case cc.BankState.PENDING:
                    this.btnCancel.active = true;
                break
            }

            this.item = item;
            this.itemID = itemID;
        },

    });
}).call(this);
