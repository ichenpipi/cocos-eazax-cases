import SceneNavigator from "../../eazax-ccc/core/SceneNavigator";
import { CaseSceneNameMap } from "./constants/Constants";

/**
 * 示例管理器
 */
export default class CaseManager {

    /**
     * 前往首页
     */
    public static goHome() {
        SceneNavigator.goHome();
    }

    /**
     * 前往对应示例
     * @param caseName 示例名称
     */
    public static goCase(caseName: string) {
        const sceneName = CaseSceneNameMap[caseName];
        SceneNavigator.go(sceneName);
    }

    /**
     * 是否有对应示例
     * @param caseName 示例名称
     */
    public static hasCase(caseName: string) {
        return CaseSceneNameMap[caseName] != null;
    }

}
