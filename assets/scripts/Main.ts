import MainContent from "./MainContent";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    protected onLoad() {
        MainContent.goHome();
    }

}
