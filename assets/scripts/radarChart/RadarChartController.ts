import RadarChart, { RadarChartData } from "../../eazax-ccc/components/RadarChart";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RadarChartController extends cc.Component {

    @property(RadarChart)
    private radarChart: RadarChart = null;

    @property(cc.Node)
    private btn: cc.Node = null;

    protected onLoad() {
        this.btn.on(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
    }

    protected onDestroy() {
        this.btn.off(cc.Node.EventType.TOUCH_END, this.onBtnClick, this);
    }

    public async onBtnClick() {
        eazax.log('[RadarChartController]', 'Random Data');
        let datas: RadarChartData[] = [];
        for (let i = 0; i < 2; i++) {
            const data: RadarChartData = {
                values: this.getRandomValues(),
                lineWidth: 6,
                lineColor: this.getRandomColor(255),
                fillColor: this.getRandomColor(100)
            };
            datas.push(data);
        }
        this.radarChart.to(datas, 1);
        console.log(datas)
    }

    private getRandomValues() {
        function getRandomValue() {
            return Math.random() * 0.8 + 0.2;
        }
        return [getRandomValue(), getRandomValue(), getRandomValue(), getRandomValue(), getRandomValue(), getRandomValue()];
    }

    private getRandomColor(a: number) {
        return cc.color(Math.random() * 205 + 50, Math.random() * 205 + 50, Math.random() * 205 + 50, a);
    }

}
