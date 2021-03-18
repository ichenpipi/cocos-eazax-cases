import PopupManager, { PopupCacheMode, PopupParams } from "../../../eazax-ccc/core/PopupManager";
import ResPopup, { ResPopupOptions } from "./popups/resPopup/ResPopup";
import ResPopupItemInfo from "./popups/resPopup/ResPopupItemInfo";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ClickToShowResPopup extends cc.Component {

    @property({ type: [ResPopupItemInfo] })
    public items: ResPopupItemInfo[] = [];

    protected onLoad() {
        this.registerEvent();
    }

    private registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    private onClick() {
        const options: ResPopupOptions = { items: [] },
            items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i];
            options.items.push({ name: item.title, url: item.url });
        }
        const params: PopupParams = {
            mode: PopupCacheMode.Frequent,
            priority: false
        }
        PopupManager.show(ResPopup.path, options, params);
    }

}
