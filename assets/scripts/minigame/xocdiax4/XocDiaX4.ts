const { ccclass, property } = cc._decorator;

@ccclass
export default class XocDiaX4 extends cc.Component {

    @property(cc.Prefab)
    xx1: cc.Prefab = null;
    @property(cc.Prefab)
    xx2: cc.Prefab = null;
    @property(cc.Prefab)
    xx3: cc.Prefab = null;
    @property(cc.Prefab)
    xx4: cc.Prefab = null;

    @property(cc.Node)
    parent: cc.Node = null;
    @property(cc.Node)
    p1: cc.Node = null;
    @property(cc.Node)
    p2: cc.Node = null;
    @property(cc.Node)
    p3: cc.Node = null;


    static instance: XocDiaX4 = null;
    private nodeXx1: cc.Node = null;
    private nodeXx2: cc.Node = null;
    private nodeXx3: cc.Node = null;
    private nodeXx4: cc.Node = null;




    onLoad() {
        XocDiaX4.instance = this;

        this.node.on(cc.Node.EventType.TOUCH_MOVE, (ev: cc.Event.EventTouch) => {
            this.node.x += ev.getDeltaX();
            this.node.y += ev.getDeltaY();
        });

        if (!this.node) return;
        if (!this.node.parent) return;
        // if (!this.xx2) return;
        // if (!this.xx3) return;
        // if (!this.xx4) return;

        // this.nodeXx2 = cc.instantiate(this.xx2);
        // this.nodeXx2.parent = this.parent;
        // this.nodeXx3 = cc.instantiate(this.xx3);
        // this.nodeXx3.parent = this.parent;
        // this.nodeXx4 = cc.instantiate(this.xx4);
        // this.nodeXx4.parent = this.parent;

        this.nodeXx1 = cc.instantiate(this.xx1);
        this.nodeXx1.parent = this.parent;

        // this.nodeXx4.active = true;
        // this.nodeXx3.active = true;
        // this.nodeXx2.active = true;
        this.nodeXx1.active = true;


        //this.show1();
    }

    show1() {



        /* this.nodeXx4.active.true;
        this.nodeXx3.active.true;
        this.nodeXx2.active.true;
        this.nodeXx1.active.true; */
        //[this.nodeXx1, this.nodeXx2, this.nodeXx3, this.nodeXx4].forEach(e => e.active = e == this.nodeXx1);

        /* this.nodeXx5.active = true;
        this.nodeXx5.x = this.p1.x;
        this.nodeXx5.y = this.p1.y;

        this.nodeXx6.active = true;
        this.nodeXx6.x = this.p2.x;
        this.nodeXx6.y = this.p2.y;

        this.nodeXx7.active = true;
        this.nodeXx7.x = this.p3.x;
        this.nodeXx7.y = this.p3.y;

        this.nodeXx8.active = false; */
    }

    show2() {


        this.nodeXx3 = cc.instantiate(this.xx3);
        this.nodeXx3.parent = this.parent;
        this.nodeXx4 = cc.instantiate(this.xx4);
        this.nodeXx4.parent = this.parent;

        this.nodeXx1 = cc.instantiate(this.xx1);
        this.nodeXx1.parent = this.parent;
        this.nodeXx2 = cc.instantiate(this.xx2);
        this.nodeXx2.parent = this.parent;

        this.nodeXx4.active = true;
        this.nodeXx3.active = true;
        this.nodeXx2.active = true;
        this.nodeXx1.active = true;

        /* this.nodeXx4.active.false;
        this.nodeXx3.active.false;
        this.nodeXx1.active.false;
        this.nodeXx2.active.true; */
        //console.log("OKKKKKKKKKKKKKKKKK");
        //this.nodeXx2.active.true;
        //[this.nodeXx1, this.nodeXx2, this.nodeXx3, this.nodeXx4].forEach(e => e.active = e == this.nodeXx2);

        /* this.nodeXx5.active = true;
        this.nodeXx5.x = this.p1.x;
        this.nodeXx5.y = this.p1.y;

        this.nodeXx6.active = true;
        this.nodeXx6.x = this.p2.x;
        this.nodeXx6.y = this.p2.y;

        this.nodeXx7.active = false;

        this.nodeXx8.active = true;
        this.nodeXx8.x = this.p3.x;
        this.nodeXx8.y = this.p3.y; */
    }

    show3() {
        this.nodeXx4.active = true;
        this.nodeXx2.active = true;
        this.nodeXx1.active = true;
        this.nodeXx3.active = true;
        //[this.nodeXx1, this.nodeXx2, this.nodeXx3, this.nodeXx4].forEach(e => e.active = e == this.nodeXx3);

        /* this.nodeXx5.active = true;
        this.nodeXx5.x = this.p1.x;
        this.nodeXx5.y = this.p1.y;

        this.nodeXx6.active = false;

        this.nodeXx7.active = true;
        this.nodeXx7.x = this.p2.x;
        this.nodeXx7.y = this.p2.y;

        this.nodeXx8.active = true;
        this.nodeXx8.x = this.p3.x;
        this.nodeXx8.y = this.p3.y; */
    }

    show4() {

        this.nodeXx3.active = true;
        this.nodeXx2.active = true;
        this.nodeXx1.active = true;
        this.nodeXx4.active = true;
        //[this.nodeXx1, this.nodeXx2, this.nodeXx3, this.nodeXx4].forEach(e => e.active = e == this.nodeXx4);

        /* this.nodeXx5.active = false;

        this.nodeXx6.active = true;
        this.nodeXx6.x = this.p1.x;
        this.nodeXx6.y = this.p1.y;

        this.nodeXx7.active = true;
        this.nodeXx7.x = this.p2.x;
        this.nodeXx7.y = this.p2.y;

        this.nodeXx8.active = true;
        this.nodeXx8.x = this.p3.x;
        this.nodeXx8.y = this.p3.y; */
    }

    toggleShowMini() {
        this.parentMini.stopAllActions();
        if (this.parentMini.scale == 1) {
            this.parentMini.runAction(cc.scaleTo(0.3, 0));
        } else {
            this.parentMini.runAction(cc.scaleTo(0.3, 1));
        }
    }
}
