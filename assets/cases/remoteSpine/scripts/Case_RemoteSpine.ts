import RemoteSpine from "../../../eazax-ccc/components/remote/RemoteSpine";
import Toast from "../../../scripts/common/components/global/Toast";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_RemoteSpine extends cc.Component {

    @property(RemoteSpine)
    protected remoteSpine: RemoteSpine = null;

    @property(cc.EditBox)
    protected urlEditorBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected skinEditorBox: cc.EditBox = null;

    @property(cc.EditBox)
    protected animEditorBox: cc.EditBox = null;

    protected onLoad() {
        this.init();
        this.registerEvent();
    }

    protected start() {
        this.reloadTexture();
    }

    protected registerEvent() {
        this.urlEditorBox.node.on('editing-did-ended', this.onUrlEditorBoxEnded, this);
        this.skinEditorBox.node.on('editing-did-ended', this.onSkinEditorBoxEnded, this);
        this.animEditorBox.node.on('editing-did-ended', this.onAnimEditorBoxEnded, this);
    }

    protected onUrlEditorBoxEnded(editorBox: cc.EditBox) {
        this.reloadTexture();
    }

    protected onSkinEditorBoxEnded(editorBox: cc.EditBox) {
        const skin = this.skinEditorBox.string;
        this.remoteSpine.skeleton.setSkin(skin);
    }

    protected onAnimEditorBoxEnded(editorBox: cc.EditBox) {
        const anim = this.animEditorBox.string;
        this.remoteSpine.skeleton.animation = anim;
    }

    protected init() {
        this.skinEditorBox.string = this.remoteSpine.defaultSkin;
        this.animEditorBox.string = this.remoteSpine.defaultAnimation;
    }

    protected async reloadTexture() {
        let url = this.urlEditorBox.string;
        if (url !== '') {
            Toast.show('🌀 正在加载远程骨骼...');
        }
        this.remoteSpine.set(null);
        const result = await this.remoteSpine.load(url);
        if (result.url !== '') {
            if (result.loaded) {
                Toast.show('🎉 远程骨骼加载成功');
            } else {
                Toast.show('❌ 远程骨骼加载失败');
            }
        }
    }

}
