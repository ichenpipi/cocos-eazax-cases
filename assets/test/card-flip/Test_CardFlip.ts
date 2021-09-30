const { ccclass, property, executeInEditMode, playOnFocus } = cc._decorator;

@ccclass
@executeInEditMode
@playOnFocus
export default class Test_CardFlip extends cc.Component {

    @property(cc.Node)
    protected back: cc.Node = null;

    @property(cc.Node)
    protected front: cc.Node = null;

    update(dt: number) {
        const { x, y, z } = this.node.eulerAngles;
        this.node.eulerAngles = cc.v3(x, y + 1, z);
        this.updateDisplay();
    }

    protected updateDisplay() {
        const front = this.facingScreen;
        this.front.active = front;
        this.back.active = !front;
    }

    protected get facingScreen() {
        return this.node.forward.z >= 0;
    }

}
