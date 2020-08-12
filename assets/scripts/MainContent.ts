const { ccclass, property } = cc._decorator;

@ccclass
export default class MainContent extends cc.Component {

    @property(cc.Node)
    private home: cc.Node = null;

    @property(cc.Node)
    private homeBtnsContainer: cc.Node = null;

    @property(cc.Node)
    private casesContainer: cc.Node = null;

    private btns: cc.Node[] = null;

    private cases: cc.Node[] = null;

    private static instance: MainContent = null;

    private static caseMap: Map<string, number> = new Map<string, number>();

    protected onLoad() {
        MainContent.instance = this;

        this.btns = this.homeBtnsContainer.children;
        this.cases = this.casesContainer.children;

        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }

        for (let i = 0; i < this.cases.length; i++) {
            MainContent.caseMap.set(this.cases[i].name, i);
        }
    }

    protected onDestroy() {
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].off(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    public static hasCase(name: string) {
        return MainContent.caseMap.has(name);
    }

    public static goHome() {
        eazax.log('[Go Home]');
        this.instance.home.active = true;
        this.instance.casesContainer.active = false;
    }

    public static goCase(name: string) {
        eazax.log('[Go Case]', name);
        for (let i = 0; i < this.instance.cases.length; i++) {
            this.instance.cases[i].active = this.instance.cases[i].name === name;
        }
        this.instance.home.active = false;
        this.instance.casesContainer.active = true;
    }

    private onBtnClick(event: cc.Event.EventTouch) {
        MainContent.goCase(event.target.name);
    }

}
