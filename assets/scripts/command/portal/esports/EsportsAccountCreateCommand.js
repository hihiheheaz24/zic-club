/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var EsportsAccountCreateCommand;
    EsportsAccountCreateCommand = (function () {
        function EsportsAccountCreateCommand() {
        }
        EsportsAccountCreateCommand.prototype.execute = function (controller) {
            var url = 'api/Esports/CreateAccount';

            var params = JSON.stringify({
              
            });

            return cc.ServerConnector.getInstance().sendRequestPOST(cc.SubdomainName.PORTAL, url, params, function (response) {
                var obj = JSON.parse(response);
                if (obj.ResponseCode === 1) {
                    return controller.onCreateccountInfoResponse(obj);
                } else {
                    return controller.onCreateccountInfoResponse(obj);

                }
            });
        };
        return EsportsAccountCreateCommand;

    })();
    cc.EsportsAccountCreateCommand = EsportsAccountCreateCommand;
}).call(this);
