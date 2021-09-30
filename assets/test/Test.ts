const { ccclass, property } = cc._decorator;

@ccclass
export default class Test extends cc.Component {

    @property(cc.Texture2D)
    protected texture: cc.Texture2D = null;

    @property([cc.Texture2D])
    protected textures: cc.Texture2D[] = [];

}
