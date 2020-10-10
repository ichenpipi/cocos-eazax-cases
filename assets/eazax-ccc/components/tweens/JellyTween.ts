const { ccclass, property } = cc._decorator;

@ccclass
export default class JellyTween extends cc.Component {

    @property({ tooltip: CC_DEV && '频率（回弹次数）' })
    private frequency: number = 4;

    @property({ tooltip: CC_DEV && '衰退速度' })
    private decay: number = 3;

    @property({ tooltip: CC_DEV && '间隔' })
    private interval: number = 0.5;

    @property({ tooltip: CC_DEV && '自动播放' })
    private playOnLoad: boolean = false;

    private tween: any = null;

    protected start() {
        if (this.playOnLoad) this.play();
    }

    public play() {
        const w = this.frequency * Math.PI * 2;
        this.tween = cc.tween(this.node)
            .repeatForever(
                cc.tween()
                    .to(0.2, { scaleX: 1.1, scaleY: 0.9 }, { easing: 'sineOut' })
                    .to(0.15, { scaleX: 1, scaleY: 1 }, { easing: 'sineOut' })
                    .to(0.65, {
                        scaleX: 1,
                        scaleY: {
                            value: 1,
                            progress: (start: number, end: number, current: number, t: number) => {
                                return end + end * (Math.sin(t * w) / Math.exp(this.decay * t) / w);
                            }
                        }
                    })
                    .delay(this.interval)
            )
            .start();
    }

    public stop() {
        this.node.stopAction(this.tween);
        this.node.scale = 1;
    }

}
