// 点击 ScrollView 里的子元素不触发 ScrollView 滚动
const _onTouchMoved_old = cc.ScrollView.prototype['_onTouchMoved'];
cc.ScrollView.prototype['_onTouchMoved'] = function (event, captureListeners) {
    if (event.target !== this.node) {
        return;
    }
    _onTouchMoved_old.call(this, event, captureListeners);
}
