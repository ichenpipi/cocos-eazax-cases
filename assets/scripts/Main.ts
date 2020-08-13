import MainContent from "./MainContent";
import BrowserUtil from "../eazax-ccc/utils/BrowserUtil";

const { ccclass, property } = cc._decorator;

@ccclass
export default class Main extends cc.Component {

    protected start() {
        const caseName = BrowserUtil.getUrlParam('case');
        if (caseName && MainContent.hasCase(caseName)) MainContent.goCase(caseName);
        else MainContent.goHome();
    }

}
