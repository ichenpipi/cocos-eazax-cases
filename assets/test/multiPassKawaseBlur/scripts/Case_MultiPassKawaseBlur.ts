const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_MultiPassKawaseBlur extends cc.Component {

    @property(cc.Sprite)
    protected sprite0: cc.Sprite = null;

    @property(cc.Sprite)
    protected sprite1: cc.Sprite = null;

    @property(cc.Sprite)
    protected sprite2: cc.Sprite = null;

    @property(cc.Sprite)
    protected sprite3: cc.Sprite = null;

    protected onLoad() {

    }

}
