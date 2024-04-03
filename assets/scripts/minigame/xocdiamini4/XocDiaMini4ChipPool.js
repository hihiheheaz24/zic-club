/**
 * Created by Welcome on 5/28/2019.
 */

(function () {
    cc.XocDiaMini4ChipPool = cc.Class({
        "extends": cc.Component,
        properties: {
            prefab: cc.Prefab,
        },

        onLoad: function () {
            this.createNodePool();
            cc.XocDiaMini4Controller.getInstance().setXocDiaMini4ChipPool(this);
        },

        createNodePool: function () {
            this.nodePool = new cc.NodePool();
            let initCount = 10;
            for (let i = 0; i < initCount; ++i) {
                this.nodePool.put(cc.instantiate(this.prefab));
            }
        },

        putToPool: function (node) {
            try {
                if (this.nodePool)
                    this.nodePool.put(node);
            } catch (e) {

            }

        },

        clearPool: function () {
            if (this.nodePool)
                this.nodePool.clear();

        },

        createChip: function () {
            let node = null;
            if (this.nodePool.size() > 0) {
                node = this.nodePool.get();
            } else {
                node = cc.instantiate(this.prefab);
            }

            return node;
        },
    });
}).call(this);
