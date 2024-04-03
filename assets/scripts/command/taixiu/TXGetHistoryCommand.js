

(function () {
    var TXGetHistoryCommand;

    TXGetHistoryCommand = (function () {
        function TXGetHistoryCommand() {
        }

        TXGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/luckydice/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXGetHistoryCommand;

    })();

    cc.TXGetHistoryCommand = TXGetHistoryCommand;

}).call(this);
