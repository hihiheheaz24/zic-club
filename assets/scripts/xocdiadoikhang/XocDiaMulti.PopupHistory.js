// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
var Helper = require('Vs.Helper')
var Dialog = require('Dialog2')
// var Dialog = require('Dialog')
// import Dialog from "../../../scripts/common/Dialog";
import Network from "./networks/XocDiaNetworkClient";
import Configs from "./common/ConfigsXoc";
cc.Class({
    extends: Dialog,

    properties: {
        itemTemplate: cc.Node,
        lblPage: cc.Label,
        
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },
    onLoad() {
        this.page = 1
        this.maxPage = 1
        this.items = []
    },

    // LIFE-CYCLE CALLBACKS:
    onEnable() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].active = false;
        }
        // if (this.itemTemplate != null) this.itemTemplate.active = false;

        this.page = 1;
        this.maxPage = 1;
        this.lblPage.string = this.page + "/" + this.maxPage;
        this.loadData();
    },

    
    start () {

    },
    actNextPage() {
        if (this.page < this.maxPage) {
            this.page++;
            this.lblPage.string = this.page + "/" + this.maxPage;
            this.loadData();
        }
    },

    actPrevPage() {
        if (this.page > 1) {
            this.page--;
            this.lblPage.string = this.page + "/" + this.maxPage;
            this.loadData();
        }
    },

    loadData() {
        var that = this
        Network.getInstance().post('xocdia_history', { "kmess": 10, "page": this.page, "token": Configs.Login.tokenXoc }, (res) => {
           

            if (res["error"] != 0) return;

            if (that.items.length == 0) {
                for (var i = 0; i < 10; i++) {
                    let item = cc.instantiate(that.itemTemplate);
                    item.active = true
                    item.parent = that.itemTemplate.parent;
                    that.items.push(item);
                }
                that.itemTemplate.destroy();
                that.itemTemplate = null;
            }
            console.log(that.items, res["lists"].length)
            that.maxPage = Math.floor(res["total"] / res["kmess"]) + 1;
            that.lblPage.string = that.page + "/" + that.maxPage;
            for (let i = 0; i < that.items.length; i++) {
                let item = that.items[i];
                if (i < res["lists"].length) {
                    let itemData = res["lists"][i];
                    item.getChildByName("bg").opacity = i % 2 == 0 ? 10 : 0;
                    
                    item.getChildByName("time").getComponent(cc.Label).string = Helper.formatDate(itemData["created_at"]);
                    item.getChildByName("ketqua").getComponent(cc.Label).string = itemData["kq"];
                    item.getChildByName("cuoc").getComponent(cc.Label).string = Helper.formatMoney(itemData["gold"]);
                    
                    item.getChildByName("nhan").getComponent(cc.Label).string = Helper.formatMoney(itemData["nhan"]);
                    item.active = true;
                } else {
                    item.active = false;
                }
            }
        });
    }

    // update (dt) {},
});
