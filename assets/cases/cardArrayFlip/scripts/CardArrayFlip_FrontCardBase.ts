const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArrayFlip_FrontCardBase extends cc.Component {

    @property(cc.Node)
    protected main: cc.Node = null;

    @property(cc.Node)
    protected back: cc.Node = null;

    @property(cc.Node)
    protected front: cc.Node = null;

    protected onLoad() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        // 隐藏
        this.hide();
        // 重置
        this.front.active = false;
        this.back.active = true;
    }

    /**
     * 展示
     */
    public show() {
        this.main.active = true;
    }

    /**
     * 隐藏
     */
    public hide() {
        this.main.active = false;
    }

    /**
     * 翻到正面
     */
    public flipToFront(): Promise<void> {
        return null;
    }

    /**
     * 翻到背面
     */
    public flipToBack(): Promise<void> {
        return null;
    }

}
