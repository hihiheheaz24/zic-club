/**
 * Dat cuoc
 */

(function () {
  cc.TaiXiuSicboBetView = cc.Class({
    extends: cc.Component,
    properties: {
      lbBetTai: cc.Label,
      lbBetXiu: cc.Label,
      lbBetChan: cc.Label,
      lbBetLe: cc.Label,
      lbBetTong: cc.Label,
    },

    onLoad: function () {
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboBetView(this);
      //this.reset();
    },

    onDestroy: function () {
      cc.TaiXiuSicboController.getInstance().setTaiXiuSicboBetView(null);
    },

    reset: function () {
      var sicboInputBetView =
        cc.TaiXiuSicboController.getInstance().getTaiXiuSicboInputBetView();

      if (sicboInputBetView) {
        //sicboInputBetView.destroyAllInputBetView();
      }

      // this.lbBetTai.string = "0";
      // this.lbBetXiu.string = "0";
      // this.lbBetChan.string = "0";
      // this.lbBetLe.string = "0";
      // this.lbBetTong.string = "0";
    },

    updateBetInfo: function (betInfo) {
      this.betSide = betInfo.BetSide;

      this.lbBetTong.string = cc.Tool.getInstance().formatNumber(
        betInfo.BetValue
      );
      /* if (betInfo.BetSide === cc.TaiXiuSicboBetSide.TAI) {
                this.lbBetTai.string = cc.Tool.getInstance().formatNumber(betInfo.BetValue);
            } 
			else if (betInfo.BetSide === cc.TaiXiuSicboBetSide.XIU) {
                this.lbBetXiu.string = cc.Tool.getInstance().formatNumber(betInfo.BetValue);
            } 
			if (betInfo.BetSide === cc.TaiXiuSicboBetSide.CHAN) {
                this.lbBetChan.string = cc.Tool.getInstance().formatNumber(betInfo.BetValue);
            } 
			else if (betInfo.BetSide === cc.TaiXiuSicboBetSide.LE) {
                this.lbBetLe.string = cc.Tool.getInstance().formatNumber(betInfo.BetValue);
            } */
    },

    getBetSide: function () {
      return this.betSide;
    },
  });
}.call(this));
