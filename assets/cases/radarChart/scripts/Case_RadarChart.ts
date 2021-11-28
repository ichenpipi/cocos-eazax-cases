import RadarChart, { RadarChartData } from "../../../eazax-ccc/components/charts/RadarChart";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_RadarChart extends cc.Component {

    @property(RadarChart)
    protected radarChart: RadarChart = null;

    @property(cc.EditBox)
    protected timeEditBox: cc.EditBox = null;

    @property(cc.Node)
    protected randomBtn: cc.Node = null;

    @property(cc.EditBox)
    protected lengthEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected axesEditBox: cc.EditBox = null;

    @property(cc.Toggle)
    protected drawAxesToggle: cc.Toggle = null;

    @property(cc.Toggle)
    protected drawDataJoinToggle: cc.Toggle = null;

    @property(cc.EditBox)
    protected nodesEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected lineWidthEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected innerLineWidthEditBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected data1EditBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected data2EditBox: cc.EditBox = null;

    protected onLoad() {
        this.registerEvent();
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.randomBtn.on(cc.Node.EventType.TOUCH_END, this.onRandomBtnClick, this);

        this.lengthEditBox.node.on('text-changed', this.onAxixLengthChanged, this);
        this.axesEditBox.node.on('text-changed', this.onAxesChanged, this);
        this.drawAxesToggle.node.on('toggle', this.onDrawAxesChanged, this);
        this.drawDataJoinToggle.node.on('toggle', this.onDrawDataJoinChanged, this);
        this.nodesEditBox.node.on('text-changed', this.onAxisScalesChanged, this);
        this.lineWidthEditBox.node.on('text-changed', this.onLineWidthChanged, this);
        this.innerLineWidthEditBox.node.on('text-changed', this.onInnerLineWidthChanged, this);

        this.data1EditBox.node.on('text-changed', this.onDataChanged, this);
        this.data2EditBox.node.on('text-changed', this.onDataChanged, this);
    }

    public async onRandomBtnClick() {
        eazax.log('[RadarChartController]', 'Random Data');

        // 获取数据
        let datas: RadarChartData[] = [];
        for (let i = 0; i < this.radarChart.curDatas.length; i++) {
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
        if (time < 0 || isNaN(time)) time = .5;
        else if (time > 100) time = 100;
        this.timeEditBox.string = time.toString();
        // GO
        this.radarChart.to(datas, time);
    }

    protected getRandomColor(a: number) {
        let rgb = [Math.random() * 205 + 50, Math.random() * 205 + 50, Math.random() * 205 + 50];
        rgb.sort(() => 0.5 - Math.random());
        return cc.color(...rgb, a);
    }

    protected onAxixLengthChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < 10 || number > 1000 || isNaN(number)) number = 300;
        this.radarChart.axisLength = number;
        editbox.string = this.radarChart.axisLength.toString();
    }

    protected onAxesChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < 3 || isNaN(number)) number = 3;
        else if (number > 500) number = 500;
        const axes = Math.floor(number);
        this.radarChart.axes = axes;
        editbox.string = this.radarChart.axes.toString();
    }

    protected onDrawAxesChanged(toggle: cc.Toggle) {
        this.radarChart.drawAxes = toggle.isChecked;
    }

    protected onDrawDataJoinChanged(toggle: cc.Toggle) {
        this.radarChart.drawDataJoin = toggle.isChecked;
    }

    protected onAxisScalesChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < 1 || isNaN(number)) number = 1;
        else if (number > 200) number = 200;
        const axes = Math.floor(number);
        this.radarChart.axisScales = axes;
        editbox.string = this.radarChart.axisScales.toString();
    }

    protected onLineWidthChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < .1 || isNaN(number)) number = 4;
        else if (number > 100) number = 100;
        this.radarChart.gridLineWidth = number;
        editbox.string = this.radarChart.gridLineWidth.toString();
    }

    protected onInnerLineWidthChanged(editbox: cc.EditBox) {
        let number = parseFloat(editbox.string);
        if (number < .1 || isNaN(number)) number = 4;
        else if (number > 100) number = 100;
        this.radarChart.innerGridLineWidth = number;
        editbox.string = this.radarChart.innerGridLineWidth.toString();
    }

    protected onDataChanged(editbox: cc.EditBox) {
        this.radarChart.dataValuesStrings = [this.data1EditBox.string, this.data2EditBox.string];
    }

}
