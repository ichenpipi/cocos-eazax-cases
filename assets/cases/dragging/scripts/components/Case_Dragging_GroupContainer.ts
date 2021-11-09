import Case_Dragging_Group from "./Case_Dragging_Group";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_Dragging_GroupContainer extends cc.Component {

    @property({ type: cc.Layout, tooltip: CC_DEV && '布局组件' })
    public layout: cc.Layout = null;

    /** 容器下的所有组 */
    protected _groups: Case_Dragging_Group[] = null;

    /** 容器下的所有组 */
    public get groups() {
        if (!this._groups || this._groups.length === 0) {
            this._groups = this.layout.getComponentsInChildren(Case_Dragging_Group);
        }
        return this._groups;
    }

    /**
     * 启用或禁用自动布局
     * @param enabled 
     */
    public enableLayout(enabled: boolean) {
        this.layout.enabled = enabled;
    }

    /**
     * 强制更新布局
     */
    public forceUpdateLayout() {
        const children = this.layout.node.children;
        for (let i = 0; i < children.length; i++) {
            if (children[i].active)
                children[i]['_activeInHierarchy'] = true;
        }
        this.layout['_layoutDirty'] = true;
        this.layout.updateLayout();
    }

}
