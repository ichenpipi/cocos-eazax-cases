const { ccclass, property } = cc._decorator;

@ccclass
export default class ClickToLoadUrl extends cc.Component {

    @property({ multiline: true })
    public url: string = 'https://gitee.com/ifaswind/eazax-ccc';

    @property()
    public openInNewTap: boolean = true;

    protected onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    protected onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    private onClick() {
        if (this.openInNewTap) window.open(this.url);
        else window.location.href = this.url;
    }

}
