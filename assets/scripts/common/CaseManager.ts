import EventManager from "../../eazax-ccc/core/EventManager";
import SceneNavigator from "../../eazax-ccc/core/SceneNavigator";
import BrowserUtil from "../../eazax-ccc/utils/BrowserUtil";
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
        const sceneName = this.getCaseInfo(caseName).scene;
        SceneNavigator.go(sceneName, null, () => {
            // 设置当前 URL 的参数
            BrowserUtil.setUrlParam(`case=${caseName}`);
            // 事件
            EventManager.emit(SWITCH_CASE, sceneName);
        });
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

/** 关卡信息 */
export type CaseInfo = {
    name: string;
    scene: string;
}

/** 示例名称到示例信息的映射表 */
export const CaseInfoMap: { [caseName: string]: CaseInfo } = {
    avatar: {
        name: '头像',
        scene: 'avatar'
    },
    cardArray: {
        name: '卡片阵列',
        scene: 'cardArray'
    },
    cardFlip: {
        name: '卡片翻转',
        scene: 'cardFlip'
    },
    colorBrush: {
        name: '彩色画笔',
        scene: 'colorBrush'
    },
    frameLoading: {
        name: '分帧加载',
        scene: 'frameLoading'
    },
    gaussianBlur: {
        name: '高斯模糊',
        scene: 'gaussianBlur'
    },
    gradientColor: {
        name: '渐变色',
        scene: 'gradientColor'
    },
    newUserGuide: {
        name: '新手引导',
        scene: 'newUserGuide'
    },
    popupTest: {
        name: '弹窗测试',
        scene: 'popupTest'
    },
    rotateAround: {
        name: '围绕旋转',
        scene: 'rotateAround'
    },
    sineWave: {
        name: '正弦波浪',
        scene: 'sineWave'
    },
}
