import Case_CollisionQuadTree_Item from "./Case_CollisionQuadTree_Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_CollisionQuadTree_Container extends cc.Component {

    @property({ type: cc.Prefab, tooltip: CC_DEV && '物体预制体' })
    protected itemPrefab: cc.Prefab = null;

    /**
     * 在世界坐标系下的包围盒
     */
    public get rect() {
        return this.node.getBoundingBoxToWorld();
    }

    /**
     * 物体
     */
    public get items() {
        return this.node.getComponentsInChildren(Case_CollisionQuadTree_Item);
    }

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
     * @param event 
     */
    protected onClick(event: cc.Event.EventTouch) {
        const posInWorld = event.getLocation(),
            posInNode = this.node.convertToNodeSpaceAR(posInWorld);
        this.addItem(posInNode);
    }

    /**
     * 添加物体
     * @param pos 
     */
    public addItem(pos?: cc.Vec3 | cc.Vec2) {
        const node = cc.instantiate(this.itemPrefab);
        node.setParent(this.node);
        if (!pos) {
            const node = this.node,
                x = (node.width * Math.random()) - (node.width / 2),
                y = (node.height * Math.random()) - (node.height / 2);
            pos = cc.v2(x, y);
        }
        node.setPosition(pos);
    }

    /**
     * 清空物体
     */
    public clearItems() {
        this.node.removeAllChildren(true);
    }

}
