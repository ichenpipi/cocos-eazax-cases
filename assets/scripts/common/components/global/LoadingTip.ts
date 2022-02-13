const { ccclass, property, executionOrder } = cc._decorator;

/**
 * 加载提示组件
 */
@ccclass
export default class LoadingTip extends cc.Component {

    @property({ type: cc.Node, tooltip: CC_DEV && '主节点' })
    protected main: cc.Node = null;

    /** 静态实例 */
    protected static instance: LoadingTip = null;

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
        LoadingTip.instance = this;
        // 重置
        this.reset();
    }

    /**
     * 释放
     */
    protected release() {
        if (LoadingTip.instance) {
            LoadingTip.instance = null;
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
        node.active = true;
    }

    /**
     * 隐藏
     */
    public hide() {
        const node = this.main;
        node.active = false;
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
