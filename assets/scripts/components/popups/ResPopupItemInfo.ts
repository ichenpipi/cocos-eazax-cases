const { ccclass, property } = cc._decorator;

@ccclass('ResPopupItemInfo')
export default class ResPopupItemInfo {

    @property()
    public title: string = '';

    @property()
    public url: string = '';

}
