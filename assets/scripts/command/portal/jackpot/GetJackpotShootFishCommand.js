/**
 * Created by Nofear on 2/27/2019.
 */

(function () {
    var GetJackpotShootFishCommand;

    GetJackpotShootFishCommand = (function () {
        function GetJackpotShootFishCommand() {
        }
        GetJackpotShootFishCommand.prototype.execute = function (controller) {
            var url = 'api/BanCa/GetJackpots';
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.FISH_API, url, function (response) {
                var obj = JSON.parse(response);
                if (obj.length > 0) {
                    return controller.onGetJackpotShootFishResponse(obj);
                }
            });
        };
        return GetJackpotShootFishCommand;
    })();
    cc.GetJackpotShootFishCommand = GetJackpotShootFishCommand;

}).call(this);
