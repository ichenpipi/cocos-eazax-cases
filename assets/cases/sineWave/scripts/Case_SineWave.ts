import SineWave, { SineWaveDirection } from "../../../eazax-ccc/components/effects/SineWave";
import JellyTween from "../../../eazax-ccc/components/tweens/JellyTween";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_SineWave extends cc.Component {

    @property(SineWave)
    protected sineWave: SineWave = null;

    @property(cc.Node)
    protected fillBtn: cc.Node = null;

    @property(cc.EditBox)
    protected amplitudeEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected angularVelocityEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected frequencyEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected heightEditBox: cc.EditBox = null;

    @property(cc.Toggle)
    protected toLeftToggle: cc.Toggle = null;

    protected interactable: boolean = true;

    protected status: number = 0;

    protected onLoad() {
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    protected registerEvent() {
        this.fillBtn.on(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);

        this.amplitudeEditBox.node.on('text-changed', this.onAmplitudeChanged, this);
        this.angularVelocityEditBox.node.on('text-changed', this.onAngularVelocityChanged, this);
        this.frequencyEditBox.node.on('text-changed', this.onFrequencyChanged, this);
        this.heightEditBox.node.on('text-changed', this.onHeightChanged, this);
        this.toLeftToggle.node.on('toggle', this.onToLeftChanged, this);
    }

    protected unregisterEvent() {
        this.fillBtn.off(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);
    }

    public onFillBtnClick() {
        if (!this.interactable) return;
        this.interactable = false;

        if (this.status === 0) {
            this.status = 1;
            const button = this.fillBtn.getComponent(cc.Button);
            button.interactable = false;
            const jelly = this.fillBtn.getComponent(JellyTween);
            jelly.stop();
            cc.tween(this.sineWave)
                .to(3, { height: 1 })
                .call(() => this.heightEditBox.string = '1.0')
                .to(0.5, { amplitude: 0 })
                .call(() => this.amplitudeEditBox.string = '0.0')
                .call(() => {
                    this.interactable = true;
                    this.fillBtn.getComponentInChildren(cc.Label).string = '恢复';
                    button.interactable = true;
                    jelly.play();
                })
                .start();
        } else {
            this.status = 0;
            this.sineWave.height = 0.5;
            this.heightEditBox.string = '0.5';
            this.sineWave.amplitude = 0.05;
            this.amplitudeEditBox.string = '0.05';
            this.interactable = true;
            this.fillBtn.getComponentInChildren(cc.Label).string = '加满';
        }
    }

    public onAmplitudeChanged(editbox: cc.EditBox) {
        this.sineWave.amplitude = parseFloat(editbox.string);
    }

    public onAngularVelocityChanged(editbox: cc.EditBox) {
        this.sineWave.angularVelocity = parseFloat(editbox.string);
    }

    public onFrequencyChanged(editbox: cc.EditBox) {
        this.sineWave.frequency = parseFloat(editbox.string);
    }

    public onHeightChanged(editbox: cc.EditBox) {
        this.sineWave.height = parseFloat(editbox.string);
    }

    public onToLeftChanged(toggle: cc.Toggle) {
        this.sineWave.direction = toggle.isChecked ? SineWaveDirection.Left : SineWaveDirection.Right;
    }

}
