const { ccclass, property } = cc._decorator;

@ccclass
export default class RainbowBrush extends cc.Component {

    private graphics: cc.Graphics = null;

    private material: cc.Material = null;

    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    protected onDestroy() {
        this.unregisterEvent();
    }

    private init() {
        this.graphics = this.node.getComponent(cc.Graphics) || this.node.addComponent(cc.Graphics);
        // 设置画笔
        this.graphics.strokeColor = cc.Color.WHITE;
        this.graphics.lineJoin = cc.Graphics.LineJoin.ROUND;
        this.graphics.lineCap = cc.Graphics.LineCap.ROUND;
        this.graphics.lineWidth = 20;
        // 设置节点尺寸
        this.material = this.graphics.getMaterial(0);
        this.material.setProperty('size', this.getNodeSize());
    }

    private registerEvent() {
        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this);
    }

    private unregisterEvent() {
        this.node.targetOff(this);
    }

    private onTouchStart(event: cc.Event.EventTouch) {
        const pos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        this.graphics.moveTo(pos.x - 5, pos.y);
        this.graphics.circle(pos.x - 5, pos.y, 1);
        this.graphics.stroke();
        this.graphics.moveTo(pos.x - 5, pos.y);
    }

    private onTouchMove(event: cc.Event.EventTouch) {
        const pos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        this.graphics.lineTo(pos.x - 5, pos.y);
        this.graphics.stroke();
        this.graphics.moveTo(pos.x - 5, pos.y);
    }

    private getNodeSize(): cc.Vec2 {
        return cc.v2(this.node.width, this.node.height);
    }

}
