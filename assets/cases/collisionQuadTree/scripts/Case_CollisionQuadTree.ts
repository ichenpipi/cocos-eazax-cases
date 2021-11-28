import * as Quadtree from '../lib/quadtree';
import Case_CollisionQuadTree_Container from "./components/Case_CollisionQuadTree_Container";
import Case_CollisionQuadTree_Item, { ItemStatus } from "./components/Case_CollisionQuadTree_Item";
import Case_CollisionQuadTree_DraggableItem from "./components/Case_CollisionQuadTree_DraggableItem";

const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class Case_CollisionQuadTree extends cc.Component {

    @property({ type: Case_CollisionQuadTree_Container, tooltip: CC_DEV && '物体容器组件' })
    protected container: Case_CollisionQuadTree_Container = null;

    @property({ type: cc.Graphics, tooltip: CC_DEV && '绘图组件' })
    protected graphics: cc.Graphics = null;

    @property({ type: Case_CollisionQuadTree_DraggableItem, tooltip: CC_DEV && '拖拽物体组件' })
    protected dragItem: Case_CollisionQuadTree_DraggableItem = null;

    @property({ type: cc.Node, tooltip: CC_DEV && '添加物体按钮节点' })
    protected addBtnNode: cc.Node = null;

    @property({ type: cc.Node, tooltip: CC_DEV && '添加物体按钮2节点' })
    protected addBtn2Node: cc.Node = null;

    @property({ type: cc.Node, tooltip: CC_DEV && '清空按钮节点' })
    protected clearBtnNode: cc.Node = null;

    /**
     * 四叉树
     */
    protected quadTree: Quadtree = null;

    /**
     * 生命周期：节点加载后
     */
    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    /**
     * 生命周期：节点开始
     */
    protected start() {
        this.initQuadTree();
    }

    /**
     * 生命周期：节点销毁前
     */
    protected onDestroy() {
        this.unregisterEvent();
        this.release();
    }

    /**
     * 生命周期：帧更新
     */
    protected update() {
        this.doCollision();
    }

    /**
     * 初始化四叉树
     */
    protected initQuadTree() {
        const rect = this.container.rect;
        this.quadTree = new Quadtree({
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
        });
    }

    /**
     * 更新四叉树
     */
    protected updateQuadTree() {
        // 重置四叉树
        const quadTree = this.quadTree;
        quadTree.clear();
        // 遍历所有物体
        const items = this.container.items;
        for (let i = 0, l = items.length; i < l; i++) {
            const item = items[i];
            // 重置物体状态
            item.updateStatus(ItemStatus.NONE);
            // 插入到四叉树中
            const rect = item.rect,
                info: ItemRect = {
                    x: rect.x,
                    y: rect.y,
                    width: rect.width,
                    height: rect.height,
                    item: item,
                };
            quadTree.insert(info);
        }
    }

    /**
     * 绘制四叉树节点
     */
    protected drawQuadTreeNodes() {
        // 清除旧路径
        const graphics = this.graphics;
        graphics.clear();
        graphics.strokeColor = cc.color(255, 0, 0, 150);
        // 递归函数
        function creatPath(tree: Quadtree) {
            const subTrees = tree.nodes;
            // 是否有子节点？
            // 没有子节点才绘制路径
            if (subTrees.length === 0) {
                const rect = tree.bounds;
                graphics.rect(rect.x, rect.y, rect.width, rect.height);
            } else {
                // 递归子节点
                for (let i = 0; i < subTrees.length; i++) {
                    creatPath(subTrees[i]);
                }
            }
        }
        // 递归生成路径
        creatPath(this.quadTree);
        // 绘制路径
        graphics.stroke();
    }

    /**
     * 碰撞检测
     */
    protected doCollision() {
        // 更新四叉树
        this.updateQuadTree();
        // 绘制四叉树节点
        this.drawQuadTreeNodes();

        // 筛选物体
        const rect = this.dragItem.rect,
            info = {
                x: rect.x,
                y: rect.y,
                width: rect.width,
                height: rect.height,
            },
            candidates = this.quadTree.retrieve<ItemRect>(info);    // 直接传 rect 也行
        // 遍历候选物体
        for (let i = 0, l = candidates.length; i < l; i++) {
            // 更新物体状态
            const item = candidates[i].item;
            if (rect.intersects(item.rect)) {
                item.updateStatus(ItemStatus.COLLISION);
            } else {
                item.updateStatus(ItemStatus.CANDIDATE);
            }
        }
    }

    // ----------------------------------------------------------------------------------------------------

    /**
     * 注册事件
     */
    protected registerEvent() {
        cc.Canvas.instance.node.on(cc.Node.EventType.SIZE_CHANGED, this.onGraphicsNodeChange, this);
        this.container.node.on(cc.Node.EventType.POSITION_CHANGED, this.onGraphicsNodeChange, this);
        this.container.node.on(cc.Node.EventType.SIZE_CHANGED, this.onGraphicsNodeChange, this);
        // 按钮
        this.addBtnNode.on(cc.Node.EventType.TOUCH_END, this.onAddBtnClick, this);
        this.addBtn2Node.on(cc.Node.EventType.TOUCH_END, this.onAddBtn2Click, this);
        this.clearBtnNode.on(cc.Node.EventType.TOUCH_END, this.onClearBtnClick, this);
    }

    /**
     * 反注册事件
     */
    protected unregisterEvent() {
        cc.Canvas.instance.node.off(cc.Node.EventType.SIZE_CHANGED, this.onGraphicsNodeChange, this);
    }

    /**
     * 绘图节点变化
     */
    protected onGraphicsNodeChange() {
        // 更新绘图节点位置
        this.graphics.getComponent(cc.Widget).updateAlignment();
        // 初始化四叉树
        this.initQuadTree();
    }

    /**
     * 初始化
     */
    protected init() {
        // 切换横屏
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    }

    /**
     * 释放
     */
    protected release() {
        // 切换竖屏
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
    }

    /**
     * 添加物体按钮点击回调
     */
    protected onAddBtnClick() {
        this.container.addItem();
    }

    /**
     * 添加物体按钮点击回调
     */
    protected onAddBtn2Click() {
        let count = 10;
        while (count--) {
            this.container.addItem();
        }
    }

    /**
     * 清空按钮点击回调
     */
    protected onClearBtnClick() {
        this.container.clearItems();
    }

}

/**
 * 物体包围盒（四叉树用）
 */
interface ItemRect extends Quadtree.Rect {
    item: Case_CollisionQuadTree_Item;
}

// /**
//  * 碰撞类型
//  */
// enum CollisionType {
//     None = 0,
//     CollisionEnter = 1,
//     CollisionStay = 2,
//     CollisionExit = 3
// }

// /**
//  * 关联对象
//  */
// class Contact {

//     protected a: any = null;

//     protected b: any = null;

//     protected touching: boolean = false;

//     constructor(a: any, b: any) {
//         this.a = a;
//         this.b = b;
//         this.touching = false;
//         this.updateState();
//     }

//     public updateState() {
//         const result = this.test();
//         let type = CollisionType.None;
//         if (result && !this.touching) {
//             this.touching = true;
//             type = CollisionType.CollisionEnter;
//         } else if (result && this.touching) {
//             type = CollisionType.CollisionStay;
//         } else if (!result && this.touching) {
//             this.touching = false;
//             type = CollisionType.CollisionExit;
//         }
//         return type;
//     }

//     protected test() {
//         return this.a.rect.intersects(this.b.rect);
//     }

// }
