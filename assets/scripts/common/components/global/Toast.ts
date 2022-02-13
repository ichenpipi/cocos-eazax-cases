const { ccclass, property, executionOrder } = cc._decorator;

/**
 * Toast
 */
@ccclass
export default class Toast extends cc.Component {

    @property({ type: cc.Node, displayName: CC_DEV && '主节点' })
    protected main: cc.Node = null;

    @property({ type: cc.Label, displayName: CC_DEV && '标签' })
    protected label: cc.Label = null;

    /** 静态实例 */
    protected static instance: Toast = null;

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
        Toast.instance = this;
        // 重置
        this.reset();
    }

    /**
     * 释放
     */
    protected release() {
        if (Toast.instance) {
            Toast.instance = null;
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
     * @param texts 内容 
     */
    public show(...texts: string[]) {
        // 节点
        const node = this.main;
        cc.Tween.stopAllByTarget(node);
        if (!node.active) {
            node.opacity = 0;
            node.active = true;
        }
        // 标签
        this.label.string = texts.join(' ');
        // 动画
        const duration = ((200 - node.opacity) / 200) * 0.2;
        cc.tween(node)
            .to(duration, { opacity: 200 })
            .delay(2)
            .to(0.2, { opacity: 0 })
            .set({ active: false })
            .start();
    }

    /**
     * 隐藏
     */
    public hide() {
        // 节点
        const node = this.main;
        cc.Tween.stopAllByTarget(node);
        // 动画
        const duration = (node.opacity / 200) * 0.2;
        cc.tween(node)
            .to(duration, { opacity: 0 })
            .set({ active: false })
            .start();
    }

    // --------------------------------------------------

    /**
     * 展示
     * @param texts 内容 
     */
    public static show(...texts: string[]) {
        if (!this.instance) {
            return;
        }
        this.instance.show(...texts);
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
