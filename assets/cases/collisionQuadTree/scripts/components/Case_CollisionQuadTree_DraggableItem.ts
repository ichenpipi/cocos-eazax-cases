import Case_CollisionQuadTree_Item from "./Case_CollisionQuadTree_Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_CollisionQuadTree_DraggableItem extends Case_CollisionQuadTree_Item {

    /**
     * 拖拽位置偏移
     */
    protected dragOffset: cc.Vec2 = null;

    /**
     * 生命周期：加载后
     */
    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 生命周期：延迟帧更新
     */
    protected lateUpdate() {

    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    /**
     * 触摸开始回调
     * @param event 
     */
    protected onTouchStart(event: cc.Event.EventTouch) {
        // 记录偏移
        const posInNode = this.node.getParent().convertToNodeSpaceAR(event.getLocation());
        this.dragOffset = posInNode.sub(this.node.getPosition());
    }

    /**
     * 触摸移动回调
     * @param event 
     */
    protected onTouchMove(event: cc.Event.EventTouch) {
        if (!this.dragOffset) {
            return;
        }
        // 移动节点
        const posInWorld = event.getLocation(),
            posInNode = this.node.getParent().convertToNodeSpaceAR(posInWorld);
        this.node.setPosition(posInNode.sub(this.dragOffset));
    }

    /**
     * 触摸取消回调
     * @param event 
     */
    protected onTouchCancel(event: cc.Event.EventTouch) {
        this.onTouchEnd(event);
    }

    /**
     * 触摸结束回调
     * @param event 
     */
    protected onTouchEnd(event: cc.Event.EventTouch) {
        if (!this.dragOffset) {
            return;
        }
        // 重置状态
        this.dragOffset = null;
    }

}
