const { ccclass, property, executionOrder } = cc._decorator;

/**
 * 加载提示组件
 */
@ccclass
@executionOrder(-100)
export default class LoadingTip extends cc.Component {

    @property({ type: cc.Node, tooltip: CC_DEV && '主节点' })
    protected main: cc.Node = null;

    /** 静态实例 */
    protected static instance: LoadingTip = null;

    protected onLoad() {
        this.init();
    }

    protected start() {
        this.reset();
    }

    protected init() {
        // 设为常驻节点
        cc.game.addPersistRootNode(this.node);
        // 保存静态实例
        LoadingTip.instance = this;
    }

    /**
     * 重置
     */
    protected reset() {
        LoadingTip.hide();
    }

    /**
     * 展示
     */
    public static show() {
        this.instance.main.active = true;
    }

    /**
     * 隐藏
     */
    public static hide() {
        this.instance.main.active = false;
    }

}
