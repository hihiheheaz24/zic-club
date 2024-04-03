/**
 * Created by Nofear on 3/15/2019.
 */

//var taiXiuSessionDetailData = require('TaiXiuSessionDetailData');

(function () {
    cc.TaiXiuSieuTocSessionDetailView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            taiSessionDetailListView: cc.TaiXiuSieuTocSessionDetailListView,
            xiuSessionDetailListView: cc.TaiXiuSieuTocSessionDetailListView,

            lbSessionID: cc.Label,
            nodeTai: cc.Node,
            nodeXiu: cc.Node,
			lblTotalDice: cc.Label,
			lblSieuTocHash: cc.Label,
			lblResult: cc.Label,
			lblTextNotiNewGame: cc.Label,
			lblTotalUserBetTai: cc.Label,
			lblTotalUserBetXiu: cc.Label,

            nodeEffectTais: [cc.Node],
            nodeEffectXius: [cc.Node],

            lbTai: cc.Label,
            lbXiu: cc.Label,

            spriteDice1: cc.Sprite,
            spriteDice2: cc.Sprite,
            spriteDice3: cc.Sprite,

            lbTotalBetTai: cc.Label,
            lbTotalBetXiu: cc.Label,

            lbTotalRefundTai: cc.Label,
            lbTotalRefundXiu: cc.Label,

            btnNext: cc.Button,
            btnBack: cc.Button,

            sfDices: [cc.SpriteFrame],

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_SIEUTOC;
			this.animationMess = this.lblTextNotiNewGame.node.parent.getComponent(cc.Animation);
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getSessionDetail();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');

            //set tam du lieu de demo
        },

        checkStatusButton: function () {
            this.btnNext.interactable = this.index !== 0;
            this.btnBack.interactable = this.index !== this.totalHistory - 1;
        },

        getSessionDetail: function () {
            this.index = cc.TaiXiuSieuTocController.getInstance().getDetailIndex();
            this.sieutocgameHistory = cc.TaiXiuSieuTocController.getInstance().getGameHistory();
            this.totalHistory = this.sieutocgameHistory.length;

            //kiem tra status cua 2 nut next back
            this.checkStatusButton();

            this.getSessionDetailById(this.index);
        },

        getSessionDetailById: function (index) {
            var game = this.sieutocgameHistory[index];

            //set phien + ngay thang
            this.lbSessionID.string = 'Phiên: #' + game.SessionId + ' - Ngày: '
                + cc.Tool.getInstance().convertUTCTime3(game.CreatedDate);

            //Gan label tong dice
            if (game.DiceSum > 10) {
                var isTai = true;
                this.lbTai.string = game.DiceSum + " = ";
                this.lbXiu.string = '';
            } else {
                isTai = false;
                this.lbXiu.string = " = " + game.DiceSum;
                this.lbTai.string = '';
            }

            //Tat bat effect node Tai/Xiu
            // this.nodeTai.active = !isTai;
            // this.nodeXiu.active = isTai;
            this.nodeEffectTais.forEach(function (nodeEffectTai) {
                nodeEffectTai.active = isTai;
            });
            this.nodeEffectXius.forEach(function (nodeEffectTai) {
                nodeEffectTai.active = !isTai;
            });

            //gan spriteframe cho 3 dice theo ket qua
            this.spriteDice1.spriteFrame = this.sfDices[game.FirstDice - 1];
            this.spriteDice2.spriteFrame = this.sfDices[game.SecondDice - 1];
            this.spriteDice3.spriteFrame = this.sfDices[game.ThirdDice - 1];
			this.lblTotalDice.string = game.DiceSum;

            //lay ve danh sach dat
            var txsieutocGetSessionInfoCommand = new cc.TXSIEUTOCGetSessionInfoCommand;
            txsieutocGetSessionInfoCommand.execute(this, game.SessionId);
			
            var txsieutocGetResultSessionInfoCommand = new cc.TXSIEUTOCGetResultSessionInfoCommand;
            txsieutocGetResultSessionInfoCommand.execute(this, game.SessionId);
        },

        onTXGetResultSessionInfoResponse: function (result) {
            this.lblSieuTocHash.string = result[0].SieuTocEncrypt;
            this.lblResult.string = result[0].SieuTocDecrypt;
            this.lblTotalUserBetTai.string = result[0].TotalAccountEven;
            this.lblTotalUserBetXiu.string = result[0].TotalAccountOdd;
        },		

        onTXGetSessionInfoResponse: function (response) {
            if (response === null) return;
            var list = response;
            //var list = taiXiuSessionDetailData;

            var totalBetTai = 0;
            var totalBetXiu = 0;
            var totalRefundTai = 0;
            var totalRefundXiu = 0;

            var listTai = [];
            var listXiu = [];

            list.forEach(function (item) {
                if (item.BetSide === cc.TaiXiuSieuTocBetSide.TAI) {
                    //add vao list Tai
                    listTai.push(item);
                    //tinh tong Tai
                    totalBetTai += item.Bet;
                    totalRefundTai += item.Refund;
                } else {
                    //add vao list Xiu
                    listXiu.push(item);
                    //tinh tong Xiu
                    totalBetXiu += item.Bet;
                    totalRefundXiu += item.Refund;
                }
            });

            //var list = slotsHistoryListData;
            if (listTai !== null && listTai.length > 0) {
                this.taiSessionDetailListView.resetList();
                this.taiSessionDetailListView.initialize(listTai);
            }

            if (listXiu !== null && listXiu.length > 0) {
                this.xiuSessionDetailListView.resetList();
                this.xiuSessionDetailListView.initialize(listXiu);
            }

            this.lbTotalBetTai.string = cc.Tool.getInstance().formatNumberKTX(totalBetTai);
            this.lbTotalBetXiu.string = cc.Tool.getInstance().formatNumberKTX(totalBetXiu);
            this.lbTotalRefundTai.string = cc.Tool.getInstance().formatNumberKTX(totalRefundTai);
            this.lbTotalRefundXiu.string = cc.Tool.getInstance().formatNumberKTX(totalRefundXiu);
        },

        nextSessionClicked: function () {
            this.index--;
            this.xiuSessionDetailListView.resetList();
            this.taiSessionDetailListView.resetList();
            this.getSessionDetailById(this.index);
            //kiem tra status cua 2 nut next back
            this.checkStatusButton();
        },

        backSessionClicked: function () {
            this.index++;
            this.xiuSessionDetailListView.resetList();
            this.taiSessionDetailListView.resetList();
            this.getSessionDetailById(this.index);
            //kiem tra status cua 2 nut next back
            this.checkStatusButton();
        },

        closeClicked: function () {
            this.taiSessionDetailListView.resetList();
            this.xiuSessionDetailListView.resetList();
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuSieuTocMainController.getInstance().destroySessionDetailView();
            }, this, 1, 0, delay, false);
        },
        copyHashClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.lblSieuTocHash.string)
			this.animationMess.play('openMessage');
            this.lblTextNotiNewGame.string = 'Copy chuỗi SIEUTOC thành công';
			this.animationMess.play('closeMessage');
        },
		
        copyResultClicked: function () {
            cc.Tool.getInstance().copyToClipboard(this.lblResult.string)
			this.animationMess.play('openMessage');
            this.lblTextNotiNewGame.string = 'Copy chuỗi kết quả thành công';
			this.animationMess.play('closeMessage');
        },
    });
}).call(this);
