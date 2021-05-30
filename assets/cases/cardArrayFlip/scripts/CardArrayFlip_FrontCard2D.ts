import CardArrayFlip_FrontCardBase from "./CardArrayFlip_FrontCardBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArrayFlip_FrontCard2D extends CardArrayFlip_FrontCardBase {

    public flipToFront() {
        return new Promise<void>(res => {
            const tween = cc.tween,
                duration = 1,
                half = duration / 2;
            tween(this.node)
                .to(duration, { scale: 1.1 })
                .start();
            tween(this.main)
                .parallel(
                    tween().to(half, { scaleX: 0 }, { easing: 'quadIn' }),
                    tween().to(half, { skewY: -20 }, { easing: 'quadOut' }),
                )
                .call(() => {
                    this.front.active = true;
                    this.back.active = false;
                })
                .parallel(
                    tween().to(half, { scaleX: -1 }, { easing: 'quadOut' }),
                    tween().to(half, { skewY: 0 }, { easing: 'quadIn' }),
                )
                .call(res)
                .start();
        });
    }

    public flipToBack() {
        return new Promise<void>(res => {
            const tween = cc.tween,
                duration = 1,
                half = duration / 2;
            tween(this.node)
                .to(duration, { scale: 0.8 })
                .start();
            tween(this.main)
                .parallel(
                    tween().to(half, { scaleX: 0 }, { easing: 'quadIn' }),
                    tween().to(half, { skewY: 20 }, { easing: 'quadOut' }),
                )
                .call(() => {
                    this.front.active = false;
                    this.back.active = true;
                })
                .parallel(
                    tween().to(half, { scaleX: 1 }, { easing: 'quadOut' }),
                    tween().to(half, { skewY: 0 }, { easing: 'quadIn' }),
                )
                .call(res)
                .start();
        });
    }

}
