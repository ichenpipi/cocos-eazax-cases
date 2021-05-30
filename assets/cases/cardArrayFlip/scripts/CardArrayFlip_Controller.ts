import PromiseUtil from "../../../eazax-ccc/utils/PromiseUtil";
import CardArrayFlip_FrontCardBase from "./CardArrayFlip_FrontCardBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArrayFlip_Controller extends cc.Component {

    @property(cc.Node)
    protected container: cc.Node = null;

    @property(cc.Node)
    protected cardNode: cc.Node = null;

    protected card: CardArrayFlip_FrontCardBase = null;

    protected get frontArrayCard() {
        return this.container.children[this.container.childrenCount - 1];
    }

    protected onLoad() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        this.card = this.cardNode.getComponent(CardArrayFlip_FrontCardBase);
        // GO
        this.play();
    }

    /**
     * GO
     */
    public async play() {
        const frontCard = this.card;
        // 旋转两圈
        await this.rotate(2);
        // 等一会
        await PromiseUtil.wait(0.2);
        // 替换卡片
        frontCard.show();
        this.frontArrayCard.active = false;
        // 翻卡
        await frontCard.flipToFront();
        // 等一会
        await PromiseUtil.wait(2);
        // 翻卡
        await frontCard.flipToBack();
        // 替换卡片
        this.frontArrayCard.active = true;
        frontCard.hide();
        // 等一会
        await PromiseUtil.wait(0.2);
        // 继续
        this.play();
    }

    /**
     * 旋转
     * @param round 圈数
     */
    public rotate(round: number) {
        return new Promise<void>(res => {
            const node = this.container,
                time = 1 * round,
                { x, z } = this.node.eulerAngles,
                eulerAngles = cc.v3(x, 360 * round, z);
            cc.tween(node)
                .by(time, { eulerAngles }, { easing: 'quadOut' })
                .call(res)
                .start();
        });
    }

}
