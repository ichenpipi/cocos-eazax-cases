import TweenUtil from "../../../../eazax-ccc/utils/TweenUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_FlipCard extends cc.Component {

    @property(cc.Node)
    protected card: cc.Node = null;

    @property(cc.Node)
    protected flipBtn: cc.Node = null;

    protected button: cc.Button = null;

    private readonly frontColor: cc.Color = cc.Color.BLUE;

    private readonly backColor: cc.Color = cc.Color.RED;

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

    protected registerEvent() {
        this.flipBtn.on(cc.Node.EventType.TOUCH_END, this.onFlipBtnClick, this);
    }

    protected unregisterEvent() {
        this.flipBtn.targetOff(this);
    }

    protected init() {
        this.button = this.flipBtn.getComponent(cc.Button) || this.flipBtn.addComponent(cc.Button);
    }

    protected reset() {
        this.card.color = this.frontColor;
        this.setButtonState(true);
    }

    protected async onFlipBtnClick() {
        if (!this.button.interactable) return;
        this.setButtonState(false);
        await TweenUtil.flip(this.card, 1, () => {
            if (this.card.color.equals(this.frontColor)) {
                this.card.color = this.backColor;
            } else {
                this.card.color = this.frontColor;
            }
        });
        this.setButtonState(true);
    }

    protected setButtonState(interactable: boolean) {
        this.button.interactable = interactable;
        this.flipBtn.color = interactable ? cc.Color.WHITE : cc.Color.GRAY;
    }

}
