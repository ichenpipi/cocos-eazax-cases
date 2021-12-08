import NodeUtil from "../../../../eazax-ccc/utils/NodeUtil";
import Case_Dragging from "../Case_Dragging";
import Case_Dragging_Item from "./Case_Dragging_Item";

const { ccclass, property } = cc._decorator;

/**
 * 相交状态
 */
enum IntersectionStatus {
    /** 无 */
    OUT = 1,
    /** 相交 / 包含 */
    IN,
}

@ccclass
export default class Case_Dragging_Group extends cc.Component {

    @property({ type: cc.Layout, tooltip: CC_DEV && '布局组件' })
    public layout: cc.Layout = null;

    /** 拖拽位置偏移 */
    protected dragOffset: cc.Vec2 = null;

    /** 拖拽中 */
    protected isDragging: boolean = false;

    /** 拖拽中 */
    protected lastStatus: IntersectionStatus = IntersectionStatus.OUT;

    /** items */
    public items: Case_Dragging_Item[] = [];

    /** 数量 */
    public get itemCount() {
        return this.contentNode.childrenCount;
    }

    /** 内容节点 */
    public get contentNode() {
        return this.layout.node;
    }

    /** 世界包围盒 */
    public get rect() {
        return NodeUtil.getNodeSelfBoundingBoxToWorld(this.contentNode);
    }

    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 监听事件
     */
    protected registerEvent() {
        this.layout.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.layout.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
        this.layout.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
        this.layout.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    /**
     * 触摸开始回调
     * @param event 
     */
    public onTouchStart(event: cc.Event.EventTouch) {
        // 记录偏移
        const node = this.contentNode,
            touchPosInWorld = event.getLocation(),
            touchPosInNode = node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        this.dragOffset = touchPosInNode.sub(node.getPosition());
        // 相交检测
        this.updateIntersection();
    }

    /**
     * 触摸移动回调
     * @param event 
     */
    public onTouchMove(event: cc.Event.EventTouch) {
        if (!this.dragOffset) {
            return;
        }
        // 移动
        const node = this.contentNode,
            touchPosInWorld = event.getLocation(),
            touchPosInNode = node.getParent().convertToNodeSpaceAR(touchPosInWorld);
        node.setPosition(touchPosInNode.sub(this.dragOffset));
        // 拖起
        if (!this.isDragging) {
            this.isDragging = true;
            this.drag();
        }
        // 相交检测
        this.updateIntersection();
    }

    /**
     * 触摸取消回调
     * @param event 
     */
    public onTouchCancel(event: cc.Event.EventTouch) {
        this.onTouchEnd(event);
    }

    /**
     * 触摸结束回调
     * @param event 
     */
    public onTouchEnd(event: cc.Event.EventTouch) {
        if (!this.dragOffset) {
            return;
        }
        // 重置标志
        this.dragOffset = null;
        // 放下
        this.isDragging = false;
        this.drop();
    }

    /**
     * 拖起
     */
    protected drag() {
        // 显示在最前面
        this.node.setSiblingIndex(999);
        // 启用自动布局
        this.enableLayout(true);
        // 放大物体
        const items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            items[i].scaleTo(1);
        }
    }

    /**
     * 放下
     */
    protected drop() {
        // 碰撞检测
        if (this.hitTest()) {
            // 触发容器回调
            Case_Dragging.container.onGroupDrop(this);
            // 物体嵌入容器
            this.embedItems();
            // 关闭节点（避免误触）
            this.contentNode.setPosition(0);
            this.contentNode.active = false;
            // 重置相交状态
            this.lastStatus = IntersectionStatus.OUT;
        } else {
            // 启用自动布局
            this.enableLayout(true);
            // 复位
            this.reposition();
        }
    }

    /**
     * 更新相交状态
     */
    protected updateIntersection() {
        const intersects = this.hitTest();
        if (this.lastStatus === IntersectionStatus.OUT && intersects) {
            // 相交/包含状态
            this.lastStatus = IntersectionStatus.IN;
            // 触发进入回调
            Case_Dragging.container.onGroupDragEnter(this);
        } else if (this.lastStatus === IntersectionStatus.IN && !intersects) {
            // 无
            this.lastStatus = IntersectionStatus.OUT;
            // 触发离开回调
            Case_Dragging.container.onGroupDragLeave(this);
        }
    }

