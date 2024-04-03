/**
 * Created by Nofear on 3/26/2019.
 */
var gameMessage = require('GameMessage');

(function () {
    cc.CBX2GameView = cc.Class({
        "extends": cc.Component,
        properties: {
            lbiLastWin: cc.LabelIncrement,
            lbiX2: cc.LabelIncrement,

            btnClose: cc.Button,
            btnContinue: cc.Button,

            btnPicks: [cc.Button],

            sfResultPicked: cc.SpriteFrame,
            sfResultMiss: cc.SpriteFrame,
        },

        onLoad: function () {
            cc.X2GameController.getInstance().setX2GameView(this);
            this.animationResults = [];
            this.spriteResults = [];
            this.nodeResults = [];
            this.nodeX2s = [];

            var self = this;
            this.btnPicks.forEach(function (btnPick) {
                var nodeResult = btnPick.node.getChildByName('result');
                var nodeX2 = nodeResult.getChildByName('x2');
                self.nodeX2s.push(nodeX2);
                self.nodeResults.push(nodeResult);
                self.spriteResults.push(nodeResult.getComponent(cc.Sprite));
                self.animationResults.push(nodeResult.getComponent(cc.Animation));
            });
        },

        //gọi sau khi tao ra -> de set so tien last win mang ra choi x2
        onEnable: function () {
            var baseValue = cc.X2GameController.getInstance().getBaseValue();
            var x2GameData = cc.X2GameController.getInstance().getX2GameData();

            //Kiem tra xem dang o buoc nao
            this.currentStep = x2GameData.Step;

            this.lbiLastWin.tweenValueto(baseValue);
            this.lbiX2.tweenValueto(baseValue * 2);
            //Bat nut dung
            this.btnClose.interactable = true;
            //Cap nhat so du ban dau
            cc.BalanceController.getInstance().updateBalance(cc.BalanceController.getInstance().getBalance());

            this.resetUI();
        },

        resetUI: function () {
            //tat het ket qua
            this.nodeX2s.forEach(function (node) {
                node.active = false;
            });
            this.nodeResults.forEach(function (node) {
                node.active = false;
            });

            //Cho pick tiep
            this.btnPicks.forEach(function (btnPick) {
                btnPick.interactable = true;
            });

            //Tat nut choi tiep
            this.btnContinue.interactable = false;
        },

        //ket qua khi co se tra ve day
        onResultX2Game: function (data) {
            //Kiem tra co phai truong hop bam Finish ko
            if (data.Step === 0) {
                this.checkData(data);
            }

            var self = this;
            self.currentStep = data.Step;

            //chay animation tien thang o vi tri pick
            this.nodeResults[self.pickID].active = true;
            this.animationResults[self.pickID].play('pickBonus');

            cc.AudioController.getInstance().playSound(cc.AudioTypes.OPEN_CARD);

            // neu thang thi show ket qua hieu ung thang
            if (data.RoundPrize > 0) {
                //Show hieu ung thang

                //Set anh gia tri thang cho vi tri Pick
                self.spriteResults[self.pickID].spriteFrame = this.sfResultPicked;

                //Cap nhat lai gia tri thang
                this.lbiLastWin.tweenValueto(data.RoundPrize);

                self.nodeX2s[self.pickID].active = true;
                // this.lbiResults[self.pickID].tweenValue(0, data.RoundPrize);

                self.checkData(data);

                cc.AudioController.getInstance().playSound(cc.AudioTypes.X2_WIN);
            } else {
                //Set anh gia tri thua cho vi tri Pick
                self.spriteResults[self.pickID].spriteFrame = this.sfResultMiss;

                //Cap nhat lai gia tri thang
                this.lbiLastWin.tweenValueto(0);

                self.checkData(data);
            }


        },

        checkData: function (data) {
            //Kiem tra xem phai lan cuoi -> ket thuc luon
            if (data.IsStop) {
                // neu thang thi show ket qua hieu ung thang
                if (data.RoundPrize > 0) {
                    //Show hieu ung thang

                    //Thang ca 4 lan
                    if (data.Step === 3) {
                        cc.PopupController.getInstance().showSlotsMessage(gameMessage.YOU_WIN_X2);

                        cc.director.getScheduler().schedule(function () {
                            cc.MainController.getInstance().destroyX2GameView();
                        }, this, 0, 0, 2, false);
                    } else {
                        //nguoi choi tu bam dung (Step = 0)
                        cc.MainController.getInstance().destroyX2GameView();
                    }
                } else {
                    this.lbiX2.tweenValueto(0);
                    cc.PopupController.getInstance().showSlotsMessage(gameMessage.YOU_LOSE_X2);

                    cc.director.getScheduler().schedule(function () {
                        cc.MainController.getInstance().destroyX2GameView();
                    }, this, 0, 0, 2, false);
                }
            } else {
                //set tiep gia tri x2
                this.lbiX2.tweenValueto(data.TotalPrize * 2);

                //bat lai 2 button
                this.btnClose.interactable = true;
                this.btnContinue.interactable = true;

            }
        },

        pickClicked: function (event, data) {
            cc.AudioController.getInstance().playSound(cc.AudioTypes.X2_CLICK);

            //luu lai ID vi tri Pick
            this.pickID = parseInt(data.toString());
            //ko cho bat cac nut
            this.btnClose.interactable = false;
            this.btnContinue.interactable = false;

            this.btnPicks.forEach(function (btnPick) {
                btnPick.interactable = false;
            });

            //call hub method
            cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.PLAY_X2_GAME);
        },

        closeClicked: function () {
            if (this.currentStep > 0) {
                cc.RoomController.getInstance().sendRequestOnHub(cc.MethodHubName.FINISH_X2_GAME);
            } else {
                cc.MainController.getInstance().destroyX2GameView();
            }
        },

        continueClicked: function () {
            this.resetUI();
        },
    });
}).call(this);