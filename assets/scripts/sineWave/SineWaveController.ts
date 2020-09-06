import SineWave from "../../eazax-ccc/components/effects/SineWave";

const { ccclass, property } = cc._decorator;

@ccclass
export default class SineWaveController extends cc.Component {

    @property(SineWave)
    private wave: SineWave = null;

    @property(cc.Node)
    private fillBtn: cc.Node = null;

    protected onLoad() {

    }

    protected onDestroy() {

    }

    public onFillBtnClick() {

    }

}
