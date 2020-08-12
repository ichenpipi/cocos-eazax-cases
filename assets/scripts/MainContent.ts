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

    protected onLoad() {
        MainContent.instance = this;

        this.btns = this.homeBtnsContainer.children;
        this.cases = this.casesContainer.children;

        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    protected onDestroy() {
        for (let i = 0; i < this.btns.length; i++) {
            this.btns[i].off(cc.Node.EventType.TOUCH_END, this.onBtnClick, this)
        }
    }

    public static goHome() {
        eazax.log('[Go Home]');
        this.instance.home.active = true;
        this.instance.casesContainer.active = false;
    }

    public goCase(name: string) {
        eazax.log('[Go Case]', name);
        for (let i = 0; i < this.cases.length; i++) {
            this.cases[i].active = this.cases[i].name === name;
        }
        this.home.active = false;
        this.casesContainer.active = true;
    }

    private onBtnClick(event: cc.Event.EventTouch) {
        this.goCase(event.target.name);
    }

}
