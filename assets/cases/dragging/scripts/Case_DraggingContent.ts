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

    @property({ type: cc.SpriteFrame, tooltip: CC_DEV && '物体图像' })
    public itemSpriteFrame: cc.SpriteFrame = null;

    /**
     * 生成静态物体
     * @param number 
     * @param image 
     */
    public async generateStaticItems(number: number) {
        const container = this.container,
            itemSize = this.container.itemSize;
        // 清除旧节点
        container.clear();
        // 生成
        for (let i = 0; i < number; i++) {
            const node = new cc.Node(),
                sprite = node.addComponent(cc.Sprite),
                item = node.addComponent(Case_Dragging_Item);
            // 设置节点
            node.name = 'Static Item';
            node.setContentSize(itemSize);
            node.setScale(1);
            node.opacity = 0;
            node.active = true;
            // 设置 Sprite
            sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            sprite.trim = false;
            sprite.spriteFrame = this.itemSpriteFrame;
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
        const groupContainer = this.groupContainer,
            groups = groupContainer.groups,
            itemSize = this.container.itemSize;
        for (let i = 0; i < groups.length; i++) {
            const group = groups[i],
                number = numbers[i];
            // 清除旧节点
            group.clear();
            // 生成物体
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
                    const node = new cc.Node(),
                        sprite = node.addComponent(cc.Sprite),
                        item = node.addComponent(Case_Dragging_Item);
                    // 设置节点
                    node.name = 'Option Item';
                    node.setContentSize(itemSize);
                    node.setScale(0.8);
                    node.color = color.clone();
                    node.active = true;
                    // 设置 Sprite
                    sprite.sizeMode = cc.Sprite.SizeMode.CUSTOM;
                    sprite.trim = false;
                    sprite.spriteFrame = this.itemSpriteFrame;
                    // 添加到分组
                    group.addOptionItem(item);
                    // 藏起来
                    node.y = -200;
                }
                // 更新分组布局
                group.forceUpdateLayout();
                // 撑开主节点
                group.node.width = group.layout.node.width;
            } else {
                // 关闭分组
                group.node.active = false;
            }
        }
        // 更新布局
        groupContainer.forceUpdateLayout();
        // 禁用自动布局
        groupContainer.enableLayout(false);
    }

    /**
     * 展示选项物体
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
