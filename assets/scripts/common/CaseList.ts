/** 示例名称到示例信息的映射表 */
export const CaseInfoMap: { [caseName: string]: CaseInfo } = {
    afterEffect: {
        name: '后期特效',
        scene: 'afterEffect'
    },
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
    cardArrayFlip: {
        name: '卡片阵列 & 翻转',
        scene: 'cardArrayFlip'
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
    radarChart: {
        name: '雷达图',
        scene: 'radarChart'
    },
    rotateAround: {
        name: '围绕旋转',
        scene: 'rotateAround'
    },
    sineWave: {
        name: '正弦波浪',
        scene: 'sineWave'
    },
    arcProgressBar: {
        name: '弧形进度条',
        scene: 'arcProgressBar'
    },
    remoteAsset: {
        name: '远程资源',
        scene: 'remoteAsset'
    },
}

/** 关卡信息 */
export type CaseInfo = {
    name: string;
    scene: string;
}
