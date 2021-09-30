import ZipLoader from "./ZipLoader";

/**
 * 远程 Spine 加载器
 * @author 陈皮皮 (ifaswind)
 * @version 20210930
 * @see SpineLoader.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/core/remote/SpineLoader.ts
 * @see ZipLoader.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/core/remote/ZipLoader.ts
 */
export default class SpineLoader {

    /**
     * 加载远程资源
     * @param url 资源地址
     * @param callback 加载回调
     */
    public static async loadRemote(url: string, callback?: (error: Error, skeletonData: sp.SkeletonData) => void) {
        cc.log('[SpineLoader]', 'loadSpine', url);
        // 下载 zip 文件
        const zip = await ZipLoader.loadRemote(url);
        if (!zip) {
            callback && callback(new Error('download failed'), null);
            return null;
        }
        cc.log('[SpineLoader]', 'loadSpine', 'zip', zip);
        // 解析文件
        const files = await SpineLoader.parseZip(zip);
        if (!files) {
            callback && callback(new Error('parse failed'), null);
            return;
        }
        cc.log('[SpineLoader]', 'loadSpine', 'files', files);
        return SpineLoader.getSkeletonData({ url, ...files });
    }

    /**
     * 解析 zip 包中的 Spine 资源
     * @param zip 
     */
    private static async parseZip(zip: any) {
        let json: object, jsonName: string,
            texture: cc.Texture2D, textureName: string,
            atlas: string;
        const files = zip.files,
            tasks = [];
        for (const key in files) {
            tasks.push((async () => {
                const file = files[key],
                    fileName = file.name,
                    extname = fileName.slice(fileName.lastIndexOf('.'));
                switch (extname) {
                    case '.json': {
                        json = await ZipLoader.toJson(file);
                        jsonName = key;
                        break;
                    }
                    case '.png': {
                        texture = await ZipLoader.toCCTexture(file);
                        texture.name = fileName;
                        textureName = key;
                        break;
                    }
                    case '.atlas':
                    case '.txt': {
                        atlas = await ZipLoader.toText(file);
                        break;
                    }
                }
            })());
        }
        await Promise.all(tasks);
        if (!json || !texture || !atlas) {
            return null;
        }
        return { json, jsonName, texture, textureName, atlas };
    }

    /**
     * 获取骨骼数据
     * @param data 
     */
    private static getSkeletonData(data: SkeletonInfo) {
        const skeletonData = new sp.SkeletonData();
        skeletonData['_name'] = data.jsonName;
        skeletonData['_uuid'] = data.url;
        skeletonData['_native'] = data.url;
        skeletonData.skeletonJson = data.json;
        skeletonData.atlasText = data.atlas;
        skeletonData.textures = [data.texture];
        skeletonData['textureNames'] = [data.textureName];
        skeletonData.loaded = true;
        return skeletonData;
    }

}

interface SkeletonInfo {
    url: string;
    json: object;
    jsonName: string;
    texture: cc.Texture2D;
    textureName: string;
    atlas: string;
}
