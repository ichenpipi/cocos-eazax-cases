export default class RemoteLoader {

    /**
     * 加载纹理
     * @param url 资源地址
     * @param callback 加载回调
     */
    public static loadTexture(url: string, callback?: (error: Error, texture: cc.Texture2D) => void) {
        return new Promise<cc.Texture2D>(res => {
            cc.assetManager.loadRemote(url, (_error: Error, _texture: cc.Texture2D) => {
                if (_error) {
                    callback && callback(_error, null);
                    res(null);
                } else {
                    callback && callback(null, _texture);
                    res(_texture);
                }
            });
        });
    }

}

type Callback<T, K> = (error: T, result: K) => void;
