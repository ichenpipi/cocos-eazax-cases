const { ccclass, property } = cc._decorator;

@ccclass
export default class ClickToLoadUrl extends cc.Component {

    @property({ multiline: true })
    private url: string = 'https://gitee.com/ifaswind/eazax-ccc';

    protected onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.loadUrl, this);
    }

    protected onDestroy() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.loadUrl, this);
    }

    private loadUrl() {
        window.location.href = this.url;
    }

}
