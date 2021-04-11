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

    @property
    protected _offset: number = 90;
    @property({ displayName: CC_DEV && '偏移' })
    public get offset() {
        return this._offset
    }
    public set offset(value: number) {
        this._offset = value;
        this.updateLayout();
    }

    /** 卡片组件 */
    protected cards: CardArray_Card[] = null;

    protected onLoad() {
        this.init();
    }

    protected onEnable() {
        this.registerEvent();
    }

    protected onDisable() {
        this.unregisterEvent();
    }

    /**
     * 初始化
     */
    protected init() {
        this.onChildChange();
    }

    /**
     * 订阅事件
     */
    protected registerEvent() {
        this.node.on(cc.Node.EventType.CHILD_ADDED, this.onChildChange, this);
        this.node.on(cc.Node.EventType.CHILD_REMOVED, this.onChildChange, this);
        this.node.on(cc.Node.EventType.ROTATION_CHANGED, this.onRotationChange, this);
    }

    /**
     * 取消事件订阅
     */
    protected unregisterEvent() {
        this.node.off(cc.Node.EventType.CHILD_ADDED, this.onChildChange, this);
        this.node.off(cc.Node.EventType.CHILD_REMOVED, this.onChildChange, this);
        this.node.off(cc.Node.EventType.ROTATION_CHANGED, this.onRotationChange, this);
    }

    /**
     * 子节点变化回调
     */
    protected onChildChange() {
        this.cards = this.getComponentsInChildren(CardArray_Card);
        this.updateLayout();
    }

    /**
     * 旋转变化回调
     */
    protected onRotationChange() {
        this.updateHierarchy();
    }

    /**
     * 更新布局
     */
    public updateLayout() {
        const nodes = this.node.children,
            count = nodes.length,
            radius = this._radius,
            offset = this._offset,
            delta = 360 / count;
        for (let i = 0; i < count; i++) {
            const node = nodes[i],
                angleY = -(delta * i),
                radian = (Math.PI / 180) * (angleY - offset),
                { x, z } = node.eulerAngles;
            // 位置
            node.x = radius * Math.cos(radian);
            node.z = -(radius * Math.sin(radian));
            // 角度
            node.eulerAngles = cc.v3(x, angleY, z);
            // node.rotationY = angleY;
            // node.eulerAngles.y = angleY;
        }
        this.updateHierarchy();
    }

    /**
     * 更新层级
     */
    public updateHierarchy() {
        const cards = this.cards,
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
