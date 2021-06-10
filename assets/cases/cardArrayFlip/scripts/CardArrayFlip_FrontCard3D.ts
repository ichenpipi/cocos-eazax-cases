import CardArrayFlip_FrontCardBase from "./CardArrayFlip_FrontCardBase";

const { ccclass, property } = cc._decorator;

@ccclass
export default class CardArrayFlip_FrontCard3D extends CardArrayFlip_FrontCardBase {

    public flipToFront() {
        return new Promise<void>(res => {
            const tween = cc.tween,
                duration = 1,
                half = duration / 2;
            tween(this.node)
                .to(duration, { scale: 1.1, eulerAngles: cc.v3(0, 0, 0) })
                .start();
            tween(this.main)
                .to(half, { eulerAngles: cc.v3(0, -90, 0) })
                .call(() => {
                    this.front.active = true;
                    this.back.active = false;
                })
                .to(half, { eulerAngles: cc.v3(0, -180, 0) })
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
                .to(duration, { scale: 0.8, eulerAngles: cc.v3(10, 0, 0) })
                .start();
            tween(this.main)
                .to(half, { eulerAngles: cc.v3(0, -270, 0) })
                .call(() => {
                    this.front.active = false;
                    this.back.active = true;
                })
                .to(half, { eulerAngles: cc.v3(0, 0, 0) })
                .call(res)
                .start();
        });
    }

}
