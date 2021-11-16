const { ccclass, property, executionOrder } = cc._decorator;

/**
 * 纹理使用情况展示
 */
@ccclass
@executionOrder(-101)
export default class TextureUsage extends cc.Component {

    @property({ type: cc.Node, displayName: CC_DEV && '主节点' })
    protected main: cc.Node = null;

    @property({ type: cc.Label, displayName: CC_DEV && '标签' })
    protected label: cc.Label = null;

    /** 静态实例 */
    protected static instance: TextureUsage = null;

    protected onLoad() {
        this.init();
    }

    protected onDestroy() {
        this.release();
    }

    protected lateUpdate(dt: number) {
        if (this.main.active) {
            this.updateTextureUsage();
        }
    }

    /**
     * 初始化
     */
    protected init() {
        // 设为常驻节点
        this.node.setParent(cc.director.getScene());
        cc.game.addPersistRootNode(this.node);
        // 保存静态实例
        TextureUsage.instance = this;
        // 重置
        this.reset();
    }

    /**
     * 释放
     */
    protected release() {
        if (TextureUsage.instance) {
            TextureUsage.instance = null;
        }
    }

    /**
     * 重置
     */
    protected reset() {
        this.main.active = false;
    }

    /**
     * 展示
     */
    public show() {
        this.main.active = true;
    }

    /**
     * 隐藏
     */
    public hide() {
        this.main.active = false;
    }

    /**
     * 更新纹理使用情况展示
     */
    public updateTextureUsage() {
        const { count, memory } = this.getTextureUsage();
        this.label.string = `纹理数量：${count}  |  内存：${memory.toFixed(2)} M`;
    }

    /**
     * 获取纹理使用情况
     */
    public getTextureUsage() {
        let count = 0, memory = 0;
        cc.assetManager.assets.forEach((asset: cc.Asset, key: string) => {
            if (asset instanceof cc.Texture2D) {
                count++;
                const pixelSize = asset['_native'] === '.jpg' ? 3 : 4,
                    textureSize = (asset.width * asset.height) * pixelSize / (1024 * 1024);
                memory += textureSize;
            }
        });
        return { count, memory };
    }

    // --------------------------------------------------

    /**
     * 展示
     */
    public static show() {
        if (!this.instance) {
            return;
        }
        this.instance.show();
    }

    /**
     * 隐藏
     */
    public static hide() {
        if (!this.instance) {
            return;
        }
        this.instance.hide();
    }

}

