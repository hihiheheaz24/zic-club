/**
 * Created by Nofear on 3/15/2019.
 */

(function () {
    cc.TaiXiuSieuTocGraphView = cc.Class({
        "extends": cc.PopupBase,
        properties: {
            TaiXiuSieuTocGraph100View: cc.TaiXiuSieuTocGraph100View,
            TaiXiuSieuTocGraphCatCauView: cc.TaiXiuSieuTocGraphCatCauView,
            TaiXiuSieuTocGraphDiceSumView: cc.TaiXiuSieuTocGraphDiceSumView,
            TaiXiuSieuTocGraphDice3View: cc.TaiXiuSieuTocGraphDice3View,

            pageView: cc.PageView,
            btnNext: cc.Button,
            btnBack: cc.Button,

            lbTotalTai: cc.Label,
            lbTotalXiu: cc.Label,
        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
            this.timeSwitchPage = 0.3;
            this.totalPages = 2;
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            this.checkStatusButton();
            this.node.zIndex = cc.NoteDepth.POPUP_TAIXIU_SIEUTOC;
        },

        onEnable: function () {
            var self = this;
            var delay = 0.2;
            cc.director.getScheduler().schedule(function () {
                self.getSoiCau();
            }, this, 1, 0, delay, false);

            this.animation.play('openPopup');

            //set tam du lieu de demo
        },

        getSoiCau: function () {
            var txsieutocGetSoiCauCommand = new cc.TXSIEUTOCGetSoiCauCommand;
            txsieutocGetSoiCauCommand.execute(this)
        },

        onTXGetSoiCauResponse: function (list) {
            /*
            {
                "SessionId": 173183,
                "FirstDice": 4,
                "SecondDice": 2,
                "ThirdDice": 4,
                "DiceSum": 10,
                "BetSide": 1,
                "CreatedDate": "2019-04-04T07:10:44.94"
              }
            * */

            var countTai = this.TaiXiuSieuTocGraph100View.draw(list);
            this.lbTotalTai.string = countTai;
            this.lbTotalXiu.string = 100 - countTai;
            this.TaiXiuSieuTocGraphCatCauView.draw(list);

            this.TaiXiuSieuTocGraphDiceSumView.draw(list);
            this.TaiXiuSieuTocGraphDice3View.draw(list);
        },

        pageEvent: function () {
            this.checkStatusButton();
        },

        closeClicked: function () {
            //reset truoc khi close cho ko lag
            this.TaiXiuSieuTocGraph100View.resetDraw();
            this.TaiXiuSieuTocGraphCatCauView.resetDraw();
            this.TaiXiuSieuTocGraphDiceSumView.resetDraw();
            this.TaiXiuSieuTocGraphDice3View.resetDraw();

            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                cc.TaiXiuSieuTocMainController.getInstance().destroyGraphView();
            }, this, 1, 0, delay, false);
        },

        nextPageClicked: function() {
            this.currentPageIndex++;
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
            this.checkStatusButton();
        },

        backPageClicked: function() {
            this.currentPageIndex--;
            this.pageView.scrollToPage(this.currentPageIndex, this.timeSwitchPage);
            this.checkStatusButton();
        },

        checkStatusButton: function () {
            this.currentPageIndex = this.pageView.getCurrentPageIndex();
            if (this.currentPageIndex <  this.totalPages - 1) {
                this.btnNext.interactable = true;
            } else {
                this.btnNext.interactable = false;
            }

            if (this.currentPageIndex > 0) {
                this.btnBack.interactable = true;
            } else {
                this.btnBack.interactable = false;
            }
        },
    });
}).call(this);
