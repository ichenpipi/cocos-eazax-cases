import EventManager from "../../eazax-ccc/core/EventManager";
import SceneNavigator from "../../eazax-ccc/core/SceneNavigator";
import BrowserUtil from "../../eazax-ccc/utils/BrowserUtil";
import { CaseInfo, CaseInfoMap } from "./CaseList";
import CaseLoading from "./components/CaseLoading";
import Toast from "./components/Toast";
import { SceneName } from "./constants/Constants";
import { SWITCH_CASE } from "./constants/CustomEvents";

/**
 * 示例管理器
 */
export default class CaseManager {

    /**
     * 前往首页
     */
    public static goHome() {
        eazax.log('[Go Home]', '^.^');
        // 清除当前 URL 的参数
        BrowserUtil.clearUrlParam();
        // 跳转
        SceneNavigator.goHome(null, false, () => {
            // 事件
            EventManager.emit(SWITCH_CASE, SceneName.Home);
        });
    }

    /**
     * 前往对应示例
     * @param caseName 示例名称
     */
    public static goCase(caseName: string) {
        eazax.log('[Go Case]', caseName);
        // 展示遮罩
        CaseLoading.show();
        // 示例信息
        const info = this.getCaseInfo(caseName);
        if (!info) {
            Toast.show('啊哦，没有找到这个示例', caseName);
            return false;
        }
        const sceneName = info.scene;
        SceneNavigator.go(sceneName, null, () => {
            // 设置当前 URL 的参数
            BrowserUtil.setUrlParam(`case=${caseName}`);
            // 事件
            EventManager.emit(SWITCH_CASE, sceneName);
            // 隐藏遮罩
            CaseLoading.hide();
        });
        return true;
    }

    /**
     * 是否有对应示例
     * @param caseName 示例名称
     */
    public static hasCase(caseName: string) {
        return !!this.getCaseInfo(caseName);
    }

    /**
     * 获取示例信息
     * @param caseName 示例名称
     */
    public static getCaseInfo(caseName: string): CaseInfo {
        return CaseInfoMap[caseName];
    }

}
