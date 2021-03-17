import EventManager from "../../eazax-ccc/core/EventManager";
import BrowserUtil from "../../eazax-ccc/utils/BrowserUtil";
import { SWITCH_CASE } from "../common/constants/CustomEvents";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_Content extends cc.Component {

    @property(cc.Node)
    private home: cc.Node = null;

    @property(cc.Node)
    private casesContainer: cc.Node = null;

    private cases: cc.Node[] = null;

    private static instance: Home_Content = null;

    private static casesMap: Map<string, number> = new Map<string, number>();

    protected onLoad() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        Home_Content.instance = this;

        this.cases = this.casesContainer.children;
        for (let i = 0; i < this.cases.length; i++) {
            Home_Content.casesMap.set(this.cases[i].name, i);
        }
    }

    /**
     * 是否有指定示例
     * @param name 名称
     */
    public static hasCase(name: string) {
        return Home_Content.casesMap.has(name);
    }

    /**
     * 前往首页
     */
    public static goHome() {
        eazax.log('[Go Home]');

        // 清除当前 URL 的参数
        BrowserUtil.clearUrlParam();

        this.instance.home.active = true;
        this.instance.casesContainer.active = false;

        EventManager.emit(SWITCH_CASE, 'home');
    }

    /**
     * 前往示例
     * @param name 名称
     */
    public static goCase(name: string) {
        if (!this.hasCase(name)) {
            return this.goHome();
        }

        eazax.log('[Go Case]', name);

        // 设置当前 URL 的参数
        BrowserUtil.setUrlParam(`case=${name}`);

        for (let i = 0; i < this.instance.cases.length; i++) {
            this.instance.cases[i].active = this.instance.cases[i].name === name;
        }
        this.instance.home.active = false;
        this.instance.casesContainer.active = true;

        EventManager.emit(SWITCH_CASE, name);
    }

}
