import Case_Dragging from "../Case_Dragging";
import Case_Dragging_Group from "./Case_Dragging_Group";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_Dragging_Item extends cc.Component {

    /** 所属分组 */
    public group: Case_Dragging_Group = null;

    /** 触摸开始位置 */
    protected touchStartPos: cc.Vec2 = null;

    /** 拖拽位置偏移 */
    protected dragOffset: cc.Vec2 = null;

    /** 拖拽中 */
    protected isDragging: boolean = false;

    /** 在选项组中 */
    protected inGroup: boolean = false;

    /** 在容器中 */
    protected inContainer: boolean = false;

    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 监听事件
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
        if (!this.group || !this.inContainer) {
            return;
        }
        // 记录开始
        this.touchStartPos = event.getLocation();
        // 记录偏移
        const touchPosInNode = this.node.getParent().convertToNodeSpaceAR(event.getLocation());
        this.dragOffset = touchPosInNode.sub(this.node.getPosition());
    }

    /**
     * 触摸移动回调
     * @param event 
     */
    protected onTouchMove(event: cc.Event.EventTouch) {
        if (!this.dragOffset) {
            return;
        }
        // 转发触摸事件
        if (this.inGroup) {
            this.group.onTouchMove(event);
            return;
        }
        const touchPosInWorld = event.getLocation();
        if (!this.isDragging) {
            // 触摸移动距离
            const distance = cc.Vec2.distance(this.touchStartPos, touchPosInWorld);
            if (distance >= 1) {
                // 触发拖拽
                this.isDragging = true;
                this.drag();
                // 移动节点
                const touchPosInNode = this.node.getParent().convertToNodeSpaceAR(touchPosInWorld);
                this.node.setPosition(touchPosInNode.sub(this.dragOffset));
                // 重组
                this.group.regroupItems(this);
                // 直接触发触摸开始回调
                this.group.onTouchStart(event);
            }
            return;
        }
        // 移动节点
        const touchPosInNode = this.node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        this.node.setPosition(touchPosInNode.sub(this.dragOffset));
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
        this.dragOffset = null;
        // 重置标志
        this.isDragging = false;
        // 转发触摸事件
        if (this.inGroup) {
            this.group.onTouchEnd(event);
        }
    }

    /**
     * 拖起
     */
    protected drag() {
        // 变换容器和位置
        const node = this.node,
            moveLayer = Case_Dragging.moveLayer,
            curPosInWorld = node.getParent().convertToWorldSpaceAR(node.getPosition()),
            curPosInMoveLayer = moveLayer.convertToNodeSpaceAR(curPosInWorld);
        node.setParent(moveLayer);
        node.setPosition(curPosInMoveLayer);
        node.setSiblingIndex(999);
    }

    /**
     * 嵌入到容器
     */
    public embedToContainer() {
        this.inContainer = true;
        this.inGroup = false;
    }

    /**
     * 回到选项组
     */
    public backToGroup() {
        this.inContainer = false;
        this.inGroup = true;
    }

    /**
     * 移动到目标位置
     * @param pos 
     * @param delay 
     */
    public moveTo(pos: cc.Vec3) {
        return new Promise<void>(res => {
            const node = this.node,
                distance = cc.Vec2.distance(node.position, pos),
                duration = distance * (1 / 1800);
            cc.tween(node)
                .to(duration, { position: pos }, { easing: 'cubicOut' })
                .call(res)
                .start();
        });
    }

    /**
     * 缩放
     * @param scale 
     * @param duration 
     */
    public scaleTo(scale: number, duration: number = 0.1) {
        return new Promise<void>(res => {
            const node = this.node;
            cc.tween(node)
                .to(duration, { scale }, { easing: 'cubicOut' })
                .call(res)
                .start();
        });
    }

}
