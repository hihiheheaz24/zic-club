

(function () {
    var TXSIEUTOCGetEventSearchBoxCommand;

    TXSIEUTOCGetEventSearchBoxCommand = (function () {
        function TXSIEUTOCGetEventSearchBoxCommand() {
        }

        TXSIEUTOCGetEventSearchBoxCommand.prototype.execute = function (controller) {
            var url = 'api/sieutocluckydice/GetEventSearchBox';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEUTOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventSearchBoxResponse(obj);
            });
        };

        return TXSIEUTOCGetEventSearchBoxCommand;

    })();

    cc.TXSIEUTOCGetEventSearchBoxCommand = TXSIEUTOCGetEventSearchBoxCommand;

}).call(this);
