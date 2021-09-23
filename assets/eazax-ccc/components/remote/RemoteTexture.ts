import RemoteAsset from "./RemoteAsset";
import RemoteLoader from "./RemoteLoader";

const { ccclass, property, executeInEditMode, help } = cc._decorator;

/**
 * 远程图像
 * @author 陈皮皮 (ifaswind)
 * @version 20210923
 * @see RemoteTexture.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteTexture.ts
 * @see RemoteAsset.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteAsset.ts
 */
@ccclass
@executeInEditMode
@help('https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteTexture.ts')
export default class RemoteTexture extends RemoteAsset {

    @property()
    protected _sprite: cc.Sprite = null;
    @property(cc.Sprite)
    public get sprite() {
        return this._sprite;
    }
    public set sprite(value) {
        this._sprite = value;
        this.onPropertyUpdated();
    }

    @property()
    protected _url: string = '';
    @property({ tooltip: CC_DEV && '远程资源地址' })
    public get url() {
        return this._url;
    }
    public set url(value) {
        this._url = value;
        this.onPropertyUpdated();
    }

    @property({ tooltip: CC_DEV && '加载失败后的重试次数' })
    protected retryTimes: number = 2;

    protected onLoad() {
        this.init();
    }

    protected resetInEditor() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        if (!cc.isValid(this._sprite)) {
            this._sprite = this.getComponent(cc.Sprite);
        }
        this.onPropertyUpdated();
    }

    /**
     * 属性更新回调
     */
    public onPropertyUpdated() {
        if (CC_EDITOR) {
            this.preview();
        } else {
            this.load();
        }
    }

    /**
     * 加载
     * @param url 资源地址
     */
    public async load(url: string = this._url) {
        if (!cc.isValid(this._sprite)) {
            cc.warn('[RemoteTexture]', 'load', '->', '缺少 Sprite 组件');
            return { url, loaded: false, component: this };
        }
        this._url = url;
        if (!url || url === '') {
            this.set(null);
            return { url, loaded: false, component: this };
        }
        let texture: cc.Texture2D = null,
            loadCount = 0,
            maxLoadTimes = this.retryTimes + 1;
        while (!texture && loadCount < maxLoadTimes) {
            loadCount++;
            texture = await RemoteLoader.loadTexture(url);
        }
        if (!texture) {
            cc.warn('[RemoteTexture]', 'load', '->', '远程资源加载失败', url);
            return { url, loaded: false, component: this };
        }
        this.set(texture);
        return { url, loaded: true, component: this };
    }

    /**
     * 设置
     * @param texture 纹理
     */
    public set(texture: cc.Texture2D) {
        if (texture) {
            this._sprite.spriteFrame = new cc.SpriteFrame(texture);
        } else {
            this._sprite.spriteFrame = null;
        }
        this.node.emit('sprite:sprite-frame-updated', this._sprite, texture);
    }

    /**
     * 在编辑器中预览
     */
    protected async preview() {
        if (!CC_EDITOR || !this._sprite) {
            return;
        }
        const actualSprite = this._sprite,
            actualNode = actualSprite.node;
        // 移除旧的预览节点
        actualNode.children.forEach(node => {
            if (node.name === 'temporary-preview-node')
                node.removeFromParent(true);
        });
        if (!this._url || this._url === '') {
            return;
        }
        // 生成临时预览节点
        // let previewNode = new cc.Node('temporary-preview-node');
        let previewNode = new cc.PrivateNode('temporary-preview-node');
        previewNode['_objFlags'] |= cc.Object['Flags'].DontSave;        // 不保存
        // previewNode['_objFlags'] |= cc.Object['Flags'].HideInHierarchy; // 在层级管理器中隐藏
        previewNode.setParent(actualNode);
        previewNode.setContentSize(actualNode.getContentSize());
        // 加载纹理
        const texture = await RemoteLoader.loadTexture(this._url);
        if (!cc.isValid(previewNode) || !texture) {
            previewNode.removeFromParent(true);
            previewNode = null;
            return;
        }
        // 设置图像
        const previewSprite = previewNode.addComponent(cc.Sprite);
        previewSprite.type = actualSprite.type;
        previewSprite.sizeMode = actualSprite.sizeMode;
        previewSprite.trim = actualSprite.trim;
        previewSprite.spriteFrame = new cc.SpriteFrame(texture);
    }

}
