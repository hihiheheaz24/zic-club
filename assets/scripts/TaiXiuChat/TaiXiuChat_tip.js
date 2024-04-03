cc.Class({
    extends: cc.Component,

    properties: {
        p1: dragonBones.ArmatureDisplay,
        p2: dragonBones.ArmatureDisplay,
        p3: dragonBones.ArmatureDisplay,
        sum: cc.Label,
        dice1 : '',
        dice2 : '',
        dice3 : '',
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    init(){

    },
    generateRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },
    start () {
        this.dice1 = this.generateRandomInteger(1,6);
        this.dice2 = this.generateRandomInteger(1,6);
        this.dice3 = this.generateRandomInteger(1,6);
        console.log(`${this.dice1}-${this.dice2}-${this.dice3}`)
        this.p1.node.active = true;
        this.p1.playAnimation('dice'+this.dice1,1);
        this.scheduleOnce(() => {
            this.p2.node.active = true;
			this.p2.playAnimation('dice'+this.dice2,1);
		}, 1);
        this.scheduleOnce(() => {
            this.p3.node.active = true;
			this.p3.playAnimation('dice'+this.dice3,1);
		}, 2);
        this.scheduleOnce(() => {
            this.sum.node.active =true;
			this.sum.string = this.dice1 + this.dice2 + this.dice3; 
		}, 3);        
    },

    // update (dt) {},
});
