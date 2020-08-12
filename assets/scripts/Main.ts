import MainContent from "./MainContent";
import BrowserUtil from "../eazax-ccc/utils/BrowserUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    protected start() {
        const targetCase = BrowserUtil.getUrlParam('case');
        if (targetCase && MainContent.hasCase(targetCase)) MainContent.goCase(targetCase);
        else MainContent.goHome();
    }

}
