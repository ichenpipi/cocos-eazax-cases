import Case_Dragging_Container from "./components/Case_Dragging_Container";
import Case_Dragging_Item from "./components/Case_Dragging_Item";
import PromiseUtil from "../../../eazax-ccc/utils/PromiseUtil";
import Case_Dragging_GroupContainer from "./components/Case_Dragging_GroupContainer";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_DraggingContent extends cc.Component {

    @property({ type: Case_Dragging_Container, tooltip: CC_DEV && '物体容器' })
    public container: Case_Dragging_Container = null;

    @property({ type: Case_Dragging_GroupContainer, tooltip: CC_DEV && '组容器' })
    public groupContainer: Case_Dragging_GroupContainer = null;

    @property({ type: cc.Prefab, tooltip: CC_DEV && '物体预制体' })
    public itemPrefab: cc.Prefab = null;

    /**
     * 生成静态物体
     * @param number 
     * @param image 
     */
    public async generateStaticItems(number: number) {
        const container = this.container,
            itemSize = this.container.itemSize;
        // 情况旧节点
        container.clear();
        // 生成
        for (let i = 0; i < number; i++) {
            const node = cc.instantiate(this.itemPrefab),
                item = node.getComponent(Case_Dragging_Item);
            // 设置节点
            node.name = 'Static Item';
            node.setContentSize(itemSize);
            node.setScale(1);
            node.opacity = 0;
            node.active = true;
            // 设置组件
            item.group = null;
            // 添加到分组
            container.addStaticItem(item);
        }
        // 启用自动布局
        container.enableLayout(true);
        return true;
    }

    /**
     * 展示静态物体
     */
    public async showStaticItems() {
        const nodes = this.container.contentNode.children;
        for (let i = 0, l = nodes.length; i < l; i++) {
            const node = nodes[i];
            if (node.name !== 'Static Item') {
                // 只要遍历到非静态物体就可以结束了
                break;
            }
            cc.tween(node)
                .to(0.5, { opacity: 255 }, { easing: 'cubicOut' })
                .start();
            if (i !== l - 1) {
                await PromiseUtil.sleep(0.05);
            }
        }
    }

    /**
     * 生成选项物体
     * @param numbers 
     */
    public async generateOptionItems(numbers: number[]) {
        const groups = this.groupContainer.groups;
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i],
                number = numbers[i];
            // 清空子节点
            group.clear();
            // 创建 item
            if (number != undefined) {
                // 打开分组
                group.node.active = true;
                // 颜色区分
                let color: cc.Color;
                switch (i) {
                    case 0: color = cc.Color.RED; break;
                    case 1: color = cc.Color.GREEN; break;
                    case 2: color = cc.Color.BLUE; break;
                }
                // 添加节点
                for (let j = 0; j < number; j++) {
                    const node = cc.instantiate(this.itemPrefab),
                        item = node.getComponent(Case_Dragging_Item);
                    // 设置节点
                    node.active = true;
                    node.scale = 0.8;
                    node.color = color.clone();
                    // 添加到分组
                    group.items.push(item);
                    group.addOptionItem(item);
                    // 
                    node.y = -200;
                }
                // 更新布局
                group.layout.updateLayout();
                // 撑开节点
                group.node.width = group.contentNode.width;
            } else {
                // 关闭分组
                group.node.active = false;
            }
        }
        // 选项容器布局
        const layout = this.groupContainer.layout;
        if (numbers.length < 3) {
            layout.spacingX = 100;
        } else {
            layout.spacingX = 50;
        }
        layout.updateLayout();
        // 禁用自动布局
        layout.enabled = false;
    }

    /**
     * 展示选项 items
     */
    public async showOptionItems() {
        const groups = this.groupContainer.groups;
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i],
                items = group.items;
            for (let j = 0; j < items.length; j++) {
                const item = items[j];
                cc.tween(item.node)
                    .to(0.5, { y: 0 }, { easing: 'backOut' })
                    .start();
                await PromiseUtil.sleep(0.02);
            }

        }
    }

}
