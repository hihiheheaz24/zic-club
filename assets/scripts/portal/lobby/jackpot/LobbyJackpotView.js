/**
 * Created by Nofear on 6/7/2017.
 */

var portalConfig = require('PortalConfig');

(function () {
    cc.LobbyJackpotView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbiEgypts: [cc.LabelIncrement],
            lbiThreeKingdoms: [cc.LabelIncrement],
            lbiAquariums: [cc.LabelIncrement],
            lbiDragonBalls: [cc.LabelIncrement],
            lbiBumBums: [cc.LabelIncrement],
            lbiCowboys: [cc.LabelIncrement],

            lbiMiniPokers: [cc.LabelIncrement],
            lbi777s: [cc.LabelIncrement],
            lbiBlockBusters: [cc.LabelIncrement],

            lbiShootFishs: [cc.LabelIncrement],
        },

        onLoad: function () {
            this.mount = 0;
            cc.LobbyJackpotController.getInstance().setLobbyJackpotView(this);
            this.getJackpot();
            if(cc.LoginController.getInstance().getLoginState()) {
                this.isPauseUpdateJackpot = false;
            }
            cc.director.getScheduler().schedule(this.getJackpot, this, portalConfig.TIME_GET_JACKPOT, cc.macro.REPEAT_FOREVER, 0, this.isPauseUpdateJackpot);
        },

        getJackpot: function () {
            var getJackpotInfoCommand = new cc.GetJackpotInfoCommand;
            getJackpotInfoCommand.execute(this, cc.GameId.ALL);

            this.getJackpotShootFish();
        },

        getJackpotShootFish: function () {
            if(cc.LoginController.getInstance().getLoginState()) {
                // this.onGetJackpotShootFishResponse();
                var GetJackpotShootFishCommand = new cc.GetJackpotShootFishCommand;
                GetJackpotShootFishCommand.execute(this);
            }
        },

        onGetJackpotShootFishResponse: function (response) {
            // response = {
            //     "code": 200,
            //     "data": {
            //         "11": 126083,
            //         "12": 200438,
            //         "13": 418573,
            //         "14": 784966,
            //         "21": 884476,
            //         "22": 1616401,
            //         "23": 3807692,
            //         "24": 7461555,
            //         "31": 7406370,
            //         "32": 14704782,
            //         "33": 36606585,
            //         "34": 73107277
            //     }
            // };
            // response = [800000, 8000000, 80000000];

            // this.lbiShootFishs[i].tweenValueto(response.data[14]);

            if (response !== null) {
                for (var i = 0; i < response.length; i++) {
                    switch (response[i].Name) {
                        case 14:
                            this.lbiShootFishs[0].tweenValueto(Math.round(response[i].Value));
                            break;
                        case 24:
                            this.lbiShootFishs[1].tweenValueto(Math.round(response[i].Value));
                            break;
                        case 34:
                            this.lbiShootFishs[2].tweenValueto(Math.round(response[i].Value));
                            break;

                    }
                }
            }
        },

        onGetJackpotInfoResponse: function (response) {
            if (response !== null) {
                var self = this;
                //var gameListData = lobbyJackpotData.GameList;
                var gameListData = response.GameList;

                cc.LobbyJackpotController.getInstance().setJackpotResponse(gameListData);

                gameListData.forEach(function (game) {
                    var roomIndex = game.RoomID - 1;

                    // var jackpotFund = game.JackpotFund + Math.floor((Math.random() * 10000) + 1000);
                    var jackpotFund = game.JackpotFund;

                    if (roomIndex !== 2) {
                        if (roomIndex === 3) {
                            roomIndex = 2;
                        }
                        switch (game.GameID.toString()) {
                            case cc.GameId.EGYPT:
                                self.lbiEgypts[roomIndex].tweenValueto(jackpotFund);
                                break;
                            case cc.GameId.THREE_KINGDOM:
                                self.lbiThreeKingdoms[roomIndex].tweenValueto(jackpotFund);
                                break;
                            case cc.GameId.AQUARIUM:
                                self.lbiAquariums[roomIndex].tweenValueto(jackpotFund);
                                break;
                            case cc.GameId.DRAGON_BALL:
                                self.lbiDragonBalls[roomIndex].tweenValueto(jackpotFund);
                                break;

                            case cc.GameId.COWBOY:
                                self.lbiCowboys[roomIndex].tweenValueto(jackpotFund);
                                break;
                                // case cc.GameId.SEVEN77:
                                //
                                //     self.lbi777s[roomIndex].tweenValueto(jackpotFund);
                                //     break;
                                //
                                // case cc.GameId.MINI_POKER:
                                //     self.lbiMiniPokers[roomIndex].tweenValueto(jackpotFund);
                                //     break;
                                //
                                // case cc.GameId.BLOCK_BUSTER:
                                //     if (roomIndex > 1) {
                                //         self.lbiBlockBusters[roomIndex - 2].tweenValueto(jackpotFund);
                                //     }
                                //     break;
                        }
                    }
                });
            }
        },

        convertGameIdToIndex: function (gameId) {
            switch (gameId) {
                case cc.GameId.EGYPT:
                    return 0;
                    break;
                case cc.GameId.THREE_KINGDOM:
                    return 1;
                    break;
                case cc.GameId.MINI_POKER:
                    return 2;
                    break;
                case cc.GameId.SEVEN77:
                    return 3;
                    break;
            }
        },

        pauseUpdateJackpot: function (isPause) {
            this.isPauseUpdateJackpot = isPause;
            if (isPause) {
                this.unscheduleAllCallbacks();
            } else {
                cc.director.getScheduler().schedule(this.getJackpot, this, portalConfig.TIME_GET_JACKPOT, cc.macro.REPEAT_FOREVER, 0, this.isPauseUpdateJackpot);
            }
        }
    });
}).call(this);