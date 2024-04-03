

(function () {
    var TXSIEUTOCGetBigWinnersCommand;

    TXSIEUTOCGetBigWinnersCommand = (function () {
        function TXSIEUTOCGetBigWinnersCommand() {
        }

        TXSIEUTOCGetBigWinnersCommand.prototype.execute = function (controller) {
            var url = 'api/sieutocluckydice/GetBigWinner';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEUTOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetBigWinnersResponse(obj);
            });
        };

        return TXSIEUTOCGetBigWinnersCommand;

    })();

    cc.TXSIEUTOCGetBigWinnersCommand = TXSIEUTOCGetBigWinnersCommand;

}).call(this);
