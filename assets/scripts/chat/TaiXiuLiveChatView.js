/**
 * Created by Nofear on 6/7/2017.
 */

var netConfig = require('NetConfig');

(function () {
    cc.TaiXiuLiveChatView = cc.Class({
        "extends": cc.Component,
        properties: {
            chatListView: cc.ChatListView,
            editBoxChat: cc.EditBox,
            btnSendChat: cc.Button,
            channelId: 'taixiulive',
        },

        onLoad: function () {
            cc.TaiXiuLive.inGame.setChatView(this);
            this.lastTimeReconnect = (new Date()).getTime();
            if (cc.sys.isNative) {
                this.maxChat = 20;
            } else {
                this.maxChat = 30;
            }
        },

        onEnable: function () {
            //var chatNegotiateCommand = new cc.ChatNegotiateCommand;
            //chatNegotiateCommand.execute(this);
        },

        onDisable: function () {
            // if (this.chatHub)
            //     this.chatHub.disconnect();
            this.unscheduleAllCallbacks();
        },

        reconnect: function () {
            // console.log('chatHub reconnect');
            this.lastTimeReconnect = (new Date()).getTime();
            this.chatHub.connect(this, cc.HubName.ChatHub, this.connectionToken, true, this.channelId);
        },

        sendRequestOnHub: function (method, data) {
            // console.log('sendRequestOnHub: ' + method);
            switch (method) {
                case cc.MethodHubName.REGISTER_CHAT:
                    this.chatHub.register();
                    break;
                case cc.MethodHubName.UNREGISTER_CHAT:
                    this.chatHub.unregister();
                    break;
                case cc.MethodHubName.SEND_MESSAGE:
                    this.chatHub.sendMessage(data);
                    break;
            }
        },

        showChat: function () {
            var self = this;

            var length = this.listChat.length;
            var start = Math.max(this.listChat.length - this.maxChat, 0);


            if (length > this.maxChat) {
                this.listChat = this.listChat.slice(start, length);
            }

            if (this.listChat !== null && this.listChat.length > 0) {
                this.chatListView.resetList();
                this.chatListView.initialize(this.listChat);
            }


            // var content = '';
            // for (var i = start; i < length; i++) {
            //     if (content !== '') {
            //         content += ('\n' + self.formatChatUser(this.listChat[i]));
            //     } else {
            //         content += (self.formatChatUser(this.listChat[i]));
            //     }
            // }
            // self.rtContent.string = content;

            // this.chatListView.scrollView.scrollToBottom();

            setTimeout(function () {
                if (self.chatListView != null) {
                    self.chatListView.scrollView.scrollToBottom();
                }
            }, 5);
        },

        addChatContent: function (message) {
            if (message.ad) {
                //mess cua ad hien theo sId
                if (message.s !== cc.Config.getInstance().getServiceId()) {
                   return;
                }
            }

            this.chatListView.addChatItem(message, this.maxChat);

            // this.listChat.push(message);
            // if (this.listChat.length > this.maxChat) {
            //     this.listChat.splice(0, 1);
            //     this.chatListView.updateList(this.listChat);
            // } else {
            //     this.chatListView.resetList();
            //     this.chatListView.initialize(this.listChat);
            // }

            // this.chatListView.scrollView.scrollToBottom();

            var self = this;
            setTimeout(function () {
                if (self.chatListView != null) {
                    self.chatListView.scrollView.scrollToBottom();
                }
            }, 5);
        },
        
//
        formatChatUser: function (chatItem) {//
            //var hubName = cc.Config.getInstance().getServiceName(chatItem.s.toString());
            //chat cua admin
            if (chatItem.ad) {//
                return '<color=#FCE700>' + chatItem.n + ': </color>' + chatItem.c;
            } else {
                return '<color=#06EEFA>' + chatItem.n + ': </color>' + chatItem.c;
            }
        },

        onChatNegotiateResponse: function (response) {
            this.connectionToken = response.ConnectionToken;
            this.chatHub = new cc.Hub;
            this.chatHub.connect(this, cc.HubName.ChatHub, response.ConnectionToken, false, this.channelId);
            cc.PopupController.getInstance().hideBusy();
        },

        onHubMessage: function (response) {
            if (response.M !== undefined && response.M.length > 0) {
                var m = (response.M)[0];
                switch (m.M) {
                    //danh sach chat cuoi
                    case cc.MethodHubOnName.LIST_LAST_MESSAGES:

                        var data = m.A[0];
                        this.listChat = JSON.parse(data);
                        this.showChat();
                        break;
                    //message nhan dc
                    case cc.MethodHubOnName.RECEIVE_MESSAGE:
                        this.addChatContent(m.A[0]);
                        break;
                    //message he thon
                    case cc.MethodHubOnName.SYSTEM_MESSAGE:
                        this.addChatContent(m.A[0]);
                        break;
                    case cc.MethodHubOnName.MESSAGE:
                        cc.PopupController.getInstance().showMessage(m.A[0]);
                        break;
                }
            } else {
                //PING PONG
                if (response.I && this.chatHub) {
                    this.chatHub.pingPongResponse(response.I);
                }
            }
        },

        onHubOpen: function () {
            if (this.btnSendChat) {
                //Mo nut send Chat
                this.btnSendChat.interactable = true;
                //reset content
                this.sendRequestOnHub(cc.MethodHubName.REGISTER_CHAT);
            }
        },

        onHubClose: function () {
            //khoa nut send Chat
            this.btnSendChat.interactable = false;

            if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
                this.reconnect();
            } else {
                cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            }
        },

        onHubError: function () {
            // if ((new Date()).getTime() - this.lastTimeReconnect >= netConfig.RECONNECT_TIME * 1000) {
            //     this.reconnect();
            // } else {
            //     cc.director.getScheduler().schedule(this.reconnect, this, netConfig.RECONNECT_TIME, 0, 0, false);
            // }
        },

        editingReturn: function () {
            if (this.editBoxChat.string === '') {
                //thong bao?

                return;
            }
            cc.TaiXiuLive.send({chat :{content : this.editBoxChat.string}});    
                
            //xoa noi dung nhap
            this.editBoxChat.string = '';        

            if (!cc.sys.isNative) {
                var self = this;
                setTimeout(function () {
                    self.editBoxChat.focus();
                }, 5);
            }
        },

        sendChatClicked: function () {
            if (this.editBoxChat.string === '' || this.editBoxChat.string === 'chonkq') {
                //thong bao?
                this.editBoxChat.string = '';
                return;
            }
            //this.sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, this.editBoxChat.string);
            cc.TaiXiuLive.send({chat :{content : this.editBoxChat.string}});       
            //xoa noi dung nhap
            this.editBoxChat.string = '';
        
            if (!cc.sys.isNative) {
                var self = this;
                setTimeout(function () {
                    self.editBoxChat.focus();
                }, 5);
            }
        },
        sendChonKq: function () {
            let coin = cc.BalanceController.getInstance().getBalance();
            if(coin < 150000){
                cc.PopupController.getInstance().showMessage('Số dư từ 150k mới dùng được chức năng này.');
            }else{
                //this.sendRequestOnHub(cc.MethodHubName.SEND_MESSAGE, 'chonkq');
            }
        }
    });
}).call(this);
