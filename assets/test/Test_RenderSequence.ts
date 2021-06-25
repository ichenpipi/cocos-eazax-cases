const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class Test_RenderSequence extends cc.Component {

    @property
    protected get siblingIndex() {
        return this.node.getSiblingIndex();
    }
    protected set siblingIndex(value) {
        this.node.setSiblingIndex(value);
    }

    @property
    protected get zIndex() {
        return this.node.zIndex;
    }
    protected set zIndex(value) {
        this.node.zIndex = value;
    }

}
