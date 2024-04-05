/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.TaiXiuSieuTocTopItem = cc.Class({
        "extends": cc.Component,
        properties: {
            nodeBG: cc.Node,
            lbRank: cc.Label,
            lbNickName: cc.Label,
            lbTotalWin: cc.Label,
            rankSprite1: cc.Sprite,
            rankSprite2: cc.Sprite,
            rankSprite3: cc.Sprite,
        },

        updateItem: function (item, itemID) {
            this.lbRank.node.active = false;
            this.rankSprite1.node.active = false;
            this.rankSprite2.node.active = false;
            this.rankSprite3.node.active = false;


            switch (itemID) {
                case 0:
                    this.rankSprite1.node.active = true;
                    this.lbNickName.node.color = cc.color(252, 193, 0, 255);
                    this.lbTotalWin.node.color = cc.color(252, 193, 0, 255);
                    break;
                case 2:
                    this.rankSprite2.node.active = true;
                    this.lbNickName.node.color = cc.color(50, 231, 255, 255);
                    this.lbTotalWin.node.color = cc.color(50, 231, 255, 255);
                    break;
                case 3:
                    this.rankSprite3.node.active = true;
                    this.lbNickName.node.color = cc.color(248, 109, 0, 255);
                    this.lbTotalWin.node.color = cc.color(248, 109, 0, 255);
                    break;
                default:
                    this.lbRank.node.active = true;
                    this.lbNickName.node.color = cc.color(252, 255, 255, 255);
                    this.lbTotalWin.node.color = cc.color(252, 255, 255, 255);
                    break;
            }
        },
    });
}).call(this);