/** 示例名称到示例信息的映射表 */
export const CaseInfoMap: { [caseName: string]: CaseInfo } = {
    postProcessing: {
        name: '后期处理',
        scene: 'postProcessing'
    },
    radialBlur: {
        name: '径向模糊',
        scene: 'radialBlur'
    },
    gaussianBlur: {
        name: '高斯模糊（试验）',
        scene: 'gaussianBlur'
    },
    avatar: {
        name: '头像',
        scene: 'avatar'
    },
    pixelClick: {
        name: '像素点击',
        scene: 'pixelClick'
    },
    runtimeTrimming: {
        name: '运行时图像剪裁',
        scene: 'runtimeTrimming'
    },
    colorBrush: {
        name: '彩色画笔',
        scene: 'colorBrush'
    },
    gradientColor: {
        name: '渐变色',
        scene: 'gradientColor'
    },
    newUserGuide: {
        name: '新手引导',
        scene: 'newUserGuide'
    },
    radarChart: {
        name: '雷达图',
        scene: 'radarChart'
    },
    sineWave: {
        name: '正弦波浪',
        scene: 'sineWave'
    },
    arcProgressBar: {
        name: '弧形进度条',
        scene: 'arcProgressBar'
    },
    remoteTexture: {
        name: '远程图像',
        scene: 'remoteTexture'
    },
    remoteSpine: {
        name: '远程骨骼',
        scene: 'remoteSpine'
    },
    frameLoading: {
        name: '分帧加载',
        scene: 'frameLoading'
    },
    collisionQuadTree: {
        name: '碰撞检测（四叉树）',
        scene: 'collisionQuadTree'
    },
    rotateAround: {
        name: '围绕旋转',
        scene: 'rotateAround'
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
    dragging: {
        name: '拖拽示例',
        scene: 'dragging'
    },
    popupTesting: {
        name: '弹窗测试',
        scene: 'popupTesting'
    },
}

/** 关卡信息 */
export type CaseInfo = {
    name: string;
    scene: string;
}
