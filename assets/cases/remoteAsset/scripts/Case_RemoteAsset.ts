import RemoteTexture from "../../../eazax-ccc/components/remote/RemoteTexture";
import Toast from "../../../scripts/common/components/Toast";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Case_RemoteAsset extends cc.Component {

    @property(RemoteTexture)
    protected remoteTexture: RemoteTexture = null;

    @property(cc.EditBox)
    protected remoteTextureEditorBox: cc.EditBox = null;

    protected onLoad() {
        this.registerEvent();
    }

    protected start() {
        this.reloadTexture();
    }

    protected registerEvent() {
        this.remoteTextureEditorBox.node.on('editing-did-ended', this.onRemoteTextureEditorBoxEnded, this);
    }

    protected onRemoteTextureEditorBoxEnded(editorBox: cc.EditBox) {
        this.reloadTexture();
    }

    protected async reloadTexture() {
        let url = this.remoteTextureEditorBox.string;
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
