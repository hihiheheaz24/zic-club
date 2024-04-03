

(function () {
    cc.StretchXSprite = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        start: function () {
            this.node.width = cc.view.getVisibleSize().width * 2;
        },

    });
}).call(this);