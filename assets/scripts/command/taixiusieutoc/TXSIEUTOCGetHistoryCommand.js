

(function () {
    var TXSIEUTOCGetHistoryCommand;

    TXSIEUTOCGetHistoryCommand = (function () {
        function TXSIEUTOCGetHistoryCommand() {
        }

        TXSIEUTOCGetHistoryCommand.prototype.execute = function (controller) {
            var url = 'api/sieutocluckydice/GetHistory';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEUTOC, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXSIEUTOCGetHistoryCommand;

    })();

    cc.TXSIEUTOCGetHistoryCommand = TXSIEUTOCGetHistoryCommand;

}).call(this);
