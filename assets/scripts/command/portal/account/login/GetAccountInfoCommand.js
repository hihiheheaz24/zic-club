/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetAccountInfoCommand;

    GetAccountInfoCommand = (function () {
        function GetAccountInfoCommand() {
        }

        GetAccountInfoCommand.prototype.execute = function (controller) {
            var url = 'api/Account/GetAccountInfo';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onGetAccountInfoResponse(obj);
                } else {
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return GetAccountInfoCommand;

    })();

    cc.GetAccountInfoCommand = GetAccountInfoCommand;

}).call(this);
