import PopupBase from "../../../../../eazax-ccc/components/popups/PopupBase";
import ResPopupItem from "./ResPopupItem";

const { ccclass, property } = cc._decorator;

/**
 * 资源展示弹窗
 */
@ccclass
export default class ResPopup extends PopupBase<ResPopupOptions> {

    @property(cc.Node)
    protected closeBtn: cc.Node = null;

    @property(cc.Node)
    protected content: cc.Node = null;

    @property(cc.Prefab)
    protected item: cc.Prefab = null;

    /**
     * 物体
     */
    protected items: ResPopupItem[] = [];

    /**
     * 资源弹窗路径
     */
    public static get path() {
        return 'prefabs/ResPopup';
    }

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
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    /**
     * 反注册事件
     */
    protected unregisterEvent() {
        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    /**
     * 更新显示
     * @param options 
     */
    protected updateDisplay(options: ResPopupOptions) {
        const existedItems = this.items,
            optionItems = options.items.filter((v) => (v.name !== '' || v.url !== '')),
            count = Math.max(optionItems.length, existedItems.length);
        for (let i = 0; i < count; i++) {
            // 新生成
            if (optionItems[i] && !existedItems[i]) {
                // 生成节点
                const node = cc.instantiate(this.item);
                node.setParent(this.content);
                // 设置组件
                const item = node.getComponent(ResPopupItem);
                item.set(optionItems[i].name, optionItems[i].url);
                item.node.active = true;
                existedItems.push(item);
            }
            // 复用
            else if (optionItems[i] && existedItems[i]) {
                // 复用组件
                const item = existedItems[i];
                item.set(optionItems[i].name, optionItems[i].url);
                item.node.active = true;
            }
            // 隐藏
            else {
                // 隐藏节点
                existedItems[i].node.active = false;
            }
        }
    }

    /**
     * 关闭按钮点击回调
     */
    protected onCloseBtnClick() {
        this.hide();
    }

}

/**
 * 资源弹窗选项类型
 */
export type ResPopupOptions = {
    items: {
        name: string;
        url: string
    }[];
}
