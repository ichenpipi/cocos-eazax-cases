import ZipLoader from './ZipLoader';

/**
 * 远程加载器
 * @author 陈皮皮 (ifaswind)
 * @version 20210930
 * @see RemoteLoader.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/core/remote/RemoteLoader.ts
 * @see jszip.js https://github.com/Stuk/jszip
 */
export default class RemoteLoader {

    /**
     * 加载纹理
     * @param url 资源地址
     * @param callback 加载回调
     */
    public static loadTexture(url: string, callback?: (error: Error, texture: cc.Texture2D) => void) {
        return new Promise<cc.Texture2D>(res => {
            cc.assetManager.loadRemote(url, (error: Error, texture: cc.Texture2D) => {
                if (error || !(texture instanceof cc.Texture2D)) {
                    callback && callback(error, null);
                    res(null);
                } else {
                    callback && callback(null, texture);
                    res(texture);
                }
            });
        });
    }

    /**
     * 加载 Spine
     * @param url 资源地址
     * @param callback 加载回调
     */
    public static async loadSpine(url: string, callback?: (error: Error, skeletonData: sp.SkeletonData) => void) {
        cc.log('[RemoteLoader]', 'loadSpine', url);
        // 下载 zip 文件
        const zip = await ZipLoader.loadRemote(url);
        if (!zip) {
            callback && callback(new Error('download failed'), null);
            return null;
        }
        cc.log('[RemoteLoader]', 'loadSpine', 'zip', zip);
        // 解析文件
        const files = {
            texture: null,
            data: null,
            atlas: null,
        };
        const tasks = [];
        for (const key in zip.files) {
            cc.log('[RemoteLoader]', 'loadSpine', 'zip -> files', key, zip.files[key]);
            tasks.push(new Promise(res => {

            }));
        }
    }

}
