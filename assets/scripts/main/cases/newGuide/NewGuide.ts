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
        this.startBtn.on('touchend', this.onStartBtnClick, this);
        this.oneBtn.on('touchend', this.onOneBtnClick, this);
        this.twoBtn.on('touchend', this.onTwoBtnClick, this);
        this.threeBtn.on('touchend', this.onThreeBtnClick, this);
    }

    protected start() {
        this.hollowOut.node.active = true;
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.passAll(); // 放行所有点击
    }

    private async onStartBtnClick() {
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.rectTo(0.5, this.oneBtn.getPosition(), this.oneBtn.width + 10, this.oneBtn.height + 10, 5, 5);
        this.touchBlocker.setTarget(this.oneBtn); // 设置可点击节点
    }

    private async onOneBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.rectTo(0.5, this.twoBtn.getPosition(), this.twoBtn.width + 10, this.twoBtn.height + 10, 5, 5);
        this.touchBlocker.setTarget(this.twoBtn); // 设置可点击节点
    }

    private async onTwoBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.blockAll(); // 屏蔽所有点击
        await this.hollowOut.circleTo(0.5, this.threeBtn.getPosition(), this.threeBtn.width / 2, 0);
        this.touchBlocker.setTarget(this.threeBtn); // 设置可点击节点
    }

    private onThreeBtnClick() {
        this.hollowOut.nodeSize(); // 将遮罩镂空设为节点大小
        this.touchBlocker.passAll(); // 放行所有点击
    }

}
