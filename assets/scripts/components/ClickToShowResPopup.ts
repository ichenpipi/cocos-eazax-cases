import PopupManager, { PopupCacheMode } from "../../eazax-ccc/core/PopupManager";
import ResPopup, { ResPopupOptions } from "./popups/ResPopup";
import ResPopupItemInfo from "./popups/ResPopupItemInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ClickToShowResPopup extends cc.Component {

    @property({ type: [ResPopupItemInfo] })
    public items: ResPopupItemInfo[] = [];

    protected onLoad() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    private async onClick() {
        let options: ResPopupOptions = { items: [] };
        for (let i = 0; i < this.items.length; i++) {
            options.items.push({ name: this.items[i].title, url: this.items[i].url });
        }

        PopupManager.show(ResPopup.path, options, PopupCacheMode.Once);
        PopupManager.show(ResPopup.path, options, PopupCacheMode.Once);
        PopupManager.show(ResPopup.path, options, PopupCacheMode.Once);
        PopupManager.show(ResPopup.path, options, PopupCacheMode.Once);

    }

}