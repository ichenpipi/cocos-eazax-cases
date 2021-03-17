import PopupBase from "../../../../../eazax-ccc/components/popups/PopupBase";
import ResPopupItem from "./ResPopupItem";

const { ccclass, property } = cc._decorator;

/** 资源弹窗 */
@ccclass
export default class ResPopup extends PopupBase<ResPopupOptions> {

    @property(cc.Node)
    private closeBtn: cc.Node = null;

    @property(cc.Node)
    private content: cc.Node = null;

    @property(cc.Prefab)
    private item: cc.Prefab = null;

    private items: ResPopupItem[] = [];

    /** 资源弹窗路径 */
    public static get path() { return 'prefabs/ResPopup'; }

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    private registerEvent() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    private unregisterEvent() {
        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    protected updateDisplay(options: ResPopupOptions) {
        const count = Math.max(options.items.length, this.items.length);
        for (let i = 0; i < count; i++) {
            if (options.items[i] && !this.items[i]) {
                const node = cc.instantiate(this.item);
                node.setParent(this.content);
                const item = node.getComponent(ResPopupItem);
                item.set(options.items[i].name, options.items[i].url);
                item.node.active = true;
                this.items.push(item);
            } else if (options.items[i] && this.items[i]) {
                const item = this.items[i];
                item.set(options.items[i].name, options.items[i].url);
                item.node.active = true;
            } else {
                this.items[i].node.active = false;
            }
        }
    }

    private onCloseBtnClick() {
        this.hide();
    }

}

/** 资源弹窗选项类型 */
export type ResPopupOptions = {
    items: {
        name: string;
        url: string
    }[];
}
