const { ccclass, property } = cc._decorator;

@ccclass
export default class PopupBase extends cc.Component {

    @property({ type: cc.Node, tooltip: CC_DEV && '背景遮罩' })
    public background: cc.Node = null;

    @property({ type: cc.Node, tooltip: CC_DEV && '弹窗主体' })
    public main: cc.Node = null;

    /**
     * 展示弹窗
     */
    public show() {
        this.node.active = true;
        // 背景
        this.background.opacity = 0;
        this.background.active = true;
        cc.tween(this.background)
            .to(0.3, { opacity: 200 })
            .start();
        // 主体
        this.main.scale = 0;
        this.main.active = true;
        cc.tween(this.main)
            .to(0.3, { scale: 1 }, { easing: 'backOut' })
            .start();
    }

    /**
     * 隐藏弹窗
     */
    public hide() {
        // 背景
        cc.tween(this.background)
            .to(0.3, { opacity: 0 })
            .call(() => {
                this.background.active = false;
            })
            .start();
        // 主体
        cc.tween(this.main)
            .to(0.3, { scale: 0 }, { easing: 'backIn' })
            .call(() => {
                this.main.active = false;
                this.node.active = false;
            })
            .start();
    }

}
