import ArcProgressBar from "../../../eazax-ccc/components/ArcProgressBar";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_ArcProgressBar extends cc.Component {

    @property(ArcProgressBar)
    protected progressBar1: ArcProgressBar = null;

    @property(ArcProgressBar)
    protected progressBar2: ArcProgressBar = null;

    @property(ArcProgressBar)
    protected progressBar3: ArcProgressBar = null;

    @property(ArcProgressBar)
    protected progressBar4: ArcProgressBar = null;

    @property(ArcProgressBar)
    protected progressBar5: ArcProgressBar = null;

    public onLoad() {
        this.play1();
        this.play2();
        this.play3();
        this.play4();
        this.play5();
    }

    protected async play1() {
        while (1) {
            this.progressBar1.progress = 0;
            await this.progressBar1.to(2.5, 1);
        }
    }

    protected async play2() {
        while (1) {
            this.progressBar2.progress = 0;
            await this.progressBar2.to(2.5, 1);
        }
    }

    protected async play3() {
        while (1) {
            this.progressBar3.progress = 0;
            await this.progressBar3.to(2.5, 1);
        }
    }

    protected async play4() {
        while (1) {
            this.progressBar4.progress = 0;
            await this.progressBar4.to(2.5, 1);
        }
    }

    protected async play5() {
        while (1) {
            this.progressBar5.progress = 0;
            await this.progressBar5.to(2.5, 1);
        }
    }


}
