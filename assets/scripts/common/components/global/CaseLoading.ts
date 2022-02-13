const { ccclass, property, executionOrder } = cc._decorator;

/**
 * 示例加载遮罩
 */
@ccclass
export default class CaseLoading extends cc.Component {

    @property({ type: cc.Node, tooltip: CC_DEV && '主节点' })
    protected main: cc.Node = null;

    /** 静态实例 */
    protected static instance: CaseLoading = null;

    protected onLoad() {
        this.init();
    }

    protected onDestroy() {
        this.release();
    }

    /**
     * 初始化
     */
    protected init() {
        // 保存静态实例
        CaseLoading.instance = this;
        // 重置
        this.reset();
    }

    /**
     * 释放
     */
    protected release() {
        if (CaseLoading.instance === this) {
            CaseLoading.instance = null;
        }
    }

    /**
     * 重置
     */
    protected reset() {
        this.main.active = false;
    }

    /**
     * 展示
     */
    public show() {
        const node = this.main;
        node.opacity = 0;
        node.active = true;
        cc.tween(node)
            .to(0.2, { opacity: 255 })
            .start();
    }

    /**
     * 隐藏
     */
    public hide() {
        const node = this.main;
        cc.tween(node)
            .to(0.05, { opacity: 0 })
            .set({ active: false })
            .start();
    }

    // --------------------------------------------------

    /**
     * 展示
     */
    public static show() {
        if (!this.instance) {
            return;
        }
        this.instance.show();
    }

    /**
     * 隐藏
     */
    public static hide() {
        if (!this.instance) {
            return;
        }
        this.instance.hide();
    }

}
