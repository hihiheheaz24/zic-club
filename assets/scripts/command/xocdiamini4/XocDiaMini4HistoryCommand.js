/*
 * Generated by BeChicken
 * on 10/30/2019
 * version v1.0
 */
(function () {
    var XocDiaMini4GetHistoryCommand;

    XocDiaMini4GetHistoryCommand = (function () {
        function XocDiaMini4GetHistoryCommand() {
        }

        XocDiaMini4GetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/NewXocDiaMini4/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.XOC_DIA_MINI4, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onXocDiaMini4GetHistoryResponse(obj);
            });
        };

        return XocDiaMini4GetHistoryCommand;

    })();

    cc.XocDiaMini4GetHistoryCommand = XocDiaMini4GetHistoryCommand;

}).call(this);