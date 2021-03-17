const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_CaseList extends cc.Component {

    @property(cc.Node)
    protected container: cc.Node = null;

    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 初始化
     */
    protected init() {

    }

    /**
     * 订阅事件
     */
    protected registerEvent() {
        const nodes = this.container.children;
        for (let i = 0, l = nodes.length; i < l; i++) {
            nodes[i].on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    /**
     * 取消事件订阅
     */
    protected unregisterEvent() {
        const nodes = this.container.children;
        for (let i = 0, l = nodes.length; i < l; i++) {
            nodes[i].off(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    protected onBtnClick(event: cc.Event.EventTouch) {
        const name = event.target.name;

    }

}
