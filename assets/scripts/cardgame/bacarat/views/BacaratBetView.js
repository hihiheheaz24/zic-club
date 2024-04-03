/*
 * Generated by BeChicken
 * on 9/27/2019
 * version v1.0
 */
(function () {
    cc.BacaratBetView = cc.Class({
        extends: cc.Component,
        properties: {
            nodeLayoutBet: cc.Node,
            //Btn PlayerPair
            nodeAreaPPair: cc.Node,
            sfPPair: [cc.SpriteFrame],//0: Normal, 1: Press

            //Btn Player
            nodeAreaPlayer: cc.Node,
            sfPlayer: [cc.SpriteFrame],

            //Btn Tie
            nodeAreaTie: cc.Node,
            sfTie: [cc.SpriteFrame],

            //Btn Banker
            nodeAreaBanker: cc.Node,
            sfBanker: [cc.SpriteFrame],

            //Btn Banker Pair
            nodeAreaPBanker: cc.Node,
            sfPBanker: [cc.SpriteFrame],

            totalPPlayerBet: cc.Label,
            totalUserPPlayerBet: cc.Label,

            totalPlayerBet: cc.Label,
            totalUserPlayerBet: cc.Label,

            totalTieBet: cc.Label,
            totalUserTieBet: cc.Label,

            totalBankerBet: cc.Label,
            totalUserBankerBet: cc.Label,

            totalPBankerBet: cc.Label,
            totalUserPBankerBet: cc.Label,

            //ButtonBet
            btn1K: cc.Node,
            btn5K: cc.Node,
            btn10K: cc.Node,
            btn100K: cc.Node,
            btn500K: cc.Node,

            //Btn Bet again
            nodeBetX2: cc.Node,
            nodeBetAgain: cc.Node,

            spriteBtnX2: [cc.SpriteFrame],
            spriteBtnAgain: [cc.SpriteFrame]

        },
        onLoad: function () {
            cc.BacaratController.getInstance().setBetView(this);
            this.betValue = 5000;//Khoi tao bet value 5k
            //PolyCollider cac cua dat
            this.areaPPair = this.nodeAreaPPair.getComponent(cc.PolygonCollider);
            this.areaPlayer = this.nodeAreaPlayer.getComponent(cc.PolygonCollider);
            this.areaTie = this.nodeAreaTie.getComponent(cc.PolygonCollider);
            this.areaBanker = this.nodeAreaBanker.getComponent(cc.PolygonCollider);
            this.areaPBanker = this.nodeAreaPBanker.getComponent(cc.PolygonCollider);

            //Spire cac cua dat
            this.pPairSprite = this.nodeAreaPPair.getComponent(cc.Sprite);
            this.playerSprite = this.nodeAreaPlayer.getComponent(cc.Sprite);
            this.tieSprite = this.nodeAreaTie.getComponent(cc.Sprite);
            this.bankerSprite = this.nodeAreaBanker.getComponent(cc.Sprite);
            this.pBankerSprite = this.nodeAreaPBanker.getComponent(cc.Sprite);

            //Node win cac cua dat
            this.pPairWin = this.nodeAreaPPair.getChildByName('win').getComponent(cc.Animation);
            this.playerWin = this.nodeAreaPlayer.getChildByName('win').getComponent(cc.Animation);
            this.tieWin = this.nodeAreaTie.getChildByName('win').getComponent(cc.Animation);
            this.bankerWin = this.nodeAreaBanker.getChildByName('win').getComponent(cc.Animation);
            this.pBankerWin = this.nodeAreaPBanker.getChildByName('win').getComponent(cc.Animation);

            //Khoi tao event click bet
            //this.initBetEvent();
            this.resetLbTotalBet();

            //Btn Bet
            this.btnBetX2 = this.nodeBetX2.getComponent(cc.Button);
            this.btnBetAgain = this.nodeBetAgain.getComponent(cc.Button);
        },
        resetLbTotalBet: function () {
            let lstLabel = [
                this.totalPPlayerBet, this.totalUserPPlayerBet,
                this.totalPlayerBet, this.totalUserPlayerBet,
                this.totalTieBet, this.totalUserTieBet,
                this.totalBankerBet, this.totalUserBankerBet,
                this.totalPBankerBet, this.totalUserPBankerBet
            ];
            lstLabel.map(label => label.string = "");
        },
        onEnable: function () {
            cc.director.getCollisionManager().enabled = true;
        },
        onDisable: function () {
            // cc.director.getCollisionManager().enabled = false;
        },
        //Set gia tri bet
        setBetValue: function (sender, value) {
            value = parseInt(value);
            if (value != this.betValue) {
                this.betValue = value;
                cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_SELECT);
                //Doi active chip
                this.resetSpriteButton();
                //Active button
                this.setActiveButton(sender.target);
            }
        },
        setActiveButton: function (node) {
            node.getChildByName('active').active = true;
            let moveUp = cc.moveTo(0.3, cc.v2(node.x, 10));
            node.runAction(moveUp);
        },
        resetSpriteButton: function () {
            let listButton = [this.btn1K, this.btn5K, this.btn10K, this.btn100K, this.btn500K];
            let self = this;
            listButton.forEach(function (btn, index) {
                self.setDefaultSfButton(btn, index);
            });

        },
        setDefaultSfButton: function (node, type) {
            node.getChildByName('active').active = false;
            let moveBack = cc.moveTo(0.3, cc.v2(node.x, 0));
            node.runAction(moveBack);
        },
        //Bet lai
        onBetAgain: function (sender, unit) {
            unit = parseInt(unit); //He so bet
            let logBet = cc.BacaratController.getInstance().getBetLogBySessionID(cc.BacaratController.getInstance().getBetLogSession());
            if (logBet.length === 0) {
                cc.PopupController.getInstance().showSlotsMessage("Chưa có dữ liệu của phiên trước.");
                return;
            }
            for (let i = 1; i <= unit; i++) {
                logBet.map((betData, index) => {
                    let timeOut = setTimeout(function () {
                        if (cc.BacaratController.getInstance().getCurrentState() === cc.BacaratMapGameState.BETTING && betData.sessionID === cc.BacaratController.getInstance().getBetLogSession() - 1) {
                            this.sendRequestBet(betData.value, betData.betSide);
                        } else {
                            try {
                                clearTimeout(timeOut);
                            } catch (e) {
                                console.log(e);
                            }
                        }
                    }.bind(this), index * 120*i);
                }, this);
            }
            this.disableBetAgain(true);
        },
        //Disable button bet lai, bet x2
        disableBetAgain: function (isDisable) {
            this.btnBetAgain.interactable = !isDisable;
            this.btnBetX2.interactable = !isDisable;

            let indexActive = (!isDisable) ? 1 : 0;
            this.nodeBetX2.getComponent(cc.Sprite).spriteFrame = this.spriteBtnX2[indexActive];
            this.nodeBetAgain.getComponent(cc.Sprite).spriteFrame = this.spriteBtnAgain[indexActive];

            /* let color = cc.Color.WHITE;
            if (isDisable) {
                color = cc.Color.GRAY;
            }
            this.nodeBetX2.color = color;
            this.nodeBetAgain.color = color; */
        },
        //Init event click vao bet
        initBetEvent: function () {
            this.nodeLayoutBet.on('touchstart', function (touch, event) {
                this.onBetSideClick(touch.getLocation(), 'touchstart');
            }, this);
            this.nodeLayoutBet.on('touchend', function (touch, event) {
                this.onBetSideClick(touch.getLocation(), 'touchend');
            }, this);
        },
        enableClickBet: function (enable) {
            if (enable) {
                this.initBetEvent()
            } else {
                this.nodeLayoutBet.off(cc.Node.EventType.TOUCH_START);
                this.nodeLayoutBet.off(cc.Node.EventType.TOUCH_END);

                //Reset lai trang thai normal button
                this.changeSpriteFrame(this.pPairSprite, this.sfPPair, 'touchend', cc.BacaratBetSite.PLAYER_PAIR);
                this.changeSpriteFrame(this.playerSprite, this.sfPlayer, 'touchend', cc.BacaratBetSite.PLAYER);
                this.changeSpriteFrame(this.tieSprite, this.sfTie, 'touchend', cc.BacaratBetSite.TIE);
                this.changeSpriteFrame(this.bankerSprite, this.sfBanker, 'touchend', cc.BacaratBetSite.BANKER);
                this.changeSpriteFrame(this.pBankerSprite, this.sfPBanker, 'touchend', cc.BacaratBetSite.BANKER_PAIR);
            }
        },
        onBetSideClick: function (location, touchState) {
            //Click PPlayer Side
            if (cc.Intersection.pointInPolygon(location, this.areaPPair.world.points)) {
                this.changeSpriteFrame(this.pPairSprite, this.sfPPair, touchState, cc.BacaratBetSite.PLAYER_PAIR);
            }
            //Click Player Side
            if (cc.Intersection.pointInPolygon(location, this.areaPlayer.world.points)) {
                this.changeSpriteFrame(this.playerSprite, this.sfPlayer, touchState, cc.BacaratBetSite.PLAYER);

            }
            //Click Tie Side
            if (cc.Intersection.pointInPolygon(location, this.areaTie.world.points)) {
                this.changeSpriteFrame(this.tieSprite, this.sfTie, touchState, cc.BacaratBetSite.TIE);
            }
            //Click Banker Side
            if (cc.Intersection.pointInPolygon(location, this.areaBanker.world.points)) {
                this.changeSpriteFrame(this.bankerSprite, this.sfBanker, touchState, cc.BacaratBetSite.BANKER);
            }
            //Click Banker Pair Side
            if (cc.Intersection.pointInPolygon(location, this.areaPBanker.world.points)) {
                this.changeSpriteFrame(this.pBankerSprite, this.sfPBanker, touchState, cc.BacaratBetSite.BANKER_PAIR);

            }
        },
        //Thay doi sprite frame cua node khi click bet
        changeSpriteFrame: function (spriteNode, sfNode, touchEvent, betSide) {
            if (touchEvent == 'touchstart') {
                spriteNode.spriteFrame = sfNode[1];
                this.onBet(betSide);
            } else {
                spriteNode.spriteFrame = sfNode[0];
            }
        },

        //Chay animation win
        playAnimationWin: function (sideWin) {
            sideWin = parseInt(sideWin);
            let nodeWin = null;
            switch (sideWin) {
                case cc.BacaratBetSite.PLAYER_PAIR:
                    nodeWin = this.pPairWin;
                    break;
                case cc.BacaratBetSite.PLAYER:
                    nodeWin = this.playerWin;
                    cc.AudioController.getInstance().enableSound(true);
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.PLAYER_WIN);
                    break;
                case cc.BacaratBetSite.TIE:
                    nodeWin = this.tieWin;
                    cc.AudioController.getInstance().enableSound(true);
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.DRAW_GAME);
                    break;
                case cc.BacaratBetSite.BANKER:
                    nodeWin = this.bankerWin;
                    cc.AudioController.getInstance().enableSound(true);
                    cc.AudioController.getInstance().playSound(cc.AudioTypes.BANKER_WIN);
                    break;
                case cc.BacaratBetSite.BANKER_PAIR:
                    nodeWin = this.pBankerWin;
                    break;
            }
            if (nodeWin != null) {
                nodeWin.node.active = true;
                nodeWin.play('win');
            }

        },
        //Stop play win
        stopAnimationWin: function () {
            this.pPairWin.node.active = false;
            this.pPairWin.stop('win');

            this.playerWin.node.active = false;
            this.playerWin.stop('win');

            this.tieWin.node.active = false;
            this.tieWin.stop('win');

            this.bankerWin.node.active = false;
            this.bankerWin.stop('win');

            this.pBankerWin.node.active = false;
            this.pBankerWin.stop('win');

            this.resetLbTotalBet();
        },
        //onBet dat cua
        onBet: function (betSide) {
            this.disableBetAgain(true);
            cc.AudioController.getInstance().playSound(cc.AudioTypes.CHIP_BET);
            //Gui request bet
            this.sendRequestBet(this.betValue, betSide);
        },
        //Update betValue
        updateTotalUserBetSide: function (betSide, totalBet) {
            betSide = parseInt(betSide);
            let label = null;
            switch (betSide) {
                case cc.BacaratBetSite.PLAYER_PAIR:
                    label = this.totalUserPPlayerBet;
                    break;
                case cc.BacaratBetSite.PLAYER:
                    label = this.totalUserPlayerBet;
                    break;
                case cc.BacaratBetSite.TIE:
                    label = this.totalUserTieBet;
                    break;
                case cc.BacaratBetSite.BANKER:
                    label = this.totalUserBankerBet;
                    break;
                case cc.BacaratBetSite.BANKER_PAIR:
                    label = this.totalUserPBankerBet;
                    break;
            }
            label.string = cc.Tool.getInstance().formatNumber(totalBet);
        },
        //HubOn betOfAccount
        updateBetOfAccount: function (data) {
            data.map(betSide => {
                let side = parseInt(betSide.BetSide);
                let label = null;
                switch (side) {
                    case cc.BacaratBetSite.PLAYER_PAIR:
                        label = this.totalUserPPlayerBet;
                        break;
                    case cc.BacaratBetSite.PLAYER:
                        label = this.totalUserPlayerBet;
                        break;
                    case cc.BacaratBetSite.TIE:
                        label = this.totalUserTieBet;
                        break;
                    case cc.BacaratBetSite.BANKER:
                        label = this.totalUserBankerBet;
                        break;
                    case cc.BacaratBetSite.BANKER_PAIR:
                        label = this.totalUserPBankerBet;
                        break;
                }
                label.string = cc.Tool.getInstance().formatNumber(betSide.BetValue);
            });
        },
        updateTotalBet: function (data) {
            this.totalPPlayerBet.string = data.TotalBetPlayerPair === 0 ? '' : cc.Tool.getInstance().formatNumber(data.TotalBetPlayerPair);

            this.totalPlayerBet.string = data.TotalBetPlayer === 0 ? '' : cc.Tool.getInstance().formatNumber(data.TotalBetPlayer);

            this.totalTieBet.string = data.TotalBetTie === 0 ? '' : cc.Tool.getInstance().formatNumber(data.TotalBetTie);

            this.totalBankerBet.string = data.TotalBetBanker === 0 ? '' : cc.Tool.getInstance().formatNumber(data.TotalBetBanker);

            this.totalPBankerBet.string = data.TotalBetBankerPair === 0 ? '' : cc.Tool.getInstance().formatNumber(data.TotalBetBankerPair);
        },
        sendRequestBet: function (betValue, betSide) {
            return cc.BacaratController.getInstance().sendRequestOnHub(cc.MethodHubName.BET, betValue, betSide);
        }

    });
}).call(this);