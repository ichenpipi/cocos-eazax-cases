const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(-101)
export default class Toast extends cc.Component {

    @property({ displayName: CC_DEV && '主节点', type: cc.Node })
    protected main: cc.Node = null;

    @property({ displayName: CC_DEV && '标签', type: cc.Label })
    protected label: cc.Label = null;

    /** 静态实例 */
    protected static instance: Toast = null;

    protected onLoad() {
        this.init();
    }

    protected start() {
        this.reset();
    }

    protected onDestroy() {
        this.release();
    }

    /**
     * 初始化
     */
    protected init() {
        // 设为常驻节点
        cc.game.addPersistRootNode(this.node);
        Toast.instance = this;
    }

    /**
     * 释放
     */
    protected release() {
        Toast.instance = null;
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
    public static show(...texts: string[]) {
        return new Promise<void>(res => {
            const instance = this.instance;
            if (!instance) {
                res();
                return;
            }
            const main = instance.main,
                label = instance.label;
            cc.Tween.stopAllByTarget(main);
            main.opacity = 0;
            main.active = true;
            label.string = texts.join(' ');
            cc.tween(main)
                .to(0.2, { opacity: 200 })
                .delay(2)
                .to(0.2, { opacity: 0 })
                .set({ active: false })
                .call(res)
                .start();
        });
    }

}
