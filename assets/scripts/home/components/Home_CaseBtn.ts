import { CaseInfo } from "../../common/CaseList";
import CaseManager from "../../common/CaseManager";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_CaseBtn extends cc.Component {

    @property(cc.Label)
    protected nameLabel: cc.Label = null;

    protected caseName: string = null;

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
        this.node.on(cc.Node.EventType.TOUCH_END, this.onClick, this);
    }

    /**
     * 取消事件订阅
     */
    protected unregisterEvent() {
        this.node.off(cc.Node.EventType.TOUCH_END, this.onClick, this);
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

    /**
     * 点击
     */
    protected onClick() {
        // 跳转
        CaseManager.goCase(this.caseName);
    }

    /**
     * 设置
     * @param caseName 名称
     * @param info 信息
     */
    public set(caseName: string, info: CaseInfo) {
        this.caseName = caseName;
        this.nameLabel.string = info.name;
    }

}
