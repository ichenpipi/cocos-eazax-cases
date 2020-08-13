const { ccclass, property } = cc._decorator;

@ccclass
export default class ClickToLoadUrl extends cc.Component {

    @property({ multiline: true })
    private url: string = 'https://gitee.com/ifaswind/eazax-ccc';

    @property()
    private openInNewTap: boolean = true;

    protected onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.load, this);
    }

    protected onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.load, this);
    }

    private load() {
        if (this.openInNewTap) window.open(this.url);
        else window.location.href = this.url;
    }

}
