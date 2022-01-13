import RenderUtil from "../../../eazax-ccc/utils/RenderUtil";

const { ccclass, property } = cc._decorator;

/**
 * 运行时图像剪裁
 * @version 20211020
 * @see Case_PixelClick.ts https://gitee.com/ifaswind/eazax-cases/blob/master/assets/cases/pixelClick/scripts/Case_PixelClick.ts
 * @see NodeUtil.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/utils/NodeUtil.ts
 */
@ccclass
export default class Case_PixelClick extends cc.Component {

    @property(cc.Node)
    protected target: cc.Node = null;

    @property(cc.Node)
    protected reference: cc.Node = null;

    @property(cc.Label)
    protected label: cc.Label = null;

    /**
     * 像素数据
     */
    protected pixelsData: Uint8Array = null;

    /**
     * 生命周期：加载
     */
    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    /**
     * 初始化
     */
    protected init() {
        this.label.string = '点击或滑动上方图像';
    }

    /**
     * 注册事件
     */
    protected registerEvent() {
        this.target.on(cc.Node.EventType.TOUCH_END, this.onTargetClick, this);
        this.target.on(cc.Node.EventType.TOUCH_MOVE, this.onTargetClick, this);
    }

    /**
     * 点击回调
     * @param event 
     */
    protected onTargetClick(event: cc.Event.EventTouch) {
        // 点击位置
        const touchPos = event.getLocation(),
            node = this.target,
            localPos = node.convertToNodeSpaceAR(touchPos);

        // 不在节点内
        if (!node.getBoundingBoxToWorld().contains(touchPos)) {
            return;
        }

        // 获取像素数据
        if (!this.pixelsData) {
            this.pixelsData = RenderUtil.getPixelsData(this.target);
        }

        // 截取像素颜色
        let x = localPos.x + node.anchorX * node.width,
            y = -(localPos.y - node.anchorY * node.height);
        const index = (node.width * 4 * Math.floor(y)) + (4 * Math.floor(x)),
            colors = this.pixelsData.slice(index, index + 4);

        // 当前点击像素颜色
        this.reference.color = cc.color(colors[0], colors[1], colors[2]);
        this.reference.opacity = colors[3];

        // 展示信息
        this.label.string = '点击信息：\n';
        this.label.string += ` - 基于世界的坐标：${touchPos.toString()}\n`;
        this.label.string += ` - 基于锚点的坐标：${localPos.toString()}\n`;
        this.label.string += ` - 基于左上角的坐标：${cc.v2(x, y).toString()}\n`;
        this.label.string += ` - 像素下标：${index / 4}\n`;
        this.label.string += ` - 颜色下标：${index}\n`;
        this.label.string += ` - 颜色值：\n`;
        this.label.string += `            - R：${colors[0]}\n`;
        this.label.string += `            - G：${colors[1]}\n`;
        this.label.string += `            - B：${colors[2]}\n`;
        this.label.string += `            - A：${colors[3]}`;

        // cc.log(`---------- 点击信息 ----------`);
        // cc.log(`基于世界的坐标：\t${touchPos.toString()}`);
        // cc.log(`基于左上角的坐标：\t${cc.v2(x, y).toString()}`);
        // cc.log(`基于锚点的坐标：\t${localPos.toString()}`);
        // cc.log(`像素下标：\t${index}`);
        // cc.log(`颜色值：`);
        // cc.log(`\t- R：${colors[0]}`);
        // cc.log(`\t- G：${colors[1]}`);
        // cc.log(`\t- B：${colors[2]}`);
        // cc.log(`\t- A：${colors[3]}`);
        // cc.log(`------------------------------`);
    }

}
