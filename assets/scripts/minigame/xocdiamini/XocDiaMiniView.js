/**
 * Created by Welcome on 5/28/2019.
 */

var netConfig = require('NetConfig');

(function () {
    cc.XocDiaMiniView = cc.Class({
        "extends": cc.Component,
        properties: {
            spriteSound: cc.Sprite,
            //sfSounds: [cc.SpriteFrame], //0=on, 1=off

            spriteBack: cc.Sprite,
            nodeRegisterLeave: cc.Node,

            nodeParentChat: cc.Node,
            prefabChat: cc.Prefab,
			
			nodeStats: cc.Node,
			
			nodeNho: cc.Node,
			nodeLon: cc.Node,
			nodeParent: cc.Node,
        },

        onLoad: function () {
            cc.XocDiaMiniController.getInstance().setXocDiaMiniView(this);
            cc.ChatRoomController.getInstance().setHubView(this);

            var nodeChat = cc.instantiate(this.prefabChat);
            this.nodeParentChat.addChild(nodeChat);

            this.interval = null;
            this.isActiveChat = false;

            this.lastTimeReconnect = (new Date()).getTime();

            this.connectHub();

            this.currentState = -1;

            //id send playNow
            this.idPlayNow = 0;

            //dang dang ky leaveRoom
            this.isRegisterLeaveRoom = false;
			
			this.nodeNho.active = false;
			this.check = false;
        },

        start: function () {
            //Check Sound
            /* this.sound = cc.Tool.getInstance().getItem("@Sound").toString() === 'true';

            this.spriteSound.spriteFrame = this.sound ? this.sfSounds[0] : this.sfSounds[1];

            cc.AudioController.getInstance().enableSound(this.sound); */
        },

        onEnable: function () {
            cc.BalanceController.getInstance().updateBalance(cc.BalanceController.getInstance().getBalance());
            // cc.PopupController.getInstance().showBusy();
        },

        onDestroy: function () {
            cc.LobbyJackpotController.getInstance().pauseUpdateJackpot(false);
            this.sendRequestOnHub(cc.MethodHubName.EXIT_LOBBY);

            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            if (this.xxHub)
                this.xxHub.disconnect();

            this.unscheduleAllCallbacks();
            cc.XocDiaMiniController.getInstance().setXocDiaMiniView(null);

            if (cc.sys.isNative) {
                cc.assetManager.releaseAsset('xocdiamini/prefabs');
                cc.assetManager.releaseAsset('xocdiamini/images');
            }
            cc.PopupController.getInstance().hideBusy();
        },

        reset: function () {
            this.isTimer = false;
            this.timer = 0;
            this.currentState = 999;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        stopTimer: function () {
            this.isTimer = false;
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
        },

        updateInfo: function (sessionInfo) {

            //luu lai state hien tai

            switch (sessionInfo.CurrentState) {
                case cc.XocDiaMiniState.BETTING:

                    break;
                case cc.XocDiaMiniState.OPEN_PLATE:

                    break;
                case cc.XocDiaMiniState.SHOW_RESULT:

                    break;
                case cc.XocDiaMiniState.WAITING:

                    break;
                case cc.XocDiaMiniState.SHAKING:

                    break;
            }

            this.currentState = sessionInfo.CurrentState;
            this.startTimer(sessionInfo.Ellapsed);
        },


        updateTimer: function (time) {
            if (time < 1) return;
            // this.lbTimer.string = cc.Tool.getInstance().convertSecondToTime2(time);

            switch (this.currentState) {
                case cc.XocDiaMiniState.BETTING:
                case cc.XocDiaMiniState.OPEN_PLATE:
                    this.lbTimer.string = time;
                    this.lbTimer.font = time > 3 ? this.bmfNormal : this.bmfRed;
                    this.lbTimer.node.parent.active = true;
                    break;
                case cc.XocDiaMiniState.SHOW_RESULT:
                    this.lbTimer.node.parent.active = false;
                    break;
                case cc.XocDiaMiniState.WAITING:
                    this.lbTimer.node.parent.active = false;
                    break;
                case cc.XocDiaMiniState.SHAKING:
                    this.lbTimer.node.parent.active = false;
                    break;
            }
        },

        disconnectAndLogout: function () {
            if (this.xxHub) {
                this.xxHub.disconnect();
            }
            this.lastTimeReconnect = (new Date()).getTime();
        },

        connectHub: function () {
            var negotiateCommand = new cc.NegotiateCommand;
            negotiateCommand.execute(this, cc.SubdomainName.XOC_DIA_MINI);
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.xxHub.connect(this, cc.HubName.XocDiaMiniHub, this.connectionToken, true);
        },

        //data1 = amount
        //data2 = gate
        sendRequestOnHub: function (method, data1, data2) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.xxHub.enterLobby();
                    break;
                case cc.MethodHubName.EXIT_LOBBY:
                    this.xxHub.exitLobby();
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    this.idPlayNow = this.xxHub.getRecentID();
                    this.xxHub.playNow();
                    break;
                case cc.MethodHubName.BET:
                    this.xxHub.bet(data1, data2);
                    break;
                case cc.MethodHubName.REGISTER_LEAVE_ROOM:
                    this.xxHub.registerLeaveRoom();
                    break;
                case cc.MethodHubName.UNREGISTER_LEAVE_ROOM:
                    this.xxHub.unRegisterLeaveRoom();
                    break;
                case cc.MethodHubName.SEND_MESSAGE:
                    this.xxHub.sendRoomMessage(data1);
                    break;
            }
        },

        onSlotsNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.xxHub = new cc.Hub;
            this.xxHub.connect(this, cc.HubName.XocDiaMiniHub, response.ConnectionToken);
        },

        onHubMessage: function (response) {

            if (response.M !== undefined && response.M.length > 0) {
                var mArray = response.M;
                mArray.map(m => {
                    switch (m.M) {
                        //Thong tin phien
                        case cc.MethodHubOnName.SESSION_INFO:
                            //console.log(m.A[0]);
                            // cc.XocDiaMiniController.getInstance().updateSessionId(m.A[0].SessionID);
                            cc.XocDiaMiniController.getInstance().updateInfo(m.A[0], m.A[0].Phrase, null);
                            cc.XocDiaMiniController.getInstance().updateInput(m.A[0].Phrase);
                            cc.XocDiaMiniController.getInstance().updateResult("update_time", m.A[0]);
                            break;
                        //Lich su choi
                        case cc.MethodHubOnName.GAME_HISTORY:
                            cc.XocDiaMiniController.getInstance().resetDraw();
                            //ve bang Soi Cau
                            cc.XocDiaMiniController.getInstance().draw(m.A[0]);
                            break;
                        //thoi gian + trang thai phien
                        case cc.MethodHubOnName.START_ACTION_TIMER:
                            var data = m.A;
                            cc.XocDiaMiniController.getInstance().updateInfo(data[0], data[2], data[1]);
                            // cc.XocDiaMiniController.getInstance().updateResult(data[0].Players, data[0].GameLoop.Result, data[0].GameLoop.OriginResult, data[2]);
                            cc.XocDiaMiniController.getInstance().updateResult(null, data[0].Result, data[0].Result.ChipsData, data[2]);
                            cc.XocDiaMiniController.getInstance().updateInput(data[2]);
                            break;
                        //nguoi choi roi ban
                        case cc.MethodHubOnName.PLAYER_LEAVE:
                            //phuc vu cho bot Xoc Xoc -> can thoat nhieu ng choi
                            if (mArray.length === 0) {
                                cc.XocDiaMiniController.getInstance().playerLeave(m.A);
                            }
                            break;

                        //cap nhat trang thai cua nguoi choi
                        case cc.MethodHubOnName.UPDATE_CONNECTION_STATUS:
                            cc.XocDiaMiniController.getInstance().updateConnectionStatus(m.A);
                            break;

                        //cập nhật lại trạng thái player
                        case cc.MethodHubOnName.UPDATE_PLAYER_STATUS:
                            cc.XocDiaMiniController.getInstance().updatePlayerStatus(m.A[0]);
                            break;

                        //vao phong
                        case cc.MethodHubOnName.JOIN_GAME:
                            var data = m.A[0];
                            var info = m.A[1];
                            cc.XocDiaMiniController.getInstance().updateInfoCurrPlayer(data.Account);
                            cc.PopupController.getInstance().hideBusy();
                            break;
                        //Tai hien cac cua da dat
                        case cc.MethodHubOnName.BET_SESSION:
                            cc.XocDiaMiniController.getInstance().showLastInput(m.A[0]);
                            break;
                        //Thong tin bet cua nguoi choi
                        case cc.MethodHubOnName.BET_OF_ACCOUNT:
                            break;
                        //thong tin nguoi choi dat cuoc
                        case cc.MethodHubOnName.PLAYER_BET:
                            var data = m.A;
                            cc.XocDiaMiniController.getInstance().playerBet(data);
                            break;
                        case cc.MethodHubOnName.BET_SUCCESS:
                            break;
                        //Thong tin win cua vip
                        case cc.MethodHubOnName.WIN_RESULT_VIP:
                            if (m.A.length > 0) {
                                try {
                                    setTimeout(function () {
                                        cc.XocDiaMiniController.getInstance().winResultVip(m.A[0]);
                                    }, 2500);
                                } catch (e) {

                                }

                            }
                            break;
                        //Thong tin win cua vip
                        case cc.MethodHubOnName.WIN_RESULT:
                            if (m.A.length > 0) {
                                try {
                                    setTimeout(function () {
                                        cc.XocDiaMiniController.getInstance().winResult(m.A[0]);
                                    }, 2500);
                                } catch (e) {

                                }

                            }
                            break;
                        //Tong tien win groupuser
                        case cc.MethodHubOnName.TOTAL_WIN_MONEY:
                            if(m.A[0] > 0) {
                                setTimeout(function () {
                                    cc.XocDiaMiniController.getInstance().totalUserWin(m.A[0]);
                                }, 2500);
                            }
                            break;
                        //thong bao khi dat cuoc
                        case cc.MethodHubOnName.PLAYER_MESSAGE:
                            cc.PopupController.getInstance().showMessage(m.A[0]);
                            break;

                        //thong bao
                        case cc.MethodHubOnName.MESSAGE:
                            cc.PopupController.getInstance().showMessage(m.A[0]);
                            break;

                        //mo bat
                        case cc.MethodHubOnName.OPEN_PLATE_NOW:
                            cc.XocDiaMiniController.getInstance().updateResult(null, m.A[0], m.A[1], cc.XocDiaMiniState.OPEN_PLATE, true);
                            cc.XocDiaMiniController.getInstance().updateInput(cc.XocDiaMiniState.OPEN_PLATE);
                            break;

                        //nhan message chat
                        case cc.MethodHubOnName.RECEIVE_MESSAGE:
                            cc.ChatRoomController.getInstance().addChatContent(m.A);
                            cc.XocDiaMiniController.getInstance().playerShowBubbleChat(m.A);
                            break;
                        case cc.MethodHubOnName.SUMMARY_PLAYER:
                            cc.XocDiaMiniController.getInstance().summaryPlayer(m.A[0]);
                            break;
                        //Cap nhat danh sach player
                        case cc.MethodHubOnName.VIP_PLAYERS:
                            let dataPlayers = m.A[0];
                            // console.log("VIP_PLAYERS: ", m.A);
                            if (dataPlayers.length > 0) {
                                cc.XocDiaMiniController.getInstance().vipPlayer(dataPlayers);
                            }
                            break;
                        //FIX BUG
                        case 'recieveMessage':
                            cc.ChatRoomController.getInstance().addChatContent(m.A);
                            cc.XocDiaMiniController.getInstance().playerShowBubbleChat(m.A);
                            break;

                        case cc.MethodHubOnName.UPDATE_ROOM_TIME:
                            cc.XocDiaMiniController.getInstance().updateTimer(m.A[0]);

                    }
                });


                //phuc vu cho bot Xoc Xoc -> can thoat nhieu ng choi
                if (mArray && mArray.length > 0) {
                    mArray.forEach(function (m) {
                        if (m.M === cc.MethodHubOnName.PLAYER_LEAVE) {
                            cc.XocDiaMiniController.getInstance().playerLeave(m.A);
                        }
                    });
                }

            } else if (response.R && response.R.AccountID) {
                //sau khi enterLobby
                cc.PopupController.getInstance().showBusy();
                this.sendRequestOnHub(cc.MethodHubName.PLAY_NOW);
            } else if (response.R && response.I === this.idPlayNow.toString()) {
                this.idPlayNow = 0;
                cc.PopupController.getInstance().hideBusy();
            } else {
                //PING PONG
                if (response.I) {
                    this.xxHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            cc.PopupController.getInstance().hideBusy();
            this.sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            cc.PopupController.getInstance().showBusy();
        },

        onHubClose: function () {
            // cc.TaiXiuController.getInstance().reset();
            //reconnect
            // console.log((new Date()).getTime() - this.lastTimeReconnect);
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {
            cc.PopupController.getInstance().hideBusy();
        },

        //HubOn
        playerLeave: function (info) {
            var accID = info[0];
            if (accID === cc.LoginController.getInstance().getUserId()) {
                var message = info[1];
                cc.LobbyController.getInstance().destroyDynamicView(null);
                cc.PopupController.getInstance().showMessage(message)
            }
        },

        //huong dan
        helpClicked: function () {
            cc.XocDiaMiniPopupController.getInstance().createHelpView();
			
			
			//cc.XocDiaMini2Controller.getInstance().getAnNodeNho();
        },

        //lich su dat cuoc
        historyClicked: function () {
            cc.XocDiaMiniPopupController.getInstance().createHistoryView();
        },

        //bang xep hang dat cuoc
        topClicked: function () {
            cc.XocDiaMiniPopupController.getInstance().createTopView();
        },

        //bieu do chi tiet cac phien
        graphClicked: function () {
            cc.XocDiaMiniPopupController.getInstance().createGraphView();
        },

        /* soundClicked: function () {
            this.sound = !this.sound;
            cc.Tool.getInstance().setItem("@Sound", this.sound);
            this.spriteSound.spriteFrame = this.sound ? this.sfSounds[0] : this.sfSounds[1];
            cc.AudioController.getInstance().enableSound(this.sound);
        }, */

        backClicked: function () {
            cc.LobbyController.getInstance().destroyDynamicView(null);
        },

        chatClicked: function () {
            cc.ChatRoomController.getInstance().showChat();
        },
		//hien an bang soi cau
		statsClicked: function () {
			if (this.nodeStats.active == false) {
                this.nodeStats.active = true;
            }
			else{
				this.nodeStats.active = false;
			}
        },
		showNodeNho: function () {
            this.nodeNho.active = true;
			this.nodeNho.x = 609.052;
			this.nodeNho.y = -231.162;
			//this.nodeLon.active = false;
			//cc.XocDiaMiniController.getInstance().getShowNodeLon();
			
			
        },
		showNodeNho2: function () {
            this.nodeNho.active = true;
			//this.nodeLon.active = false;
			//cc.XocDiaMiniController.getInstance().getShowNodeLon();
			
			
        },
		showNodeLon: function () {
            this.nodeNho.active = false;
			this.nodeLon.active = true;
			cc.XocDiaMini2Controller.getInstance().getShowNodeNho();
			cc.XocDiaMini2Controller.getInstance().getAnNodeLon();
			cc.XocDiaMini3Controller.getInstance().getAnNodeLon();
			cc.XocDiaMini4Controller.getInstance().getAnNodeLon();
			cc.XocDiaMini3Controller.getInstance().getSetPositionNodeNho();
			cc.XocDiaMini4Controller.getInstance().getSetPositionNodeNho();
        },
		an3NodeNho:function(){
			if(this.check === false){
				cc.XocDiaMini2Controller.getInstance().getAnNodeNho();
				cc.XocDiaMini3Controller.getInstance().getAnNodeNho();
				cc.XocDiaMini4Controller.getInstance().getAnNodeNho();
				this.check = true;
			}
			else{
				cc.XocDiaMini2Controller.getInstance().getShowNodeNho();
				cc.XocDiaMini3Controller.getInstance().getShowNodeNho();
				cc.XocDiaMini4Controller.getInstance().getShowNodeNho();
				this.check = false;
			}
			
		},
		anNodeLon: function(){
			this.nodeLon.active = false;
		},
		anNodeNho: function(){
			//this.nodeNho.x = 526.837;
			//this.nodeNho.y = -199.129;
			this.nodeNho.active = false;
			
		},
		setPositionNodeNho: function(){
			console.log("OKKKKKKKKKK");
			this.nodeNho.active = true;
			this.nodeNho.x = 609.052;
			this.nodeNho.y = 0;
		},
		setPositionNodeNhoTop1: function(){
			//console.log("OKKKKKKKKKK");
			this.nodeNho.active = true;
			this.nodeNho.x = 609.052;
			this.nodeNho.y = 233;
		},
    });
}).call(this);
