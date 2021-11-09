import NodeUtil from "../../../../eazax-ccc/utils/NodeUtil";
import Case_Dragging_Group from "./Case_Dragging_Group";
import Case_Dragging_Item from "./Case_Dragging_Item";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_Dragging_Container extends cc.Component {

    @property({ type: cc.Layout, tooltip: CC_DEV && '布局组件' })
    public layout: cc.Layout = null;

    @property({ tooltip: CC_DEV && '物体尺寸' })
    public itemSize: cc.Size = new cc.Size(80, 80);

    @property({ tooltip: CC_DEV && '占位节点的不透明度' })
    public placeholderOpacity: number = 100;

    /** 占位节点 */
    protected placeholders: cc.Node[] = [];

    /** 节点池 */
    protected nodePool: cc.NodePool = new cc.NodePool();

    /** 内容节点 */
    public get contentNode() {
        return this.layout.node;
    }

    /** 数量 */
    public get itemCount() {
        return this.contentNode.childrenCount;
    }

    /** 世界包围盒 */
    public get rect() {
        return NodeUtil.getNodeSelfBoundingBoxToWorld(this.node);
    }

    protected onDestroy() {
        this.release();
    }

    /**
     * 释放
     */
    protected release() {
        // 清空节点池
        this.nodePool.clear();
    }

    /**
     * 添加静态物体
     * @param item 
     */
    public addStaticItem(item: Case_Dragging_Item) {
        item.node.setParent(this.contentNode);
    }

    /**
     * 添加选项物体
     * @param item 
     */
    public addOptionItem(item: Case_Dragging_Item) {
        item.node.setParent(this.contentNode);
    }

    /**
     * 选项进入包围盒
     * @param group 
     */
    public onGroupDragEnter(group: Case_Dragging_Group) {
        // 启用自动布局
        this.enableLayout(true);
        // 展示占位
        const itemNode = group.items[0].node,
            spriteFrame = itemNode.getComponent(cc.Sprite).spriteFrame;
        this.showPlaceholders(group.itemCount, spriteFrame, itemNode.color.clone());
    }

    /**
     * 选项离开包围盒
     * @param group 
     */
    public onGroupDragLeave(group: Case_Dragging_Group) {
        // 启用自动布局
        this.enableLayout(true);
        // 隐藏占位
        this.hidePlaceholders();
    }

    /**
     * 选项放入
     * @param group 
     */
    public onGroupDrop(group: Case_Dragging_Group) {
        // 禁用自动布局
        this.enableLayout(false);
        // 隐藏占位
        this.hidePlaceholders();
    }

    /**
     * 展示占位
     * @param quantity 
     * @param spriteFrame 
     */
    protected showPlaceholders(quantity: number, spriteFrame: cc.SpriteFrame, color: cc.Color) {
        const placeholders = this.placeholders,
            nodePool = this.nodePool,
            size = this.itemSize,
            scale = 1,
            opacity = this.placeholderOpacity;
        for (let i = 0; i < quantity; i++) {
            // 生成节点
            const node = nodePool.get() || new cc.Node();
            node.name = 'Placeholder';
            node.setContentSize(size);
            node.setScale(scale);
            node.opacity = opacity;
            node.color = color;
            // 设置图像
            const sprite = node.getComponent(cc.Sprite) || node.addComponent(cc.Sprite);
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            sprite.trim = false;
            sprite.spriteFrame = spriteFrame;
            // 添加到布局
            node.setParent(this.contentNode);
            placeholders.push(node);
        }
    }

    /**
     * 隐藏占位
     */
    protected hidePlaceholders() {
        const placeholders = this.placeholders,
            nodePool = this.nodePool;
        while (placeholders.length > 0) {
            const node = placeholders.shift();
            node.getComponent(cc.Sprite).spriteFrame = null;
            nodePool.put(node);
        }
    }

    /**
     * 清空 item
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
            layoutHeight = layout.node.height, layoutWidth = layout.node.width,
            itemHeight = this.itemSize.height, itemWidth = this.itemSize.width,
            lineMaxCount = this.getLineMaxCount(), lines = Math.ceil(count / lineMaxCount),
            rowCount = (count % lineMaxCount === 0) ? lineMaxCount : count % lineMaxCount,
            x = layout.paddingLeft + (rowCount * itemWidth) + ((rowCount - 1) * layout.spacingX) - (itemWidth / 2) - (layoutWidth / 2),
            y = -(layout.paddingTop + (lines * itemHeight) + ((lines - 1) * layout.spacingY) - (itemHeight / 2) - (layoutHeight * 0.5));
        return cc.v3(x, y, 0);
    }

    /**
     * 获取下一个位置的坐标
     */
    public getNextSpacePos() {
        return this.getTargetSpacePos(this.itemCount + 1);
    }

    /**
     * 获取一行的最大容量
     */
    protected getLineMaxCount() {
        const layoutWidth = this.layout.node.width,
            { paddingLeft, paddingRight, spacingX } = this.layout,
            itemWidth = this.itemSize.width,
            count = (layoutWidth - paddingLeft - paddingRight + spacingX) / (itemWidth + spacingX)
        return Math.floor(count);
    }

    /**
     * 启用或禁用自动布局
     * @param enabled 
     */
    public enableLayout(enabled: boolean) {
        // 停止子节点的缓动
        if (enabled) {
            const nodes = this.contentNode.children;
            for (let i = 0, l = nodes.length; i < l; i++) {
                cc.Tween.stopAllByTarget(nodes[i]);
            }
        }
        // 布局
        this.layout.enabled = enabled;
    }

}
