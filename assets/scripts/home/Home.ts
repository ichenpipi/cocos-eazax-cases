import BrowserUtil from "../../eazax-ccc/utils/BrowserUtil";
import PopupManager from "../../eazax-ccc/core/PopupManager";
import LoadingTip from "../../eazax-ccc/components/LoadingTip";
import SceneNavigator from "../../eazax-ccc/core/SceneNavigator";
import { SceneName } from "../common/constants/Constants";
import CaseManager from "../common/CaseManager";

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(-100)
export default class Home extends cc.Component {

    protected onLoad() {
        this.init();
    }

    protected onEnable() {
        this.detectCaseParam();
    }

    protected init() {
        // 设置首页
        SceneNavigator.setHome(SceneName.Home);
        // 设置弹窗加载回调
        PopupManager.loadStartCallback = LoadingTip.show;
        PopupManager.loadFinishCallback = LoadingTip.hide;
    }

    protected detectCaseParam() {
        // 检查链接中是否有示例参数
        const caseName = BrowserUtil.getUrlParam('case');
        if (caseName && CaseManager.hasCase(caseName)) {
            CaseManager.goCase(caseName);
        } else {
            CaseManager.goHome();
        }
    }

}
