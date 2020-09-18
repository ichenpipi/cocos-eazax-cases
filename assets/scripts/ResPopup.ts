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

    // protected options: Options = null;

    protected onLoad() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    protected onDestroy() {
        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    protected updateDisplay() {
        for (let i = 0; i < this.options.items.length; i++) {
            const node = cc.instantiate(this.item);
            node.getComponentInChildren(cc.Label).string = this.options.items[i].name;
            node.getComponent(ClickToLoadUrl).url = this.options.items[i].url;
            node.setParent(this.content);
            node.active = true;
        }
    }

    private onCloseBtnClick() {
        this.hide();
    }

}

interface Options {
    items: { name: string; url: string }[]
}
