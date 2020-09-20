import PopupBase from "../eazax-ccc/components/popup/PopupBase";
import ClickToLoadUrl from "./ClickToLoadUrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResPopup extends PopupBase<Options> {

    @property(cc.Node)
    private closeBtn: cc.Node = null;

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Node)
    private item: cc.Node = null;

    private items: cc.Node[] = [];

    protected onLoad() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    protected onDestroy() {
        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    protected updateDisplay() {
        const count = Math.max(this.options.items.length, this.items.length);
        for (let i = 0; i < count; i++) {
            if (this.options.items[i] && !this.items[i]) {
                const node = cc.instantiate(this.item);
                node.getComponentInChildren(cc.Label).string = this.options.items[i].name;
                node.getComponent(ClickToLoadUrl).url = this.options.items[i].url;
                node.setParent(this.content);
                node.active = true;
                this.items.push(node);
            } else if (this.options.items[i] && this.items[i]) {
                const node = this.items[i];
                node.getComponentInChildren(cc.Label).string = this.options.items[i].name;
                node.getComponent(ClickToLoadUrl).url = this.options.items[i].url;
                node.active = true;
            } else {
                this.items[i].active = false;
            }
        }
    }

    private onCloseBtnClick() {
        this.hide();
    }

}

interface Options {
    items: { name: string; url: string }[]
}
