/*
 * Generated by BeChicken
 * on 8/12/2019
 * version v1.0
 */
var netConfig = require('NetConfig');

(function () {
    cc.TLMN_LobbyView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeChooseRoomView: cc.Node,
            nodeMainRoomView: cc.Node,

            //chat
            nodeParentChat: cc.Node,
            prefabChat: cc.Prefab,
        },

        onLoad: function () {

            cc.TLMN_Controller.getInstance().setTLMNLobbyView(this);
            cc.ChatRoomController.getInstance().setHubView(this);

            this.hubName = cc.HubName.TLMNHub;
            this.subDomainName = cc.SubdomainName.TLMN;
            this.interval = null;
            this.isActiveChat = false;
            this.lastTimeReconnect = (new Date()).getTime();
            this.currentState = -1;

            //id send playNow
            this.idPlayNow = 0;

            //check jonGame
            this.currAccId = null;

            this.connectHub();
            this.enableChooseRoom(true);

            var nodeChat = cc.instantiate(this.prefabChat);
            this.nodeParentChat.addChild(nodeChat);
        },

        // set gia tri bet cho room
        setBetRoom: function (room, betRoom) {
            let bRoom = parseInt(betRoom);
            cc.TLMN_Controller.getInstance().setBetRoom(bRoom);
            this.sendRequestOnHub(cc.MethodHubName.PLAY_NOW);
        },

        enableChooseRoom: function (enable) {
            setTimeout(function(){
                this.nodeChooseRoomView.active = enable;
                this.nodeMainRoomView.active = !enable;
            }.bind(this),100)

            cc.LobbyController.getInstance().activeNodeTopBar(enable);
        },

        onDestroy: function () {
            cc.LobbyJackpotController.getInstance().pauseUpdateJackpot(false);

            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            if (this.TLMNHub)
                this.TLMNHub.disconnect();

            this.unscheduleAllCallbacks();
            cc.TLMN_Controller.getInstance().setTLMNLobbyView(null);

            if (cc.sys.isNative) {
                cc.assetManager.releaseAsset('tienlenMN/prefabs');
                // cc.assetManager.releaseAsset('tienlenMN/images');
            }
        },

        disconnectAndLogout: function () {
            if (this.TLMNHub) {
                this.TLMNHub.disconnect();
            }
            this.lastTimeReconnect = (new Date()).getTime();
        },

        connectHub: function () {
            var negotiateCommand = new cc.NegotiateCommand;
            negotiateCommand.execute(this, this.subDomainName);
        },

        reconnect: function () {
            this.lastTimeReconnect = (new Date()).getTime();
            this.TLMNHub.connect(this, this.hubName, this.connectionToken, true);
        },

        //data1 = amount
        //data2 = gate
        sendRequestOnHub: function (method, data1, data2) {
            switch (method) {
                case cc.MethodHubName.ENTER_LOBBY:
                    this.TLMNHub.enterLobby();
                    break;
                case cc.MethodHubName.PLAY_NOW:
                    let minBet = cc.TLMN_Controller.getInstance().getBetRoom();
                    this.TLMNHub.playNow(minBet);
                    break;
                case cc.MethodHubName.REGISTER_LEAVE_ROOM: // Dang ky roi ban
                    this.TLMNHub.registerLeaveRoom();
                    break;
                case cc.MethodHubName.UNREGISTER_LEAVE_ROOM: // Huy DK roi ban
                    this.TLMNHub.unRegisterLeaveRoom();
                    break;
                case cc.MethodHubName.SEND_MESSAGE:
                    this.TLMNHub.sendRoomMessage(data1);
                    break;
                case cc.MethodHubName.BO_LUOT:
                    this.TLMNHub.boLuot();
                    break;
                case cc.MethodHubName.SORT_HAND_CARDS:
                    this.TLMNHub.xepBai();
                    break;
                case cc.MethodHubName.DANH_BAI:
                    this.TLMNHub.danhBai(data1);//Array bai
                    break;
                case cc.MethodHubName.START_GAME:
                    this.TLMNHub.startGame();//Bat dau choi
                    break;
            }
        },

        onSlotsNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.TLMNHub = new cc.Hub;
            this.TLMNHub.connect(this, this.hubName, response.ConnectionToken);
        },

        onHubMessage: function (response) {
            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];

                switch (m.M) {
                    //nguoi choi roi ban
                    case cc.MethodHubOnName.PLAYER_LEAVE:
                        cc.TLMN_Controller.getInstance().playerLeave(m.A);
                        break;
                    //cap nhat trang thai cua nguoi choi
                    case cc.MethodHubOnName.UPDATE_CONNECTION_STATUS:
                        // console.log("UPDATE_CONNECTION_STATUS", m.A);
                        cc.TLMN_Controller.getInstance().updateConnectionStatus(m.A);
                        break;

                    //vao phong
                    case cc.MethodHubOnName.JOIN_GAME:
                        cc.TLMN_Controller.getInstance().initSelectedCard();
                        cc.TLMN_Controller.getInstance().initListCardOnTable();
                        cc.TLMN_Controller.getInstance().setCurrTurn(false);

                        this.enableChooseRoom(false);

                        var data = m.A[0];
                        var info = m.A[1];
                        cc.TLMN_Controller.getInstance().setBetRoom(m.A[0].MinBet);
                        cc.TLMN_Controller.getInstance().joinGame(data, info);
                        //cc.TLMN_Controller.getInstance().updateProgressOwner(info);
                        cc.TLMN_Controller.getInstance().updateInfo(data);

                        //UnRegister roi phong
                        this.sendRequestOnHub(cc.MethodHubName.UNREGISTER_LEAVE_ROOM);
                        cc.PopupController.getInstance().hideBusy();
                        // console.log("JOIN_GAME", m.A);
                        break;
                    //nguoi choi khac vao phong
                    case cc.MethodHubOnName.PLAYER_JOIN:
                        var data = m.A[0];
                        // console.log("PLAYER_JOIN", m.A);
                        cc.TLMN_Controller.getInstance().playerJoin(data);
                        break;

                    //Thong bao khong du tien
                    case cc.MethodHubOnName.BUY_MANUAL:
                        // console.log("BUY_MANUAL", m.A);
                        this.enableChooseRoom(true);
                        cc.PopupController.getInstance().showMessage(m.A[0]);
                        break;

                    //Trang thai game
                    case cc.MethodHubOnName.START_GAME:
                        // console.log("START_GAME", m.A);
                        cc.TLMN_Controller.getInstance().showLayoutButton(0, null);
                        //Reset bai tren ban
                        cc.TLMN_Controller.getInstance().clearCardOnTable();
                        //Reset trang thai ban dau cua player
                        cc.TLMN_Controller.getInstance().resetPlayersResultUI(true);
                        // An lb Player Status
                        //cc.TLMN_Controller.getInstance().hidePlayerStatus();

                        //Reset lai list bai dc chon
                        cc.TLMN_Controller.getInstance().initSelectedCard();
                        //Reset lai danh bai tren ban
                        cc.TLMN_Controller.getInstance().initListCardOnTable();

                        //Reset danh sach bai danh truoc
                        cc.TLMN_Controller.getInstance().setMaxCard(null);
                        let dataMoveCard = [];
                        //Chia bai
                        if (!cc.game.isPaused()) {
                            dataMoveCard = cc.TLMN_Controller.getInstance().moveCards(m.A[0].Players);
                        }
                        if (dataMoveCard.length > 0) {
                            let timeMoveCard = dataMoveCard[0];
                            cc.director.getScheduler().schedule(function () {
                                cc.TLMN_Controller.getInstance().updateInfo(m.A[0]);
                            }.bind(this), this, 0, 0, timeMoveCard, false);
                        } else {
                            cc.TLMN_Controller.getInstance().updateInfo(m.A[0]);
                        }
                        //Update trang thai cua player
                        cc.TLMN_Controller.getInstance().setCurrPlayerStatus(cc.TLMNPlayerStatus.INGAME);
                        break;

                    //Chuyen phien nguoi choi
                    case cc.MethodHubOnName.START_ACTION_TIMER:

                        let allowActions = m.A[2];
                        //Kiem tra trang thai bat dau game clear het bai
                        if (allowActions.includes(cc.TLMNActionName.START_GAME)) {
                            //Reset bai tren ban
                            cc.TLMN_Controller.getInstance().clearCardOnTable();
                            //Reset trang thai ban dau cua player
                            cc.TLMN_Controller.getInstance().resetPlayersResultUI(true);
                            // An lb Player Status
                            //cc.TLMN_Controller.getInstance().hidePlayerStatus();
                            //Reset lai list bai dc chon
                            cc.TLMN_Controller.getInstance().initSelectedCard();
                            //Reset lai danh bai tren ban
                            cc.TLMN_Controller.getInstance().initListCardOnTable();

                            //Kiem tra mang co playerJoin neu co thi goi playerJoin
                            let mData = response.M;
                            mData.map(m => {
                                console.log(m.M);
                                if(m.M == cc.MethodHubOnName.PLAYER_JOIN) {
                                    cc.TLMN_Controller.getInstance().playerJoin(m.A[0]);
                                }
                            }, this)

                        }
                        //Cap nhat progress player
                        cc.TLMN_Controller.getInstance().updateProgressOwner(m.A);

                        if (m.A[0] == cc.LoginController.getInstance().getUserId()) {
                            cc.TLMN_Controller.getInstance().setIsAllowDanhChan(false);
                            cc.TLMN_Controller.getInstance().setCurrTurn(true);
                        } else {
                            cc.TLMN_Controller.getInstance().setCurrTurn(false);
                        }
                        //Kiem tra trang thai cua nguoi choi hien tai neu InGAME moi show
                        if (cc.TLMN_Controller.getInstance().getCurrPlayerStatus() == cc.TLMNPlayerStatus.INGAME || m.A[2].includes(cc.TLMNActionName.START_GAME)) {
                            //Hien thi layout button theo action
                            cc.TLMN_Controller.getInstance().showLayoutButton(m.A[0], m.A[2]);
                        } else {
                            cc.TLMN_Controller.getInstance().showLayoutButton(0, null);
                        }

                        break;
                    //Xep bai
                    case cc.MethodHubOnName.SORT_HAND_CARDS:
                        cc.TLMN_Controller.getInstance().updateCardOnShortHand(m.A[0]);
                        break;
                    //Danh bai
                    case cc.MethodHubOnName.DANH_BAI:
                        // console.log("DANH_BAI", m.A);
                        let accID = m.A[0];
                        let lstCards = m.A[1];
                        let gameLoop = m.A[2].GameLoop;
                        //Update bai cua player
                        cc.TLMN_Controller.getInstance().updateCardPlayersOnDanhBai(m.A[2]);
                        //Hien chi card duoc danh
                        cc.TLMN_Controller.getInstance().eventShowCard(accID, lstCards, gameLoop.CurrTurnCards);
                        break;
                    //Bo luot
                    case cc.MethodHubOnName.BO_LUOT:
                        // console.log("BO_LUOT", m.A);
                        //Cap nhat icon bo luot
                        cc.TLMN_Controller.getInstance().updatePlayerBoLuot(m.A[0]);
                        break;

                    //Het vong
                    case cc.MethodHubOnName.END_ROUND:
                        // console.log("END_ROUND", m.A);
                        cc.TLMN_Controller.getInstance().onEndRound();
                        break;
                    //Cho phep chan ngay
                    case cc.MethodHubOnName.ALLOW_CHAN_NGAY:
                        //Cho phep danh
                        cc.TLMN_Controller.getInstance().setIsAllowDanhChan(true);
                        cc.TLMN_Controller.getInstance().onAllowChanNgay(m.A[0]);
                        cc.TLMN_Controller.getInstance().showLayoutButton(cc.LoginController.getInstance().getUserId(), [cc.TLMNActionName.DANH_BAI]);
                        // this.sendRequestOnHub(cc.MethodHubName.DANH_BAI, m.A[0]);
                        break;
                    //Huy chan ngay
                    case cc.MethodHubOnName.CANCEL_CHAN_NGAY:
                        cc.TLMN_Controller.getInstance().setIsAllowDanhChan(false);
                        break;
                    //Cap nhat tien cuoc cua nguoi choi
                    case cc.MethodHubOnName.UPDATE_ACCOUNT:
                        // console.log("UPDATE_ACCOUNT", m.A);
                        let listUpdateAccount = response.M;
                        listUpdateAccount.map(m => {
                            if (m.M === cc.MethodHubOnName.UPDATE_ACCOUNT) {
                                cc.TLMN_Controller.getInstance().updateAccount(m.A);
                            }
                            if (m.M === cc.MethodHubOnName.END_ROUND) {
                                cc.TLMN_Controller.getInstance().onEndRound();
                            }

                        }, this);
                        break;
                    //Mo bai
                    case cc.MethodHubOnName.SHOW_RESULT:
                        // console.log("SHOW_RESULT", m.A);
                        cc.TLMN_Controller.getInstance().showResult(m.A);
                        break;

                    //thong bao khi dat cuoc
                    case cc.MethodHubOnName.PLAYER_MESSAGE:
                        cc.PopupController.getInstance().showMessage(m.A[0]);
                        break;
                    //thong bao
                    case cc.MethodHubOnName.MESSAGE:
                        if (!cc.game.isPaused())
                            cc.PopupController.getInstance().showMessage(m.A[0]);
                        break;
                    //nhan message chat
                    case cc.MethodHubOnName.RECEIVE_MESSAGE:
                        // console.log('RECEIVE_MESSAGE: ',m.A)
                        cc.ChatRoomController.getInstance().addChatContent(m.A);
                        cc.TLMN_Controller.getInstance().playerShowBubbleChat(m.A);
                        break;
                    case cc.MethodHubOnName.UPDATE_ROOM_TIME:
                        cc.TLMN_Controller.getInstance().updateTimer(m.A[0]);
                        break;

                }
            } else if (response.R && response.R.AccountID) {
                this.currAccId = response.R.AccountID;
                //sau khi enterLobby
                //cc.PopupController.getInstance().showBusy();
                cc.PopupController.getInstance().hideBusy();

            } else {
                //PING PONG
                if (response.I) {
                    this.TLMNHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            cc.PopupController.getInstance().hideBusy();
            this.sendRequestOnHub(cc.MethodHubName.ENTER_LOBBY);
            cc.PopupController.getInstance().showBusy();
        },

        onHubClose: function () {
            //reconnect
            // console.log((new Date()).getTime() - this.lastTimeReconnect);
            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {

        },

        //HubOn
        playerLeave: function (info) {
            var accID = info[0];
            if (accID === cc.LoginController.getInstance().getUserId()) {
                //Reset bai tren ban
                cc.TLMN_Controller.getInstance().clearCardOnTable();
                //Reset trang thai ban dau cua player
                cc.TLMN_Controller.getInstance().resetPlayersResultUI(false);
                cc.TLMN_Controller.getInstance().resetUIBackButton();
                this.enableChooseRoom(true);
                var message = info[1];
                // cc.LobbyController.getInstance().destroyDynamicView(null);
                cc.PopupController.getInstance().showMessage(message)
            }
        },

        //huong dan
        helpClicked: function () {
            cc.BCPopupController.getInstance().createHelpView();
        },

        chatClicked: function () {
            cc.ChatRoomController.getInstance().showChat();
        },

        backLobby: function () {
            cc.LobbyController.getInstance().destroyDynamicView(null);
        },
    });
}).call(this);
