export class Result<T> {
    private readonly _value?: T;
    private readonly _error?: Error;

    constructor(value: T);
    constructor(error: Error);
    constructor(value: T | Error) {
        if (value instanceof Error){
            this._error = value;
            this._value = undefined;
            return;
        };
        
        this._value = value;
        this._error = undefined;
    };

    public static fromError(error: Error){
        return new Result(error);
    };

    public orInvoke(func: () => T): T {
        return this._error === undefined ?
            this.value : func();
    };

    public or(defaultValue: T): T {
        return this._error === undefined ? 
            this.value : defaultValue;
    };

    public match(onSuccess: (value: T) => void, 
        onFailure: (error: Error) => void): void {

        if (this._error !== undefined) {
            onFailure(this._error);
            return;
        };

        if (this._value !== undefined) {
            onSuccess(this._value);
            return;
        };
    }

    public get value(): T {
        this.validate();
        return this._value!;
    };

    public get isSuccessful(): boolean {
        return this._error === undefined;
    };

    public get isNotSuccessful(): boolean {
        return !this.isSuccessful;
    };

    public get hasValue(): boolean {
        return this.isSuccessful;
    }

    private validate(): void {
        if (this._error){
            throw new Error();
        };
    };
};