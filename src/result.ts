import Optional from "./optional";

class Result<T> {
    private readonly _value?: T;
    private readonly _error?: Error;

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

    public orInvoke(func: () => T): T {
        return this._error === undefined ?
            this.value : func();
    };

    public or(defaultValue: Optional<T>): Optional<T> {
        return this._error === undefined ? 
            this.value : defaultValue;
    };

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



export default Result;
