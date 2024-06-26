/*
 * Generated by BeChicken
 * on 10/22/2019
 * version v1.0
 */
(function () {
    var XocDiaMini4GroupUserCommand;

    XocDiaMini4GroupUserCommand = (function () {
        function XocDiaMini4GroupUserCommand() {
        }

        XocDiaMini4GroupUserCommand.prototype.execute = function (controller) {
            let url = 'api/NewXocDiaMini4/GetPlayersNotInGame';
            let subDomainName = cc.SubdomainName.XOC_DIA_MINI4;
            return cc.ServerConnector.getInstance().sendRequest(subDomainName, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetGroupUserResponse(obj);
            });
        };

        return XocDiaMini4GroupUserCommand;

    })();

    cc.XocDiaMini4GroupUserCommand = XocDiaMini4GroupUserCommand;

}).call(this);