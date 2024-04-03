
(function () {
    cc.PopupBase = cc.Class({
        "extends": cc.Component,
        properties: {

        },

        onLoad: function () {
            this.animation = this.node.getComponent(cc.Animation);
        },

        onEnable: function () {
            this.animation.play('openPopup');
        },
		
		closeClicked: function () {
			
			
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.closeFinished();
            }, this, 1, 0, delay, false);
			
			
        },

        closeClicked1: function () {
			
			console.log("Vào closeClicked2");
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.closeFinished();
            }, this, 1, 0, delay, false);
			
			cc.XocDiaMiniController.getInstance().getShowNodeNho2();
						// cc.XocDiaMini2Controller.getInstance().getShowNodeNho();
						// cc.XocDiaMini3Controller.getInstance().getShowNodeNho2();
						// cc.XocDiaMini4Controller.getInstance().getShowNodeNho2();
			
        },
		closeClicked2: function () {
			
			console.log("Vào closeClicked2");
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.closeFinished();
            }, this, 1, 0, delay, false);
			
			cc.XocDiaMiniController.getInstance().getShowNodeNho2();
						//cc.XocDiaMini2Controller.getInstance().getShowNodeNho();
						cc.XocDiaMini3Controller.getInstance().getShowNodeNho2();
						cc.XocDiaMini4Controller.getInstance().getShowNodeNho2();
        },
		closeClicked3: function () {
			
			console.log("Vào closeClicked2");
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.closeFinished();
            }, this, 1, 0, delay, false);
			
			cc.XocDiaMiniController.getInstance().getShowNodeNho2();
						cc.XocDiaMini2Controller.getInstance().getShowNodeNho();
						//cc.XocDiaMini3Controller.getInstance().getShowNodeNho2();
						cc.XocDiaMini4Controller.getInstance().getShowNodeNho2();
        },
		closeClicked4: function () {
			
			console.log("Vào closeClicked2");
            this.animation.play('closePopup');
            var self = this;
            var delay = 0.12;
            cc.director.getScheduler().schedule(function () {
                self.animation.stop();
                self.closeFinished();
            }, this, 1, 0, delay, false);
			cc.XocDiaMiniController.getInstance().getShowNodeNho2();
						cc.XocDiaMini2Controller.getInstance().getShowNodeNho();
						cc.XocDiaMini3Controller.getInstance().getShowNodeNho2();
						//cc.XocDiaMini4Controller.getInstance().getShowNodeNho2();
        },

        closeFinished: function () {

        },
    });
}).call(this);
