/*
 * Generated by BeChicken
 * on 10/3/2019
 * version v1.0
 */
(function () {
    var BacaratHistoryCommand;

    BacaratHistoryCommand = (function () {
        function BacaratHistoryCommand() {
        }

        BacaratHistoryCommand.prototype.execute = function (controller) {
            let url = 'api/Baccarat/GetHistory?top=50';
            let subDomainName = cc.SubdomainName.BACCARAT;
            return cc.ServerConnector.getInstance().sendRequest(subDomainName, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onGetHistoryResponse(obj);
            });
        };

        return BacaratHistoryCommand;

    })();

    cc.BacaratHistoryCommand = BacaratHistoryCommand;

}).call(this);