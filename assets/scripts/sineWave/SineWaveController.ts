import SineWave, { SineWaveDirection } from "../../eazax-ccc/components/effects/SineWave";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SineWaveController extends cc.Component {

    @property(SineWave)
    private wave: SineWave = null;

    @property(cc.Node)
    private fillBtn: cc.Node = null;

    @property(cc.EditBox)
    private amplitudeEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private angularVelocityEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private frequencyEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private heightEditBox: cc.EditBox = null;

    @property(cc.Toggle)
    private toLeftToggle: cc.Toggle = null;

    protected onLoad() {
        this.fillBtn.on(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);

        this.amplitudeEditBox.node.on('text-changed', this.onAmplitudeChanged, this);
        this.angularVelocityEditBox.node.on('text-changed', this.onAngularVelocityChanged, this);
        this.frequencyEditBox.node.on('text-changed', this.onFrequencyChanged, this);
        this.heightEditBox.node.on('text-changed', this.onHeightChanged, this);
        this.toLeftToggle.node.on('toggle', this.onToLeftChanged, this);
    }

    protected onDestroy() {
        this.fillBtn.off(cc.Node.EventType.TOUCH_END, this.onFillBtnClick, this);

        this.amplitudeEditBox.node.off('text-changed', this.onAmplitudeChanged, this);
        this.angularVelocityEditBox.node.off('text-changed', this.onAngularVelocityChanged, this);
        this.frequencyEditBox.node.off('text-changed', this.onFrequencyChanged, this);
        this.heightEditBox.node.off('text-changed', this.onHeightChanged, this);
        this.toLeftToggle.node.off('toggle', this.onToLeftChanged, this);
    }

    public onFillBtnClick() {
        cc.tween(this.wave)
            .to(3, { height: 1 })
            .call(() => { this.heightEditBox.string = '1.0'; })
            .to(0.5, { amplitude: 0 })
            .call(() => { this.amplitudeEditBox.string = '0.0'; })
            .start();
    }

    public onAmplitudeChanged(editbox: cc.EditBox) {
        this.wave.amplitude = parseFloat(editbox.string);
    }

    public onAngularVelocityChanged(editbox: cc.EditBox) {
        this.wave.angularVelocity = parseFloat(editbox.string);
    }

    public onFrequencyChanged(editbox: cc.EditBox) {
        this.wave.frequency = parseFloat(editbox.string);
    }

    public onHeightChanged(editbox: cc.EditBox) {
        this.wave.height = parseFloat(editbox.string);
    }

    public onToLeftChanged(toggle: cc.Toggle) {
        this.wave.direction = toggle.isChecked ? SineWaveDirection.Left : SineWaveDirection.Right;
    }

}
