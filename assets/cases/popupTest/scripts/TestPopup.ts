import PopupBase from "../../../eazax-ccc/components/popups/PopupBase";
import PopupManager from "../../../eazax-ccc/core/PopupManager";

const { ccclass, property } = cc._decorator;

/** 测试弹窗 */
@ccclass
export default class TestPopup extends PopupBase<string> {

    @property(cc.Node)
    protected closeBtn: cc.Node = null;

    @property(cc.Label)
    protected curFlagLabel: cc.Label = null;

    @property(cc.Label)
    protected newFlagLabel: cc.Label = null;

    @property(cc.Node)
    protected normalBtn: cc.Node = null;

    @property(cc.Node)
    protected priorityBtn: cc.Node = null;

    @property(cc.Node)
    protected immediatelyBtn: cc.Node = null;

    protected newFlag: string = null;

    /** 弹窗路径 */
    public static get path() {
        return 'prefabs/TestPopup';
    }

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected registerEvent() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);

        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.priorityBtn.on(cc.Node.EventType.TOUCH_END, this.onPriorityBtnClick, this);
        this.immediatelyBtn.on(cc.Node.EventType.TOUCH_END, this.onImmediatelyBtnClick, this);
    }

    protected unregisterEvent() {

    }

    protected updateDisplay(options: string) {
        this.curFlagLabel.string = options;
        this.updateFlag();
    }

    protected updateFlag() {
        this.newFlag = (Math.random() * 10000).toFixed(0).padStart(5, '0');
        this.newFlagLabel.string = this.newFlag;
    }

    protected onCloseBtnClick() {
        this.hide();
    }

    protected onNormalBtnClick() {
        const params = {
            mode: PopupManager.CacheMode.Normal,
            priority: 0
        }
        PopupManager.show(TestPopup.path, this.newFlag, params);
        this.updateFlag();
    }

    protected onPriorityBtnClick() {
        const params = {
            mode: PopupManager.CacheMode.Normal,
            priority: -1
        }
        PopupManager.show(TestPopup.path, this.newFlag, params);
        this.updateFlag();
    }

    protected onImmediatelyBtnClick() {
        const params = {
            mode: PopupManager.CacheMode.Frequent,
            immediately: true
        }
        PopupManager.show(TestPopup.path, this.newFlag, params);
    }

}
