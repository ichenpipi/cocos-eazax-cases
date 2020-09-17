import PopupBase from "../eazax-ccc/components/popup/PopupBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResPopup extends PopupBase {

    @property(cc.Node)
    private closeBtn: cc.Node = null;

    protected onLoad() {
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    protected onDestroy() {
        this.closeBtn.off(cc.Node.EventType.TOUCH_END, this.onCloseBtnClick, this);
    }

    protected updateDisplay() {

    }

    private onCloseBtnClick() {
        this.hide();
    }

}
