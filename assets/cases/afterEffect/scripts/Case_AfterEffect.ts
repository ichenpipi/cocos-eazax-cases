import Mosaic from "../../../eazax-ccc/components/effects/Mosaic";

const { ccclass, property } = cc._decorator;

/**
 * 示例：后期效果
 * @author 陈皮皮 (ifaswind)
 * @version 20210603
 * @see Mosaic.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/effects/Mosaic.ts
 * @see eazax-mosaic.effect https://gitee.com/ifaswind/eazax-ccc/blob/master/resources/effects/eazax-mosaic.effect
 */
@ccclass
export default class Case_AfterEffect extends cc.Component {

    @property(cc.Sprite)
    protected sprite: cc.Sprite = null;

    @property(cc.Material)
    protected grayMaterial: cc.Material = null;

    @property(Mosaic)
    protected mosaic: Mosaic = null;

    @property(cc.Node)
    protected normalBtn: cc.Node = null;

    @property(cc.Node)
    protected grayBtn: cc.Node = null;

    @property(cc.Node)
    protected mosaicBtn: cc.Node = null;

    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 订阅事件
     */
    protected registerEvent() {
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.grayBtn.on(cc.Node.EventType.TOUCH_END, this.onGrayBtnClick, this);
        this.mosaicBtn.on(cc.Node.EventType.TOUCH_END, this.onMosaicBtnClick, this);
    }

    /**
     * 正常
     */
    protected onNormalBtnClick() {
        this.mosaic.enabled = false;
        this.sprite.setMaterial(0, cc.Material.getBuiltinMaterial('2d-sprite'));
    }

    /**
     * 灰
     */
    protected onGrayBtnClick() {
        this.mosaic.enabled = false;
        this.sprite.setMaterial(0, this.grayMaterial);
    }

    /**
     * 马赛克
     */
    protected onMosaicBtnClick() {
        const mosaic = this.mosaic;
        mosaic.enabled = true;
        mosaic.init();
        mosaic.set(0, 0);
        mosaic.to(15, 15, 0.5);
    }

}
