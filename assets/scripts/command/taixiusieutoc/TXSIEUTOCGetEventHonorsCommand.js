

(function () {
    var TXSIEUTOCGetEventHonorsCommand;

    TXSIEUTOCGetEventHonorsCommand = (function () {
        function TXSIEUTOCGetEventHonorsCommand() {
        }

        TXSIEUTOCGetEventHonorsCommand.prototype.execute = function (controller) {

            var url = 'api/sieutocluckydice/GetEventHonors?top=100'
                + '&cordType=' + controller.cordType
                + '&recallCode=' + controller.recallCode;

            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEUTOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetEventHonorsResponse(obj);
            });
        };

        return TXSIEUTOCGetEventHonorsCommand;

    })();

    cc.TXSIEUTOCGetEventHonorsCommand = TXSIEUTOCGetEventHonorsCommand;

}).call(this);
