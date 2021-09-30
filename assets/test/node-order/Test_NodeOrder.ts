// @ts-nocheck
const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class Test_NodeOrder extends cc.Component {

    @property({ displayName: 'siblingIndex' })
    protected get siblingIndex() {
        return this.node.getSiblingIndex();
    }
    protected set siblingIndex(value) {
        this.node.setSiblingIndex(value);
    }

    @property({ displayName: 'zIndex' })
    protected get zIndex() {
        return this.node.zIndex;
    }
    protected set zIndex(value) {
        this.node.zIndex = value;
    }

    @property({ displayName: '_localZOrder' })
    protected get localZOrder() {
        return this.node._localZOrder;
    }

    @property({ displayName: '_localZOrder (二进制)' })
    protected get localZOrderBinary() {
        return this.node._localZOrder.toString(2).padStart(32, 0);
    }

}
