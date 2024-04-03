/*
 * Generated by BeChicken
 * on 10/30/2019
 * version v1.0
 */
(function () {
    var XocDiaMini3GetBigWinnerCommand;

    XocDiaMini3GetBigWinnerCommand = (function () {
        function XocDiaMini3GetBigWinnerCommand() {
        }

        XocDiaMini3GetBigWinnerCommand.prototype.execute = function (controller) {
            var url = 'api/NewXocDiaMini3/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.XOC_DIA_MINI3, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onXocDiaMini3GetBigWinnerResponse(obj);
            });
        };

        return XocDiaMini3GetBigWinnerCommand;

    })();

    cc.XocDiaMini3GetBigWinnerCommand = XocDiaMini3GetBigWinnerCommand;

}).call(this);