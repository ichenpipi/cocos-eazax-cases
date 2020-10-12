const { ccclass, property } = cc._decorator;

/**
 * 果冻缓动效果
 * @see JellyTween.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/tweens/JellyTween.ts
 */
@ccclass
export default class JellyTween extends cc.Component {

    @property({ tooltip: CC_DEV && '频率（回弹次数）' })
    public frequency: number = 4;

    @property({ tooltip: CC_DEV && '衰退指数' })
    public decay: number = 3;

    @property({ tooltip: CC_DEV && '播放间隔' })
    public interval: number = 0.5;

    @property({ tooltip: CC_DEV && '自动播放' })
    public playOnLoad: boolean = false;

    private tween: cc.Tween = null;

    protected start() {
        if (this.playOnLoad) this.play();
    }

    /**
     * 播放
     * @param repeatTimes 重复次数
     */
    public play(repeatTimes?: number) {
        // 重复次数
        const times = (repeatTimes != undefined && repeatTimes > 0) ? repeatTimes : 10e8;
        // 角速度（ω=2nπ）
        const angularVelocity = this.frequency * Math.PI * 2;
        // 播放
        this.tween = cc.tween(this.node)
            .repeat(times,
                cc.tween()
                    .to(0.2, { scaleX: 1.1, scaleY: 0.9 }, { easing: 'sineOut' })
                    .to(0.15, { scaleX: 1, scaleY: 1 }, { easing: 'sineOut' })
                    .to(0.65, {
                        scaleX: 1,
                        scaleY: {
                            value: 1,
                            progress: (start: number, end: number, current: number, t: number) => {
                                return end + (end * (Math.sin(t * angularVelocity) / Math.exp(this.decay * t) / angularVelocity));
                            }
                        }
                    })
                    .delay(this.interval)
            )
            .start();
    }

    /**
     * 停止
     */
    public stop() {
        this.tween && this.tween.stop();
        this.node.setScale(1);
    }

}
