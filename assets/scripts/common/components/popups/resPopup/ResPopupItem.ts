import ClickToLoadUrl from "../../ClickToLoadUrl";

const { ccclass, property } = cc._decorator;

@ccclass
export default class ResPopupItem extends cc.Component {

    @property(cc.Label)
    protected typeLabel: cc.Label = null;

    @property(cc.Label)
    protected nameLabel: cc.Label = null;

    @property(ClickToLoadUrl)
    protected clicker: ClickToLoadUrl = null;

    /**
     * 设置
     * @param name 
     * @param url 
     */
    public set(name: string, url: string) {
        const extname = name.slice(name.lastIndexOf('.'));
        this.typeLabel.string = SymbolMap[extname] || SymbolMap[''];
        this.nameLabel.string = name;
        this.clicker.url = url;
    }

}

/**
 * 符号表
 */
const SymbolMap = {
    '': '📦',
    '.ts': '📄',
    '.effect': '🎨',
};
