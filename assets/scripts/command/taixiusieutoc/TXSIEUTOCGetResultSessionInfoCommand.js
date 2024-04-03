

(function () {
    var TXSIEUTOCGetResultSessionInfoCommand;

    TXSIEUTOCGetResultSessionInfoCommand = (function () {
        function TXSIEUTOCGetResultSessionInfoCommand() {

        }

        TXSIEUTOCGetResultSessionInfoCommand.prototype.execute = function (controller, sessionId) {
            var url = 'api/sieutocluckydice/GetResultSessionInfo?sessionId=' + sessionId;
            return cc.ServerConnector.getInstance().sendRequest(cc.SubdomainName.TAI_XIU_SIEUTOC, url, function (response) {
				//console.log(response);
                var obj = JSON.parse(response);
                return controller.onTXGetResultSessionInfoResponse(obj);
            });					
        };		
        return TXSIEUTOCGetResultSessionInfoCommand;

    })();

    cc.TXSIEUTOCGetResultSessionInfoCommand = TXSIEUTOCGetResultSessionInfoCommand;

}).call(this);
