const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArrayCard extends cc.Component {

    @property(cc.Node)
    protected front: cc.Node = null;

    @property(cc.Node)
    protected back: cc.Node = null;

    /** 节点在世界坐标中的 z 值 */
    public get z() { return this._z; }
    protected _z: number = 0;

    protected onEnable() {
        this.updateWorldZ();
    }

    protected update(dt: number) {
        this.updateDisplay();
    }

    /**
     * 更新样式
     */
    protected updateDisplay() {
        const front = this.isFacingScreen();
        this.front.active = front;
        this.back.active = !front;
    }

    /**
     * 是否面向屏幕
     */
    protected isFacingScreen() {
        const node = this.node,
            container = node.getParent(),
            worldPos = container.convertToWorldSpaceAR(node.position),
            localPos = container.parent.convertToNodeSpaceAR(worldPos);
        return localPos.z > 0;
    }

    /**
     * 更新节点在世界坐标中的 z 值
     */
    public updateWorldZ() {
        const worldPos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        this._z = worldPos.z;
    }

    /**
     * 设置层级
     * @param index 下标
     */
    public setSiblingIndex(index: number) {
        this.node.setSiblingIndex(index);
    }

}
