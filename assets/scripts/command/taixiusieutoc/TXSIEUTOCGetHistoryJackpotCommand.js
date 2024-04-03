

(function () {
    var TXSIEUTOCGetHistoryJackpotCommand;

    TXSIEUTOCGetHistoryJackpotCommand = (function () {
        function TXSIEUTOCGetHistoryJackpotCommand() {
        }

        TXSIEUTOCGetHistoryJackpotCommand.prototype.execute = function (controller) {
            var url = 'api/sieutocluckydice/GetJackpotsHis';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEUTOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetHistoryResponse(obj);
            });
        };

        return TXSIEUTOCGetHistoryJackpotCommand;

    })();

    cc.TXSIEUTOCGetHistoryJackpotCommand = TXSIEUTOCGetHistoryJackpotCommand;

}).call(this);