    /**
     * 检查碰撞
     */
    protected hitTest() {
        return this.rect.intersects(Case_Dragging.container.rect);
    }

    /**
     * 复位
     */
    protected async reposition() {
        // 缩小物体
        const items = this.items;
        for (let i = 0, l = items.length; i < l; i++) {
            items[i].scaleTo(0.74);
        }
        //移动
        await this.moveTo(cc.v3(0));
    }

    /**
     * 将该组物体嵌入容器
     */
    protected embedItems() {
        // 禁用自动布局
        this.enableLayout(false);
        // 容器变换
        const container = Case_Dragging.container,
            containerContent = container.contentNode,
            items = this.items;
        const tasks = [];
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i],
                node = item.node;
            // 计算位置
            const targetPosInContainer = container.getNextSpacePos(),
                curPosInWorld = node.getParent().convertToWorldSpaceAR(node.getPosition()),
                curPosInContainer = containerContent.convertToNodeSpaceAR(curPosInWorld);
            // 添加到容器并复原位置
            container.addOptionItem(item);
            item.embedToContainer();
            node.setPosition(curPosInContainer);
            // 移动
            const duration = 0.1 + (i * 0.02);
            tasks.push(new Promise<void>(res => {
                cc.tween(node)
                    .to(duration, { position: targetPosInContainer, scale: 1 }, { easing: 'cubicOut' })
                    .call(res)
                    .start();
            }));
        }
        return Promise.all(tasks);
    }

    /**
     * 重组该组的物体
     * @param triggerItem 
     */
    public regroupItems(triggerItem: Case_Dragging_Item) {
        const contentNode = this.contentNode,
            items = this.items;
        // 先计算好物体在分组里的位置
        const itemPosInContent = this.getTargetSpacePos(items.indexOf(triggerItem) + 1);
        // 将分组内容节点移动到触发拖拽的物体当前位置
        const triggerNode = triggerItem.node,
            itemPosInWorld = triggerNode.getParent().convertToWorldSpaceAR(triggerNode.getPosition()),
            posInContentParent = contentNode.getParent().convertToNodeSpaceAR(itemPosInWorld) as unknown as cc.Vec3;
        contentNode.setPosition(posInContentParent.sub(itemPosInContent));
        // 禁用自动布局
        this.enableLayout(false);
        // 启用内容节点
        contentNode.active = true;
        // 逐个飞回来
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i],
                node = item.node;
            // 停止缓动
            cc.Tween.stopAllByTarget(node);
            // 计算位置
            const targetPosInGroup = this.getNextSpacePos();
            // 添加到分组并复原位置
            item.backToGroup();
            node.setParent(contentNode);
            node.setPosition(targetPosInGroup);
        }
    }

    /**
     * 移动到目标位置
     * @param pos 
     */
    protected moveTo(pos: cc.Vec3) {
        return new Promise<void>(res => {
            const node = this.contentNode,
                distance = cc.Vec2.distance(node.position, pos),
                duration = distance * (1 / 1500);
            cc.tween(node)
                .to(duration, { position: pos }, { easing: 'cubicOut' })
                .call(res)
                .start();
        });
    }

    /**
     * 添加物体
     * @param item 
     */
    public addOptionItem(item: Case_Dragging_Item) {
        item.group = this;
        item.node.setParent(this.contentNode);
        this.items.push(item);
    }

    /**
     * 清空物体
     */
    public clear() {
        this.contentNode.destroyAllChildren();
    }

    /**
     * 获取目标位置的坐标
     * @param count
     */
    public getTargetSpacePos(count: number) {
        const layout = this.layout,
            { paddingLeft, spacingX } = layout,
            layoutWidth = layout.node.width,
            itemWidth = this.items[0].node.width,
            x = paddingLeft + (count * itemWidth) + ((count - 1) * spacingX) - (itemWidth / 2) - (layoutWidth / 2);
        return cc.v3(x, 0, 0);
    }

    /**
     * 获取下一个位置的坐标
     */
    public getNextSpacePos() {
        return this.getTargetSpacePos(this.itemCount + 1);
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
