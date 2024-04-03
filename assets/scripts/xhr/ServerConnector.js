var netConfig = require('NetConfig');
import Configs from "../shootFish/common/Configs";

(function () {
    var ServerConnector;

    const Debug = false;

    ServerConnector = (function () {
        var instance;

        function ServerConnector() {
        }

        instance = void 0;

        ServerConnector.getInstance = function () {
            if (instance === void 0) {
                instance = this;
            }
            return instance.prototype;
        };

        //GET
        ServerConnector.prototype.sendRequest = function (subdomain, url, callback) {
            var e, request;
            try {
                var host = netConfig.HOST;
                request = cc.loader.getXMLHttpRequest();
                var urlRequest = 'https://' + subdomain + host + '/' + url;

                if (Debug) {
                    console.log('sendRequest');
                    console.log(urlRequest);
                }

                if (cc.ServerConnector.getInstance().getToken()) {
                    if (urlRequest.includes("?")) {
                        urlRequest += ('&access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    } else {
                        urlRequest += ('?access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    }
                    urlRequest += ('&ip=' + encodeURIComponent(cc.ServerConnector.getInstance().getIP()));
                    urlRequest += ('&deviceId=' + encodeURIComponent(cc.ServerConnector.getInstance().getDeviceId()));
                }
                

                request.timeout = 15000;
                request.open(cc.RequestType.GET, urlRequest); //+ '?' + Math.random()
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

                if (!cc.sys.isNative)
                    request.withCredentials = true;
                else if (cc.ServerConnector.getInstance().getCookie()) {
                    request.credentials = true;
                    request.setRequestHeader('cookie', cc.ServerConnector.getInstance().getCookie());
                }
                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        if (Debug) {
                            console.log('sendRequest responseText: ');
                            console.log(request.responseText);
                        }
                        return callback(request.responseText);
                    }
                };
                request.ontimeout = (e) => {
                    cc.PopupController.getInstance().hideBusy();
                    cc.PopupController.getInstance().showMessageError("Vui lòng kiểm tra lại kết nối", -1);
                };
                return request.send();
            } catch (error) {
                e = error;
                return console.log('Caught Exception: ' + e.message);
            }
        };

        //POST
        ServerConnector.prototype.sendRequestPOST = function (subdomain, url, params, callback, isSetCookie) {
            var e, request;
            try {
                var host = netConfig.HOST;
                request = cc.loader.getXMLHttpRequest();
                var urlRequest = 'https://' + subdomain + host + '/' + url;
                if (Debug) {
                    console.log('sendRequestPOST');
                    console.log(urlRequest);
                    console.log('sendRequestPOST params: ');
                    console.log(params);
                }

                if (cc.ServerConnector.getInstance().getToken()) {
                    if (urlRequest.includes("?")) {
                        urlRequest += ('&access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    } else {
                        urlRequest += ('?access_token=' + encodeURIComponent(cc.ServerConnector.getInstance().getToken()));
                    }
                    urlRequest += ('&ip=' + encodeURIComponent(cc.ServerConnector.getInstance().getIP()));
                    urlRequest += ('&deviceId=' + encodeURIComponent(cc.ServerConnector.getInstance().getDeviceId()));
                }
                

                request.timeout = 15000;
                request.open(cc.RequestType.POST, urlRequest);
                request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

                if (!cc.sys.isNative)
                    request.withCredentials = true;
                else if (cc.ServerConnector.getInstance().getCookie()) {
                    request.setRequestHeader('cookie', cc.ServerConnector.getInstance().getCookie());
                }

                request.onreadystatechange = function () {
                    if (request.readyState === 4 && request.status === 200) {
                        if (Debug) {
                            console.log('sendRequestPOST responseText');
                            console.log(request.responseText);
                        }
                        //moi them -> sau nay sua parse JSON o day luon
                        var obj = JSON.parse(request.responseText);
                        if (obj.ResponseCode === -1001) {
                            cc.PopupController.getInstance().showPopupRequireLogin(cc.HubError.ERROR_1001_NOT_AUTHENTICATE);
                        }
                        return callback(request.responseText);
                    }
                };
                request.ontimeout = (e) => {
                    cc.PopupController.getInstance().hideBusy();
                    cc.PopupController.getInstance().showMessageError("Vui lòng kiểm tra lại kết nối", -1);
                };
                return request.send(params);
            } catch (error) {
                e = error;
                return console.log('Caught Exception: ' + e.message);
            }
        };

        ServerConnector.prototype.getToken = function () {
            return this.token;
        };

        ServerConnector.prototype.setToken = function (token) {
            if (token === null) {
                cc.Tool.getInstance().setItem("@atn", null);
            } else {
                cc.Tool.getInstance().setItem("@atn", token);
            }
            Configs.Login.Token = token;
            return this.token = token;
        };

        ServerConnector.prototype.setLatitude = function (latitude) {
            return this.latitude = latitude;
        };

        ServerConnector.prototype.getLatitude = function () {
            return this.latitude;
        };

        ServerConnector.prototype.setLongitude = function (longitude) {
            return this.longitude = longitude;
        };

        ServerConnector.prototype.getLongitude = function () {
            return this.longitude;
        };

        ServerConnector.prototype.setCookie = function (cookie) {
            return this.cookie = cookie;
        };

        ServerConnector.prototype.getCookie = function () {
            return this.cookie;
        };

        ServerConnector.prototype.setIP = function (ip) {
            return this.ip = ip;
        };

        ServerConnector.prototype.getIP = function () {
            return this.ip;
        };

        ServerConnector.prototype.setFanpage = function (fanpage) {
            return this.fanpage = fanpage;
        };

        ServerConnector.prototype.getFanpage = function () {
            return this.fanpage;
        };

        ServerConnector.prototype.setFbGroup = function (fanpage) {
            return this.fbGroup = fanpage;
        };

        ServerConnector.prototype.getFbGroup = function () {
            return this.fbGroup;
        }; 
        
        ServerConnector.prototype.setTeleHotro = function (tele_chat) {
            return this.tele_chat = tele_chat;
        };

        ServerConnector.prototype.getTeleHotro = function () {
            //return this.livechat;
            if(this.tele_chat!=null){
                return this.tele_chat;
            }else{
                return "https://t.me/zic_cskh"
            }            
        };  
        
        ServerConnector.prototype.setLiveChat = function (livechat) {
            return this.livechat = livechat;
        };

        ServerConnector.prototype.getLiveChat = function () {
            //return this.livechat;
            if(this.livechat!=null){
                return this.livechat;
            }else{
                return "https://t.me/zic_cskh"
            }            
        };          

        ServerConnector.prototype.setLinkGame = function (link) {
            return this.linkGame = link;
        };

        ServerConnector.prototype.getLinkGame = function () {
            if(this.linkGame!=null){
                return this.linkGame;
            }else{
                return "ZIC.CLUB"
            }
        };

        ServerConnector.prototype.setCookie = function (cookie) {
            return this.cookie = cookie;
        };

        ServerConnector.prototype.getDeviceId = function () {
            return this.deviceId;
        };

        ServerConnector.prototype.setDeviceId = function (deviceId) {
            return this.deviceId = deviceId;
        };

        ServerConnector.prototype.getCaptchaPrivateKey = function () {
            return this.captchaPrivateKey;
        };

        ServerConnector.prototype.setCaptchaPrivateKey = function (captchaPrivateKey) {
            return this.captchaPrivateKey = captchaPrivateKey;
        };

        return ServerConnector;

    })();

    cc.ServerConnector = ServerConnector;

}).call(this);
