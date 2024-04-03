/**
 * Created by Nofear on 3/15/2019.
 */


(function () {
    cc.ChatListView = cc.Class({
        "extends": cc.ListView,
        properties: {
            chat_item: {
                default: null,
                type: cc.Prefab
            },            
            item_kq: {
                default: null,
                type: cc.Prefab
            },
            item_tip: {
                default: null,
                type: cc.Prefab
            },            
        },

        // use this for initialization
        onLoad: function () {
            //set so item khoi tao default
            this.spawnCount = 15;

            if (this.scrollView === null) return;
            this.content = this.scrollView.content;
            this.items = []; // array to store spawned items
            this.updateTimer = 0;
            this.updateInterval = 0.2;
            this.lastContentPosY = 0; // use this variable to detect if we are scrolling up or down

            //save height root
            this.rootContentY = this.content.y;

            this.createNodePool();
        },

        onDisable: function () {
            var self = this;
            this.items.forEach(function (item) {
                self.putToPool(item);
            });

            this.items = [];
        },

        createNodePool: function () {
            this.nodePool = new cc.NodePool();

            if (cc.sys.isNative) {
                var initCount = 15;
            } else {
                initCount = 30;
            }

            for (let i = 0; i < initCount; ++i) {
                this.nodePool.put(cc.instantiate(this.itemTemplate));
            }
        },

        putToPool: function (node) {
            // node.destroy();

            this.nodePool.put(node);
        },

        clearPool: function () {
            if (this.nodePool)
                this.nodePool.clear();
        },

        createNode: function () {
            // return  cc.instantiate(this.itemTemplate);

            let node = null;
            if (this.nodePool.size() > 0) {
                node = this.nodePool.get();
                // console.log('createNode get tu pool');
            } else {
                node = cc.instantiate(this.itemTemplate);
                // console.log('createNode tao moi');
            }

            return node;
        },

        initialize: function (messages) {
            this.messages = messages;
            var countMessage = this.messages.length;

            // this.content.height = countMessage * (this.itemTemplate.height + this.spacing) + this.spacing;
            // var spawnCountReal = Math.min(this.spawnCount, countMessage);

            for (var i = 0; i < countMessage; ++i) {
                var mess = this.messages[i];

                if (mess.ad) {
                    if (mess.s === cc.Config.getInstance().getServiceId()) {
                        var item = this.createNode();
                        this.content.addChild(item);
                        item.getComponent(cc.ChatItem).updateItem(mess, null);
                        this.items.push(item);
                    } else {
                        //nothing
                    }
                } else {
                    this.addChatItem(mess);
                }
            }
            //this.rootContentY = this.content.y;
        },

        addChatItem: function (message, maxChat) {
            if (this.items.length >= maxChat) {
                //da khoi tao du so luong chat -> remove chat tren cung
                this.putToPool(this.content.children[0]);
            }

            if(message?.tip){
                this.message_tip(message);
                return;
            }
            if(message.c == 'chonkq') {
                this.message_chonkq(message);
            }else{
                this.addMessage(message);
                // var item = this.createNode();
                // this.content.addChild(item);
                // if(item.getComponent(cc.ChatItem)){
                //     item.getComponent(cc.ChatItem).updateItem(message, null);
                //     this.items.push(item);
                // }
            }
        },

        addMessage: function(data){
            let item = cc.instantiate(this.chat_item);
            //var chonkq = item.getComponent('TaiXiuChat_chonKq');
            //chonkq.init(data.value.dice1,data.value.dice2,data.value.dice3);
            let itemComponent = item.getComponent(cc.Label);
            itemComponent.string = data.n+':'+data.c;
            let name = item.children[0].getComponent(cc.Label);
            name.string = data.n+":";
            this.content.addChild(item);
            this.items.push(item);
        },        

        message_chonkq: function(data){
            let item = cc.instantiate(this.item_kq)
            //chonkq.init(data.value.dice1,data.value.dice2,data.value.dice3);
            //var itemComponent = item.getComponent(cc.Label);
            //itemComponent.string = data.n+':';
            let name = item.children[0].getComponent(cc.Label);
            name.string = data.n+":";
            this.content.addChild(item);
            this.items.push(item);
        },

        message_tip: function(message){
            const data = message.tip;
            let item = cc.instantiate(this.item_tip)
            //chonkq.init(data.value.dice1,data.value.dice2,data.value.dice3);
            //var itemComponent = item.getComponent(cc.Label);
            //itemComponent.string = data.n+':';
            let name = item.children[1].getComponent(cc.Label);
            let content = item.children[2].getComponent(cc.Label);
            let money = item.children[3].getComponent(cc.Label);
            name.string = data.n+":";
            content.string = data.c;
            money.string = data.m;
            this.content.addChild(item);
            this.items.push(item);
        },        

        // updateList: function (messages) {
        //     var items = this.items;
        //     for (var i = 0; i < messages.length; ++i) {
        //         var mess = messages[i];
        //         var item = items[i].getComponent(cc.ChatItem);
        //         if (mess.ad) {
        //             if (mess.s === cc.Config.getInstance().getServiceId()) {
        //                 item.updateItem(messages[i], i);
        //                 item.active = true;
        //             } else {
        //                 item.active = false;
        //             }
        //         } else {
        //             item.updateItem(messages[i], i);
        //         }
        //
        //     }
        // },


        // update: function (dt) {
        //     this.updateTimer += dt;
        //     if (this.updateTimer < this.updateInterval) return; // we don't need to do the math every frame
        //     this.updateTimer = 0;
        //     var items = this.items;
        //     var buffer = this.bufferZone;
        //     var isDown = this.scrollView.content.y < this.lastContentPosY; // scrolling direction
        //     var offset = (this.itemTemplate.height + this.spacing) * items.length;
        //     for (var i = 0; i < items.length; ++i) {
        //         var viewPos = this.getPositionInView(items[i]);
        //         if (isDown) {
        //             // if away from buffer zone and not reaching top of content
        //             if (viewPos.y < -buffer && items[i].y + offset < 0) {
        //                 items[i].y  = (items[i].y + offset);
        //                 var item = items[i].getComponent(cc.ChatItem);
        //                 var itemId = item.itemID - items.length; // update item id
        //                 item.updateItem(this.messages[itemId], itemId);
        //             }
        //         } else {
        //             // if away from buffer zone and not reaching bottom of content
        //             if (viewPos.y > buffer && items[i].y - offset > -this.content.height) {
        //                 items[i].y  = (items[i].y - offset);
        //                 item = items[i].getComponent(cc.ChatItem);
        //                 itemId = item.itemID + items.length;
        //                 item.updateItem(this.messages[itemId], itemId);
        //             }
        //         }
        //     }
        //     // update lastContentPosY
        //     this.lastContentPosY = this.scrollView.content.y;
        // }
    });
}).call(this);
