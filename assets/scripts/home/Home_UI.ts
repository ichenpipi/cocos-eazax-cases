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
     * 注册事件
     */
    protected registerEvent() {

    }

    /**
     * 反注册事件
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
