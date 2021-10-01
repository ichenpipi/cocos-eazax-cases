const { ccclass, property, executeInEditMode } = cc._decorator;

@ccclass
@executeInEditMode
export default class RenderTarget extends cc.Component {

    @property()
    protected _source: cc.Sprite = null;
    @property(cc.Sprite)
    public get source() {
        return this._source;
    }
    public set source(value: cc.Sprite) {
        this._source = value;
        this.setTarget(value);
    }

    @property()
    protected _target: cc.Sprite = null;
    @property(cc.Sprite)
    public get target() {
        return this._target;
    }
    public set target(value: cc.Sprite) {
        this._target = value;
        this.setTarget(value);
    }

    /** 摄像机 */
    protected camera: cc.Camera = null;

    /** 纹理 */
    protected texture: cc.RenderTexture = null;

    protected onLoad() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        this.camera = this.getComponent(cc.Camera);
        if (this._target) {
            this.setTarget(this._target);
        }
    }

    public setTarget(target: cc.Sprite) {
        // 创建 RenderTexture
        const texture = this.texture = new cc.RenderTexture();
        const size = cc.view.getVisibleSizeInPixel();
        texture.initWithSize(size.width, size.height);

        // 将摄像机的内容渲染到目标纹理上
        this.camera.targetTexture = texture;

        // 使用目标纹理生成精灵帧
        const spriteFrame = new cc.SpriteFrame();
        spriteFrame.setTexture(texture);
        // 设置到精灵上
        target.spriteFrame = spriteFrame;

        // 翻转 Y 轴
        // texture.setFlipY(true);  // not working
        const scale = Math.abs(target.node.scaleY);
        target.node.scaleY = -scale;
    }

}
