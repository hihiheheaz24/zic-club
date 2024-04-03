

(function () {
    var TXSIEUTOCGetSoiCauCommand;

    TXSIEUTOCGetSoiCauCommand = (function () {
        function TXSIEUTOCGetSoiCauCommand() {
        }

        TXSIEUTOCGetSoiCauCommand.prototype.execute = function (controller) {
            var url = 'api/sieutocluckydice/GetSoiCau';

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEUTOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSoiCauResponse(obj);
            });
        };

        return TXSIEUTOCGetSoiCauCommand;

    })();

    cc.TXSIEUTOCGetSoiCauCommand = TXSIEUTOCGetSoiCauCommand;

}).call(this);
