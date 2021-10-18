import NodeUtil from "../../../eazax-ccc/utils/NodeUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_PixelClick extends cc.Component {

    @property(cc.Node)
    protected target: cc.Node = null;

    @property(cc.Label)
    protected label: cc.Label = null;

    protected pixelsData: Uint8Array = null;

    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    protected start() {
        // 获取像素数据
        this.pixelsData = NodeUtil.getPixelsData(this.target);
    }

    /**
     * 初始化
     */
    protected init() {
        this.label.string = '点击上方图像（深灰色为底图颜色）';
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.target.on(cc.Node.EventType.TOUCH_END, this.onTargetClick, this);
    }

    /**
     * 点击回调
     * @param event 
     */
    protected onTargetClick(event: cc.Event.EventTouch) {
        const touchPos = event.getLocation();
        cc.log(`---------- 点击信息 ----------`);
        cc.log(`基于世界的坐标：\t${touchPos.toString()}`);

        const node = this.target,
            localPos = node.convertToNodeSpaceAR(touchPos);
        cc.log(`基于锚点的坐标：\t${localPos.toString()}`);

        let x = localPos.x + node.anchorX * node.width,
            y = -(localPos.y - node.anchorY * node.height);
        cc.log(`基于左上角的坐标：\t${cc.v2(x, y).toString()}`);

        const index = (node.width * 4 * Math.floor(y)) + (4 * Math.floor(x)),
            colors = this.pixelsData.slice(index, index + 4);
        cc.log(`像素下标：\t${index}`);
        cc.log(`颜色值：`);
        cc.log(`\t- R：${colors[0]}`);
        cc.log(`\t- G：${colors[1]}`);
        cc.log(`\t- B：${colors[2]}`);
        cc.log(`\t- A：${colors[3]}`);
        cc.log(`------------------------------`);

        this.label.string = '';
        this.label.string += `基于世界的坐标：${touchPos.toString()}\n`;
        this.label.string += `基于锚点的坐标：${localPos.toString()}\n`;
        this.label.string += `基于左上角的坐标：${cc.v2(x, y).toString()}\n`;
        this.label.string += `像素下标：${index / 4}\n`;
        this.label.string += `颜色下标：${index}\n`;
        this.label.string += `颜色值：\n`;
        this.label.string += `            - R：${colors[0]}\n`;
        this.label.string += `            - G：${colors[1]}\n`;
        this.label.string += `            - B：${colors[2]}\n`;
        this.label.string += `            - A：${colors[3]}`;
    }

}
