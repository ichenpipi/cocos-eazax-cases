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

    public static hasCase(name: string) {
        return MainContent.casesMap.has(name);
    }

    public static goHome() {
        eazax.log('[Go Home]');

        window.history.replaceState({}, null, '.');

        this.instance.home.active = true;
        this.instance.casesContainer.active = false;
    }

    public static goCase(name: string) {
        if (!this.hasCase(name)) return;

        eazax.log('[Go Case]', name);

        window.history.replaceState({}, null, `?case=${name}`);

        for (let i = 0; i < this.instance.cases.length; i++) {
            this.instance.cases[i].active = this.instance.cases[i].name === name;
        }
        this.instance.home.active = false;
        this.instance.casesContainer.active = true;
    }

}
