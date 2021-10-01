import EditorAsset from "../../../eazax-ccc/misc/EditorAsset";

const { ccclass, property, requireComponent, executeInEditMode, disallowMultiple } = cc._decorator;

@ccclass
@requireComponent(cc.Sprite)
@executeInEditMode
@disallowMultiple
export default class KawaseBlur extends cc.Component {

    @property
    protected _effect: cc.EffectAsset = null;
    @property({ type: cc.EffectAsset, tooltip: CC_DEV && 'Effect 资源' })
    public get effect() {
        return this._effect;
    }
    public set effect(value: cc.EffectAsset) {
        this._effect = value;
        this.init();
    }

    @property
    protected _offset: number = 3;
    @property({ tooltip: CC_DEV && '偏移' })
    public get offset() {
        return this._offset;
    }
    public set offset(value: number) {
        this._offset = value;
        this.updateProperties();
    }

    protected sprite: cc.Sprite = null;

    protected material: cc.Material = null;

    protected onEnable() {
        this.init();
    }

    protected resetInEditor() {
        this.init();
    }

    /**
     * 初始化
     */
    public async init() {
        /**
         * 编辑器环境下自动绑定 Effect 资源
         * 依赖于 EditorAsset 模块，没有该模块请将此代码块以及顶部导入语句去除
         * @see EditorAsset.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/misc/EditorAsset.ts
         */
        if (CC_EDITOR && !this._effect) {
            await new Promise<void>(res => {
                const path = 'cases/multiPassKawaseBlur/materials/kawase-blur.effect';
                EditorAsset.load(path, 'effect', (err: Error, result: cc.EffectAsset) => {
                    if (err) {
                        cc.warn(`[${this['__proto__']['__classname__']}]`, '请手动指定组件的 Effect 资源！');
                    } else {
                        this._effect = result;
                    }
                    res();
                });
            });
        }
        // 设置材质
        this.setupMaterial();
    }

    /**
     * 设置材质
     */
    public setupMaterial() {
        if (!this._effect) {
            cc.warn(`[${this['__proto__']['__classname__']}]`, '缺少 Effect 资源！');
            return;
        }
        // 使用自定义 Effect 需禁用纹理的 packable 属性（因为动态合图之后无法正确获取纹理 UV 坐标）
        // 详情请看：https://docs.cocos.com/creator/manual/zh/asset-workflow/sprite.html#packable
        const sprite = this.sprite = this.node.getComponent(cc.Sprite);
        if (sprite.spriteFrame) {
            sprite.spriteFrame.getTexture().packable = false;
        }
        // 生成并应用材质
        if (!this.material) {
            this.material = cc.Material.create(this._effect);
        }
        sprite.setMaterial(0, this.material);
        // 更新材质属性
        this.updateProperties();
    }

    /**
     * 更新材质属性
     */
    public updateProperties() {
        if (!this.material) {
            return;
        }
        this.material.setProperty('nodeSize', this.nodeSize);
        this.material.setProperty('pixelOffset', this._offset);
    }

    /**
     * 节点尺寸
     */
    public get nodeSize() {
        return cc.v2(this.node.width, this.node.height);
    }

}
