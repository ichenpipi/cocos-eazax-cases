import ClickToLoadUrl from "../../ClickToLoadUrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResPopupItem extends cc.Component {

    @property(cc.Label)
    private typeLabel: cc.Label = null;

    @property(cc.Label)
    private nameLabel: cc.Label = null;

    @property(ClickToLoadUrl)
    private clicker: ClickToLoadUrl = null;

    public set(name: string, url: string) {
        const extname = name.slice(name.lastIndexOf('.'));
        this.typeLabel.string = SymbolMap[extname] || '📦';
        this.nameLabel.string = name;
        this.clicker.url = url;
    }

}

const SymbolMap = {
    '.ts': '📄',
    '.effect': '🎨',
}
