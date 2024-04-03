/**
 * Created by Nofear on 3/22/2019.
 */

var slotsConfig = require('MPConfig');
var gameMessage = require('GameMessage');

(function () {
    cc.MPSpinView = cc.Class({
        extends: cc.Component,
        properties: {
            spinColumnViews: [cc.MPSpinColumnView],

            spritePrize: cc.Label,
            lbiTotalWin: cc.LabelIncrement,
            lbSessionID: cc.Label,
            animationJackpot : cc.Node,
        },

        onLoad: function () {
            this.spinController = cc.MPSpinController.getInstance();
            this.spinController.setMPSpinView(this);

            this.scheduler = cc.director.getScheduler();
            this.isSpining = false;

            this.animationWin = this.lbiTotalWin.node.parent.parent.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.lbiTotalWin.setValue(0);
        },

        //random tat ca cac icon trong man choi
        randomAllIcon: function () {
            this.spinColumnViews.forEach(function (spinColumnView) {
                spinColumnView.randomAllIcon();
            });
        },

        //set sessionID UI ngoai game
        setSessionID: function (sessionID) {
            this.lbSessionID.string = sessionID;
        },

        //khi click SPIN goi ham nay
        startSpin: function () {

            //danh danh trang thai dang SPIN
            this.isSpining = true;
            var self = this;
            this.indexSpin = 0;

            //Set time goi STOP va time goi SPIN cot theo mode
            if (cc.MiniPokerController.getInstance().getFastSpin()) {
                this.timeBetweenCol = slotsConfig.TIME_COLUMN_FAST;
                this.timeStop = slotsConfig.TIME_CALL_STOP_FAST;
            } else {
                this.timeBetweenCol = slotsConfig.TIME_COLUMN_NORMAL;
                this.timeStop = slotsConfig.TIME_CALL_STOP_NORMAL;
            }

            //Stop tat ca cac Effect
            this.resetSpin();

            //dat lich SPIN lan luot cac cot
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, 0, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol * 1, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol * 2, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol * 3, false);
            this.scheduler.schedule(function () {
                self.spinColumn();
            }, this, 0, 0, this.timeBetweenCol * 4, false);
        },

        //goi khi STOP SPIN xong
        stopSpinX1Finish: function () {
            this.indexStopFinish++;
            //Khi ca 5 cot deu dung thi cho SPIN tiep
            if (this.indexStopFinish === 5) {
                //doi lai trang thai
                this.isSpining = false;

                // //Update lai balance sau khi SPIN
                cc.BalanceController.getInstance().updateBalance(this.spinResponse.Balance);

                cc.MiniPokerController.getInstance().activateButton(true);
                if (this.spinResponse.EventFreeSpin && this.spinResponse.EventFreeSpin > 0) {
                    cc.MPFreeSpinController.getInstance().showFreeSpin(this.spinResponse.EventFreeSpin);
                    cc.MiniPokerController.getInstance().activateButtonX(false);

                    cc.MiniPokerController.getInstance().setMode(cc.MiniPokerX.X1);
                } else {
                    cc.MPFreeSpinController.getInstance().hideFreeSpin();
                    cc.MiniPokerController.getInstance().activateButtonX(true);
                }

                this.playEffect();
            }
        },

        //reset lai cac tham so + tat cac hieu ung + stop cac schedule
        resetSpin: function () {
            this.unscheduleAllCallbacks();
            cc.MPEffectController.getInstance().stopEffect();
            this.lbiTotalWin.node.parent.parent.active = false;
        },

        playEffect: function () {
            var roomId = cc.MiniPokerController.getInstance().getRoomId();
            var totalBet = this.spinResponse.TotalBet;

            // if (this.spinResponse.FreeSpin > 0) {
            //     cc.MPFreeSpinController.getInstance().showFreeSpin(this.spinResponse.FreeSpin);
            // } else {
            //     cc.MPFreeSpinController.getInstance().hideFreeSpin();
            // }

            var self = this;
            if (this.spinResponse.TotalPrize > 0) {
                //update Win UI

                var prizeId = this.spinResponse.PrizeData[0].PrizeID;
                this.lbiTotalWin.node.parent.parent.position =cc.v2(227.778,  100);
                //gan anh
                var sfPrizes = cc.MPSpinController.getInstance().getSFPrizes();
                switch (prizeId) {
                    case cc.MPPrize.JACKPOT:
                        this.spritePrize.string = "JACKPOT";
                        this.lbiTotalWin.node.parent.parent.position =cc.v2(227.778,  31.169);
                        this.animationJackpot.active = true;
                        this.playSpine(this.animationJackpot, "animation", false,()=>{
                            this.animationJackpot.active = false;
                        })
                        break;
                    case cc.MPPrize.THUNG_PHA_SANH_J:
                        this.spritePrize.string = "Thùng Phá Sảnh";
                        break;
                    case cc.MPPrize.TU_QUY:
                        this.spritePrize.string = "Tứ Quý";
                        break;
                    case cc.MPPrize.CU_LU:
                        this.spritePrize.string = "Cù Lũ";
                        break;
                    case cc.MPPrize.THUNG:
                        this.spritePrize.string = "Thùng";
                        break;
                    case cc.MPPrize.SANH:
                        this.spritePrize.string = "Sảnh";
                        break;
                    case cc.MPPrize.SAM:
                        this.spritePrize.string = "Sám";
                        break;
                    case cc.MPPrize.HAI_DOI:
                        this.spritePrize.string = "Hai Đôi";
                        break;
                    case cc.MPPrize.DOI_J_TRO_LEN:
                        this.spritePrize.string = "Đôi J Trở Lên";
                        break;
                }

                //Ko trung hu thi moi hien giai thuong
                this.lbiTotalWin.node.parent.parent.active = true;
                this.lbiTotalWin.tweenValue(0, this.spinResponse.PrizeData[0].PrizeValue,cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_TWEEN_MONEY_FAST : null);
                this.animationWin.play('showPrize');

                if (this.spinResponse.IsJackpot) {
                    //trung jackpot
                    cc.MPEffectController.getInstance().playEffect(cc.EffectType.JACKPOT, this.spinResponse.TotalPrize); //JackpotPrize
                    //top autoSpin
                    cc.MiniPokerController.getInstance().stopAutoSpin();
                }
                else if (this.spinResponse.TotalPrize >= totalBet * cc.Config.getInstance().getMultiplierByTotalBet(totalBet)) {
                    if (this.isAutoSpin) {
                        this.scheduler.schedule(function () {
                            cc.MiniPokerController.getInstance().startSpin();
                        }, this, 0, 0, cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_MONEY_EFFECT_BIG_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_BIG_WIN, false);
                    }

                    cc.MPEffectController.getInstance().playEffect(cc.EffectType.BIG_WIN, this.spinResponse.TotalPrize,  cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_TWEEN_MONEY_FAST : null);
                }
                else {
                    if (this.isAutoSpin) {
                        this.scheduler.schedule(function () {
                            cc.MiniPokerController.getInstance().startSpin();
                        }, this, 0, 0, cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN_FAST : slotsConfig.TIME_MONEY_EFFECT_NORMAL_WIN, false);
                    }
                   // cc.MPEffectController.getInstance().playEffect(cc.EffectType.BIG_WIN, this.spinResponse.TotalPrize);
                }
            } else {
                //THUA
                if (this.isAutoSpin) {
                    this.scheduler.schedule(function () {
                        cc.MiniPokerController.getInstance().startSpin();
                    }, this, 0, 0, cc.MiniPokerController.getInstance().getFastSpin() ? slotsConfig.TIME_WAIT_LOST_FAST : slotsConfig.TIME_WAIT_LOST, false);
                }
            }
        },

        playSpine(nAnim, animName, loop, func) {
            let spine = nAnim.getComponent(sp.Skeleton);
            let track = spine.setAnimation(0, animName, loop);
            if (track) {
                // Register the end callback of the animation
                spine.timeScale = 1;
                spine.setCompleteListener((trackEntry, loopCount) => {
                    let name = trackEntry.animation ? trackEntry.animation.name : "";
                    if (name === animName && func) {
                        func && func(); // Execute your own logic after the animation ends
                    }
                });
            }
        },

        //goi khi muon STOP SPIN
        stopSpin: function () {

            this.spinResponse = cc.MPSpinController.getInstance().getSpinResponse();
            //gan thong tin UI chung
            this.lbSessionID.string = '#' + this.spinResponse.SpinID;

            this.indexStopFinish = 0;
            this.indexStop = 0;
            var timeFinish = 0;
            var self = this;

            if (cc.MiniPokerController.getInstance().getFastSpin()) {
                self.scheduler.schedule(function () {
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, 0, false);
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, self.timeBetweenCol, false);
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 2, false);
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 3, false);
                    self.scheduler.schedule(function () {
                        self.fastStopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 4, false);
                }, self, 0, 0, self.timeStop, false);
            } else {
                self.scheduler.schedule(function () {
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, 0, false);
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, self.timeBetweenCol, false);
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 2, false);
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 3, false);
                    self.scheduler.schedule(function () {
                        self.stopColumn();
                    }, self, 0, 0, self.timeBetweenCol * 4, false);
                }, self, 0, 0, self.timeStop, false);
            }
        },

        spinColumn: function () {
            this.spinColumnViews[this.indexSpin].spin(1); //params = lineId
            this.indexSpin++;
        },

        stopColumn: function () {
            this.spinColumnViews[this.indexStop].stop();
            this.indexStop++;
        },

        fastStopColumn: function () {
            this.spinColumnViews[this.indexStop].fastStop();
            this.indexStop++;
        },

        autoSpin: function (isAutoSpin) {
            this.isAutoSpin = isAutoSpin;

            if (this.isAutoSpin && !this.isSpining) {
                cc.MiniPokerController.getInstance().startSpin();
            }
        },
    });
}.call(this));
