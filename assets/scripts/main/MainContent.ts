import EventManager from "../../eazax-ccc/core/EventManager";
import BrowserUtil from "../../eazax-ccc/utils/BrowserUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class MainContent extends cc.Component {

    @property(cc.Node)
    private home: cc.Node = null;

    @property(cc.Node)
    private casesContainer: cc.Node = null;

    private cases: cc.Node[] = null;

    private static instance: MainContent = null;

    private static casesMap: Map<string, number> = new Map<string, number>();

    protected onLoad() {
        MainContent.instance = this;

        this.cases = this.casesContainer.children;
        for (let i = 0; i < this.cases.length; i++) {
            MainContent.casesMap.set(this.cases[i].name, i);
        }
    }

    /**
     * 是否有指定示例
     * @param name 名称
     */
    public static hasCase(name: string) {
        return MainContent.casesMap.has(name);
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

        EventManager.emit(SWITCH_PAGE, 'home');
    }

    /**
     * 前往示例
     * @param name 名称
     */
    public static goCase(name: string) {
        if (!this.hasCase(name)) return;
        eazax.log('[Go Case]', name);

        // 设置当前 URL 的参数
        BrowserUtil.setUrlParam(`case=${name}`);

        for (let i = 0; i < this.instance.cases.length; i++) {
            this.instance.cases[i].active = this.instance.cases[i].name === name;
        }
        this.instance.home.active = false;
        this.instance.casesContainer.active = true;

        EventManager.emit(SWITCH_PAGE, name);
    }

}

/** 页面切换 */
export const SWITCH_PAGE: string = 'switch-page';
