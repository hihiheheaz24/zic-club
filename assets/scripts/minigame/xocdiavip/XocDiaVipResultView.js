/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.XocDiaVipResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBatNan: cc.Node,
            nodeDia: cc.Node,
            animationBat: sp.Skeleton,

            spriteVis: [cc.Sprite],
            spriteVis_md5: [cc.Sprite],

            sfVis: [cc.SpriteFrame],
            sfVis_md5: [cc.SpriteFrame],

            animResult: cc.Animation,
            nodeChan: cc.Node,
            nodeLe: cc.Node,

            nodeChan1: cc.Node,
            nodeChan2: cc.Node,
            nodeChan2_2: cc.Node,
            nodeChan3: cc.Node,

            nodeLe1: cc.Node,
            nodeLe2: cc.Node,
            nodeLe3: cc.Node,


            animBowl: cc.Animation,
        },

        onLoad: function () {
            cc.XocDiaVipController.getInstance().setXocDiaVipResultView(this);

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
            if (players == "update_time" && result["Phrase"] == cc.XocDiaVipState.BETTING) {
                if (result["Elapsed"] < 5) {
                    [
                        this.nodeChan1,
                        this.nodeChan2,
                        this.nodeChan2_2,
                        this.nodeChan3,
                        this.nodeLe1,
                        this.nodeLe2,
                        this.nodeLe3,
                    ].forEach(e => {
                        e.active = false;
                    });
                }
                //console.log(result);
                return;
            }
            if (!this.nodeBatNan) return;

            //check state de xu ly hien thi
            switch (state) {
                //giai doan dat cuoc
                case cc.XocDiaVipState.BETTING: //54
                    if (this.currentState !== state) {



                        this.nodeBatNan.active = false;
                        this.nodeDia.active = false;
                        this.nodeBatNan.position = this.batNanPos;

                        this.animationBat.node.active = true;
                        this.animationBat.clearTracks();
                        this.animationBat.setToSetupPose();
                        this.animationBat.setAnimation(1, "Idle_2", true);
                        this.animBowl.play("idle", 0);

                        // this.nodeResult.active = false;
                        this.nodeViParent.active = false;
                        // this.nodeFxResult.active = false;
                    }

                    break;
                //giai doan mo bat
                case cc.XocDiaVipState.OPEN_PLATE:
                    if (this.currentState !== state) {

                        cc.AudioController.getInstance().playSound(cc.AudioTypes.BOWL_OPEN);

                        this.nodeBatNan.active = false;
                        this.nodeDia.active = false;
                        this.nodeBatNan.position = this.batNanPos;

                        this.animationBat.node.active = true;
                        this.animationBat.clearTracks();
                        this.animationBat.setToSetupPose();
                        this.animationBat.setAnimation(1, "Idle_2", true);
                        this.animBowl.play("idle", 0);

                        this.nodeResult.active = false;
                        this.nodeViParent.active = false;
                        this.nodeFxResult.active = false;

                        //chay animation
                        this.playFxResult(result, originResult, openNow);
                    }
                    break;

                //giai doan ket qua
                case cc.XocDiaVipState.SHOW_RESULT: //15
                    if (this.currentState !== state) {
                        // if (this.nodeBatNan.active) {
                        this.nodeBatNan.active = false;
                        this.nodeDia.active = true;
                        this.nodeViParent.active = true;
                        this.animationBat.node.active = false;
                        // }
                        // //chay fx pay
                        this.playPayFx(players, result);
                    }
                    break;

                //giai doan cho phien moi
                case cc.XocDiaVipState.WAITING:
                    if (this.currentState !== state) {
                        cc.XocDiaVipController.getInstance().initGateChip();

                        cc.AudioController.getInstance().playSound(cc.AudioTypes.BOWL_CLOSE);

                        [
                            this.nodeChan1,
                            this.nodeChan2,
                            this.nodeChan2_2,
                            this.nodeChan3,
                            this.nodeLe1,
                            this.nodeLe2,
                            this.nodeLe3,
                        ].forEach(e => {
                            if (e.active) {
                                e.getComponent(cc.Sprite).active = true;
                                e.getComponentInChildren(sp.Skeleton).node.active = false;
                            }
                        });


                        // an bat Nan di
                        // this.nodeBatNan.active = false;
                        // this.nodeDia.active = false;
                        // this.nodeBatNan.position = this.batNanPos;

                        // this.animationBat.node.active = true;
                        // this.animationBat.clearTracks();
                        // this.animationBat.setToSetupPose();
                        // this.animationBat.setAnimation(1, "Idle_2", true);

                        // An ket qua + fx
                        // this.nodeViParent.active = false;
                        // this.nodeResult.active = false;
                        // this.nodeFxResult.active = false;
                    }
                    break;
                //xoc dia
                case cc.XocDiaVipState.SHAKING:
                    //play animation xoc bat
                    if (this.currentState !== state) {


                        cc.AudioController.getInstance().playSound(cc.AudioTypes.BOWL_SHAKE);
                        //An ket qua + fx
                        // this.nodeResult.active = false;
                        this.nodeViParent.active = false;
                        // this.nodeFxResult.active = false;

                        //an bat Nan di
                        this.nodeBatNan.active = false;
                        this.nodeDia.active = false;
                        this.nodeBatNan.position = this.batNanPos;

                        this.animationBat.node.active = true;
                        this.animationBat.clearTracks();
                        this.animationBat.setToSetupPose();
                        this.animationBat.setAnimation(2, "lac", false);
                        this.animBowl.play("shake", 0);
                    }
                    break;
            }

            //luu lai state hien tai
            this.currentState = state;
        },

        playFxResult: function (result, originResult, openNow) {

            var self = this;

            this.nodeFxResult.active = true;
            this.nodeResult.active = true;
            this.nodeViParent.active = true;
            this.animResult.stop();
            // this.nodeChan.active = false;
            // this.nodeLe.active = false;

            this.nodeChan1.active = false;
            this.nodeChan2.active = false;
            this.nodeChan2_2.active = false;
            this.nodeChan3.active = false;
            this.nodeLe1.active = false;
            this.nodeLe2.active = false;
            this.nodeLe3.active = false;


            var results = originResult.split(',');
            //duyet qua ket qua cua tung Vi
            var index = 0;
            results.forEach(function (result) {
                self.spriteVis[index].spriteFrame = self.sfVis[parseInt(result)];
                self.spriteVis_md5[index].spriteFrame = self.sfVis_md5[parseInt(result)];
                index++;
            });

            //dang o che do Nan
            if (cc.XocDiaVipController.getInstance().getIsNan() && !openNow) {
                //bat bat Nan
                this.nodeDia.active = true;
                this.nodeBatNan.active = true;
                this.nodeBatNan.position = this.batNanPos;
                //tat cai bat animation
                // this.animationBat.clearTracks();
                // this.animationBat.setToSetupPose();
                // this.animationBat.setAnimation(0, "IdleDia", false);
                this.animationBat.node.active = false;

                setTimeout(function () {
                    self.nodeBatNan.active = false;
                }, 5000);

            } else {
                //tat bat Nan
                this.nodeBatNan.active = false;
                this.nodeDia.active = true;
                //play animation mo bat
                this.animationBat.node.active = true;
                this.animationBat.clearTracks();
                this.animationBat.setToSetupPose();
                this.animationBat.setAnimation(3, "mo", false);
                this.animBowl.play("open", 0);

            }
        },

        playPayFx: function (players, result) {
            //lay ve danh sach cac player
            let gateChips = cc.XocDiaVipController.getInstance().getGateChips();
            var self = this;
            let bigGate = parseInt(result.BigGate);
            let smallGate = parseInt(result.SmallGate);
            switch (bigGate) {
                case cc.XocDiaVipGate.EVEN:
                    // self.animResult.play('chan_blink');
                    break;
                case cc.XocDiaVipGate.ODD:
                    // self.animResult.play('le_blink');
                    break;
            }
            switch (smallGate) {
                case cc.XocDiaVipGate.THREE_UP:
                    self.nodeLe1.active = true;
                    self.nodeLe2.active = true;
                    break;
                case cc.XocDiaVipGate.THREE_DOWN:
                    self.nodeLe1.active = true;
                    self.nodeLe3.active = true;
                    break;
                case cc.XocDiaVipGate.FOUR_DOWN:
                    self.nodeChan1.active = true;
                    self.nodeChan3.active = true;
                    break;
                case cc.XocDiaVipGate.FOUR_UP:
                    self.nodeChan1.active = true;
                    self.nodeChan2.active = true;
                    break;
                case cc.XocDiaVipGate.TWO:
                    self.nodeChan1.active = true;
                    self.nodeChan2_2.active = true;
                    break;
                default:
                    self.nodeChan1.active = true;
            }

            [
                this.nodeChan1,
                this.nodeChan2,
                this.nodeChan2_2,
                this.nodeChan3,
                this.nodeLe1,
                this.nodeLe2,
                this.nodeLe3,
            ].forEach(e => {
                if (e.active) {
                    e.getComponent(cc.Sprite).active = false;
                    e.getComponentInChildren(sp.Skeleton).node.active = true;
                }
            });

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
            this.fxMoveChip(arrGateLose, cc.XocDiaVip_FX.LOSE);


            var totalWin = 0;
            //Hieu ung chip thang bay tu dealer -> table

            setTimeout(function () {
                this.fxMoveChip(arrGateWin, cc.XocDiaVip_FX.DEALER_PAY);
            }.bind(this), 1000);


            var total = 0;
            //Hieu ung chip thang bay tu table -> player
            setTimeout(function () {
                this.fxMoveChip(arrGateWin, cc.XocDiaVip_FX.PAY);
            }.bind(this), 2000);

        },
        //Hieu ung bay chip
        fxMoveChip: function (arrGate, typeFx) {
            try {
                let gateChips = cc.XocDiaVipController.getInstance().getGateChips();
                arrGate.map(gateIndex => {
                    if (gateChips[gateIndex] && gateChips[gateIndex].length) {
                        gateChips[gateIndex].forEach(function (chip) {
                            switch (typeFx) {
                                case cc.XocDiaVip_FX.LOSE:
                                    cc.XocDiaVipController.getInstance().playFxLost(chip);
                                    break;
                                case cc.XocDiaVip_FX.DEALER_PAY:
                                    cc.XocDiaVipController.getInstance().playFxDealerPay(chip);
                                    break;
                                case cc.XocDiaVip_FX.PAY:
                                    cc.XocDiaVipController.getInstance().playFxPay(chip);
                                    break;
                            }
                        })
                    }
                });
            } catch (e) {

            }

        },
    });

}).call(this);
