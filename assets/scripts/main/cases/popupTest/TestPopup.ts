import PopupBase from "../../../../eazax-ccc/components/popups/PopupBase";
import PopupManager, { PopupCacheMode } from "../../../../eazax-ccc/core/PopupManager";

const { ccclass, property } = cc._decorator;

/** 测试弹窗 */
@ccclass
export default class TestPopup extends PopupBase<string> {

    @property(cc.Node)
    private closeBtn: cc.Node = null;

    @property(cc.Label)
    private curFlagLabel: cc.Label = null;

    @property(cc.Label)
    private newFlagLabel: cc.Label = null;

    @property(cc.Node)
    private normalBtn: cc.Node = null;

    @property(cc.Node)
    private forceBtn: cc.Node = null;

    @property(cc.Node)
    private coverBtn: cc.Node = null;

    private newFlag: string = null;

    /** 资源弹窗路径 */
    public static get path() { return 'prefabs/TestPopup'; }

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    private registerEvent() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
        this.normalBtn.on(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.forceBtn.on(cc.Node.EventType.TOUCH_END, this.onForceBtnClick, this);
        this.coverBtn.on(cc.Node.EventType.TOUCH_END, this.onCoverBtnClick, this);
    }

    private unregisterEvent() {
        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
        this.normalBtn.off(cc.Node.EventType.TOUCH_END, this.onNormalBtnClick, this);
        this.forceBtn.off(cc.Node.EventType.TOUCH_END, this.onForceBtnClick, this);
        this.coverBtn.off(cc.Node.EventType.TOUCH_END, this.onCoverBtnClick, this);
    }

    protected updateDisplay(options: string) {
        this.curFlagLabel.string = options;
        this.updateNewFlag();
    }

    private updateNewFlag() {
        this.newFlag = (Math.random() * 10000).toFixed(0).padStart(5, '0');
        this.newFlagLabel.string = this.newFlag;
    }

    private onCloseBtnClick() {
        this.hide();
    }

    private onNormalBtnClick() {
        PopupManager.show(TestPopup.path, this.newFlag, PopupCacheMode.Frequent, false);
        this.updateNewFlag();
    }

    private onForceBtnClick() {
        PopupManager.show(TestPopup.path, this.newFlag, PopupCacheMode.Frequent, false);
    }

    private onCoverBtnClick() {
        PopupManager.show(TestPopup.path, this.newFlag, PopupCacheMode.Frequent, false);
    }

}
