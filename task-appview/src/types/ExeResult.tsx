export class ExeResult {
    constructor(private _result: boolean, private _message: string) { }

    merge(MergeResult: ExeResult) {
        if (this._result === false && MergeResult._result === true) {
            return new ExeResult(false, this._message);
        } else if (this._result === true && MergeResult._result === false) {
            return new ExeResult(false, MergeResult._message);
        }
        return this;
    }

    // true: success, false: failure
    get Result(): boolean {
        return this._result;
    }

    // message
    get Message(): string {
        return this._message;
    }
}