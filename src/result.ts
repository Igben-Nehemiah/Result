import Optional from "./optional";

class Result<T> {
    private _value?: T;
    private _error?: Error;

    constructor(value: T);
    constructor(error: Error);
    constructor(value?: T, error?: Error) {
        if (value !== undefined){
            this._value = value;
        };
        
        if (error !== undefined){
            this._error = error;
        };
    };

    public static fromError(error: Error): Result<T>{
        return new Result(error);
    };


    public toResult(): Result<T> {
        throw new Error();
    };

    public orInvoke<TError>(defaultFunc: (error: TError) => T): T {
        throw new Error();
    };

    public or(defaultValue: Optional<T>): Optional<T> {
        throw new Error();
    };

    public get value(): T {
        if (this.isNotSuccessful) throw new Error();
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
