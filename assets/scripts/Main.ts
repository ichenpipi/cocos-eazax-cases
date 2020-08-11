const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    @property(cc.Node)
    private home: cc.Node = null;

    protected onLoad() {
        // let result = jsb.reflection.callStaticMethod('com/eazax/utils', 'Test', '(II)I', 1, 2);
        // console.info(result);
    }

    private test(a, ...b) {
        // console.log(a, b);
    }
}
