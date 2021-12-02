import Mosaic from "../../../eazax-ccc/components/effects/Mosaic";

const { ccclass, property } = cc._decorator;

/**
 * 示例：后期处理
 * @author 陈皮皮 (ifaswind)
 * @version 20211202
 * @see PostProcessing.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/effects/PostProcessing.ts
 * @see Mosaic.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/effects/Mosaic.ts
 * @see eazax-mosaic.effect https://gitee.com/ifaswind/eazax-ccc/blob/master/resources/effects/eazax-mosaic.effect
 * @see eazax-inversion.effect https://gitee.com/ifaswind/eazax-ccc/blob/master/resources/effects/eazax-inversion.effect
 * @see eazax-radial-blur.effect https://gitee.com/ifaswind/eazax-ccc/blob/master/resources/effects/eazax-radial-blur.effect
 */
@ccclass
export default class Case_PostProcessing extends cc.Component {

    @property(cc.Node)
    protected avatar: cc.Node = null;

    @property(cc.Node)
    protected btn1: cc.Node = null;

    @property(cc.Node)
    protected btn2: cc.Node = null;

    @property(cc.Node)
    protected btn3: cc.Node = null;

    @property(cc.Node)
    protected btn4: cc.Node = null;

    @property(cc.Sprite)
    protected outputSprite: cc.Sprite = null;

    @property(cc.Material)
    protected normalMaterial: cc.Material = null;

    @property(cc.Material)
    protected inversionMaterial: cc.Material = null;

    @property(cc.Material)
    protected radialBlurMaterial: cc.Material = null;

    @property(Mosaic)
    protected outputMosaic: Mosaic = null;

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
        this.btn1.on(cc.Node.EventType.TOUCH_END, this.onBtn1Click, this);
        this.btn2.on(cc.Node.EventType.TOUCH_END, this.onBtn2Click, this);
        this.btn3.on(cc.Node.EventType.TOUCH_END, this.onBtn3Click, this);
        this.btn4.on(cc.Node.EventType.TOUCH_END, this.onBtn4Click, this);
    }

    /**
     * 按钮 1
     */
    protected onBtn1Click() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.normalMaterial);
    }

    /**
     * 按钮 2
     */
    protected onBtn2Click() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.inversionMaterial);
    }

    /**
     * 按钮 3
     */
    protected onBtn3Click() {
        this.outputMosaic.enabled = false;
        this.outputSprite.setMaterial(0, this.radialBlurMaterial);
    }

    /**
     * 按钮 4
     */
    protected onBtn4Click() {
        const mosaic = this.outputMosaic;
        mosaic.enabled = true;
        mosaic.init();
        mosaic.set(0);
        mosaic.to(10, 1);
    }

}
