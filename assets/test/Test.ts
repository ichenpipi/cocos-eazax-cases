const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class NewClass extends cc.Component {

    onLoad() {

    }

    start() {

    }

    update(dt) {
        this.node.angle -= 5;
    }
}
