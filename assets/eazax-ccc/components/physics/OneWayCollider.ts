const { ccclass, property, menu } = cc._decorator;

/**
 * 单向碰撞体
 * @author 陈皮皮 (ifaswind)
 * @version 20220212
 * @see OneWayCollider.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/physics/OneWayCollider.ts
 * @see Reference http://www.iforce2d.net/b2dtut/one-way-walls
 */
@ccclass
@menu('eazax/物理组件/OneWayCollider')
export default class OneWayCollider extends cc.Component {

    /**
     * 生命周期：启用
     */
    protected onEnable() {
        const rigidBody = this.getComponent(cc.RigidBody);
        rigidBody && (rigidBody.enabledContactListener = true);
    }

    /**
     * 碰撞体开始接触回调
     * @param contact 
     * @param selfCollider 
     * @param otherCollider 
     */
    protected onBeginContact(contact: cc.PhysicsContact, selfCollider: cc.PhysicsCollider, otherCollider: cc.PhysicsCollider) {
        const points = contact.getWorldManifold().points;

        const selfBody = selfCollider.body;
        const otherBody = otherCollider.body;

        const selfPoint = new cc.Vec2();
        const otherPoint = new cc.Vec2();
        const relativeVelocity = new cc.Vec2();
        // const relativePoint = new cc.Vec2();

        // 检查碰撞点
        for (let i = 0; i < points.length; i++) {
            // 获取碰撞点的速度
            selfBody.getLinearVelocityFromWorldPoint(points[i], selfPoint);
            otherBody.getLinearVelocityFromWorldPoint(points[i], otherPoint);

            // 计算相对速度（相对于自己）
            selfBody.getLocalVector(otherPoint.subSelf(selfPoint), relativeVelocity);

            // 速度 y 分量小于 0 则为向下运动
            if (relativeVelocity.y <= 0) {
                return;
            }

            // if (relativeVelocity.y < -32) { //if moving down faster than 32 pixel/s (1m/s), handle as before
            //     return;  //point is moving into platform, leave contact solid and exit
            // }
            // else if (relativeVelocity.y < 32) { //if moving slower than 32 pixel/s (1m/s)
            //     //borderline case, moving only slightly out of platform
            //     selfBody.getLocalPoint(points[i], relativePoint);
            //     // @ts-ignore
            //     const faceY = selfCollider.getAABB().height / 2;  //front of platform, should only used on a box collider
            //     if (relativePoint.y > faceY - 0.1 * 32) {
            //         return;  //contact point is less than 3.2pixel (10cm) inside front face of platfrom
            //     }
            // }
            // else {
            //     //moving up faster than 1 m/s
            // }
        }

        // 忽略本次接触
        contact.disabled = true;
    }

}
