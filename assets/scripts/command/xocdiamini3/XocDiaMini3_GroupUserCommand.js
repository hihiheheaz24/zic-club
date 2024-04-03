/*
 * Generated by BeChicken
 * on 10/22/2019
 * version v1.0
 */
(function () {
    var XocDiaMini3GroupUserCommand;

    XocDiaMini3GroupUserCommand = (function () {
        function XocDiaMini3GroupUserCommand() {
        }

        XocDiaMini3GroupUserCommand.prototype.execute = function (controller) {
            let url = 'api/NewXocDiaMini3/GetPlayersNotInGame';
            let subDomainName = cc.SubdomainName.XOC_DIA_MINI3;
            return cc.ServerConnector.getInstance().sendRequest(subDomainName, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetGroupUserResponse(obj);
            });
        };

        return XocDiaMini3GroupUserCommand;

    })();

    cc.XocDiaMini3GroupUserCommand = XocDiaMini3GroupUserCommand;

}).call(this);