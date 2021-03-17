import Home_Content from "./Home_Content";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_ContentPage extends cc.Component {

    @property(cc.Node)
    protected container: cc.Node = null;

    protected buttons: cc.Node[] = null;

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected registerEvent() {
        this.buttons = this.container.children;
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    protected unregisterEvent() {
        for (let i = 0; i < this.buttons.length; i++) {
            this.buttons[i].off(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    protected onBtnClick(event: cc.Event.EventTouch) {
        const name = event.target.name;
        Home_Content.goCase(name);
    }

}
