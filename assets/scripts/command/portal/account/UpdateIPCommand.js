/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var UpdateIPCommand;

    UpdateIPCommand = (function () {
        function UpdateIPCommand() {
        }

        UpdateIPCommand.prototype.execute = function (controller) {
            var url = 'api/Account/LogAccountIp';
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                //cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    console.log("Success IP")
                    //return controller.onUpdateAvatarResponse(obj);
                } else {
                    //return controller.onUpdateAvatarResponseError(obj);
                    //cc.PopupController.getInstance().show(obj.Message, cc.PopupStyle.NOTHING);
                }
            });
        };

        return UpdateIPCommand;

    })();

    cc.UpdateIPCommand = UpdateIPCommand;

}).call(this);
