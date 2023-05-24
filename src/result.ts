export class Result<T> {
    private readonly _value?: T;
    private readonly _error?: Error;

    /**
     *
     */
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

    /**
     * Creates a result from an error instance.
     * @param error - The error instance.
     * @returns A new result of error type.
     */
    public static fromError(error: Error){
        return new Result(error);
    };

    /**
     * Gets the value of a result if it exists else gets the value from a factory function.
     * @param func - The function called if result has error that returns a value.
     * @returns A value of specified result type.
     */
    public orInvoke(func: () => T): T {
        return this._error === undefined ?
            this.value : func();
    };

    /**
     * Gets the value of a result if it exists else returns the default value passed in.
     * @param defaultValue - The default value to be returned if result is not successful.
     * @returns A value of the specified result type.
     */
    public or(defaultValue: T): T {
        return this._error === undefined ? 
            this.value : defaultValue;
    };

    /**
     * Matches a result and calls onSuccess callback if result is successful 
     * else calls onFailure callback.
     * @param onSuccess - Successful path callback that uses the value of the result as input.
     * @param onFailure - Failure path callback that uses the error of the result as input.
     * @returns void
     */
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

    /**
     * Value of the result.
     */
    public get value(): T {
        this.validate();
        return this._value!;
    };

    /**
     * Success status of result.
     */
    public get isSuccessful(): boolean {
        return this._error === undefined;
    };

    /**
     * Failure status of result.
     */
    public get isNotSuccessful(): boolean {
        return !this.isSuccessful;
    };

    /**
     * Checks if result has value.
     */
    public get hasValue(): boolean {
        return this.isSuccessful;
    }

    private validate(): void {
        if (this._error){
            throw new Error("Validation failed");
        };
    };
};