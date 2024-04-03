/**
 * Created by Welcome on 5/28/2019.
 */

const players = require('XocDiaVipPlayerData').players;

(function () {
    cc.XocDiaVipInputView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeParentChip: cc.Node,

            btnBetVals: [cc.Button],
            btnChips: [cc.Button],

            btnX2: cc.Button,
            btnRepeat: cc.Button,

            spriteNan: cc.Sprite,

            //totalBet các cửa
            lbTotalBets: [cc.Label],

            //totalBet các cửa của user
            lbTotalUserBets: [cc.Label],
        },

        onLoad: function () {
            cc.XocDiaVipController.getInstance().setXocDiaVipInputView(this);
			
			
            //danh dau che do Nan
            this.isNan = false;
            cc.XocDiaVipController.getInstance().setIsNan(this.isNan);

            this.nodeChipPress = [];
            var self = this;
            this.btnChips.forEach(function (btnChip) {
                self.nodeChipPress.push(btnChip.node.getChildByName('chip_press'));
				
            });
			
            //toa do X, Y tu min -> max cac o BET theo thu tu
            //4 3 0 1
            //5     2

            this.minXs = [200, -220, 160, -327, -401, 340, -30];
            this.maxXs = [370, -130, 250, -167, -321, 450, 60];
            this.minYs = [-50, -207, -207, -50, -207, -207, -207];
            this.maxYs = [20, -167, -167, 20, -167, -167, -167];

            //vi tri dealer
            this.rootDealerPos = cc.v2(0, 136);

            //index chip
            this.chipIndex = 0;

            //mang cac gia tri Bet (map voi button)
            this.betVals = [50000, 100000, 200000, 500000, 1000000, 2000000,3000000];
            this.processBetValUI();

            //reset lastBetData
            cc.XocDiaVipController.getInstance().setLastBetData(null);

            //reset totalBetUI
            this.resetTotalBetUI();

            //thoi gian giua cac lan dat (minisecond)
            this.timePerBet = 100;

            this.currentState = -1;

            //arr timeout reBet
            this.timeouts = [];

            //Vi tri cua groupUser
            this.posGroupUser = cc.v2(386.155, -267.564);

            this.initGateChip();
            cc.XocDiaVipController.getInstance().initLogBet();
			
			
        },
        initGateChip: function () {
            //Chip cua tung gate
            this.gateChips = [];
            //Khoi tao gateChip tung cua
            for (let i = 1; i <= 7; i++) {
                this.gateChips[i] = [];
            }
        },

        //HubOn - PlayerBet
        playerBet: function (info) {
            //dam bao joinGame xong moi xu ly - tranh loi server neu bi
            if (cc.XocDiaVipController.getInstance().getPositions()) {
                var accID = info[0];
                var amount = info[1];
                var gate = info[2];
                var chip = info[3];

                cc.XocDiaVipController.getInstance().updateChip(accID, chip);

                this.playFxUserBet(
                    cc.XocDiaVipController.getInstance().getIndexUIBetByAccID(accID),
                    gate,
                    this.getChipIndexFromValue(amount),
                    true
                );

                //them tong dat o cac cua
                this.totalBets[gate - 1] += amount;
                this.lbTotalBets[gate - 1].string = cc.Tool.getInstance().formatNumber((this.totalBets[gate - 1]));

                //them tong dat o cac cua (cua user)
                if (accID === cc.LoginController.getInstance().getUserId()) {
                    cc.XocDiaVipController.getInstance().setLogBet({
                        'AccountID': accID,
                        'Amount': amount,
                        'Gate': gate
                    });
                    this.totalUserBets[gate - 1] += amount;
                    this.lbTotalUserBets[gate - 1].string = (this.totalUserBets[gate - 1]);
                    //this.lbTotalUserBets[gate - 1].string = cc.Tool.getInstance().formatNumber((this.totalUserBets[gate - 1])*10/10000);
					
                    this.lbTotalUserBets[gate - 1].node.parent.active = true;

                    cc.DDNA.getInstance().betSummary(cc.DDNAGame.XOC_DIA_VIP, amount, cc.XocDiaVipController.getInstance().getSID());
                }
            }
        },

        reBet: function (betLog, isX2) {
            var self = this;
            var totalBet = 0;

            //tinh truoc tong tien de kiem tra balance
            //duyet qua cac luot bet
            betLog.forEach(function (bet) {
                totalBet += bet.Amount;
            });
            if (isX2) {
                totalBet *= 2;
            }

            // console.log('reBet totalBet: ' + totalBet);
            // console.log('reBet Số dư: ' + cc.BalanceController.getInstance().getBalance());

            //kiem tra so du du ko? -> ko đủ return luôn
            if (totalBet > cc.BalanceController.getInstance().getBalance()) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ.');
                return;
            }

            //GỘP CHIP BET LẠI

            //tính tông số chip đặt các cửa
            var ODD = 0;
            var THREE_UP = 0;
            var THREE_DOWN = 0;
            var EVEN = 0;
            var FOUR_UP = 0;
            var FOUR_DOWN = 0;
            var TWO = 0;
            //duyet qua cac luot bet
            betLog.forEach(function (bet) {
                switch (bet.Gate) {
                    case cc.XocDiaVipGate.ODD:
                        ODD += bet.Amount;
                        break;
                    case cc.XocDiaVipGate.THREE_UP:
                        THREE_UP += bet.Amount;
                        break;
                    case cc.XocDiaVipGate.THREE_DOWN:
                        THREE_DOWN += bet.Amount;
                        break;
                    case cc.XocDiaVipGate.EVEN:
                        EVEN += bet.Amount;
                        break;
                    case cc.XocDiaVipGate.FOUR_UP:
                        FOUR_UP += bet.Amount;
                        break;
                    case cc.XocDiaVipGate.FOUR_DOWN:
                        FOUR_DOWN += bet.Amount;
                        break;
                    case cc.XocDiaVipGate.TWO:
                        TWO += bet.Amount;
                        break;
                }
            });

            var bet500 = 0; //đếm số bet
            var bet100 = 0; //đếm số bet
            var bet10 = 0; //đếm số bet
            var bet5 = 0; //đếm số bet
            var bet1 = 0; //đếm số bet

            //tổng số chip đặt các cửa
            var gates = [ODD, THREE_UP, THREE_DOWN, EVEN, FOUR_UP, FOUR_DOWN, TWO];
            //luu lai gia tri Bet da toi uu
            var bets = [];

            for (var i = 0; i < 6; i++) {
                bet500 = 0; //đếm số bet
                bet100 = 0; //đếm số bet
                bet10 = 0; //đếm số bet
                bet5 = 0; //đếm số bet
                bet1 = 0; //đếm số bet

                totalBet = gates[i];
                if (isX2) {
                    totalBet *= 2;
                }
                // console.log('totalBet: ', totalBet);

                bet500 = Math.floor(totalBet / 500000);
                // console.log('bet500: ' + bet500, i);
                totalBet = totalBet - (bet500 * 500000);

                if (totalBet > 0) {
                    bet100 = Math.floor(totalBet / 100000);
                    // console.log('bet100: ' + bet100, i);
                    totalBet = totalBet - (bet100 * 100000);
                }

                if (totalBet > 0) {
                    bet10 = Math.floor(totalBet / 10000);
                    // console.log('bet10: ' + bet10, i);
                    totalBet = totalBet - (bet10 * 10000);
                }

                if (totalBet > 0) {
                    bet5 = Math.floor(totalBet / 5000);
                    // console.log('bet5: ' + bet5, i);
                    totalBet = totalBet - (bet5 * 5000);
                }

                if (totalBet > 0) {
                    bet1 = Math.floor(totalBet / 1000);
                    // console.log('bet1: ' + bet1, i);
                }

                for (var j = 0; j < bet500; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 500000,
                    });
                }

                for (j = 0; j < bet100; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 100000,
                    });
                }

                for (j = 0; j < bet10; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 10000,
                    });
                }

                for (j = 0; j < bet5; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 5000,
                    });
                }

                for (j = 0; j < bet1; j++) {
                    bets.push({
                        'Gate': i + 1,
                        'Amount': 1000,
                    });
                }
            }

            this.count = 0;
            //duyet qua cac luot bet

            this.timeouts = [];
            bets.forEach(function (bet) {
                self.timeouts.push(
                    setTimeout(function () {
                        if (self.currentState === cc.XocDiaVipState.BETTING) {
                            self.sendRequestReBet(bet);
                        }
                    }, self.timePerBet * self.count)
                );

                self.count++;
            });

        },

        sendRequestReBet: function (bet) {
            //kiem tra so du
            if (cc.BalanceController.getInstance().getBalance() < bet.Amount) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ');
                return;
            } else {
                //send request
                cc.XocDiaVipController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, bet.Amount, bet.Gate);
            }
        },

        showLastInput: function (info) {
            // console.log('XocDiaVipInput showLastInput');
            var self = this;
            var betLogs = info;
            //duyet qua betLog của tat ca player
            betLogs.forEach(function (betLog) {
                //duyet qua cac luot bet cua player
                betLog.forEach(function (bet) {
                    self.playFxUserBet(
                        cc.XocDiaVipController.getInstance().getIndexUIBetByAccID(bet.AccountID),
                        bet.BetSide,
                        self.getChipIndexFromValue(bet.BetValue),
                        false
                    );

                    //them tong dat o cac cua
                    self.totalBets[bet.BetSide - 1] += bet.BetValue;
                    self.lbTotalBets[bet.BetSide - 1].string = cc.Tool.getInstance().formatNumber((self.totalBets[bet.BetSide - 1]));

                    //them tong dat o cac cua (cua user)
                    if (bet.AccountID === cc.LoginController.getInstance().getUserId()) {
                        cc.XocDiaVipController.getInstance().setLogBet({
                            'AccountID': bet.AccountID,
                            'Amount': bet.BetValue,
                            'Gate': bet.BetSide
                        });
                        self.totalUserBets[bet.BetSide - 1] += bet.BetValue;
                        self.lbTotalUserBets[bet.BetSide - 1].string = cc.Tool.getInstance().formatNumber((self.totalUserBets[bet.BetSide - 1]));
                        self.lbTotalUserBets[bet.BetSide - 1].node.parent.active = true;
                    }
                })
            });
        },


        //lay ve player bet
        getPlayerBets: function () {
            return players;
        },

        //lay ve index loai Chip bet
        getChipIndexFromValue: function (betVal) {
            var index = 0;
            var length = this.betVals.length;
            for (var i = 0; i < length; i++) {
                if (betVal === this.betVals[i]) {
                    index = i;
                    break;
                }
            }
            return index;
        },

        //tat/bat cac button chuc nang
        activeAllButtonBet: function (enable) {
            this.btnBetVals.forEach(function (btnBet) {
                btnBet.interactable = enable;
            });

            this.btnX2.interactable = enable;
            this.btnRepeat.interactable = enable;
        },

        //button bet val đang chon ko click duoc
        processBetValUI: function () {
			
            for (var i = 0; i < this.btnChips.length; i++) {
                this.btnChips[i].interactable = true;
                this.nodeChipPress[i].active = false;
            }

            this.btnChips[this.chipIndex].interactable = false;
            this.nodeChipPress[this.chipIndex].active = true;

            let scrContent = this.btnChips[this.chipIndex].node.parent;
            let scrContainer = scrContent.parent;

            let x = 0;
            if (this.btnChips[this.chipIndex].node.x > scrContainer.width) {
                x = -(this.btnChips[this.chipIndex].node.x - scrContainer.width) - this.btnChips[this.chipIndex].node.width / 2;
            } else {
                x = 0;
            }
            scrContent.stopAllActions();
            scrContent.runAction(cc.moveTo(0.2, x, scrContent.y));
        },

        nextChip: function () {
            this.chipIndex++;
            if (this.chipIndex >= this.btnChips.length) this.chipIndex = this.btnChips.length - 1;

            this.processBetValUI();
        },

        prevChip: function () {
            this.chipIndex--;
            if (this.chipIndex < 0) this.chipIndex = 0;

            this.processBetValUI();
        },

        //reset mang chip cac player
        resetInput: function () {
            // console.log('XocDiaVipInput resetInput');
            players.forEach(function (player) {
                player.chips = [];
            });
        },

        clearAllTimeOut: function () {
            this.timeouts.forEach(function (timeOut) {
                clearTimeout(timeOut);
            });
            this.timeouts = [];
        },

        resetTotalBetUI: function () {
            this.totalBets = [0, 0, 0, 0, 0, 0, 0];
            this.totalUserBets = [0, 0, 0, 0, 0, 0, 0];

            this.lbTotalBets.forEach(function (lbTotalBet) {
                lbTotalBet.string = '';
            });

            this.lbTotalUserBets.forEach(function (lbTotalUserBet) {
				lbTotalUserBet.string = '0';
                lbTotalUserBet.node.parent.active = false;
            });
        },
        betOfAccount: function (data) {

        },
        //save lai du lieu last bet
        saveLastBetData: function () {
            /*var betLog = [];
            var uID = cc.LoginController.getInstance().getUserId();
            var player = players[0];
            // chipItem.betIndex = betIndex;
            // chipItem.gate = gate;
            // chipItem.playerId = playerId;
            var self = this;
            player.chips.forEach(function (chip) {
                betLog.push(
                    {
                        'AccountID': uID,
                        'Amount': self.betVals[chip.chipIndex],
                        'Gate': chip.gate
                    }
                );
            });*/
            let logBet = [...cc.XocDiaVipController.getInstance().getLogBet()];

            cc.XocDiaVipController.getInstance().setLastBetData(logBet);
        },

        updateInput: function (state) {
            //check state de xu ly hien thi
            switch (state) {
                //giai doan dat cuoc
                case cc.XocDiaVipState.BETTING: //54
                    if (this.currentState !== state) {
                        this.clearAllTimeOut();
                        this.resetInput();
                        this.resetTotalBetUI();
                        this.activeAllButtonBet(true);
                    }

                    break;
                //giai doan mo bat
                case cc.XocDiaVipState.OPEN_PLATE:
                    if (this.currentState !== state) {
                        this.clearAllTimeOut();
                        this.activeAllButtonBet(false);
                        this.saveLastBetData();
                    }
                    break;

                //giai doan ket qua
                case cc.XocDiaVipState.SHOW_RESULT: //15
                    if (this.currentState !== state) {
                        this.activeAllButtonBet(false);
                    }
                    break;

                //giai doan cho phien moi
                case cc.XocDiaVipState.WAITING:
                    if (this.currentState !== state) {
                        this.resetInput();
                        this.activeAllButtonBet(false);
                        //Khoi tao logBet moi
                        cc.XocDiaVipController.getInstance().initLogBet();
                    }
                    break;
                //xoc dia
                case cc.XocDiaVipState.SHAKING:
                    if (this.currentState !== state) {
                        this.resetTotalBetUI();
                        this.resetInput();
                        this.activeAllButtonBet(false);
                    }
                    break;
            }

            //luu lai state hien tai
            this.currentState = state;
        },
        //Lay danh sach chip tung gate
        getGateChips: function () {
            return this.gateChips;
        },
        //hieu ung chip khi 1 user bet
        playFxUserBet: function (playerId, gate, chipIndex, isMove) {
            if(playerId == 0)
			{
				//cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
				//console.log(playerId);
			}
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);

            var betIndex = gate - 1;
            var minX = this.minXs[betIndex];
            var maxX = this.maxXs[betIndex];
            var minY = this.minYs[betIndex];
            var maxY = this.maxYs[betIndex];

            var x = minX + Math.floor(Math.random() * (Math.abs(maxX - minX)));
            var y = minY + Math.floor(Math.random() * (Math.abs(maxY - minY)));

            var nodeChip = cc.XocDiaVipController.getInstance().createChip();
            nodeChip.parent = this.nodeParentChip;

            let nodePosition = null;
            if (playerId != -1) {
                nodePosition = players[playerId].position;
            } else {
                nodePosition = this.posGroupUser;
            }
            nodeChip.position = nodePosition;//players[playerId].position;

            var chipItem = nodeChip.getComponent(cc.XocDiaVipChipItem);
            //set vi tri bet
            chipItem.betIndex = betIndex;
            chipItem.gate = gate;
            chipItem.playerId = playerId;
            chipItem.position = nodePosition;

            //players[playerId].chips.push(chipItem);

            chipItem.setChip(chipIndex);

            if (isMove) {
                chipItem.moveTo(cc.v2(x, y));
            } else {
                chipItem.setPosition(cc.v2(x, y));
            }
            //Push chipItem vao mang
            this.gateChips[gate].push(chipItem);
        },

        //hieu ung chip bay tu dealer -> ra ban
        playFxDealerPay: function (chipBet) {
            var self = this;

            var nodeChip = cc.XocDiaVipController.getInstance().createChip();
            nodeChip.parent = self.nodeParentChip;
            nodeChip.position = self.rootDealerPos; //vi tri dealer
            var chipItem = nodeChip.getComponent(cc.XocDiaVipChipItem);
            chipItem.betIndex = chipBet.betIndex;
            chipItem.playerId = chipBet.playerId;
            chipItem.position = chipBet.position;
            //set loai chip theo ChipIndex luc bet
            chipItem.setChip(chipBet.chipIndex);
            this.gateChips[chipBet.gate].push(chipItem);

            //push chung chip pay vao chip bet
            //players[chipBet.playerId].chips.push(chipItem);

            //di chuyen den vi tri chip dang bet
            var indexBet = chipBet.betIndex;
            var minX = self.minXs[indexBet];
            var maxX = self.maxXs[indexBet];
            var minY = self.minYs[indexBet];
            var maxY = self.maxYs[indexBet];

            var x = minX + Math.floor(Math.random() * (Math.abs(maxX - minX)));
            var y = minY + Math.floor(Math.random() * (Math.abs(maxY - minY)));

            chipItem.moveTo(cc.v2(x, y));

        },

        //hieu ung chip bay tu ban -> den nguoi choi win
        playFxPay: function (chipBet) {
            // let positionEnd = null;
            // if(chipBet.playerId != -1) {
            //     positionEnd = players[chipBet.playerId].position
            // }else {
            //     positionEnd = this.posGroupUser;
            // }
            //chipBet.moveToEnd(players[chipBet.playerId].position);
            chipBet.moveToEnd(chipBet.position);
        },

        //hieu ung chip bay tu ban -> ve dealer
        playFxLost: function (chipBet) {
            //chip bet -> bay ve dealer
            chipBet.moveToEnd(this.rootDealerPos);

            // var self = this;
            // var chipBets = players[playerId].chips;
            // chipBets.forEach(function (chipBet) {
            //     //chip bet -> bay ve dealer
            //     chipBet.moveToEnd(self.rootDealerPos);
            // });
        },

        //chon muc bet
        betValueClicked: function (event, data) {
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
            this.chipIndex = parseInt(data.toString());
            this.processBetValUI();
        },

        //dat cua
        betClicked: function (event, data) {
            if (cc.XocDiaVipController.getInstance().getTime() <= 3) {
                cc.PopupController.getInstance().showMessage('Đã hết thời gian đặt cửa.');
                cc.XocDiaVipController.getInstance().activeAllButtonBet(false);
                return;
            }

            this.indexBet = parseInt(data.toString());
            console.log(this.indexBet);
            var betVal = this.betVals[this.chipIndex];
			
			var tongBet = 0;
			
			this.lbTotalUserBets.forEach(function (lbTotalUserBets) {
                tongBet += parseInt(lbTotalUserBets.string);
				
            });
			//console.log("tongBet: " + tongBet);
			//console.log("betVal: " + betVal);
			
			/* if((tongBet + (betVal*10/10000)) > 3000)
			{
				
				//cc.PopupController.getInstance().showMessage('Bạn chỉ đặt tổng cược 3000');
				return;
			} */

            //kiem tra so du
            if (cc.BalanceController.getInstance().getBalance() < betVal) {
                cc.PopupController.getInstance().showMessage('Số dư không đủ');
                return;
            } else {
                //send request
                console.log("send request");
                cc.XocDiaVipController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, betVal, this.indexBet + 1);
                //dat -> tat luon nut X2 + reBet
                this.btnX2.interactable = false;
                this.btnRepeat.interactable = false;
            }
        },

        //tat/bat che do Nan
        nanClicked: function () {
            this.isNan = !this.isNan;
            if (this.isNan) {
                this.spriteNan.spriteFrame = cc.XocDiaVipController.getInstance().getNans()[0];
            } else {
                this.spriteNan.spriteFrame = cc.XocDiaVipController.getInstance().getNans()[1];
            }

            cc.XocDiaVipController.getInstance().setIsNan(this.isNan);
        },

        x2Clicked: function () {
            if (cc.XocDiaVipController.getInstance().getTime() <= 3) {
                cc.PopupController.getInstance().showMessage('Đã hết thời gian đặt cửa.');
                cc.XocDiaVipController.getInstance().activeAllButtonBet(false);
                return;
            }

            var lastBetData = cc.XocDiaVipController.getInstance().getLastBetData();
            if (lastBetData && lastBetData.length > 0) {
                this.reBet(lastBetData, true);
                this.btnX2.interactable = false;
                this.btnRepeat.interactable = false;
            } else {
                cc.PopupController.getInstance().showSlotsMessage('Không có dữ liệu đặt của phiên trước.');
            }
        },

        repeatClicked: function () {
            if (cc.XocDiaVipController.getInstance().getTime() <= 3) {
                cc.PopupController.getInstance().showMessage('Đã hết thời gian đặt cửa.');
                cc.XocDiaVipController.getInstance().activeAllButtonBet(false);
                return;
            }

            var lastBetData = cc.XocDiaVipController.getInstance().getLastBetData();
            if (lastBetData && lastBetData.length > 0) {
                this.reBet(lastBetData);
                this.btnX2.interactable = false;
                this.btnRepeat.interactable = false;
            } else {
                cc.PopupController.getInstance().showSlotsMessage('Không có dữ liệu đặt của phiên trước.');
            }
        },

        //clear all chip
        clearAllChip: function () {
            this.nodeParentChip.removeAllChildren(true);
        }
    });
}).call(this);
