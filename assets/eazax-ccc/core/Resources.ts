/** 资源管理器 */
export default class Resources {

    public static load(path: string): Promise<any> {
        return new Promise(res => {
            cc.resources.load(path, (error: Error, result: any) => {
                res(error || result);
            });
        });
    }

    public static release() {

    }

    public static getDepsRecursively(uuid: string): string[] {
        return cc.assetManager.dependUtil.getDepsRecursively(uuid);
    }

}
