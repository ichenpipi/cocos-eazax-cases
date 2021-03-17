const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_UI extends cc.Component {

    protected onLoad() {
        this.registerEvent();
    }

    protected start() {
        this.reset();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected registerEvent() {

    }

    protected unregisterEvent() {

    }

    protected init() {

    }

    protected reset() {

    }

}
