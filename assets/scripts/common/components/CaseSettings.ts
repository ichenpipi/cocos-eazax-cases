import ClickToShowResPopup, { ResourceInfo } from "./ClickToShowResPopup";

const { ccclass, property, executionOrder, executeInEditMode } = cc._decorator;

/**
 * 示例设置
 */
@ccclass
@executionOrder(-1)
@executeInEditMode()
export default class CaseSettings extends cc.Component {

    @property()
    protected _title: string = '示例';
    @property({ displayName: CC_DEV && '标题' })
    protected get title() {
        return this._title;
    }
    protected set title(value) {
        this._title = value;
        this.setTitle(value);
    }

    @property()
    protected _resources: ResourceInfo[] = [];
    @property({ type: [ResourceInfo], displayName: CC_DEV && '资源列表' })
    protected get resources() {
        return this._resources;
    }
    protected set resources(value) {
        this._resources = value;
        this.setResources(value);
    }

    @property({ displayName: CC_DEV && '启用物理系统' })
    protected enablePhysics: boolean = false;

    @property({ visible() { return this.enablePhysics; }, displayName: CC_DEV && '启用物理系统调试绘制' })
    protected enablePhysicsDebugDraw: boolean = true;

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        // this.setTitle(this.title);
        // this.setResources(this.resources);
        this.setPhysics(this.enablePhysics);
    }

    /**
     * 设置物理系统
     * @param enable 
     */
    protected setPhysics(enable: boolean) {
        cc.director.getPhysicsManager().enabled = enable;
        if (enable) {
            if (this.enablePhysicsDebugDraw) {
                cc.director.getPhysicsManager().debugDrawFlags = (
                    cc.PhysicsManager.DrawBits.e_aabbBit |
                    // cc.PhysicsManager.DrawBits.e_pairBit |
                    // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
                    cc.PhysicsManager.DrawBits.e_jointBit |
                    cc.PhysicsManager.DrawBits.e_shapeBit
                );
            } else {
                cc.director.getPhysicsManager().debugDrawFlags = 0;
            }
        }
    }

    /**
     * 设置标题
     * @param value 
     */
    protected setTitle(value: string) {
        const node = cc.find('Canvas/Main/UI/title/label') || cc.find('Canvas/Main/UI/Title/label'),
            label = node?.getComponent(cc.Label);
        if (label) {
            label.string = value;
        }
    }

    /**
     * 设置资源列表
     * @param value 
     */
    protected setResources(value: ResourceInfo[]) {
        const node = cc.find('Canvas/Main/UI/title') || cc.find('Canvas/Main/UI/Title'),
            component = node?.getComponent(ClickToShowResPopup);
        if (component) {
            const list = component.resources = [];
            for (let i = 0; i < value.length; i++) {
                list[i] = new ResourceInfo()
                list[i].title = value[i].title;
                list[i].url = value[i].url;
            }
        }
    }

}
