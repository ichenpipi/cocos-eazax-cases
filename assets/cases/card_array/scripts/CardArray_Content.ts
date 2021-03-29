const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArray_Content extends cc.Component {

    @property(cc.Node)
    protected container: cc.Node = null;

    @property(cc.Node)
    protected container2: cc.Node = null;

    protected onLoad() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        this.rotateForever(this.container);
        this.rotateForever(this.container2);
    }

    /**
     * 无限旋转
     */
    public rotateForever(node) {
        cc.tween(node)
            .by(2, { eulerAngles: cc.v3(0, 90, 0) })
            .repeatForever()
            .start();
    }

}
