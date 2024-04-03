/**
 * Created by Nofear on 3/19/2019.
 */

 (function () {
    var MomoChagerCommand;

    MomoChagerCommand = (function () {
        function MomoChagerCommand() {
        }

        MomoChagerCommand.prototype.execute = function (controller) {
            var url = 'api/CastInPayment/Momo';
            var params = JSON.stringify({
                "Phone":controller._Phone,
                "SoTien":controller._SoTien,
                "Name":controller._Name,
                "Nd":controller._nd,
            });
            cc.PopupController.getInstance().showBusy();
            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                cc.PopupController.getInstance().hideBusy();
                if (obj.ResponseCode === 1) {
                    return controller.onMomoChagerCommandResponse(obj);
                } else {
                    return controller.onMomoChagerCommandResponseError(obj);
                }
            });
        };
        return MomoChagerCommand;

    })();
    cc.MomoChagerCommand = MomoChagerCommand;

}).call(this);
