import CardArrayCard from "./CardArrayCard";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArrayContent extends cc.Component {

    @property(cc.Node)
    protected cardContainer: cc.Node = null;

    protected onLoad() {
        this.init();
    }

    protected init() {
        this.rotate();
    }

    protected rotate() {
        const node = this.cardContainer;
        cc.tween(node)
            .by(2, { eulerAngles: cc.v3(0, 90, 0) })
            .repeatForever()
            .start();
    }

}
