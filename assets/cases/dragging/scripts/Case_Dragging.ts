import Case_DraggingContent from "./Case_DraggingContent";

const { ccclass, property } = cc._decorator;

/**
 * 一个简单的拖拽示例
 */
@ccclass
export default class Case_Dragging extends cc.Component {

    @property({ type: Case_DraggingContent, tooltip: CC_DEV && '内容' })
    protected content: Case_DraggingContent = null;

    /** 静态实例 */
    protected static instance: Case_Dragging = null;

    // --------------------------------------------------------------------------------

    protected onLoad() {
        this.init();
    }

    protected start() {
        this.scheduleOnce(() => {
            this.play();
        }, 0.2);
    }

    protected onDestroy() {
        this.release();
    }

    /**
     * 初始化
     */
    protected init() {
        // 保存实例
        Case_Dragging.instance = this;
        // 切换横屏
        cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
    }

    /**
     * 释放
     */
    protected release() {
        // 释放实例
        if (Case_Dragging.instance === this) {
            Case_Dragging.instance = null;
        }
        // 切换竖屏
        cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
    }

    /**
     * 开始
     */
    public async play() {
        // 生成静态物体
        await this.content.generateStaticItems(5);
        // 生成选项物体
        await this.content.generateOptionItems([3, 4, 5]);
        // 展示题目
        await Promise.all([
            // 展示预填充物体
            this.content.showStaticItems(),
            // 展示选项物体
            this.content.showOptionItems(),
        ]);
    }

    // --------------------------------------------------------------------------------

    /**
     * 移动层
     */
    public static get moveLayer() {
        return this.instance.content.node;
    }

    /**
     * 选项容器
     */
    public static get container() {
        return this.instance.content.container;
    }

}
