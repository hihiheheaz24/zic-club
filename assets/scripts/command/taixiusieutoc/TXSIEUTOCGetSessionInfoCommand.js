

(function () {
    var TXSIEUTOCGetSessionInfoCommand;

    TXSIEUTOCGetSessionInfoCommand = (function () {
        function TXSIEUTOCGetSessionInfoCommand() {

        }

        TXSIEUTOCGetSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/sieutocluckydice/GetSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEUTOC, url, function (response) {
                var obj = JSON.parse(response);
                return controller.onTXGetSessionInfoResponse(obj);
            });					
        };		
        return TXSIEUTOCGetSessionInfoCommand;

    })();

    cc.TXSIEUTOCGetSessionInfoCommand = TXSIEUTOCGetSessionInfoCommand;

}).call(this);
