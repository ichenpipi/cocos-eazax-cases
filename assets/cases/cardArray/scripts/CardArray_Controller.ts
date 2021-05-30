const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArray_Controller extends cc.Component {

    @property(cc.Node)
    protected container: cc.Node = null;

    protected start() {
        this.rotateForever();
    }

    /**
     * 无限旋转
     */
    public rotateForever() {
        const node = this.container,
            { x, z } = this.node.eulerAngles;
        cc.tween(node)
            .by(2, { eulerAngles: cc.v3(x, 90, z) })
            .repeatForever()
            .start();
    }

}
