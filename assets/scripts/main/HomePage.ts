import MainContent from "./MainContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class HomePage extends cc.Component {

    @property(cc.Node)
    private container: cc.Node = null;

    private buttons: cc.Node[] = null;

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    private registerEvent() {
        this.buttons = this.container.children;
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    private unregisterEvent() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].off(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    private onBtnClick(event: cc.Event.EventTouch) {
        const name = event.target.name;
        MainContent.goCase(name);
    }

}
