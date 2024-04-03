/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var WithdrawMomoCancelCommand;

    WithdrawMomoCancelCommand = (function () {
        function WithdrawMomoCancelCommand() {
        }

        WithdrawMomoCancelCommand.prototype.execute = function (controller,Id) {
            var url = 'api/MopayBank/CancelMomoWithdraw'; //11
            var params = JSON.stringify({
                Id: Id,
            });
            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                cc.PopupController.getInstance().hideBusy();
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onWithdrawMomoCancelResponse(obj);
                } else {
                    cc.PopupController.getInstance().showMessageError(obj.Message, obj.ResponseCode);
                }
            });
        };

        return WithdrawMomoCancelCommand;

    })();

    cc.WithdrawMomoCancelCommand = WithdrawMomoCancelCommand;

}).call(this);
