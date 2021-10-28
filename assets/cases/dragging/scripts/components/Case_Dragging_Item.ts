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

    /** 在容器中 */
    protected inContainer: boolean = false;

    /** 重组 */
    protected isRegrouped: boolean = false;

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
        if (this.group === null || !this.inContainer) {
            return;
        }
        // 记录开始
        this.touchStartPos = event.getLocation();
        // 记录偏移
        const node = this.node,
            touchPosInNode = node.getParent().convertToNodeSpaceAR(event.getLocation());
        this.dragOffset = touchPosInNode.sub(node.getPosition());
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
        if (this.isRegrouped) {
            this.group.onTouchMove(event);
            return;
        }
        const touchPosInWorld = event.getLocation();
        if (!this.isDragging) {
            // 触摸移动距离
            const distance = cc.Vec2.distance(this.touchStartPos, touchPosInWorld);
            if (distance >= 5) {
                // 触发拖拽
                this.isDragging = true;
                this.drag();
                // 重组
                this.isRegrouped = true;
                this.group.regroupItems(this);
                // 直接触发触摸开始回调
                this.group.onTouchStart(event);
            } else {
                return;
            }
        }
        // 移动节点
        const node = this.node,
            touchPosInNode = node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        node.setPosition(touchPosInNode.sub(this.dragOffset));
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
    protected async onTouchEnd(event: cc.Event.EventTouch) {
        if (!this.dragOffset) {
            return;
        }
        // 重置标志
        this.dragOffset = null;
        this.isDragging = false;
        // 转发触摸事件
        if (this.isRegrouped) {
            this.group.onTouchEnd(event);
        }
        this.isRegrouped = false;
    }

    /**
     * 拖起
     */
    protected drag() {
        // 变换容器和位置
        const node = this.node,
            layer = Case_Dragging.moveLayer,
            curPosInWorld = node.parent.convertToWorldSpaceAR(node.position),
            curPosInMoveLayer = layer.convertToNodeSpaceAR(curPosInWorld);
        node.setParent(layer);
        node.setPosition(curPosInMoveLayer);
        node.setSiblingIndex(999);
        // 触发容器回调
        Case_Dragging.container.onItemDrag(this);
    }

    /**
     * 添加到容器
     */
    public addToContainer() {
        this.inContainer = true;
    }

    /**
     * 从容器中移除
     */
    public removeFromContainer() {
        this.inContainer = false;
    }

    /**
     * 移动到目标位置
     * @param pos 
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
            if (node.scale === scale) {
                res();
                return;
            }
            cc.tween(node)
                .to(duration, { scale }, { easing: 'cubicOut' })
                .call(res)
                .start();
        });
    }

}
