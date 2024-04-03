
/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetLiveVideoCommand;

    GetLiveVideoCommand = (function () {
        function GetLiveVideoCommand() {
        }

        GetLiveVideoCommand.prototype.execute = function (controller) {
            var url = 'api/LiveGame/GetConfig';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.PORTAL, url, function (response) {
                var obj = JSON.parse(response);
                controller.onGetLiveVideoCommandResponse(obj);
            });
        };

        return GetLiveVideoCommand;

    })();

    cc.GetLiveVideoCommand = GetLiveVideoCommand;

}).call(this);
