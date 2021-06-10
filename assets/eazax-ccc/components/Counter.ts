const { ccclass, property, requireComponent } = cc._decorator;

/**
 * 数字滚动（cc.Label）
 * @see Counter.ts https://gitee.com/ifaswind/eazax-ccc/blob/master/components/Counter.ts
 * @version 20210521
 */
@ccclass
@requireComponent(cc.Label)
export default class Counter extends cc.Component {

    @property(cc.Label)
    public label: cc.Label = null;

    @property({ tooltip: CC_DEV && '动画时长' })
    public duration: number = 0.5;

    @property({ tooltip: CC_DEV && '保持数值为整数' })
    public keepInteger: boolean = true;

    protected actualValue: number = 0;

    public get value() {
        return this.actualValue;
    }

    public set value(value: number) {
        if (this.keepInteger) {
            value = Math.floor(value);
        }
        this.curValue = (this.actualValue = value);
    }

    protected _curValue: number = 0;

    public get curValue() {
        return this._curValue;
    }

    public set curValue(value: number) {
        if (this.keepInteger) {
            value = Math.floor(value);
        }
        this._curValue = value;
        this.label.string = value.toString();
    }

    protected tweenRes: Function = null;

    protected onLoad() {
        this.init();
    }

    /**
     * 初始化
     */
    protected init() {
        if (!this.label) {
            this.label = this.getComponent(cc.Label);
        }
        this.value = 0;
    }

    /**
     * 设置数值
     * @param value 数值
     */
    public set(value: number) {
        this.value = value;
    }

    /**
     * 设置动画时长
     * @param duration 动画时长
     */
    public setDuration(duration: number) {
        this.duration = duration;
    }

    /**
     * 滚动数值
     * @param value 目标值
     * @param duration 动画时长
     * @param callback 完成回调
     */
    public to(value: number, duration?: number, callback?: () => void): Promise<void> {
        return new Promise<void>(res => {
            // 停止当前动画
            if (this.tweenRes) {
                cc.Tween.stopAllByTarget(this);
                this.tweenRes();
            }
            this.tweenRes = res;
            // 保存实际值
            this.actualValue = value;
            // 动画时长
            if (duration == undefined) {
                duration = this.duration;
            }
            // GO
            cc.tween<Counter>(this)
                .to(duration, { curValue: value })
                .call(() => {
                    this.tweenRes = null;
                    callback && callback();
                    res();
                })
                .start();
        });
    }

    /**
     * 相对滚动数值
     * @param diff 差值
     * @param duration 动画时长
     * @param callback 完成回调
     */
    public by(diff: number, duration?: number, callback?: () => void): Promise<void> {
        const value = this.actualValue + diff;
        return this.to(value, duration, callback);
    }

}
