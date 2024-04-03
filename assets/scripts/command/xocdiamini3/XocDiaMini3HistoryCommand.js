/*
 * Generated by BeChicken
 * on 10/30/2019
 * version v1.0
 */
(function () {
    var XocDiaMini3GetHistoryCommand;

    XocDiaMini3GetHistoryCommand = (function () {
        function XocDiaMini3GetHistoryCommand() {
        }

        XocDiaMini3GetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/NewXocDiaMini3/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.XOC_DIA_MINI3, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onXocDiaMini3GetHistoryResponse(obj);
            });
        };

        return XocDiaMini3GetHistoryCommand;

    })();

    cc.XocDiaMini3GetHistoryCommand = XocDiaMini3GetHistoryCommand;

}).call(this);