/**
 * Ket qua, effect ket qua,
 */


var taiXiuMd5Config = require('TaiXiuMd5Config');

(function () {
    cc.TaiXiumd5ResultView = cc.Class({
        "extends": cc.Component,
        properties: {
            //node ket qua
            //nodeResult: cc.Node,
            //node 3 dice ket qua
           // nodeResultDice: cc.Node,

            //bat de nan
            nodeBowl: cc.Node,
			nodebaton: cc.Node,
            // md5 key hash
			md5key: cc.Label,
			md5hash: cc.Label,
			nodeketqua: cc.Node,
            //animation Dice
            nodeBGTimer: cc.Node,
			 //animationDice: cc.Animation,
			xnAnimation:{
			default: [],
			type:    sp.Skeleton,
		    },   
			Showketqua: cc.Node,
		    //xnEffect:sp.Skeleton,

            //label tong diem cua 3 dice
           // nodeBgTotalDice: cc.Node,
            lbTotalDice: cc.Label,
			//amthanhmodia: cc.AudioSource,
            lblTextNotiNewGame: cc.Label,
            //node effect bat len khi win
            nodeTaiWins: [cc.Node],
            nodeXiuWins: [cc.Node],
            winSound: cc.AudioSource,
            //node Tai/Xiu tat di khi chay fx
            nodeTai: cc.Node,
            nodeXiu: cc.Node,
            
        },

        onLoad: function () {
            //setView
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5ResultView(this);
            this.rootPasBowl = this.nodeBowl.position; //save lai vi tri goc
            this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
           this.animation = this.node.getComponent(cc.Animation);

            this.reset();
        },

        onDestroy: function () {
            cc.TaiXiuMd5Controller.getInstance().setTaiXiuMd5ResultView(null);
        },

        reset: function () {
            this.currentState = 999;
            this.resetUI();
        },

        resetUI: function () {
            this.nodeBowl.active = false;
			this.nodeBGTimer.active = false;
			this.md5hash.node.active = false;
			this.nodeketqua.active = false;
            this.lbTotalDice.node.active = false;
            this.nodeBowl.position = this.rootPasBowl;
            this.nodeTaiWins.forEach(function (nodeTaiWin) {
                nodeTaiWin.active = false;
            });
            this.nodeXiuWins.forEach(function (nodeXiuWin) {
                nodeXiuWin.active = false;
            });
            this.nodeTai.active = true;
            this.nodeXiu.active = true;
        },

        getIsBowl: function () {
            return this.nodeBowl.active;
        },

        updateResult: function (md5sessionInfo) {
            if (md5sessionInfo.CurrentState !== this.currentState) {
                //check state de xu ly hien thi
                switch (md5sessionInfo.CurrentState) {
                    case cc.TaiXiuState.BETTING: //54
                        //reset lai UI
                        //this.diceAnimStart();
                        this.scheduleOnce(() => {
                            this.resetUI();
                            this.md5key.node.active = true;
                            this.setStringEffect(md5sessionInfo.Md5Encript,this.md5key)
                        }, 3);
                        // console.log("cc.TaiXiuState.BETTING");
                        // this.node.runAction(
                        //     cc.sequence(
                        //         cc.delayTime(3),
                        //         cc.callFunc(function () {
                        //             console.log("cc.TaiXiuState.BETTING delayTime");
                        //             this.resetUI();
                        //             this.md5key.node.active = true;
                        //             this.setStringEffect(md5sessionInfo.Md5Encript,this.md5key)
                        //         }.bind(this)
                        //     )
                        // ));
                        break;
                    case cc.TaiXiuState.END_BETTING:
					    this.animationMess.play('openMessage');
						this.lblTextNotiNewGame.string = 'Dừng cược';
                        //Ko cho dat cuoc nua
                        //reset lai UI
                        this.resetUI();
                        break;
                    case cc.TaiXiuState.RESULT: //15
					//console.log('test time');
					    this.nodebaton.active = false;
					    this.md5key.node.active = false;
						//this.md5hash.string = md5sessionInfo.Md5Decript;
                        this.setStringEffect(md5sessionInfo.Md5Decript,this.md5hash)
						this.nodeketqua.active = true;
                        this.playAnimationAndSetResult(md5sessionInfo);
                        
                        break;
                    case cc.TaiXiuState.PREPARE_NEW_SESSION:
					    this.md5key.node.active = false; 
                        //neu dang hien thi bat de nan -> tat bat di + play fx
                        if (this.nodeBowl.active) {
							//this.amthanhmodia.play();
                            this.nodeBowl.active = false;
                            this.startEffectResult();
                            //hien effect
                        }
                        break;

                }
            }

            this.currentState = md5sessionInfo.CurrentState;
        },
		
        playAnimationAndSetResult: function (md5sessionInfo) {
            //tinh total Dice
            this.totalDice = md5sessionInfo.Result.Dice1 +  md5sessionInfo.Result.Dice2 + md5sessionInfo.Result.Dice3;

            //bat node Result
            //this.nodeResult.active = true;
			
			this.Showketqua.active = true;

            //set thong so diem cua Dice
            this.lbTotalDice.string  = this.totalDice;
           
            //set ket qua vao sprite Dice
		    if (cc.TaiXiuMd5Controller.getInstance().getIsNan()) {
				setTimeout(function(){
					   this.nodeBowl.active = true;
						}.bind(this),100)
            }
                   			
			        this.xnAnimation[0].setAnimation(0, `${md5sessionInfo.Result.Dice1}`, false);
					this.xnAnimation[1].setAnimation(0, `${md5sessionInfo.Result.Dice2}`, false);
					this.xnAnimation[2].setAnimation(0, `${md5sessionInfo.Result.Dice3}`, false);
					//this.amthanhxucxac.play();
					//this.xnEffect.node.active = true
					//this.xnEffect.setAnimation(0,'effect',false)
                    
					//this.xnAnimation[0].setCompleteListener(function(){
						//this.nodeBGTimer.active = true;
		                this.diceAnimFinish();
					//}.bind(this))
           


        },

        //chi bat ket qua xuc xac (che do Nan)
       
        //goi set ket qua luon (ko chay animation dice)
       

        startEffectResult: function () {
			this.md5hash.node.active = true;
			this.winSound.play();
            //Kiem tra xem ban nao thang
            if (this.totalDice > 10) {
				this.nodebaton.active = false;
                //TAI
                this.nodeTaiWins.forEach(function (nodeTaiWin) {
                    nodeTaiWin.active = true;
                });
                this.nodeXiuWins.forEach(function (nodeXiuWin) {
                    nodeXiuWin.active = false;
                });
                this.nodeTai.active = false;
            } else if (this.totalDice > 2 && this.totalDice <= 10) {
				this.nodebaton.active = false;
                //XIU
                this.nodeTaiWins.forEach(function (nodeTaiWin) {
                    nodeTaiWin.active = false;
                });
                this.nodeXiuWins.forEach(function (nodeXiuWin) {
                    nodeXiuWin.active = true;
                });
                this.nodeXiu.active = false;
            }
        },

		openEndDiaNan: function(){
            if (this.nodeBowl.active) {         
                this.nodeBowl.active = false;
                this.startEffectResult();
            }
        },
		
        diceAnimStart: function () {
            this.xnAnimation[0].setAnimation(0, `xi ngau bay 1`, false);
            this.xnAnimation[1].setAnimation(0, `xi ngau bay 2`, false);
            this.xnAnimation[2].setAnimation(0, `xi ngau bay 3`, false);
        },

        //sau khi play xong animation Dice
        diceAnimFinish: function () {
			this.nodeBGTimer.active = true;
            // anim mới xong
           // this.nodeDiceAnim.active = false; 
            //dang mo bat de nan -> ko chay animation thang
            if (cc.TaiXiuMd5Controller.getInstance().getIsNan()) {
				this.animationMess.play('openMessage');
				this.lblTextNotiNewGame.string = 'Xin mời nặn!';
				 this.nodeBowl.active = true;
				 this.nodebaton.active = false;
				 this.nodeketqua.active = false;
                //tat node Dice Anim
               // this.animationDice.node.active = false;

                //Bat node Dice Ket qua (3 Dice)
               // this.nodeResultDice.active = true;
            } else {
				this.nodeketqua.active = true;
                //tat node Dice Anim
               // this.animationDice.node.active = false;

                //Bat node Dice Ket qua (3 Dice)
				//this.amthanhmodia.play();
                //this.nodeResultDice.active = true;

                //Bat node ket qua tong
               // this.nodeBgTotalDice.active = true;
                this.lbTotalDice.node.active = true;

                //effect
                this.startEffectResult();
            }
        },
		
		copyHashClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.md5key.string)
            this.lblTextNotiNewGame.string = 'Copy chuỗi MD5 thành công!';
            this.animationMess.play('openMessage');
			
        },
		
        copyResultClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.md5hash.string)
            this.lblTextNotiNewGame.string = 'Copy chuỗi kết quả thành công!';
            this.animationMess.play('openMessage');
			
        },
        setStringEffect: function(value,obj) {
            var e = this;
            cc.Tween.stopAllByTarget(obj);
            var i = value
              , n = i.length;
              obj.string = "";
            var s = 0;
            this.schedule(function t() {
                s += 1;
                var a = i.substring(0, s);
                obj.string = a,
                s >= n && e.unschedule(t)
            }, .02)
        },
		
    });
}).call(this);
