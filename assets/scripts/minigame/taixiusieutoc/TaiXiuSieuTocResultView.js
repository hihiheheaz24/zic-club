/**
 * Ket qua, effect ket qua,
 */

var taiXiuSieuTocConfig = require('TaiXiuSieuTocConfig');

(function () {
    cc.TaiXiuSieuTocResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            //node ket qua
            nodeResult: cc.Node,
            //node 3 dice ket qua
            nodeResultDice: cc.Node,

            //bat de nan
            nodeBowl: cc.Node,
			nodeDia: cc.Node,

            //animation Dice
            animationDice: cc.Animation,
			//diceAnimationSpine: cc.Node,
            //sprite 3 dice
            spriteDice1: sp.Skeleton,
            spriteDice2: sp.Skeleton,
            spriteDice3: sp.Skeleton,

            skeDice1: sp.Skeleton,
            skeDice2: sp.Skeleton,
            skeDice3: sp.Skeleton,
            //label tong diem cua 3 dice
            nodeBgTotalDice: cc.Node,
            lbTotalDice: cc.Label,
			lbSieuTocHash: cc.Label,
			lbResult: cc.Label,
			nodeSieuTocResult: cc.Node,
			lblTextNotiNewGame: cc.Label,

            //node effect bat len khi win
            nodeTaiWins: cc.Node,
            nodeXiuWins: cc.Node,

            //node Tai/Xiu tat di khi chay fx
            nodeTai: cc.Node,
            nodeXiu: cc.Node,
			btnCopyHash: cc.Node,
			btnCopyResult: cc.Node,
            nodeDiceAnim: {
                default: null,
                type: cc.Node
             },
			xnEffect: sp.Skeleton,
            rollDice:cc.AudioSource,
			winSound:cc.AudioSource
        },

        onLoad: function () {
            //setView
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocResultView(this);
            this.rootPasBowl = this.nodeBowl.position; //save lai vi tri goc
			this.rootPasDia = this.nodeDia.position; //save lai vi tri goc
            //this.animXocBat = this.nodeDiceAnim.getComponent(sp.Skeleton);
			this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
            this.reset();
        },

        onDestroy: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocResultView(null);
        },

        reset: function () {
            this.currentState = 999;
            this.resetUI();
        },

        resetUI: function () {
            // this.spriteDice1.clearTracks();
            // this.spriteDice1.setToSetupPose();

            // this.spriteDice2.clearTracks();
            // this.spriteDice2.setToSetupPose();

            // this.spriteDice3.clearTracks();
            // this.spriteDice3.setToSetupPose();

            this.skeDice1.clearTracks();
            this.skeDice1.setToSetupPose();

            this.skeDice2.clearTracks();
            this.skeDice2.setToSetupPose();

            this.skeDice3.clearTracks();
            this.skeDice3.setToSetupPose();
            //dang play anim dice?
            this.animationOpenPlaying = false;
            // this.animationDice.stop();
            // this.animationDice.node.active = false;
            this.nodeResult.active = false;
            this.nodeResultDice.active = false;
            //this.nodeDiceAnim.active = false;
            this.nodeBgTotalDice.active = false;
            this.lbTotalDice.node.active = false;

            //reset lai vi tri bowl
            this.nodeBowl.position = this.rootPasBowl;
			this.nodeDia.position = this.rootPasDia;
            this.nodeTaiWins.active = false;
            this.nodeXiuWins.active = false;
            this.nodeTai.active = true;
            this.nodeXiu.active = true;
        },

        getIsBowl: function () {
            return this.nodeBowl.active;
        },
		
        getIsDia: function () {
            return this.nodeDia.active;
        },

        updateResult: function (sieutocsessionInfo) {
                     
            if (sieutocsessionInfo.CurrentState !== this.currentState) {              
                //check state de xu ly hien thi
                switch (sieutocsessionInfo.CurrentState) {
                    case cc.TaiXiuSieuTocState.BETTING: //54
						if (sieutocsessionInfo.Ellapsed <= 20) {
							this.nodeDia.active = true;
							//this.lbSieuTocHash.node.active = true;
						}
						//this.nodeSieuTocResult.active = false;
						//this.lbResult.node.active = false;						
						//this.lbSieuTocHash.string = sieutocsessionInfo.SieuTocEncript;
                        //reset lai UI
                        this.resetUI();
                        break;
                    case cc.TaiXiuSieuTocState.END_BETTING:
                        //Ko cho dat cuoc nua
						this.animationMess.play('openMessage');
						this.lblTextNotiNewGame.string = 'Dừng cược';
						this.animationMess.play('closeMessage');
                        //reset lai UI
                        this.resetUI();
                        break;
                    case cc.TaiXiuSieuTocState.RESULT: //15						
						this.playAnimationAndSetResult(sieutocsessionInfo);
						//this.nodeSieuTocResult.active = true;
						//this.lbResult.node.active = true;
						//this.lbResult.string = sieutocsessionInfo.Md5Decript;
                        break;
                    case cc.TaiXiuSieuTocState.PREPARE_NEW_SESSION:						
                        //neu dang hien thi bat de nan -> tat bat di + play fx
                        if (this.nodeBowl.active) {                           
                            this.nodeBowl.active = false;
                            this.startEffectResult();                         
                            //hien effect
                        } else {
                            this.setResult(sieutocsessionInfo);
                        }
                        break;
                }
            }
            this.currentState = sieutocsessionInfo.CurrentState;
        },

        openEndDiaNan: function(){
            if (this.nodeBowl.active) {         
                this.nodeBowl.active = false;
                this.startEffectResult();
            }
        },

        playAnimation: function (sieutocsessionInfo) {
            this.schedule(function() {
                // Here this refers to component
                this.diceAnimFinish();
            }, 0, 0, 1.0);
			this.rollDice.play();
            //set ket qua vao sprite Dice
			this.xnEffect.setAnimation(0,'effect',false);
            //anim mới		
            // this.spriteDice1.setAnimation(6, "xi ngau bay 1", false);
            // this.spriteDice2.setAnimation(6, "xi ngau bay 1", false);
            // this.spriteDice3.setAnimation(6, "xi ngau bay 1", false);
            //Bat node Dice Anim
            //this.animationDice.node.active = true;
            //danh dau la dang play
            this.animationOpenPlaying = true;
			this.nodeResultDice.active = false;
        },		

        playAnimationAndSetResult: function (sieutocsessionInfo) {
            this.schedule(function() {
                // Here this refers to component
            this.playAnimFinish();
            }, 0, 0, 0.3);
			this.totalDice = sieutocsessionInfo.Result.Dice1 +  sieutocsessionInfo.Result.Dice2 + sieutocsessionInfo.Result.Dice3;
            this.skeDice1.setAnimation(sieutocsessionInfo.Result.Dice1 - 1, (sieutocsessionInfo.Result.Dice1).toString(), false);
            this.skeDice2.setAnimation(sieutocsessionInfo.Result.Dice2 - 1, (sieutocsessionInfo.Result.Dice2).toString(), false);
            this.skeDice3.setAnimation(sieutocsessionInfo.Result.Dice3 - 1, (sieutocsessionInfo.Result.Dice3).toString(), false);			
			//this.nodeResult.active = true;
            //Tat node Dice Ket qua (3 Dice)
            this.nodeResultDice.active = false;
			//this.nodeDiceAnim.active = false;
			this.animationOpenPlaying = true;
        },

        //chi bat ket qua xuc xac (che do Nan)
        setResultDice: function (sieutocsessionInfo) {
            //set ket qua vao sprite Dice
			this.xnEffect.setAnimation(0,'effect',false)
            this.skeDice1.setAnimation(sieutocsessionInfo.Result.Dice1 - 1, (sieutocsessionInfo.Result.Dice1).toString(), false);
            this.skeDice2.setAnimation(sieutocsessionInfo.Result.Dice2 - 1, (sieutocsessionInfo.Result.Dice2).toString(), false);
            this.skeDice3.setAnimation(sieutocsessionInfo.Result.Dice3 - 1, (sieutocsessionInfo.Result.Dice3).toString(), false);
			this.nodeResultDice.active = true;
			this.nodeResult.active = true;
        },

        //goi set ket qua luon (ko chay animation dice)
        setResult: function (sieutocsessionInfo) {
           
            //neu dang play animation dice thi return luon. Ket qua se tu hien sau khi anim ket thuc
            if (this.animationOpenPlaying) return;
            //hien luon ket qua
            this.totalDice = sieutocsessionInfo.Result.Dice1 +  sieutocsessionInfo.Result.Dice2 + sieutocsessionInfo.Result.Dice3;
            //set thong so diem cua Dice
            this.lbTotalDice.string  = this.totalDice;
            //set ket qua vao sprite Dice
            this.skeDice1.setAnimation(sieutocsessionInfo.Result.Dice1 - 1, (sieutocsessionInfo.Result.Dice1).toString(), false);
            this.skeDice2.setAnimation(sieutocsessionInfo.Result.Dice2 - 1, (sieutocsessionInfo.Result.Dice2).toString(), false);
            this.skeDice3.setAnimation(sieutocsessionInfo.Result.Dice3 - 1, (sieutocsessionInfo.Result.Dice3).toString(), false);
			this.nodeResult.active = true;
            //Bat node Dice Ket qua (3 Dice)
            this.nodeResultDice.active = true;
			//this.nodeDiceAnim.active = false;
            //effect           
            this.startEffectResult();            
        },

        startEffectResult: function () {
			this.winSound.play();
			//this.nodeDiceAnim.active = false;
			//this.nodeSieuTocResult.active = true;
			//this.lbResult.node.active = true;
			//this.lbSieuTocHash.node.active = false;
			//this.btnCopyHash.active = false;
			//this.btnCopyResult.active = true;
            //Kiem tra xem ban nao thang
            if (this.totalDice > 10) {
                //TAI
                   this.nodeTaiWins.active = true;
            } else if (this.totalDice > 2 && this.totalDice <= 10) {
                //XIU
                   this.nodeXiuWins.active = true;
            }
        },

        playAnimFinish: function () {
            if (this.nodeBowl.active) {         
				//this.nodeDiceAnim.active = false;
            }
            //dang mo bat de nan -> ko chay animation thang
            if (cc.TaiXiuSieuTocController.getInstance().getIsNan()) {
				this.nodeBowl.active = true;
				this.nodeDia.active = false;
				this.animationMess.play('openMessage');
				this.lblTextNotiNewGame.string = 'Xin mời nặn';
				this.animationMess.play('closeMessage');
				//this.lbResult.node.active = false;
				//this.nodeSieuTocResult.active = false;
				this.btnCopyResult.active = false;				                   
                //tat node Dice Anim
                //this.animationDice.node.active = false;
                //Bat node Dice Ket qua (3 Dice)
                this.nodeResultDice.active = true;
            } else {				
                //tat node Dice Anim
                //this.animationDice.node.active = false;
                //Bat node Dice Ket qua (3 Dice)
                this.nodeResultDice.active = true;
                //Bat node ket qua tong
                this.nodeBgTotalDice.active = false;
                this.lbTotalDice.node.active = false;
                //effect
				if (this.nodeDia.active){
					this.nodeDia.position = cc.v2(-189,339);
					setTimeout(() => {
						this.nodeDia.active = false;
						this.startEffectResult();
					}, 300);
				}
            }
        },
		
        //sau khi play xong animation Dice
        diceAnimFinish: function () {
			//this.btnCopyHash.active = true;
			//this.btnCopyResult.active = false;
			this.nodeDia.active = true;
			this.animationMess.play('openMessage');
            this.lblTextNotiNewGame.string = 'Mời đặt cược';
			this.animationMess.play('closeMessage');					
			//this.animationDice.node.active = false;
			this.nodeResultDice.active = false;
			//this.nodeSieuTocResult.active = false;
			//this.lbSieuTocHash.node.active = true;
			//this.lbResult.node.active = false;			
			
        },
        copyHashClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.lbSieuTocHash.string)
			this.animationMess.play('openMessage');
            this.lblTextNotiNewGame.string = 'Copy chuỗi MD5 thành công';
			this.animationMess.play('closeMessage');
        },
		
        copyResultClicked: function () {
            //cc.Tool.getInstance().copyToClipboard(this.lbResult.string)
			this.animationMess.play('openMessage');
            this.lblTextNotiNewGame.string = 'Copy chuỗi kết quả thành công';
			this.animationMess.play('closeMessage');
        },
    });
}).call(this);
