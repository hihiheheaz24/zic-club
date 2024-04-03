import XocDiaX4 from "./XocDiaX4";
import HideNode from "./HideNode";

const { ccclass, property } = cc._decorator;

@ccclass
export default class XocDiaX4Switch extends cc.Component {


    onClick1() {
        //XocDiaX4.instance.show1();
    }

    onClick2() {
        XocDiaX4.instance.show2();
		//HideNode.instance.anNodeLon();
    }

    onClick3() {
        //XocDiaX4.instance.show3();
    }

    onClick4() {
        //XocDiaX4.instance.show4();
    }

    toggleShowMini() {
        XocDiaX4.instance.toggleShowMini();
    }
}
