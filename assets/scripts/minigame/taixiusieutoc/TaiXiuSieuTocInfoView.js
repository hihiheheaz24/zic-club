/**
 * Thong tin phien
 */

var taiXiuSieuTocConfig = require('TaiXiuSieuTocConfig');
import Utils from "../../../scripts/shootFish/common/Utils";
import Tween from "../../../scripts/shootFish/common/Tween";

(function () {
    cc.TaiXiuSieuTocInfoView = cc.Class({
        "extends": cc.Component,
        properties: {
            //animationBigTimer: cc.Animation,
            nodeBGTimer: cc.Node,
            lbSessionID: cc.Label,
            lbBigTimer: cc.Label, //thoi gian to chinh giua
            lbTimer: cc.Label, //thoi gian nho khi dang o man ket qua,
            lbTotalBetTai: cc.Label, //tong tien bet Tai
            lbTotalBetXiu: cc.Label, //tong tien bet Xiu
            lbUserBetTai: cc.Label, //so user bet Tai
            lbUserBetXiu: cc.Label, //so user bet Xiu            
            nodeMain: cc.Node,
			sieutoc: cc.Label, 
			lblTextNotiNewGame: cc.Label
        },

        onLoad: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocInfoView(this);
			this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
            this.reset();
        },

        onEnable: function () {
            if (cc.sys.isNative && this.nodeMain !== null && this.nodeMain !== undefined) {
                this.nodeMain.scaleX = 0.9;
                this.nodeMain.scaleY = 0.9;
            }
        },
        
        onDestroy: function () {
            cc.TaiXiuSieuTocController.getInstance().setTaiXiuSieuTocInfoView(null);
        },

        reset: function () {
            this.currentState = 999;
            this.lastTime = 999;
        },

        updateInfo: function (sieutocsessionInfo) {
			//console.log(sieutocsessionInfo);

            //check state de xu ly hien thi
            switch (sieutocsessionInfo.CurrentState) {
                //giai doan dat cuoc
                case cc.TaiXiuSieuTocState.BETTING: //54
                    if (this.currentState !== sieutocsessionInfo.CurrentState) {
                        //goi reset thong tin betInfo
                        cc.TaiXiuSieuTocController.getInstance().resetBetAndResultInfo();
                    }
                    this.lbBigTimer.node.active = true;
                    this.lbTimer.node.active = false;
                    this.nodeBGTimer.active = false;
					this.lbTotalBetTai.string = cc.Tool.getInstance().formatNumber(sieutocsessionInfo.TotalBetTai);
					this.lbTotalBetXiu.string = cc.Tool.getInstance().formatNumber(sieutocsessionInfo.TotalBetXiu);
					if (sieutocsessionInfo.Ellapsed <= 20)
					{
						//this.sieutoc.node.active = true;
						//this.sieutoc.string = sieutocsessionInfo.Md5Encript;
					}
					
                    break;
                //giai doan cho ket qua (ko cho dat cuoc)
                case cc.TaiXiuSieuTocState.END_BETTING:
                    this.lbBigTimer.node.active = true;
                    this.lbTimer.node.active = false;
                    this.nodeBGTimer.active = false;	
					//return;					
                    break;

                //giai doan ket qua
                case cc.TaiXiuSieuTocState.RESULT: //15
                    //dem thoi gian o local
                    this.lbBigTimer.node.active = false;
                    this.lbTimer.node.active = true;
                    this.nodeBGTimer.active = true;
					//this.sieutoc.node.active = false;
                    break;

                //giai doan cho phien moi
                case cc.TaiXiuSieuTocState.PREPARE_NEW_SESSION:
                    //kiem tra neu chua start timer -> start
                    cc.TaiXiuSieuTocController.getInstance().resetBetInfo();
                    this.lbBigTimer.node.active = false;
                    this.lbTimer.node.active = true;
                    this.nodeBGTimer.active = true;
					
                    break;

            }
            //luu lai state hien tai
            this.currentState = sieutocsessionInfo.CurrentState;
            //set thong tin
            this.lbSessionID.string = '#' + sieutocsessionInfo.SessionID;
            this.lbUserBetTai.string = cc.Tool.getInstance().formatNumber(sieutocsessionInfo.TotalTai);
            this.lbUserBetXiu.string = cc.Tool.getInstance().formatNumber(sieutocsessionInfo.TotalXiu);
        },

        updateTimerInfo: function (time) {			
            switch (this.currentState) {				
                case cc.TaiXiuSieuTocState.BETTING: //54
                    this.lbBigTimer.string = time;
					this.lbTimer.string = time;
					if (time >= 48) {
						cc.TaiXiuSieuTocController.getInstance().playAnimation();						
					}
                    break;
                case cc.TaiXiuSieuTocState.END_BETTING: //15
                    //kiem tra thoi gian de dieu chinh animation
                    this.lbBigTimer.string = time;
                    if (time === 1 || time <= 2){
						this.lbTimer.string = 5;
                    } else {
						this.lbTimer.string = time;
					}
                    break;
                case cc.TaiXiuSieuTocState.RESULT: //15
					this.lbTimer.string = time;
                    this.lbBigTimer.node.color = cc.Color.WHITE;
                    this.lbBigTimer.string = time;
                    this.elapsedTime = 0;
                    if (time === 10 || time === 5) {
                        cc.LobbyController.getInstance().refreshAccountInfo();
                    }
                    break;

                case cc.TaiXiuSieuTocState.PREPARE_NEW_SESSION:
					this.lbTimer.string = time;
                    this.lbBigTimer.node.color = cc.Color.WHITE;
                    if (time === 1)
                        this.lbBigTimer.string = 20;
                    else this.lbBigTimer.string = time;
                    break;
            }
            this.lastTime = time;
        },
		copyHashClicked: function () {
            //cc.Tool.getInstance().copyToClipboard(this.sieutoc.string)
			this.animationMess.play('openMessage');
            this.lblTextNotiNewGame.string = 'Copy chuỗi MD5 thành công';
			this.animationMess.play('closeMessage');
        },
		showRuleClick: function()
		{
			cc.TaiXiuSieuTocMainController.getInstance().createRuleView();
		}
    });
}).call(this);