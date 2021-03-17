import CardArray_Card from './CardArray_Card';

const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class CardArray_Layout extends cc.Component {

    @property
    protected _radius: number = 350;
    @property({ displayName: CC_DEV && '半径' })
    public get radius() {
        return this._radius
    }
    public set radius(value: number) {
        this._radius = value;
        this.updateLayout();
    }

    /** 卡片组件 */
    protected cards: CardArray_Card[] = null;

    protected onLoad() {
        this.init();
    }

    protected update(dt: number) {
        this.updateHierarchy();
    }

    /**
     * 初始化
     */
    protected init() {
        this.cards = this.getComponentsInChildren(CardArray_Card);
        this.updateLayout();
    }

    /**
     * 更新布局
     */
    public updateLayout() {
        const nodes = this.node.children,
            radius = this._radius;
        for (let i = 0, l = nodes.length; i < l; i++) {
            const node = nodes[i],
                radian = (Math.PI / 180) * (node.eulerAngles.y - 90);
            node.x = radius * Math.cos(radian);
            node.z = -(radius * Math.sin(radian));
        }
    }

    /**
     * 更新层级
     */
    public updateHierarchy() {
        const cards = this.cards;
        length = cards.length;
        // 更新卡片在世界坐标系中的 z 值
        for (let i = 0; i < length; i++) {
            cards[i].updateWorldZ();
        }
        // 排序从大到小，z 值越小的显示在越后面，层级 index 也越小
        cards.sort((a, b) => a.z - b.z);
        // 调整节点层级
        for (let i = 0; i < length; i++) {
            cards[i].setSiblingIndex(i);
        }
    }

}
