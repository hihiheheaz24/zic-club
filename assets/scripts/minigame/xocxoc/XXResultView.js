/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.XXResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBatNan: cc.Node,
            nodeDia: cc.Node,
            animationBat: sp.Skeleton,
            spriteVis: [cc.Sprite],

            sfVis: [cc.SpriteFrame],

            animResult: cc.Animation,
            nodeChan: cc.Node,
            nodeLe: cc.Node,

            nodeChan1: cc.Node,
            nodeChan2: cc.Node,
            nodeChan3: cc.Node,

            nodeLe1: cc.Node,
            nodeLe2: cc.Node,
            nodeLe3: cc.Node,

            startGame: [cc.AudioClip],
            startBet: [cc.AudioClip],
            sap1: [cc.AudioClip],
            sap2: [cc.AudioClip],
            sap3: [cc.AudioClip],
            sap4: [cc.AudioClip],
            ngua4: [cc.AudioClip],
            rollBowl: cc.AudioClip,
            animationDealer: sp.Skeleton,

        },

        onLoad: function () {
            this.sound = cc.Tool.getInstance().getItem("@Sound").toString() === 'true';
            cc.XXController.getInstance().setXXResultView(this);

            this.currentState = -1;
            this.nodeResult = this.animResult.node;
            this.nodeFxResult = this.nodeChan1.parent;

            //node parent Vi
            this.nodeViParent = this.spriteVis[0].node.parent;

            //toa do cua bat Nan
            this.batNanPos = cc.v2(0, 43);
        },

        reset: function () {
        },

        updateResult: function (players, result, originResult, state, openNow) {
            if (!this.nodeBatNan) return;
            this.sound = cc.Tool.getInstance().getItem("@Sound").toString() === 'true';
            //check state de xu ly hien thi
            switch (state) {
                //giai doan dat cuoc
                case cc.XXState.BETTING: //54
                    if (this.currentState !== state) {
                        this.playAudio(this.startBet[Math.floor(Math.random() * 3)]);
                        this.nodeBatNan.active = false;
                        this.nodeDia.active = false;
                        this.nodeBatNan.position = this.batNanPos;

                        this.animationBat.node.active = true;
                        this.animationBat.clearTracks();
                        this.animationBat.setToSetupPose();
                        this.animationBat.setAnimation(5, "Waiting", false);

                        this.nodeResult.active = false;
                        this.nodeViParent.active = false;
                        this.nodeFxResult.active = false;

                        this.animationDealer.clearTracks();
                        this.animationDealer.setToSetupPose();
                        this.animationDealer.setAnimation(0, "Chop mat", false);
                    }

                    break;
                //giai doan mo bat
                case cc.XXState.OPEN_PLATE:
                    if (this.currentState !== state) {
                        this.nodeBatNan.active = false;
                        this.nodeDia.active = false;
                        this.nodeBatNan.position = this.batNanPos;

                        this.animationBat.node.active = true;
                        this.animationBat.clearTracks();
                        this.animationBat.setToSetupPose();
                        this.animationBat.setAnimation(5, "Waiting", false);

                        this.nodeResult.active = false;
                        this.nodeViParent.active = false;
                        this.nodeFxResult.active = false;
                        //chay animation
                        this.playFxResult(result, originResult, openNow);
                    }
                    break;

                //giai doan ket qua
                case cc.XXState.SHOW_RESULT: //15
                    if (this.currentState !== state) {
                        // if (this.nodeBatNan.active) {
                        this.nodeBatNan.active = false;
                        //this.nodeDia.active = true;
                        this.nodeDia.active = false;
                        //this.nodeViParent.active = true;
                        this.nodeViParent.active = false;
                        this.animationBat.node.active = false;
                        // }
                        // //chay fx pay
                        this.playPayFx(players, result);
                    }
                    break;

                //giai doan cho phien moi
                case cc.XXState.WAITING:
                    if (this.currentState !== state) {
                        cc.XXController.getInstance().initGateChip();
                        // an bat Nan di
                        // this.nodeBatNan.active = false;
                        // this.nodeDia.active = false;
                        // this.nodeBatNan.position = this.batNanPos;

                        this.animationBat.node.active = true;
                        this.animationBat.clearTracks();
                        this.animationBat.setToSetupPose();
                        this.animationBat.setAnimation(5, "Waiting", false);

                        // An ket qua + fx
                        // this.nodeViParent.active = false;
                        // this.nodeResult.active = false;
                        this.nodeFxResult.active = false;
                    }
                    break;
                //xoc dia
                case cc.XXState.SHAKING:
                    //play animation xoc bat
                    if (this.currentState !== state) {
                        this.playAudio(this.rollBowl);
                        this.playAudio(this.startGame[Math.floor(Math.random())]);
                        //An ket qua + fx
                        this.nodeResult.active = false;
                        this.nodeViParent.active = false;
                        this.nodeFxResult.active = false;

                        //an bat Nan di
                        this.nodeBatNan.active = false;
                        this.nodeDia.active = false;
                        this.nodeBatNan.position = this.batNanPos;

                        this.animationBat.node.active = true;
                        this.animationBat.clearTracks();
                        this.animationBat.setToSetupPose();
                        this.animationBat.setAnimation(6, "XocXoc", false);

                        this.animationDealer.clearTracks();
                        this.animationDealer.setToSetupPose();
                        this.animationDealer.setAnimation(2, "animation", false);
                    }
                    break;
            }

            //luu lai state hien tai
            this.currentState = state;
        },

        playFxResult: function (result, originResult, openNow) {
            console.log("playFxResult------");
            var self = this;

            this.nodeFxResult.active = true;
            this.nodeResult.active = true;
            //this.nodeViParent.active = true;
            this.nodeViParent.active = false;
            this.animResult.stop();
            // this.nodeChan.active = false;
            // this.nodeLe.active = false;

            this.nodeChan1.active = false;
            this.nodeChan2.active = false;
            this.nodeChan3.active = false;
            this.nodeLe1.active = false;
            this.nodeLe2.active = false;
            this.nodeLe3.active = false;

            var results = originResult.split(',');
            //duyet qua ket qua cua tung Vi
            var index = 0;
            results.forEach(function (result) {
                self.spriteVis[index].spriteFrame = self.sfVis[parseInt(result)];
                self.spriteVis[index].node.active = false;
                index++;
            });

            //dang o che do Nan
            if (cc.XXController.getInstance().getIsNan() && !openNow) {
                //bat bat Nan
                //this.nodeDia.active = true;
                this.nodeDia.active = false;
                //this.nodeBatNan.active = true;
                this.nodeBatNan.active = false;
                this.nodeBatNan.position = this.batNanPos;
                //tat cai bat animation
                this.animationBat.clearTracks();
                this.animationBat.setToSetupPose();
                this.animationBat.setAnimation(5, "Waiting", false);
                this.animationBat.node.active = false;

                setTimeout(function () {
                    self.nodeBatNan.active = false;
                }, 5000);

            } else {
                //tat bat Nan
                this.nodeBatNan.active = false;
                //this.nodeDia.active = true;
                this.nodeDia.active = false;
                //play animation mo bat
                this.animationBat.node.active = true;
                this.animationBat.clearTracks();
                this.animationBat.setToSetupPose();
                this.animationBat.setAnimation(5, "Waiting", false);

            }
        },

        playPayFx: function (players, result) {
            console.log("playPayFx++++");
            //lay ve danh sach cac player
            let gateChips = cc.XXController.getInstance().getGateChips();
            var self = this;
            let bigGate = parseInt(result.BigGate);
            let smallGate = parseInt(result.SmallGate);
            switch (bigGate) {
                case cc.XXGate.EVEN:
                    self.animResult.play('chan_blink');
                    break;
                case cc.XXGate.ODD:
                    self.animResult.play('le_blink');
                    break;
            }
            switch (smallGate) {
                case cc.XXGate.THREE_UP:
                    this.animationBat.node.active = true;
                    this.animationBat.clearTracks();
                    this.animationBat.setToSetupPose();
                    this.animationBat.setAnimation(2, "3 White 1 Red", false);

                    self.nodeLe1.active = true;
                    self.nodeLe2.active = true;
                    this.playAudio(this.sap3[0]);
                    break;
                case cc.XXGate.THREE_DOWN:
                    this.animationBat.node.active = true;
                    this.animationBat.clearTracks();
                    this.animationBat.setToSetupPose();
                    this.animationBat.setAnimation(1, "3 Red 1 White", false);

                    self.nodeLe1.active = true;
                    self.nodeLe3.active = true;
                    this.playAudio(this.sap1[Math.floor(Math.random())]);
                    break;
                case cc.XXGate.FOUR_DOWN:
                    this.animationBat.node.active = true;
                    this.animationBat.clearTracks();
                    this.animationBat.setToSetupPose();
                    this.animationBat.setAnimation(4, "4 White", false);

                    self.nodeChan1.active = true;
                    self.nodeChan3.active = true;
                    this.playAudio(this.ngua4[Math.floor(Math.random())]);
                    break;
                case cc.XXGate.FOUR_UP:
                    this.animationBat.node.active = true;
                    this.animationBat.clearTracks();
                    this.animationBat.setToSetupPose();
                    this.animationBat.setAnimation(3, "4 Red", false);

                    self.nodeChan1.active = true;
                    self.nodeChan2.active = true;
                    this.playAudio(this.sap4[Math.floor(Math.random())]);
                    break;
                default:
                    self.nodeChan1.active = true;
                    this.playAudio(this.sap2[Math.floor(Math.random())]);
                    this.animationBat.node.active = true;
                    this.animationBat.clearTracks();
                    this.animationBat.setToSetupPose();
                    this.animationBat.setAnimation(0, "2 Red 2 White", false);
            }

            //Loc danh sach cua thang
            let arrGateWin = [bigGate, smallGate];

            //Loc danh sach cua thua
            let arrGateLose = [];
            gateChips.map((gate, index) => {
                if (!arrGateWin.includes(index)) {
                    arrGateLose.push(index)
                }
            }, this);

            var totalLost = 0;
            //Hieu ung chip thua bay tu table -> dealer
            this.fxMoveChip(arrGateLose, cc.XX_FX.LOSE);


            var totalWin = 0;
            //Hieu ung chip thang bay tu dealer -> table

            setTimeout(function () {
                this.fxMoveChip(arrGateWin, cc.XX_FX.DEALER_PAY);
            }.bind(this), 1000);


            var total = 0;
            //Hieu ung chip thang bay tu table -> player
            setTimeout(function () {
                this.fxMoveChip(arrGateWin, cc.XX_FX.PAY);
            }.bind(this), 2000);

        },
        //Hieu ung bay chip
        fxMoveChip: function (arrGate, typeFx) {
            try {
                let gateChips = cc.XXController.getInstance().getGateChips();
                arrGate.map(gateIndex => {
                    if (gateChips[gateIndex] && gateChips[gateIndex].length) {
                        gateChips[gateIndex].forEach(function (chip) {
                            switch (typeFx) {
                                case cc.XX_FX.LOSE:
                                    cc.XXController.getInstance().playFxLost(chip);
                                    break;
                                case cc.XX_FX.DEALER_PAY:
                                    cc.XXController.getInstance().playFxDealerPay(chip);
                                    break;
                                case cc.XX_FX.PAY:
                                    cc.XXController.getInstance().playFxPay(chip);
                                    break;
                            }
                        })
                    }
                });
            } catch (e) {

            }

        },

        playAudio: function (audioPlay) {
            if (this.sound) cc.audioEngine.play(audioPlay, false, 1);
        }
    });



}).call(this);
