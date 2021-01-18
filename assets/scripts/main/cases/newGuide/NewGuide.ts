import HollowOut from "../../../../eazax-ccc/components/effects/HollowOut";
import TouchBlocker from "../../../../eazax-ccc/components/TouchBlocker";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewGuide extends cc.Component {

    @property(HollowOut)
    private hollowOut: HollowOut = null;

    @property(TouchBlocker)
    private touchBlocker: TouchBlocker = null;

    @property(cc.Node)
    private startBtn: cc.Node = null;

    @property(cc.Node)
    private oneBtn: cc.Node = null;

    @property(cc.Node)
    private twoBtn: cc.Node = null;

    @property(cc.Node)
    private threeBtn: cc.Node = null;

    protected onLoad() {
        this.registerEvent();
    }

    private registerEvent() {
        this.startBtn.on(cc.Node.EventType.TOUCH_END, this.onStartBtnClick, this);
        this.oneBtn.on(cc.Node.EventType.TOUCH_END, this.onOneBtnClick, this);
        this.twoBtn.on(cc.Node.EventType.TOUCH_END, this.onTwoBtnClick, this);
        this.threeBtn.on(cc.Node.EventType.TOUCH_END, this.onThreeBtnClick, this);
    }

    protected start() {
        this.reset();
    }

    /**
     * 重置
     */
    private reset() {
        this.hollowOut.node.active = true;
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.passAll(); // 放行所有点击
    }

    /**
     * 开始
     */
    private async onStartBtnClick() {
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.rectTo(0.5, this.oneBtn.getPosition(), this.oneBtn.width + 10, this.oneBtn.height + 10, 5, 5);
        this.touchBlocker.setTarget(this.oneBtn); // 设置可点击节点
    }

    /**
     * 一
     */
    private async onOneBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.rectTo(0.5, this.twoBtn.getPosition(), this.twoBtn.width + 10, this.twoBtn.height + 10, 5, 5);
        this.touchBlocker.setTarget(this.twoBtn); // 设置可点击节点
    }

    /**
     * 二
     */
    private async onTwoBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.circleTo(0.5, this.threeBtn.getPosition(), this.threeBtn.width / 2, 0);
        this.touchBlocker.setTarget(this.threeBtn); // 设置可点击节点
    }

    /**
     * 三
     */
    private onThreeBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.passAll(); // 放行所有点击
    }

}
