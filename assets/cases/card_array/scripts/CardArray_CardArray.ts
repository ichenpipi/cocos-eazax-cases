const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArray_CardArray extends cc.Component {

    @property(cc.Node)
    protected container: cc.Node = null;

    protected start() {
        this.rotateForever();
    }

    /**
     * 无限旋转
     */
    public rotateForever() {
        cc.tween(this.container)
            .by(2, { eulerAngles: cc.v3(0, 90, 0) })
            .repeatForever()
            .start();
    }

}
