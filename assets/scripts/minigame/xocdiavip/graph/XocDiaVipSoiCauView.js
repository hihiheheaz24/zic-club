/**
 * Created by Nofear on 3/15/2019.
 */

/**
 Draw tu phai qua trai
 Draw tu duoi len tren
 */


(function () {
    cc.XocDiaVipSoiCauView = cc.Class({
        "extends": cc.Component,
        properties: {
            animation: cc.Animation,

            nodeParent: cc.Node,
            nodeEvenTemp: cc.Node,
            nodeOddTemp: cc.Node,

            lbEven: cc.Label,
            lbFourUp: cc.Label,
            lbFourDown: cc.Label,

            lbOdd: cc.Label,
            lbThreeUp: cc.Label,
            lbThreeDown: cc.Label,

            lbTWO: cc.Label,

            sfDots: [cc.SpriteFrame],

            spriteSides: [cc.Sprite],
            sfSides: [cc.SpriteFrame],
        },

        onLoad: function () {
            cc.XocDiaVipController.getInstance().setXocDiaVipSoiCauView(this);

            // this.rootPosX = -9.6; //toa do goc
            // this.rootPosY = -47; //toa do goc

            this.rootPosX = 15; //toa do goc
            this.rootPosY = -63; //toa do goc

            this.spaceX = 25;
            this.spaceY = 25;

            this.maxItemPerCol = 6;
        },

        convertToMatrix: function (list) {
            var self = this;
            //luu lai side dau tien
            var currentSide = this.getSide(list[0]);

            var matrix = [];
            var arrCols = [];
            var index = 0;
            list.forEach(function (item) {
                var itemSide = self.getSide(item);
                if (arrCols.length === self.maxItemPerCol) {
                    //du 6 thi dua vao matrix + chuyen sang cot khac
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //push vao cols
                    arrCols.push(item);
                    //set lai currentSide
                    currentSide = itemSide;
                } else if (itemSide === currentSide) {
                    //giong thi them vao
                    arrCols.push(item);
                } else {
                    //khac thi push vao matrix + reset cols
                    matrix.push(arrCols);
                    //reset cols
                    arrCols = [];
                    //set lai currentSide
                    currentSide = itemSide;
                    //push vao cols
                    arrCols.push(item);
                }
                if (index <= 31) {
                    var itemSide = self.getSide(item);
                    var sprite = self.spriteSides[index];
                    sprite.spriteFrame = self.sfSides[itemSide == "ODD" ? 0 : 1];
                }

                index++;
            });
            //push arr cuoi vao matrix
            matrix.push(arrCols);

            return matrix;
        },

        getSide: function (gate) {
            switch (gate) {
                case cc.XocDiaVipResult.EVEN:
                    return 'EVEN';
                case cc.XocDiaVipResult.EVEN_FOUR_DOWN:
                    return 'EVEN';
                case cc.XocDiaVipResult.EVEN_FOUR_UP:
                    return 'EVEN';
                case cc.XocDiaVipResult.ODD_THREE_DOWN:
                    return 'ODD';
                case cc.XocDiaVipResult.ODD_THREE_UP:
                    return 'ODD';
                case cc.XocDiaVipResult.TWO:
                    return 'TWO';
            }
        },

        draw: function (list) {
            if (list.length === 0) return;
            // list.reverse();
            this.even = 0;
            this.fourUp = 0;
            this.fourDown = 0;
            this.odd = 0;
            this.threeUp = 0;
            this.threeDown = 0;
            this.two = 0;
            this.tong = 0;

            // var list = [2,4,1,1,1,6,5,2,1,6,6,6,6,5,4,4];
            console.log('list',list);
            var matrix = this.convertToMatrix(list);
            var length = Math.min(matrix.length, 200);
            for (var i = 0; i < length; i++) {
                this.drawCol(matrix[i], i);
            }
            this.nodeParent.width = Math.max(matrix.length * 40, 802);
        },

        drawCol: function (cols, colIndex) {
            //vi tri X
            var posX = this.rootPosX + (colIndex * this.spaceX);
            //toa do Y bat dau ve
            var starY = this.rootPosY + (this.maxItemPerCol - cols.length) * this.spaceY;

            for (var i = 0; i < cols.length; i++) {
                this.createNode(cols[i], cc.v2(-posX, starY + (this.spaceY * i)));
            }
        },

        createNode: function (item, pos) {
            // if (this.gameAssets === undefined) {
            //     this.gameAssets = cc.XocDiaVipController.getInstance().getAssets();
            // }

            switch (item) {
                case cc.XocDiaVipResult.EVEN:
                    var nodeView = cc.instantiate(this.nodeEvenTemp);
                    this.even++;
                    break;
                case cc.XocDiaVipResult.EVEN_FOUR_DOWN:
                    nodeView = cc.instantiate(this.nodeEvenTemp);
                    this.even++;
                    this.fourDown++;
                    break;
                case cc.XocDiaVipResult.EVEN_FOUR_UP:
                    nodeView = cc.instantiate(this.nodeEvenTemp);
                    this.even++;
                    this.fourUp++;
                    break;
                case cc.XocDiaVipResult.ODD_THREE_DOWN:
                    nodeView = cc.instantiate(this.nodeOddTemp);
                    this.odd++;
                    this.threeDown++;
                    break;
                case cc.XocDiaVipResult.ODD_THREE_UP:
                    nodeView = cc.instantiate(this.nodeOddTemp);
                    this.odd++;
                    this.threeUp++;
                    break;
                case cc.XocDiaVipResult.TWO:
                    nodeView = cc.instantiate(this.nodeEvenTemp);
                    this.even++;
                    this.two++;
                    break;
            }

            nodeView.parent = this.nodeParent;
            nodeView.position = pos;
            nodeView.getComponent(cc.Sprite).spriteFrame = this.sfDots[item];

            // this.tong = this.even + this.fourUp + this.fourDown+ this.odd+this.threeUp+this.threeDown+this.two;
            this.tong = this.even + this.odd;

            //set gia tri
            this.lbEven.string = ((this.even / this.tong) * 100).toFixed() + "%";
            this.lbFourUp.string = ((this.fourUp / this.tong) * 100).toFixed() + "%";
            this.lbFourDown.string = ((this.fourDown / this.tong) * 100).toFixed() + "%";

            this.lbOdd.string = ((this.odd / this.tong) * 100).toFixed() + "%";
            this.lbThreeUp.string = ((this.threeUp / this.tong) * 100).toFixed() + "%";
            this.lbThreeDown.string = ((this.threeDown / this.tong) * 100).toFixed() + "%";

            // this.lbTWO.string = ((this.two / this.tong) * 100).toFixed() + "%";
            this.lbTWO.string = (((this.even - this.fourUp - this.fourDown) / this.tong) * 100).toFixed() + "%";
        },

        resetDraw: function () {
            //xoa cac node con
            var children = this.nodeParent.children;
            for (var i = children.length - 1; i >= 0; i--) {
                this.nodeParent.removeChild(children[i]);
            }
        },

        hideClicked: function () {
            this.animation.play('xxHideSoiCau');
        },

        showClicked: function () {
            this.animation.play('xxShowSoiCau');
        }
    });
}).call(this);
