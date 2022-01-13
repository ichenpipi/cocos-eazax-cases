import PopupManager from "../../../eazax-ccc/core/PopupManager";
import ResPopup, { ResPopupOptions } from "./popups/resPopup/ResPopup";

const { ccclass, property } = cc._decorator;

@ccclass('ResPopupItemInfo')
class ResPopupItemInfo {

    @property({ tooltip: CC_DEV && '标题' })
    public title: string = '';

    @property({ multiline: true, tooltip: CC_DEV && '地址' })
    public url: string = '';

}

@ccclass
export default class ClickToShowResPopup extends cc.Component {

    @property({ type: [ResPopupItemInfo] })
    protected items: ResPopupItemInfo[] = [];

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    /**
     * 点击回调
     */
    protected onClick() {
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
