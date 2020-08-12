import RadarChart, { RadarChartData } from "../../eazax-ccc/components/RadarChart";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RadarChartController extends cc.Component {

    @property(RadarChart)
    private radarChart: RadarChart = null;

    @property(cc.EditBox)
    private timeEditBox: cc.EditBox = null;

    @property(cc.Node)
    private randomBtn: cc.Node = null;

    @property(cc.EditBox)
    private lengthEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private axesEditBox: cc.EditBox = null;

    @property(cc.Toggle)
    private drawAxesToggle: cc.Toggle = null;

    @property(cc.Toggle)
    private drawDataJoinToggle: cc.Toggle = null;

    @property(cc.EditBox)
    private nodesEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private lineWidthEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private innerLineWidthEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private data1EditBox: cc.EditBox = null;

    @property(cc.EditBox)
    private data2EditBox: cc.EditBox = null;

    protected onLoad() {
        this.randomBtn.on(cc.Node.EventType.TOUCH_END, this.onRandomBtnClick, this);

        this.lengthEditBox.node.on('text-changed', this.onLengthChanged, this);
        this.axesEditBox.node.on('text-changed', this.onAxesChanged, this);
        this.drawAxesToggle.node.on('toggle', this.onDrawAxesChanged, this);
        this.drawDataJoinToggle.node.on('toggle', this.onDrawDataJoinChanged, this);
        this.nodesEditBox.node.on('text-changed', this.onNodesChanged, this);
        this.lineWidthEditBox.node.on('text-changed', this.onLineWidthChanged, this);
        this.innerLineWidthEditBox.node.on('text-changed', this.onInnerLineWidthChanged, this);

        this.data1EditBox.node.on('text-changed', this.onDataChanged, this);
        this.data2EditBox.node.on('text-changed', this.onDataChanged, this);
    }

    protected onDestroy() {
        this.randomBtn.off(cc.Node.EventType.TOUCH_END, this.onRandomBtnClick, this);

        this.lengthEditBox.node.off('text-changed', this.onLengthChanged, this);
        this.axesEditBox.node.off('text-changed', this.onAxesChanged, this);
        this.drawAxesToggle.node.off('toggle', this.onDrawAxesChanged, this);
        this.drawDataJoinToggle.node.off('toggle', this.onDrawDataJoinChanged, this);
        this.nodesEditBox.node.off('text-changed', this.onNodesChanged, this);
        this.lineWidthEditBox.node.off('text-changed', this.onLineWidthChanged, this);
        this.innerLineWidthEditBox.node.off('text-changed', this.onInnerLineWidthChanged, this);

        this.data1EditBox.node.off('text-changed', this.onDataChanged, this);
        this.data2EditBox.node.off('text-changed', this.onDataChanged, this);
    }

    public async onRandomBtnClick() {
        eazax.log('[RadarChartController]', 'Random Data');

        // 获取数据
        let datas: RadarChartData[] = [];
        for (let i = 0; i < 2; i++) {
            let numbers = [];
            for (let j = 0; j < this.radarChart.curDatas[0].values.length; j++) {
                numbers.push(Math.random() * 0.8 + 0.2)
            }
            const data: RadarChartData = {
                values: i % 2 === 0 ? numbers : numbers.reverse(),
                lineWidth: 6,
                lineColor: this.getRandomColor(255),
                fillColor: this.getRandomColor(100)
            };
            datas.push(data);
        }
        console.log(datas)
        // 时间
        let time = parseFloat(this.timeEditBox.string);
        if (time < 0 || isNaN(time)) time = 1;
        else if (time > 100) time = 100;
        this.timeEditBox.string = time.toString();
        // GO
        this.radarChart.to(datas, time);
    }

    private getRandomColor(a: number) {
        return cc.color(Math.random() * 205 + 50, Math.random() * 205 + 50, Math.random() * 205 + 50, a);
    }

    private onLengthChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < 10 || number > 1000 || isNaN(number)) number = 300;
        this.radarChart.axisLength = number;
        editbox.string = this.radarChart.axisLength.toString();
    }

    private onAxesChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < 3 || isNaN(number)) number = 3;
        else if (number > 500) number = 500;
        const axes = Math.floor(number);
        this.radarChart.axes = axes;
        editbox.string = this.radarChart.axes.toString();
    }

    private onDrawAxesChanged(toggle: cc.Toggle) {
        this.radarChart.drawAxes = toggle.isChecked;
    }

    private onDrawDataJoinChanged(toggle: cc.Toggle) {
        this.radarChart.drawDataJoin = toggle.isChecked;
    }

    private onNodesChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < 1 || isNaN(number)) number = 1;
        else if (number > 200) number = 200;
        const axes = Math.floor(number);
        this.radarChart.nodesPerAxle = axes;
        editbox.string = this.radarChart.nodesPerAxle.toString();
    }

    private onLineWidthChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < .1 || isNaN(number)) number = 4;
        else if (number > 100) number = 100;
        this.radarChart.baseLineWidth = number;
        editbox.string = this.radarChart.baseLineWidth.toString();
    }

    private onInnerLineWidthChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < .1 || isNaN(number)) number = 4;
        else if (number > 100) number = 100;
        this.radarChart.baseInnerLineWidth = number;
        editbox.string = this.radarChart.baseInnerLineWidth.toString();
    }

    private onDataChanged(editbox: cc.EditBox) {
        this.radarChart.dataValuesStrings = [this.data1EditBox.string, this.data2EditBox.string];
    }

}
