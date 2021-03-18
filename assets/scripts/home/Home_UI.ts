const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_UI extends cc.Component {

    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    protected start() {
        this.reset();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 订阅事件
     */
    protected registerEvent() {

    }

    /**
     * 取消事件订阅
     */
    protected unregisterEvent() {

    }

    /**
     * 初始化
     */
    protected init() {

    }

    /**
     * 重置
     */
    protected reset() {

    }

}
