import PopupManager from "../../../eazax-ccc/core/PopupManager";
import ResPopup, { ResPopupOptions } from "./popups/resPopup/ResPopup";

const { ccclass, property } = cc._decorator;

@ccclass('ResourceInfo')
export class ResourceInfo {

    @property({ displayName: CC_DEV && '标题' })
    public title: string = '';

    @property({ multiline: true, displayName: CC_DEV && '地址' })
    public url: string = '';

}

/**
 * 点击展示资源弹窗
 */
@ccclass
export default class ClickToShowResPopup extends cc.Component {

    @property({ type: [ResourceInfo], displayName: CC_DEV && '资源列表' })
    public resources: ResourceInfo[] = [];

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 生命周期：销毁
     */
    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    /**
     * 反注册事件
     */
    private unregisterEvent() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    /**
     * 点击回调
     */
    protected onClick() {
        const options: ResPopupOptions = { items: [] },
            resources = this.resources;
        for (let i = 0, l = resources.length; i < l; i++) {
            options.items.push({
                name: resources[i].title,
                url: resources[i].url,
            });
        }
        const params = {
            mode: PopupManager.CacheMode.Frequent
        };
        PopupManager.show(ResPopup.path, options, params);
    }

}
