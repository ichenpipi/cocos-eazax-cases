const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArray_Content extends cc.Component {

    @property(cc.Node)
    protected cardContainer: cc.Node = null;

    protected onLoad() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        this.rotateForever();
    }

    /**
     * 无限旋转
     */
    public rotateForever() {
        const node = this.cardContainer;
        cc.tween(node)
            .by(2, { eulerAngles: cc.v3(0, 90, 0) })
            .repeatForever()
            .start();
    }

}
