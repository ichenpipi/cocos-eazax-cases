import HollowOut from "../../../eazax-ccc/components/effects/HollowOut";
import TouchBlocker from "../../../eazax-ccc/components/TouchBlocker";

const { ccclass, property } = cc._decorator;

/**
 * [示例] 新手引导
 * @see HollowOut.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/effects/HollowOut.ts
 * @see eazax-hollowout.effect https://gitee.com/ifaswind/eazax-ccc/blob/master/resources/effects/eazax-hollowout.effect
 * @see TouchBlocker.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/TouchBlocker.ts
 * @version 20210429
 */
@ccclass
export default class Case_HollowOut extends cc.Component {

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

    protected start() {
        this.reset();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.startBtn.on(cc.Node.EventType.TOUCH_END, this.onStartBtnClick, this);
        this.oneBtn.on(cc.Node.EventType.TOUCH_END, this.onOneBtnClick, this);
        this.twoBtn.on(cc.Node.EventType.TOUCH_END, this.onTwoBtnClick, this);
        this.threeBtn.on(cc.Node.EventType.TOUCH_END, this.onThreeBtnClick, this);
    }

    /**
     * 重置
     */
    protected reset() {
        // 打开遮罩
        this.hollowOut.node.active = true;
        // 将遮罩镂空设为节点大小
        this.hollowOut.setNodeSize();
        // 放行所有点击
        this.touchBlocker.passAll();
    }

    /**
     * 开始
     */
    protected async onStartBtnClick() {
        // 屏蔽所有点击
        this.touchBlocker.blockAll();
        // 遮罩动起来
        const node = this.oneBtn,
            x = node.width + 10,
            y = node.height + 10;
        await this.hollowOut.rectTo(0.5, node.getPosition(), x, y, 5, 5);
        // 设置可点击节点
        this.touchBlocker.setTarget(node);
    }

    /**
     * 按钮 1 点击回调
     */
    protected async onOneBtnClick() {
        // 将遮罩镂空设为节点大小
        this.hollowOut.setNodeSize();
        // 屏蔽所有点击
        this.touchBlocker.blockAll();
        // 遮罩动起来
        const node = this.twoBtn,
            x = node.width + 10,
            y = node.height + 10;
        await this.hollowOut.rectTo(0.5, node.getPosition(), x, y, 5, 5);
        // 设置可点击节点
        this.touchBlocker.setTarget(node);
    }

    /**
     * 按钮 2 点击回调
     */
    protected async onTwoBtnClick() {
        // 将遮罩镂空设为节点大小
        this.hollowOut.setNodeSize();
        // 屏蔽所有点击
        this.touchBlocker.blockAll();
        // 遮罩动起来
        const node = this.threeBtn;
        await this.hollowOut.circleTo(0.5, node.getPosition(), node.width / 2, 0);
        // 设置可点击节点
        this.touchBlocker.setTarget(node);
    }

    /**
     * 按钮 3 点击回调
     */
    protected onThreeBtnClick() {
        // 将遮罩镂空设为节点大小
        this.hollowOut.setNodeSize();
        // 放行所有点击
        this.touchBlocker.passAll();
    }

}
