const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class NewClass extends cc.Component {

    onLoad() {

    }

    start() {

    }

    update(dt) {
        // this.node.eulerAngles.x += 1;
        // this.node.eulerAngles.y += 1;
        // this.node.eulerAngles.z += 1;
        // this.node._fromEuler();
        // this.node.setLocalDirty(cc.Node._LocalDirtyFlag.ALL_ROTATION);

        // const z = this.node.eulerAngles.z + 1;
        // cc.Vec3.set(this.node.eulerAngles, 0, 0, z);
    }
}
