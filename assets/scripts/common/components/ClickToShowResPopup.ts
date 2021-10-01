import PopupManager from "../../../eazax-ccc/core/PopupManager";
import ResPopup, { ResPopupOptions } from "./popups/resPopup/ResPopup";

const { ccclass, property } = cc._decorator;

@ccclass('ResPopupItemInfo')
class ResPopupItemInfo {

    @property()
    public title: string = '';

    @property({ multiline: true })
    public url: string = '';

}

@ccclass
export default class ClickToShowResPopup extends cc.Component {

    @property({ type: [ResPopupItemInfo] })
    public items: ResPopupItemInfo[] = [];

    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 订阅事件
     */
    private registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    /**
     * 点击回调
     */
    private onClick() {
        const options: ResPopupOptions = { items: [] },
            items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i],
                info = {
                    name: item.title,
                    url: item.url
                };
            options.items.push(info);
        }
        const params = {
            mode: PopupManager.CacheMode.Frequent
        }
        PopupManager.show(ResPopup.path, options, params);
    }

}
