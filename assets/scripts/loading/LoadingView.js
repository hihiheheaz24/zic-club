

var netConfig = require('NetConfig');
import fishShoot from "../shootFish/networks/ShootFishNetworkClient";
import Http from "../common/Http";
(function () {
    cc.LoadingView = cc.Class({
        "extends": cc.Component,
        properties: {
            hotUpdate: cc.HotUpdate,
            progressBar: cc.ProgressBar,
            lbProgress: cc.Label,
            lbMessage: cc.Label,
            nodeButtonTry: cc.Node,
            nodeButtonTryCheckVersion: cc.Node,
        },

        onLoad: function () {
            console.log('Loading onLoad LoadingView');
            this.onGetUserIP();
            this.onGetUserDeviceId();
            cc.debug.setDisplayStats(false);
            if (cc.sys.isNative) {
                if (cc.Device) {
                    cc.Device.setKeepScreenOn(true);
                } else if ( jsb.Device) {
                    jsb.Device.setKeepScreenOn(true);
                } else {
                    // console.log('cc.Device undefined');
                }
            } else {
                // this.getGeolocation();
            }

            console.log('Loading onLoad IS_APPSTORE');
            var getConfigCommand = new cc.GetConfigCommand;
            getConfigCommand.execute(this);
            

            this.sceneName = 'lobby';
            //ko phai ban native -> ko init duoc -> vao game luon
            if (!cc.sys.isNative) {
                this.loadSceneGame();
            } else {
                if (netConfig.IS_APPSTORE) {
                    console.log('Loading onLoad IS_APPSTORE');
                    var getConfigCommand = new cc.GetConfigCommand;
                    getConfigCommand.execute(this);
                } else {
                    console.log('Loading onLoad init');
                    this.hotUpdate.init();
                }
            }
            //const isIOS14Device = cc.sys.os === cc.sys.OS_IOS && cc.sys.isBrowser && cc.sys.isMobile && /iPhone OS 14/.test(window.navigator.userAgent); if (isIOS14Device) { cc.MeshBuffer.prototype.checkAndSwitchBuffer = function (vertexCount) { if (this.vertexOffset + vertexCount > 65535) { this.uploadData(); this._batcher._flush(); } }; cc.MeshBuffer.prototype.forwardIndiceStartToOffset = function () { this.uploadData(); this.switchBuffer(); } }
        },

        onGetConfigResponse: function(response) {
            //netConfig.HOTS_U = response.host;
            cc.ServerConnector.getInstance().setLinkGame(response.linkGame);
            cc.ServerConnector.getInstance().setFanpage(response.fanpage);
            cc.ServerConnector.getInstance().setFbGroup(response.group);
            cc.ServerConnector.getInstance().setTeleHotro(response.tele_cskh);
            cc.ServerConnector.getInstance().setLiveChat(response.live_chat_cskh);
            if(cc.sys.isBrowser){
                if(window.location.toString().includes("localhost")){
                    console.log('DEV running');
                    return;
                }
            }
            netConfig.HOST = response.host;
            fishShoot.setHost(response.host);
            console.log('Loading onGetConfigResponse host: ', response);
            cc.ServerConnector.getInstance().setLinkGame(response.linkGame);
            
            //console.log('Loading onGetConfigResponse api: ', response.api);
            //this.hotUpdate.init();
        },

        onGetUserIP: function(){
            Http.get('https://freeipapi.com/api/json', {}, (err, res) => {
                if (err == null) {
                    //console.log(res)
                    cc.ServerConnector.getInstance().setIP(res.ipAddress);
                }
            });
        },

        onGetUserDeviceId: function(){
            if (cc.Tool.getInstance().getItem("@DeviceId") === null) {
                var deviceId = cc.Tool.getInstance().generateUUID();
                cc.Tool.getInstance().setItem("@DeviceId", deviceId);
            } else {
                deviceId = cc.Tool.getInstance().getItem("@DeviceId");
            }
            console.log(cc.Tool.getInstance().getItem("@DeviceId"));
        },

        activeProgressHotUpdate: function (enable) {
            this.lbMessage.node.active = enable;
            this.nodeButtonTry.active = false;
            this.nodeButtonTryCheckVersion.active = false;

            if (enable) {
                this.lbMessage.string = 'Đang cập nhật phiên bản mới...';
            }
        },

        setProgressHotUpdate: function (progress) {
            if (progress) {
                this.progressBar.progress = progress;
                this.lbProgress.string = Math.round(progress * 100) + '%';
            } else {
                this.progressBar.progress = 0;
                this.lbProgress.string = '0%';
            }
        },

        loadSceneGame: function () {
            if(cc.sys.isBrowser) {
                let navigated = new URLSearchParams(window.location.search);
                if(navigated && navigated.get('tk')) {
                    let token = navigated.get('tk');
                    cc.ServerConnector.getInstance().setToken(token);
                    let refCode = navigated.get('refcode');
                    if(refCode === null) {
                        cc.Tool.getInstance().setItem("@refcode", "");
                    } else {
                        cc.Tool.getInstance().setItem("@refcode", refCode);
                    }
                }
            }
            var self = this;
            var progress = 0;


            self.activeProgressHotUpdate(false);
            self.progressBar.progress = progress / 100;
            self.lbProgress.string = '0%';

            cc.director.preloadScene(
                self.sceneName,
                function (completedCount, totalCount, item) {
                    var tempProgress = (100 * completedCount / totalCount).toFixed(2);
                    //dam bao cho % ko bi lui lai (do quy trinh dem asset khi load)
                    // if (tempProgress >= progress) {
                        progress = tempProgress;
                    // }
                    if(self.progressBar) {
                        let oldProgress = parseInt(self.lbProgress.string);
                        if(progress > oldProgress) {
                            self.progressBar.progress = progress / 100;
                            self.lbProgress.string = Math.round(progress) + '%';
                        }

                    }
                },
                function(err, data){

                    //play animation end

                }
            );
            cc.director.loadScene(self.sceneName);
        }
    });
}).call(this);