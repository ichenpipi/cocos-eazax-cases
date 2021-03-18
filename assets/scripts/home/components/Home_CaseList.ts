import CaseManager from "../../common/CaseManager";

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

    /**
     * 按钮点击回调
     * @param event 点击事件
     */
    protected onBtnClick(event: cc.Event.EventTouch) {
        const caseName = event.target.name;
        CaseManager.goCase(caseName);
    }

}
