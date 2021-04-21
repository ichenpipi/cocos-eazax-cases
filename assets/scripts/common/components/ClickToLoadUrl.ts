const { ccclass, property } = cc._decorator;

@ccclass
export default class ClickToLoadUrl extends cc.Component {

    @property({ multiline: true })
    public url: string = 'https://gitee.com/ifaswind/eazax-ccc';

    @property({ tooltip: CC_DEV && '是否使用新窗口打开' })
    public openInNewTap: boolean = true;

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 订阅事件
     */
    private registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    /**
     * 取消事件订阅
     */
    private unregisterEvent() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    /**
     * 点击回调
     */
    private onClick() {
        const url = this.url;
        if (!url || url === '') {
            return;
        }
        // 是否使用新窗口打开
        if (this.openInNewTap) {
            // 新窗口打开
            window.open(url);
        } else {
            // 当前窗口打开
            window.location.href = url;
        }
    }

}
