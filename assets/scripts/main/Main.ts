import MainContent from "./MainContent";
import BrowserUtil from "../../eazax-ccc/utils/BrowserUtil";
import PopupManager from "../../eazax-ccc/core/PopupManager";
import LoadingTip from "../../eazax-ccc/components/LoadingTip";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    protected onEnable() {
        // 检查链接中是否有示例参数
        const caseName = BrowserUtil.getUrlParam('case');
        if (caseName && MainContent.hasCase(caseName)) {
            MainContent.goCase(caseName);
        } else {
            MainContent.goHome();
        }

        // 设置弹窗加载回调
        PopupManager.loadStartCallback = () => LoadingTip.show();
        PopupManager.loadFinishCallback = () => LoadingTip.hide();
    }

}
