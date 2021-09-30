import SpineLoader from "../../core/remote/SpineLoader";
import RemoteAsset from "./RemoteAsset";

const { ccclass, property, executeInEditMode, help } = cc._decorator;

/**
 * 远程 Spine
 * @author 陈皮皮 (ifaswind)
 * @version 20210930
 * @see RemoteSpine.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteSpine.ts
 * @see RemoteAsset.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteAsset.ts
 */
@ccclass
@executeInEditMode
@help('https://gitee.com/ifaswind/eazax-ccc/blob/master/components/remote/RemoteSpine.ts')
export default class RemoteSpine extends RemoteAsset {

    @property()
    protected _spine: sp.Skeleton = null;
    @property(sp.Skeleton)
    public get spine() {
        return this._spine;
    }
    public set spine(value) {
        this._spine = value;
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

    @property()
    protected _defaultSkin: string = '';
    @property({ tooltip: CC_DEV && '默认皮肤' })
    public get defaultSkin() {
        return this._defaultSkin;
    }
    public set defaultSkin(value) {
        this._defaultSkin = value;
        this.onPropertyUpdated();
    }

    @property()
    protected _defaultAnimation: string = '';
    @property({ tooltip: CC_DEV && '默认动画' })
    public get defaultAnimation() {
        return this._defaultAnimation;
    }
    public set defaultAnimation(value) {
        this._defaultAnimation = value;
        this.onPropertyUpdated();
    }

    @property()
    protected _premultipliedAlpha: boolean = false;
    @property({ tooltip: CC_DEV && '开启预乘' })
    public get premultipliedAlpha() {
        return this._premultipliedAlpha;
    }
    public set premultipliedAlpha(value) {
        this._premultipliedAlpha = value;
        this.onPropertyUpdated();
    }

    @property({ tooltip: CC_DEV && '加载失败后的重试次数' })
    protected retryTimes: number = 2;

    /**
     * 最后一个请求 ID（用来处理并发加载，仅保留最后一个请求）
     */
    protected lastRequestId: number = 0;

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
        if (!cc.isValid(this._spine)) {
            this._spine = this.getComponent(sp.Skeleton);
        }
        this.onPropertyUpdated();
    }

    /**
     * 属性更新回调
     */
    public onPropertyUpdated() {
        if (CC_EDITOR) {
            // this.preview();
        } else {
            this.load();
        }
    }

    /**
     * 加载
     * @param url 资源地址
     */
    public async load(url: string = this._url): Promise<LoadResult> {
        if (!cc.isValid(this._spine)) {
            cc.warn('[RemoteSpine]', 'load', '->', '缺少 sp.Skeleton 组件');
            return { url, loaded: false, interrupted: false, component: this };
        }
        // 保存地址
        this._url = url;
        if (!url || url === '') {
            this.set(null);
            return { url, loaded: false, interrupted: false, component: this };
        }
        // 增加请求 ID 并记录当前的 ID
        const curRequestId = ++this.lastRequestId;
        // 开始加载
        let skeletonData: sp.SkeletonData = null,
            loadCount = 0;
        const maxLoadTimes = this.retryTimes + 1;
        while (!skeletonData && loadCount < maxLoadTimes) {
            loadCount++;
            skeletonData = await SpineLoader.loadRemote(url);
            // 当前加载请求是否已被覆盖
            if (this.lastRequestId !== curRequestId) {
                skeletonData = null;
                return { url, loaded: false, interrupted: true, component: this };
            }
        }
        // 加载失败？
        if (!skeletonData) {
            cc.warn('[RemoteSpine]', 'load', '->', '远程资源加载失败', url);
            return { url, loaded: false, interrupted: false, component: this };
        }
        // 加载成功
        this.set(skeletonData);
        return { url, loaded: true, interrupted: false, component: this };
    }

    /**
     * 设置
     * @param skeletonData 纹理
     */
    public set(skeletonData: sp.SkeletonData) {
        const spine = this._spine;
        if (!spine) {
            return;
        }
        spine.skeletonData = skeletonData;
        if (skeletonData) {
            if (this._defaultSkin !== '') {
                spine.setSkin(this._defaultSkin);
            }
            spine.animation = this._defaultAnimation;
            spine.premultipliedAlpha = this.premultipliedAlpha;
        } else {
            spine.animation = '';
        }
        this.node.emit('spine:skeleton-data-updated', this._spine, skeletonData);
    }

    /**
     * 在编辑器中预览
     */
    protected async preview() {
        if (!CC_EDITOR || !this._spine) {
            return;
        }
        const actualSprite = this._spine,
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
        let previewNode = new cc.PrivateNode('temporary-preview-node');
        previewNode['_objFlags'] |= cc.Object['Flags'].DontSave;  // 不保存
        previewNode.setParent(actualNode);
        previewNode.setContentSize(actualNode.getContentSize());
        // 加载纹理
        const skeletonData = await SpineLoader.loadRemote(this._url);
        if (!cc.isValid(previewNode) || !skeletonData) {
            previewNode.removeFromParent(true);
            previewNode = null;
            return;
        }
        // 设置图像
        const previewSpine = previewNode.addComponent(sp.Skeleton);
        previewSpine.skeletonData = skeletonData;
        previewSpine.animation = this._defaultAnimation;
    }

}

interface LoadResult {
    url: string;
    loaded: boolean;
    interrupted: boolean;
    component: RemoteSpine;
};

'https://chenpipi-storage.oss-cn-shenzhen.aliyuncs.com/spines/3.6/coin.zip'
