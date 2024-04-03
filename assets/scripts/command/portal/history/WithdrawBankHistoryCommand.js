/**
 * Created by Nofear on 3/20/2019.
 */

(function () {
    var WithdrawBankHistoryCommand;

    WithdrawBankHistoryCommand = (function () {
        function WithdrawBankHistoryCommand() {
        }

        WithdrawBankHistoryCommand.prototype.execute = function (controller,currentPage = 1) {
            var url = 'api/MopayBank/GetHistoryBank?currentPage='+currentPage; //32//
            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                cc.PopupController.getInstance().hideBusy();
                var obj = JSON.parse(response);
				//console.log(response);
                if (obj.ResponseCode === 1) {
                    return controller.onWithdrawHistoryResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return WithdrawBankHistoryCommand;

    })();

    cc.WithdrawBankHistoryCommand = WithdrawBankHistoryCommand;

}).call(this);
