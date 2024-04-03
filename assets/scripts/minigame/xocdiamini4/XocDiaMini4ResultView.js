/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.XocDiaMini4ResultView = cc.Class({
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
			
			//MINI
			spriteVis_mini: [cc.Sprite],
			animBowl_mini: cc.Animation,
			
			nodeChan1_mini: cc.Node,
			nodeLe1_mini: cc.Node,
        },

        onLoad: function () {
            cc.XocDiaMini4Controller.getInstance().setXocDiaMini4ResultView(this);

            this.currentState = -1;
            this.nodeResult = this.animResult.node;
            this.nodeFxResult = this.nodeChan1.parent;

            //node parent Vi
            this.nodeViParent = this.spriteVis[0].node.parent;
			this.nodeViParent = this.spriteVis_mini[0].node.parent;

            //toa do cua bat Nan
            this.batNanPos = cc.v2(0, 43);
        },

        reset: function () {
        },

        updateResult: function (players, result, originResult, state, openNow) {
            if (players == "update_time" && result["Phrase"] == cc.XocDiaMini4State.BETTING) {
                if (result["Elapsed"] < 5) {
                    [
                        this.nodeChan1,
                        this.nodeChan2,
                        this.nodeChan2_2,
                        this.nodeChan3,
                        this.nodeLe1,
                        this.nodeLe2,
                        this.nodeLe3,
						
						this.nodeChan1_mini,
						this.nodeLe1_mini,
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
                case cc.XocDiaMini4State.BETTING: //54
                    if (this.currentState !== state) {



                        this.nodeBatNan.active = false;
                        this.nodeDia.active = false;
                        this.nodeBatNan.position = this.batNanPos;

                        this.animationBat.node.active = true;
                        this.animationBat.clearTracks();
                        this.animationBat.setToSetupPose();
                        this.animationBat.setAnimation(1, "Idle_2", true);
                        this.animBowl.play("idle", 0);
						this.animBowl_mini.play("idle", 0);

                        // this.nodeResult.active = false;
                        this.nodeViParent.active = false;
                        // this.nodeFxResult.active = false;
                    }

                    break;
                //giai doan mo bat
                case cc.XocDiaMini4State.OPEN_PLATE:
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
						this.animBowl_mini.play("idle", 0);

                        this.nodeResult.active = false;
                        this.nodeViParent.active = false;
                        this.nodeFxResult.active = false;

                        //chay animation
                        this.playFxResult(result, originResult, openNow);
                    }
                    break;

                //giai doan ket qua
                case cc.XocDiaMini4State.SHOW_RESULT: //15
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
                case cc.XocDiaMini4State.WAITING:
                    if (this.currentState !== state) {
                        cc.XocDiaMini4Controller.getInstance().initGateChip();

                        cc.AudioController.getInstance().playSound(cc.AudioTypes.BOWL_CLOSE);

                        [
                            this.nodeChan1,
                            this.nodeChan2,
                            this.nodeChan2_2,
                            this.nodeChan3,
                            this.nodeLe1,
                            this.nodeLe2,
                            this.nodeLe3,
							this.nodeChan1_mini,
							this.nodeLe1_mini,
                        ].forEach(e => {
                            if (e.active) {
                                e.getComponent(cc.Sprite).active = true;
                                e.getComponentInChildren(cc.Animation).node.active = false;
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
                case cc.XocDiaMini4State.SHAKING:
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
						this.animBowl_mini.play("shake", 0);
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
			
			this.nodeChan1_mini.active = false;
			this.nodeLe1_mini.active = false;


            var results = originResult.split(',');
            //duyet qua ket qua cua tung Vi
            var index = 0;
            results.forEach(function (result) {
                self.spriteVis[index].spriteFrame = self.sfVis[parseInt(result)];
				self.spriteVis_mini[index].spriteFrame = self.sfVis[parseInt(result)];
                self.spriteVis_md5[index].spriteFrame = self.sfVis_md5[parseInt(result)];
                index++;
            });

            //dang o che do Nan
            if (cc.XocDiaMini4Controller.getInstance().getIsNan() && !openNow) {
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
				this.animBowl_mini.play("open", 0);

            }
        },

        playPayFx: function (players, result) {
            //lay ve danh sach cac player
            let gateChips = cc.XocDiaMini4Controller.getInstance().getGateChips();
            var self = this;
            let bigGate = parseInt(result.BigGate);
            let smallGate = parseInt(result.SmallGate);
            switch (bigGate) {
                case cc.XocDiaMini4Gate.EVEN:
                    // self.animResult.play('chan_blink');
                    break;
                case cc.XocDiaMini4Gate.ODD:
                    // self.animResult.play('le_blink');
                    break;
            }
            switch (smallGate) {
                case cc.XocDiaMini4Gate.THREE_UP:
                    self.nodeLe1.active = true;
					self.nodeLe1_mini.active = true;
                    self.nodeLe2.active = true;
                    break;
                case cc.XocDiaMini4Gate.THREE_DOWN:
                    self.nodeLe1.active = true;
					self.nodeLe1_mini.active = true;
                    self.nodeLe3.active = true;
                    break;
                case cc.XocDiaMini4Gate.FOUR_DOWN:
                    self.nodeChan1.active = true;
					self.nodeChan1_mini.active = true;
                    self.nodeChan3.active = true;
                    break;
                case cc.XocDiaMini4Gate.FOUR_UP:
                    self.nodeChan1.active = true;
					self.nodeChan1_mini.active = true;
                    self.nodeChan2.active = true;
                    break;
                case cc.XocDiaMini4Gate.TWO:
                    self.nodeChan1.active = true;
					self.nodeChan1_mini.active = true;
                    self.nodeChan2_2.active = true;
                    break;
                default:
                    self.nodeChan1.active = true;
					self.nodeChan1_mini.active = true;
            }

            [
                this.nodeChan1,
                this.nodeChan2,
                this.nodeChan2_2,
                this.nodeChan3,
                this.nodeLe1,
                this.nodeLe2,
                this.nodeLe3,
				this.nodeChan1_mini,
				this.nodeLe1_mini,
            ].forEach(e => {
                if (e.active) {
                    e.getComponent(cc.Sprite).active = false;
                    e.getComponentInChildren(cc.Animation).node.active = true;
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

            /* var totalLost = 0;
            //Hieu ung chip thua bay tu table -> dealer
            this.fxMoveChip(arrGateLose, cc.XocDiaMini4_FX.LOSE);


            var totalWin = 0;
            //Hieu ung chip thang bay tu dealer -> table

            setTimeout(function () {
                this.fxMoveChip(arrGateWin, cc.XocDiaMini4_FX.DEALER_PAY);
            }.bind(this), 1000);


            var total = 0;
            //Hieu ung chip thang bay tu table -> player
            setTimeout(function () {
                this.fxMoveChip(arrGateWin, cc.XocDiaMini4_FX.PAY);
            }.bind(this), 2000); */

        },
        //Hieu ung bay chip
        fxMoveChip: function (arrGate, typeFx) {
            try {
                let gateChips = cc.XocDiaMini4Controller.getInstance().getGateChips();
                arrGate.map(gateIndex => {
                    if (gateChips[gateIndex] && gateChips[gateIndex].length) {
                        gateChips[gateIndex].forEach(function (chip) {
                            switch (typeFx) {
                                case cc.XocDiaMini4_FX.LOSE:
                                    cc.XocDiaMini4Controller.getInstance().playFxLost(chip);
                                    break;
                                case cc.XocDiaMini4_FX.DEALER_PAY:
                                    cc.XocDiaMini4Controller.getInstance().playFxDealerPay(chip);
                                    break;
                                case cc.XocDiaMini4_FX.PAY:
                                    cc.XocDiaMini4Controller.getInstance().playFxPay(chip);
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
