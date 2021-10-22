import RemoteTexture from "../../../eazax-ccc/components/remote/RemoteTexture";
import Toast from "../../../scripts/common/components/global/Toast";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_RemoteTexture extends cc.Component {

    @property(RemoteTexture)
    protected remoteTexture: RemoteTexture = null;

    @property(cc.EditBox)
    protected urlEditorBox: cc.EditBox = null;

    protected onLoad() {
        this.registerEvent();
    }

    protected start() {
        this.reloadTexture();
    }

    protected registerEvent() {
        this.urlEditorBox.node.on('editing-did-ended', this.onUrlEditorBoxEnded, this);
    }

    protected onUrlEditorBoxEnded(editorBox: cc.EditBox) {
        this.reloadTexture();
    }

    protected async reloadTexture() {
        let url = this.urlEditorBox.string;
        if (url !== '') {
            Toast.show('🌀 正在加载远程图像...');
        }
        this.remoteTexture.set(null);
        const result = await this.remoteTexture.load(url);
        if (result.url !== '') {
            if (result.loaded) {
                Toast.show('🎉 远程图像加载成功');
            } else {
                Toast.show('❌ 远程图像加载失败');
            }
        }
    }

}
