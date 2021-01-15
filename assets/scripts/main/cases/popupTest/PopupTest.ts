import PopupManager, { PopupCacheMode } from "../../../../eazax-ccc/core/PopupManager";
import TestPopup from "./TestPopup";

const { ccclass, property } = cc._decorator;

@ccclass
export default class PopupTest extends cc.Component {

    @property(cc.Node)
    private btn: cc.Node = null;

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    private registerEvent() {
        this.btn.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    private unregisterEvent() {
        this.btn.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    private onClick() {
        const options = (Math.random() * 10000).toFixed(0).padStart(5, '0');
        PopupManager.show(TestPopup.path, options, PopupCacheMode.Frequent, false);
    }

}
