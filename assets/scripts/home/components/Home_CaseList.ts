import { CaseInfoMap } from "../../common/CaseList";
import Home_CaseBtn from "./Home_CaseBtn";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Home_CaseList extends cc.Component {

    @property(cc.Node)
    protected container: cc.Node = null;

    @property(cc.Prefab)
    protected btnPrefab: cc.Prefab = null;

    protected start() {
        this.generate();
    }

    /**
     * 生成按钮
     */
    protected generate() {
        const container = this.container,
            prefab = this.btnPrefab;
        // 销毁当前的按钮
        container.destroyAllChildren();
        // 遍历示例 key
        for (const key in CaseInfoMap) {
            const node = cc.instantiate(prefab);
            node.getComponent(Home_CaseBtn).set(key, CaseInfoMap[key]);
            node.setParent(container);
        }
    }

}
