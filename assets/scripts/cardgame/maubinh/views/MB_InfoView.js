/*
 * Generated by BeChicken
 * on 9/11/2019
 * version v1.0
 */
const TWEEN = cc.tween;
(function () {
    cc.MB_InfoView = cc.Class({
        extends: cc.Component,
        properties: {
            //phien
            lbSID: cc.Label,
            //roomID
            lbRoomID: cc.Label,
            //roomID
            lbTableId: cc.Label,
            //giai doan (đặt cửa, kết quả...)
            lbInfo: cc.Label,

            lbPlayerStatus: cc.Label,

            //players
            MBPlayers: [cc.MB_Player],

            //sprite card back
            spriteCardBack: cc.SpriteFrame,

            //Layout xep bai
            layoutXepBai: cc.Node,

            nodeNotify: cc.Node
        },

        onLoad: function () {
            this.interval = null;
            cc.MB_Controller.getInstance().setMBInfoView(this);

            this.maxPlayer = this.MBPlayers.length;

            this.animInfo = this.lbInfo.node.parent.getComponent(cc.Animation);

            this.currentState = null;
            this.currPlayer = null;
            this.currentUserID = cc.LoginController.getInstance().getUserId();
            this.updateNotify(null);

        },
        updateNotify: function (strNotify) {
            if (strNotify == null) {
                this.nodeNotify.parent.active = false;
                return;
            }
            //Active node
            this.nodeNotify.parent.active = true;
            let lbNotify = this.nodeNotify.getChildByName('lbStatus').getComponent(cc.Label);
            lbNotify.string = strNotify;
            this.nodeNotify.getComponent(cc.Animation).play('notify-checkchi');
        },

        hidePlayerStatus: function () {
            this.lbPlayerStatus.node.active = false;
        },
        onDestroy: function () {
            this.unscheduleAllCallbacks();
        },
        //HubOn - joinGame
        joinGame: function (info, timeInfo) {
            //Reset UI Player
            try {
                for (let i = 0; i < this.MBPlayers.length; i++) {
                    let playerUIReset = this.MBPlayers[i];
                    playerUIReset.resetPlayerResultUI(false);
                }
            } catch (e) {

            }


            //lay ve mang vi tri player
            this.positions = info.Positions;

            this.countPlayer = 0;
            //luu vi tri player tren UI
            this.positionsUI = [0, 0, 0, 0];

            //Vi tri player hien tai trong ban choi
            let posCurrPlayer = this.positions.indexOf(this.currentUserID);

            //Tach mang tu vi tri nguoi choi den cuoi mang
            let firstArrPosition = this.positions.slice(posCurrPlayer, this.positions.length);
            //lay vi tri tu dau den vi tri nguoi choi
            let lastArrPosition = this.positions.splice(0, posCurrPlayer);
            this.positionsUI = [...firstArrPosition, ...lastArrPosition];

            //Cap nhat thong tin bet
            //GameLoop
            let gameLooop = info.GameLoop;
            let pharse = gameLooop.Phrase;
            let timeElapse = gameLooop.Elapsed;

            //lay ve players
            var players = info.Players;

            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positionsUI[i];
                //cac vi tri co nguoi choi: accID > 0
                if (accID > 0) {
                    this.registerPlayer(this.getIndexUIBetByAccID(accID), players[accID], players[accID].Status);
                    //Kiem tra trang thai cua player neu la viewer thi thong bao cho van moi, an layout bet
                    if (accID === this.currentUserID) {
                        if (players[accID].Status === 0) {
                            if (info.CountPlayer > 1) {
                                //this.lbPlayerStatus.node.active = true;
                                //this.lbPlayerStatus.string = "CHỜ VÁN MỚI"
                            }
                            let currPlayer = this.MBPlayers[this.getIndexUIBetByAccID(accID)];

                            currPlayer.setAvatarBlur();
                        }

                    }
                }
            }
            this.updateRoomId(info.SessionID);

            //get list accID
            let currPlayer = players[this.currentUserID];
            //Hien thi progress cua nguoi choi ke tiep
            //Set trang thai cho currPlayer
            cc.MB_Controller.getInstance().setCurrPlayerStatus(currPlayer.Status);

            let timeElapsed = [timeInfo.TotalTime, timeInfo.Time];
            let playerTurn = this.MBPlayers[this.getIndexUIBetByAccID(timeInfo.AccountID)];
            if (playerTurn) {
                playerTurn.updateProgressOwnerJoinGame(timeElapsed);
            }

            if (timeInfo.Time > 5 && this.isInGame(currPlayer)) {
                //Kiem tra trang thai game
                let allowActions = timeInfo.AllowedActions;
                if (allowActions.includes(cc.MB_ACTIONS_NAME.KET_THUC)) {
                    let dataCard = currPlayer.BaiRac;
                    //Hien thi layout xep bai
                    cc.MB_Controller.getInstance().onShowSortCard(dataCard, timeInfo.Time);
                }
            }


        },

        //HubOn - playerJoin
        playerJoin: function (info) {
            for (var i = 0; i < this.maxPlayer; i++) {
                var accID = this.positionsUI[i];
                if (accID === 0) {
                    this.positionsUI[i] = info.Account.AccountID;
                    let status = info.Status;
                    this.registerPlayer(i, info, status);
                    break;
                }
            }
        },

        //HubOn - playerLeave
        playerLeave: function (info) {
            //dam bao joinGame xong moi xu ly - tranh loi server neu bi
            if (this.positionsUI) {
                var accID = parseInt(info[0]);
                if (accID == cc.LoginController.getInstance().getUserId()) {
                    //unregist all player
                    let listPlayerActive = this.getListPlayerActiveUI();
                    listPlayerActive.map(accID => {
                        this.unRegisterPlayer(this.getIndexUIBetByAccID(accID));
                    });
                } else {
                    let indexOfAccId = this.positionsUI.indexOf(accID);
                    if (indexOfAccId > 0) {
                        this.unRegisterPlayer(this.getIndexUIBetByAccID(accID));
                        this.positionsUI[indexOfAccId] = 0;
                    }
                }


            }
        },

        //An/Hien layout bai cua player hien tai
        activeLayoutCardPlayer: function (isActive) {
            return this.MBPlayers[0].layoutCard.active = isActive;
        },

        isInGame: function (player) {
            return player.Status === cc.MB_PlayerStatus.INGAME;
        },
        //update balance cho player
        updateBalancePlayers: function (players) {
            let lstAccId = Object.keys(players);
            for (let i = 0; i < lstAccId.length; i++) {
                let acc = players[lstAccId[i]].Account;
                let accId = acc.AccountID;
                let star = acc.Star;
                let player = this.MBPlayers[this.getIndexUIBetByAccID(accId)];
                player.updateChip(star);
                if (accId === this.currentUserID) {
                    cc.BalanceController.getInstance().updateRealBalance(star)
                }
            }
        },

        // Lay player theo accID
        getHandsCardByAccId: function (accId) {
            return this.MBPlayers[this.getIndexUIBetByAccID(accId)];
        },

        // Chia bai
        moveCards: function (players) {
            let playerIds = Object.keys(players);
            //Lay player id co status là INGAME
            playerIds.filter(accID => players[accID].Status === cc.MB_PlayerStatus.INGAME);
            // playerIds = [0, 2, 3];
            let timeDelay = 0;
            let joinNodeCard = [];
            playerIds.map(accId => {

                let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accId)].getComponent(cc.MB_Player);
                playerUI.layoutCard.active = true;

                let listCardChi1 = playerUI.nodeChi1.children;
                let listCardChi2 = playerUI.nodeChi2.children;
                let listCardChi3 = playerUI.nodeChi3.children;
                joinNodeCard = [...listCardChi1, ...listCardChi2, ...listCardChi3];
                let dataCard = players[accId].BaiRac;
                dataCard.map((itemCard, idx) => {
                    //Lay ten bai
                    let cardItem = joinNodeCard[idx].getComponent(cc.MB_CardItem);
                    cardItem.cardNumber = itemCard.CardNumber;
                    cardItem.cardSuite = itemCard.CardSuite;
                    cardItem.ordinalValue = itemCard.OrdinalValue;
                    let spriteFrame = this.spriteCardBack;
                    if (accId === this.currentUserID) {
                        spriteFrame = cc.MB_Controller.getInstance().getSpriteCard(itemCard.CardNumber, itemCard.CardSuite);
                    }
                    joinNodeCard[idx].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }, this);
                for (let i = 0; i < 13; i++) {
                    timeDelay = 0.05 * i;
                    cc.director.getScheduler().schedule(function () {
                        joinNodeCard[i].getComponent(cc.Animation).play('show-card');
                    }, this, 0, 0, 0.05 * i, false)
                }

            }, this);

        },

        //HubOn - updateConnectionStatus
        updateConnectionStatus: function (info) {
            if (this.positionsUI) {
                let accID = info[0];
                let status = info[1];
                let player = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                if (player) {
                    player.updateConnectionStatus(status);
                }

            }
        },

        //HubOn - updatePlayerStatus
        updatePlayerStatus: function (playerStatus) {
            if (this.positionsUI) {
                this.MBPlayers[0].updatePlayerStatus(playerStatus);
            }
        },
        //clearCardOnTable
        clearCardOnTable: function () {
            cc.MB_Controller.getInstance().MB_LayoutCardView.layoutContentCard.removeAllChildren();
        },
        //HubOn - haBai
        haBai: function (data) {
            this.updateCardPlayers(data[0], true);
        },
        //HubOn - updateAccout
        updateAccount: function (dataAccounts) {
            // console.log({dataAccounts})
            if (dataAccounts.length === 0) {
                return;
            }
            let accountID = dataAccounts[0].AccountID;
            let player = this.MBPlayers[this.getIndexUIBetByAccID(accountID)];
            if (player) {
                player.onUpdateAccount(dataAccounts)
            }
        },

        //HubOn - showResult
        showResult: function (result) {
            let playerActive = result[0].CountActivePlayer;
            let players = result[0].Players;
            let mauBinhResultList = result[0].GameLoop.SessionResulted.MauBinhResultList;
            //Kiem tra co mau binh hay khong
            let isMauBinh = result[0].GameLoop.ToiTrang > 0;
            if (isMauBinh) {
                //Tim player co mau binh toi trang max
                let playerMBIds = Object.keys(players);
                let listPlayervsMauBinh = [];
                //Lay danh sach player va maubinh toi trang
                playerMBIds.map(accId => {
                    if (players[accId].Status == cc.MB_PlayerStatus.INGAME && !players[accId].BinhLung) {
                        listPlayervsMauBinh.push([accId, players[accId].MauBinhToiTrang]);
                    }
                });

                //Sap xep giam dan list player co maubinh
                let playerHasMauBinh = listPlayervsMauBinh.sort((a, b) => b[1] - a[1])[0];
                //Hien thi animation maubinh
                let mauBinhName = cc.MB_RESULT_NAME_UI[playerHasMauBinh[1]];
                if (mauBinhName.length > 0) {
                    cc.MB_Controller.getInstance().showAllNotify(mauBinhName, 6);
                    //Hien thi animation maubinh cho player
                    let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(playerHasMauBinh[0])];
                    playerUI.showWinNotify(mauBinhName, 6);
                }


            }
            //Map ket qua de hien thi
            let sortChi1 = [];
            let sortChi2 = [];
            let sortChi3 = [];
            let sortChi4 = [];
            mauBinhResultList.map(result => {
                switch (result.Index) {
                    case 1:
                        sortChi1.push(result);
                        break;
                    case 2:
                        sortChi2.push(result);
                        break;
                    case 3:
                        sortChi3.push(result);
                        break;
                    case 4:
                        sortChi4.push(result);
                        break;
                }
            });
            if (sortChi1.length > 0) {
                /* cc.director.getScheduler().schedule(function () {
                     cc.MB_Controller.getInstance().updateNotify("CHI 1");
                     this.hightLightChi(1, players);
                     this.updateResultPlayerInfo(sortChi1, playerActive, players);
                 }, this, 0, 0, 0, false);
                 cc.director.getScheduler().schedule(function () {
                     cc.MB_Controller.getInstance().updateNotify("CHI 2");
                     this.hightLightChi(2, players);
                     this.updateResultPlayerInfo(sortChi2, playerActive, players);
                 }, this, 0, 0, 5, false);
                 cc.director.getScheduler().schedule(function () {
                     this.hightLightChi(3, players);
                     cc.MB_Controller.getInstance().updateNotify("CHI 3");
                     this.updateResultPlayerInfo(sortChi3, playerActive, players);
                 }, this, 0, 0, 10, false);

                 if (sortChi4.length > 0) {
                     cc.director.getScheduler().schedule(function () {
                         this.hightLightChi(4, players);
                         cc.MB_Controller.getInstance().updateNotify("SO 3 CHI");
                         this.updateResultPlayerInfo(sortChi4, playerActive, players);
                     }, this, 0, 0, 15, false)
                 }
                 let timeKq = (sortChi4.length > 0) ? 20 : 15;
                 cc.director.getScheduler().schedule(function () {
                     this.hightLightChi(4, players);
                     cc.MB_Controller.getInstance().updateNotify("KẾT QUẢ");
                     this.updateResultSumary(players);
                 }, this, 0, 0, timeKq, false)*/

                setTimeout(function () {
                    cc.MB_Controller.getInstance().updateNotify("CHI 1");
                    this.hightLightChi(1, players);
                    this.updateResultPlayerInfo(sortChi1, playerActive, players);
                }.bind(this), 0);

                setTimeout(function () {
                    cc.MB_Controller.getInstance().updateNotify("CHI 2");
                    this.hightLightChi(2, players);
                    this.updateResultPlayerInfo(sortChi2, playerActive, players);
                }.bind(this), 5000);

                setTimeout(function () {
                    this.hightLightChi(3, players);
                    cc.MB_Controller.getInstance().updateNotify("CHI 3");
                    this.updateResultPlayerInfo(sortChi3, playerActive, players);
                }.bind(this), 10000);

                if (sortChi4.length > 0) {
                    setTimeout(function () {
                        this.hightLightChi(4, players);
                        cc.MB_Controller.getInstance().updateNotify("SO 3 CHI");
                        this.updateResultPlayerInfo(sortChi4, playerActive, players);
                    }.bind(this), 15000);
                }
                let timeKq = (sortChi4.length > 0) ? 20000 : 15000;

                setTimeout(function () {
                    this.hightLightChi(4, players);
                    cc.MB_Controller.getInstance().updateNotify("KẾT QUẢ");
                    this.updateResultSumary(players);
                }.bind(this), timeKq);

            } else {
                this.hightLightChi(4, players);
                cc.MB_Controller.getInstance().updateNotify("KẾT QUẢ");
                this.updateResultSumary(players);
            }

        },
        //HubOn updateGameSession
        updateGameSession: function (data) {
            //cc.MB_Controller.getInstance().activeLayoutCardPlayer(false);
            let players = data[1].Players;
            //update tien + trang thai player
            let lstPlayerActiveUI = this.getListPlayerActiveUI();
            lstPlayerActiveUI.forEach(accID => {
                let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                let dataPlayer = players[accID];
                if (playerUI) {
                    playerUI.onUpdateAccount(dataPlayer.Account);
                }

            });
        },
        //HubOn onFinishGame
        onFinishGame: function (data) {
            let playerID = data[0];
            //Hien thi trang thai san sang cua player finishSort
            let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(playerID)];
            if (playerUI) {
                playerUI.showNotifyByStateName(cc.MB_PLAYER_STATE_UI.SAN_SANG);
            }
        },
        setStateSorting: function (accID) {
            let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
            if (playerUI) {
                playerUI.showNotifyByStateName(cc.MB_PLAYER_STATE_UI.DANG_XEP);
            }
        },
        //Hien thi trang thai dang xem bai cua tat ca player
        showStateSorting: function (data) {
            let players = data.Players;
            let playerIDs = Object.keys(players);
            playerIDs.map(accID => {
                let status = players[accID].Status;
                if (status == cc.MB_PlayerStatus.INGAME) {
                    let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                    if (playerUI) {
                        playerUI.updatePlayerStatus(status);
                        playerUI.showNotifyByStateName(cc.MB_PLAYER_STATE_UI.DANG_XEP);
                    }
                }
            }, this);
        },
        //HighLight cac quan bai theo chi
        hightLightChi: function (chiValue, dataPlayer) {
            let lstPlayerActiveUI = this.getListPlayerActiveUI();
            lstPlayerActiveUI.forEach(accID => {
                let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                let isBinhLung = false;
                let isActive = true;
                let isToiTrang = false;
                try {
                    isActive = dataPlayer[accID].Status == cc.MB_PlayerStatus.INGAME;
                    isBinhLung = dataPlayer[accID].BinhLung;
                    isToiTrang = (dataPlayer[accID].MauBinhToiTrang != -100 && dataPlayer[accID].MauBinhToiTrang != -1)
                } catch (e) {
                    isBinhLung = false;
                    isToiTrang = false;
                }
                //Toi trang thi highlight het quan bai cua player
                if (playerUI && isActive && isToiTrang && !isBinhLung) {
                    return playerUI.highLightChi(4);
                }

                // Chi highlight bai cua player ko bi lung
                if (playerUI && !isBinhLung && isActive) {
                    return playerUI.highLightChi(chiValue);
                }

            });
        },
        //Cap nhat ket qua theo tung chi
        updateResultPlayerInfo: function (listSort, playerActive, playersData) {
            //An notify check chi
            this.hideNotifyCheckChi();
            listSort.reverse();
            for (let i = 0; i < playerActive; i++) {
                //Lay account id > 0
                if (listSort[i]) {
                    let playerID = listSort[i].AccountID;
                    let money = listSort[i].Money;
                    let resultFamily = listSort[i].ResultFamily;
                    let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(playerID)];
                    let isActive = false;
                    try {
                        isActive = playersData[playerID].Status == cc.MB_PlayerStatus.INGAME;
                    } catch (e) {
                        isActive = false;
                    }
                    if (playerUI && isActive) {
                        playerUI.onUpdateResult(money, "");
                        playerUI.showNotifyCheckChi(resultFamily);
                    }
                }

            }
        },
        hideNotifyCheckChi: function () {
            try {
                let lstPlayerActiveUI = this.getListPlayerActiveUI();
                lstPlayerActiveUI.forEach(accID => {
                    let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                    if (playerUI) {
                        playerUI.nodeNofity.active = false;
                        playerUI.nodeCheckChi.active = false;
                    }
                });
            } catch (e) {
                console.log(e);
            }

        },
        updateResultSumary: function (playersData) {
            try {
                let lstPlayerActiveUI = this.getListPlayerActiveUI();
                lstPlayerActiveUI.forEach(accID => {
                    let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                    let dataPlayer = playersData[accID];
                    let isActive = playersData[accID].Status == cc.MB_PlayerStatus.INGAME;
                    if (playerUI && isActive) {
                        let mauBinhToiTrang = dataPlayer.MauBinhToiTrang;
                        let stateName = cc.MB_RESULT_NAME_UI[mauBinhToiTrang];
                        let binhLung = dataPlayer.BinhLung;
                        if (binhLung) {
                            playerUI.highLightChi(null);
                        }
                        playerUI.onUpdateResult(dataPlayer.Money, stateName);
                        playerUI.nodeCheckChi.active = false;
                    }

                });
            } catch (e) {
                console.log(e);
            }


        },
        updateChip: function (accID, chip) {
            this.MBPlayers[this.getIndexUIBetByAccID(accID)].updateChip(chip);
        },

        //lay ve index bet theo accID
        getIndexUIBetByAccID: function (accID) {
            accID = parseInt(accID);
            if (accID === 0)
                return -1;
            if (this.positionsUI) {
                return this.positionsUI.indexOf(accID);
            }
            return -1;

        },

        //Lay danh sach player active hien tai
        getListPlayerActiveUI: function () {
            return  this.positionsUI? this.positionsUI.filter(accID => accID > 0) : [];
        },
        // Start progress player cho Chuong
        updateProgressOwner: function (infoTime) {
            let lstPlayerActiveUI = this.getListPlayerActiveUI();
            lstPlayerActiveUI.forEach(accID => {
                let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                if (playerUI) {
                    playerUI.resetProgressOwner();
                }

            });
            // lay vi tri player theo Chuong
            let playerID = infoTime[0];
            this.MBPlayers[this.getIndexUIBetByAccID(playerID)].updateProgressOwner(infoTime);
        },
        resetUpdateProgress: function () {
            let lstPlayerActiveUI = this.getListPlayerActiveUI();
            lstPlayerActiveUI.forEach(accID => {
                let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                if (playerUI) {
                    playerUI.resetProgressOwner();
                }

            });
        },
        // Stop progress player cho Chuong
        stopUpdateProgressOwner: function () {
            // lay vi tri player theo Chuong
            let ownerId = cc.MB_Controller.getInstance().getOwnerID();
            this.MBPlayers[this.getIndexUIBetByAccID(ownerId)].stopUpdateProgressOwner();
        },
        //Lay danh sach bai cua nguoi choi hien tai
        getListCardCurrentPlayer: function () {
            return this.MBPlayers[0].getListCard();
        },
        //reset UI ket qua (win/lose) sau moi Phien cua tat ca player
        resetPlayersResultUI: function (isStartGame) {
            let lstPlayerActiveUI = this.getListPlayerActiveUI();
            lstPlayerActiveUI.forEach(accID => {
                let playerUI = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                playerUI.resetPlayerResultUI(isStartGame);
            });
        },

        //set ket qua cua player
        playerResultUI: function (playerIndex, isWin, amount) {
            this.MBPlayers[playerIndex].playerResultUI(isWin, amount);
        },

        //player vao phong
        registerPlayer: function (playerIndex, info, status) {
            this.MBPlayers[playerIndex].registerPlayer(info, status);
        },

        unRegisterPlayer: function (playerIndex) {
            this.MBPlayers[playerIndex].unRegisterPlayer();
        },

        playerShowBubbleChat: function (message) {
            if (cc.ChatRoomController.getInstance().checkIsEmotion(message)) {
                this.MBPlayers.forEach(function (MBPlayer) {
                    let playerNickName = MBPlayer.nickName;
                    let nickName = message[0];
                    if (nickName === playerNickName) {
                        MBPlayer.showEmotion(cc.ChatRoomController.getInstance().getIndexEmotion(message)
                            , message);
                    }
                });
            } else {
                this.MBPlayers.forEach(function (MBPlayer) {
                    let playerNickName = MBPlayer.nickName;
                    let nickName = message[0];
                    if (nickName === playerNickName) {
                        MBPlayer.showBubbleChat(message);
                    }
                });
            }

        },

        updateRoomId: function (roomID) {
            this.lbRoomID.string = ': ' + roomID;
        },
        updateTableId: function (tableID) {
            this.lbTableId.string = ': ' + tableID;
        },
        updateSessionId: function (sID) {
            this.lbSID.string = ': #' + sID;
        },
        //Update bai sau khi xep
        updateCardOnShortHand: function (handCards) {
            return this.MBPlayers[0].updateCardOnShortHand(handCards);
        },
        //Hien thi bai, sau khi chia
        updateCardPlayers: function (info, isHaBai) {
            let players = info.Players;
            let playerIds = Object.keys(players);
            playerIds.map(accID => {
                let player = this.MBPlayers[this.getIndexUIBetByAccID(accID)];
                if (player) {
                    player.updateCardPlayer(players[accID], isHaBai);
                    if (isHaBai) {
                        player.nodeNofity.active = false;
                    }
                }

            }, this);
        },
        //Cap nhat thong tin game
        updateInfo: function (info) {
            //Cap nhat minbet
            let roomId = cc.Tool.getInstance().formatNumber(info.MinBet);
            //Cap nhat roomID
            this.updateRoomId(roomId);
            //Cap Nhat phong
            this.updateTableId(info.SessionID);
            //Cap nhat phien
            if (info.CurrentGameLoopID != -1) {
                this.updateSessionId(info.CurrentGameLoopID);
            }
            //Cap nhat so bai con lai cua nguoi choi
            //Hien thi bai cua player
            this.updateCardPlayers(info, false);
        },


    })
    ;
}).call(this);