const { ccclass, property, executeInEditMode } = cc._decorator;

export enum ItemStatus {
    NONE = 1,
    CANDIDATE,
    COLLISION,
}

@ccclass
@executeInEditMode
export default class Case_CollisionQuadTree_Item extends cc.Component {

    /**
     * 点击销毁
     */
    protected clickToDestroy: boolean = true;

    /**
     * 上一个状态
     */
    public lastStatus: ItemStatus = ItemStatus.NONE;

    /**
     * 当前状态
     */
    public curStatus: ItemStatus = ItemStatus.NONE;

    /**
     * 在世界坐标系下的包围盒
     */
    public get rect() {
        return this.node.getBoundingBoxToWorld();
    }

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    /**
     * 生命周期：延迟帧更新
     */
    protected lateUpdate() {
        if (this.curStatus !== this.lastStatus) {
            switch (this.curStatus) {
                case ItemStatus.NONE: {
                    this.node.color = cc.Color.BLACK;
                    break;
                }
                case ItemStatus.CANDIDATE: {
                    this.node.color = cc.Color.GREEN;
                    break;
                }
                case ItemStatus.COLLISION: {
                    this.node.color = cc.Color.RED;
                    break;
                }
            }
        }
    }

    /**
     * 初始化
     */
    protected init() {
        this.curStatus = this.lastStatus = ItemStatus.NONE;

        this.node.width = 15;
        this.node.height = 15;
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
        // 停止冒泡
        event.stopPropagation();
        // 销毁
        if (this.clickToDestroy) {
            this.node.destroy();
        }
    }

    /**
     * 更新状态
     * @param newStatus 
     */
    public updateStatus(newStatus: ItemStatus) {
        this.lastStatus = this.curStatus;
        this.curStatus = newStatus;
    }

    public onCollisionBegin(other: any, self: any) {

    }

    public onCollisionEnd(other: any, self: any) {

    }

}
