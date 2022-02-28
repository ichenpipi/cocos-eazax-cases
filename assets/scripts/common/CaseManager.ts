import EventManager from "../../eazax-ccc/core/EventManager";
import SceneNavigator from "../../eazax-ccc/core/SceneNavigator";
import BrowserUtil from "../../eazax-ccc/utils/BrowserUtil";
import { CaseInfo, CaseInfoMap, RedirectMap } from "./CaseList";
import CaseLoading from "./components/global/CaseLoading";
import Toast from "./components/global/Toast";
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
     * @param name 示例名称
     */
    public static goCase(name: string) {
        eazax.log('[Go Case]', name);
        // 展示遮罩
        CaseLoading.show();
        // 检查重定向
        const redirect = RedirectMap[name];
        if (redirect) {
            name = redirect;
            eazax.log('[Redirect]', redirect);
        }
        // 获取示例信息
        const info = this.getCaseInfo(name);
        if (!info) {
            Toast.show('啊哦，没有找到这个示例', name);
            CaseLoading.hide();
            return false;
        }
        const sceneName = info.scene;
        SceneNavigator.go(sceneName, null, () => {
            // 设置当前 URL 的参数
            BrowserUtil.setUrlParam(`case=${name}`);
            // 发射事件
            EventManager.emit(SWITCH_CASE, sceneName);
            // 隐藏遮罩
            CaseLoading.hide();
        });
        return true;
    }

    /**
     * 获取示例信息
     * @param name 示例名称
     */
    public static getCaseInfo(name: string): CaseInfo {
        return CaseInfoMap[name];
    }

}
