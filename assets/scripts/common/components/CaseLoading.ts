const { ccclass, property, executionOrder } = cc._decorator;

/**
 * 示例加载遮罩
 */
@ccclass
@executionOrder(-100)
export default class CaseLoading extends cc.Component {

    @property({ type: cc.Node, tooltip: CC_DEV && '主节点' })
    protected main: cc.Node = null;

    /** 静态实例 */
    protected static instance: CaseLoading = null;

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
        CaseLoading.instance = this;
    }

    /**
     * 重置
     */
    protected reset() {
        CaseLoading.hide();
    }

    /**
     * 展示
     */
    public static show() {
        const node = this.instance.main
        node.opacity = 0;
        node.active = true;
        cc.tween(node)
            .to(0.2, { opacity: 255 })
            .start();
    }

    /**
     * 隐藏
     */
    public static hide() {
        const node = this.instance.main
        cc.tween(node)
            .to(0.05, { opacity: 0 })
            .call(() => (node.active = false))
            .start();
    }

}
