import BrowserUtil from "../../eazax-ccc/utils/BrowserUtil";
import PopupManager from "../../eazax-ccc/core/PopupManager";
import SceneNavigator from "../../eazax-ccc/core/SceneNavigator";
import { SceneName } from "../common/constants/Constants";
import CaseManager from "../common/CaseManager";
import LoadingTip from "../common/components/LoadingTip";
import Toast from "../common/components/Toast";

const { ccclass, property, executionOrder } = cc._decorator;

@ccclass
@executionOrder(-100)
export default class Home extends cc.Component {

    protected onLoad() {
        this.init();
    }

    protected start() {
        this.detectCaseParam();
    }

    protected init() {
        // 设置首页
        SceneNavigator.setHome(SceneName.Home);
        // 设置弹窗加载回调
        PopupManager.loadStartCallback = () => LoadingTip.show();
        PopupManager.loadFinishCallback = () => LoadingTip.hide();
    }

    /**
     * 检测 URL 参数跳转示例
     */
    protected detectCaseParam() {
        // 获取链接中的示例参数
        const caseName = BrowserUtil.getUrlParam('case');
        if (caseName) {
            if (CaseManager.hasCase(caseName)) {
                // 跳转到指定示例
                CaseManager.goCase(caseName);
            } else {
                Toast.show('啊哦，没有找到这个示例', caseName);
            }
        }
    }

}
