import Mosaic from "../../../eazax-ccc/components/effects/Mosaic";

const { ccclass, property } = cc._decorator;

/**
 * 示例：后期效果
 * @author 陈皮皮 (ifaswind)
 * @version 20211128
 * @see PostProcessing.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/effects/PostProcessing.ts
 * @see Mosaic.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/effects/Mosaic.ts
 * @see eazax-mosaic.effect https://gitee.com/ifaswind/eazax-ccc/blob/master/resources/effects/eazax-mosaic.effect
 */
@ccclass
export default class Case_PostProcessing extends cc.Component {

    @property(cc.Node)
    protected avatar: cc.Node = null;

    @property(cc.Sprite)
    protected outputSprite: cc.Sprite = null;

    @property(cc.Material)
    protected normalMaterial: cc.Material = null;

    @property(cc.Material)
    protected inversionMaterial: cc.Material = null;

    @property(cc.Material)
    protected grayMaterial: cc.Material = null;

    @property(Mosaic)
    protected outputMosaic: Mosaic = null;

    @property(cc.Node)
    protected normalBtn: cc.Node = null;

    @property(cc.Node)
    protected inversionBtn: cc.Node = null;

    @property(cc.Node)
    protected grayBtn: cc.Node = null;

    @property(cc.Node)
    protected mosaicBtn: cc.Node = null;

    /**
     * 生命周期：节点加载
     */
    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    /**
     * 初始化
     */
    protected init() {
        // 猫猫转起来了
        cc.tween(this.avatar)
            .by(5, { angle: -360 })
            .repeatForever()
            .start();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.inversionBtn.on(cc.Node.EventType.TOUCH_END, this.onInversionBtnClick, this);
        this.grayBtn.on(cc.Node.EventType.TOUCH_END, this.onGrayBtnClick, this);
        this.mosaicBtn.on(cc.Node.EventType.TOUCH_END, this.onMosaicBtnClick, this);
    }

    /**
     * 正常
     */
    protected onNormalBtnClick() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.normalMaterial);
    }

    /**
     * 反相
     */
    protected onInversionBtnClick() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.inversionMaterial);
    }

    /**
     * 灰
     */
    protected onGrayBtnClick() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.grayMaterial);
    }

    /**
     * 马赛克
     */
    protected onMosaicBtnClick() {
        const mosaic = this.outputMosaic;
        mosaic.enabled = true;
        mosaic.init();
        mosaic.set(0, 0);
        mosaic.to(10, 10, 1);
    }

}
