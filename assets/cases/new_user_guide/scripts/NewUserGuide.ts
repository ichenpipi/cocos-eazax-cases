import HollowOut from "../../../eazax-ccc/components/effects/HollowOut";
import TouchBlocker from "../../../eazax-ccc/components/TouchBlocker";

const { ccclass, property } = cc._decorator;

@ccclass
export default class NewUserGuide extends cc.Component {

    @property(HollowOut)
    protected hollowOut: HollowOut = null;

    @property(TouchBlocker)
    protected touchBlocker: TouchBlocker = null;

    @property(cc.Node)
    protected startBtn: cc.Node = null;

    @property(cc.Node)
    protected oneBtn: cc.Node = null;

    @property(cc.Node)
    protected twoBtn: cc.Node = null;

    @property(cc.Node)
    protected threeBtn: cc.Node = null;

    protected onLoad() {
        this.registerEvent();
    }

    protected registerEvent() {
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
    protected reset() {
        this.hollowOut.node.active = true;
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.passAll(); // 放行所有点击
    }

    /**
     * 开始
     */
    protected async onStartBtnClick() {
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.rectTo(0.5, this.oneBtn.getPosition(), this.oneBtn.width + 10, this.oneBtn.height + 10, 5, 5);
        this.touchBlocker.setTarget(this.oneBtn); // 设置可点击节点
    }

    /**
     * 一
     */
    protected async onOneBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.rectTo(0.5, this.twoBtn.getPosition(), this.twoBtn.width + 10, this.twoBtn.height + 10, 5, 5);
        this.touchBlocker.setTarget(this.twoBtn); // 设置可点击节点
    }

    /**
     * 二
     */
    protected async onTwoBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.circleTo(0.5, this.threeBtn.getPosition(), this.threeBtn.width / 2, 0);
        this.touchBlocker.setTarget(this.threeBtn); // 设置可点击节点
    }

    /**
     * 三
     */
    protected onThreeBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.passAll(); // 放行所有点击
    }

}
