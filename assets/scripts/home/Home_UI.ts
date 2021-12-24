import EventManager from "../../eazax-ccc/core/EventManager";
import SceneNavigator from "../../eazax-ccc/core/SceneNavigator";
import { SceneName } from "../common/constants/Constants";
import { SWITCH_CASE } from "../common/constants/CustomEvents";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_UI extends cc.Component {

    @property(cc.Node)
    protected aboutBtn: cc.Node = null;

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    /**
     * 生命周期：销毁
     */
    protected onDestroy() {
        this.unregisterEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.aboutBtn.on(cc.Node.EventType.TOUCH_END, this.onAboutBtnClick, this);
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
     * 关于按钮点击回调
     */
    protected onAboutBtnClick() {
        // 跳转场景
        SceneNavigator.go('about', false, () => {
            // 事件
            EventManager.emit(SWITCH_CASE, SceneName.About);
        });
    }

}
