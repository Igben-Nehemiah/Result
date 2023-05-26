export class Result<T> {
    private readonly _value?: T;
    private readonly _error?: Error;

    /**
     * Represents a result that holds a value.
     * @param value - Value of the result.
     */
    constructor(value: T);
    /**
     * Represents a result that holds an error.
     * @param error - Error of the result.
     */
    constructor(error: Error);
    constructor(valueOrError: T | Error) {
        if (valueOrError instanceof Error) {
            this._error = valueOrError;
            this._value = undefined;
        } else {
            this._value = valueOrError;
            this._error = undefined;
        };
    };

    /**
     * Creates a failure result from an error instance.
     * @param error - The error instance.
     * @returns A new failure result containing the error.
     */
    public static fromError<T>(error: Error){
        return new Result<T>(error);
    };

    /**
     * Retrieves the value of a result if it exists; otherwise, invokes a factory function to get a value.
     * @param factoryFunc - The function invoked when the result contains an error to produce a value.
     * @returns The value of the result if it is successful; otherwise, the value produced by the factory function.
     */
    public orInvoke(factoryFunc: () => T): T {
        return this._error === undefined ? this.value : factoryFunc();
    };
  
    /**
     * Retrieves the value of a result if it exists; otherwise, returns a default value.
     * @param defaultValue - The default value to be returned if the result is not successful.
     * @returns The value of the result if it is successful; otherwise, the provided default value.
     */
    public or(defaultValue: T): T {
        return this._error === undefined ? this.value : defaultValue;
    };

    /**
     * Matches a result and calls the appropriate callback based on its success or failure.
     * @param onSuccess - Callback function to be called with the value of the result if it is successful.
     * @param onFailure - Callback function to be called with the error of the result if it is a failure.
     * @returns void
     */
    public match(onSuccess: (value: T) => void, onFailure: (error: Error) => void): void {
        if (this._error !== undefined) {
            onFailure(this._error);
        } else if (this._value !== undefined) {
            onSuccess(this._value);
        };
    };

    /**
     * Applies a transformation function to the value contained in a `successful result`
     * instance and returns a new Result with the transformed
     * value. If called on a `Failure` instance, it simply 
     * returns a new Result instance with the same error.
     * @param transform - Transformation function.
     * @returns - A new Result instance.
     */
    public map<U>(transform: (value: T) => U): Result<U> {
        return this.isSuccessful ? 
            new Result(transform(this.value)) : 
            new Result<U>(this._error);
    };

    /**
     * Applies a transformation function that takes a value and returns a new Result. 
     * If called on a `successful result` instance, it applies the transformation 
     * and returns the resulting Result. If called on a `failed result` instance, 
     * it simply returns a new Failure instance with the same 
     * error message.
     * @param transform - Transformation function.
     * @returns - A new Result instance.
     */
    public flatMap<U>(transform: (value: T) => Result<U>): Result<U> {
        return this.isSuccessful ? 
            transform(this.value) : 
            new Result<U>(this._error);
    };

    /**
     * Retrieves the value of the result.
     * @throws An error if the result is not successful.
     * @returns The value of the result.
     */
    public get value(): T {
        this.validate();
        return this._value!;
    };

    /**
     * Retrieves the error of the result, if any.
     * @returns The error of the result, or undefined if the result is successful.
     */
    public get error(): Error | undefined {
        return this._error;
    };

    /**
     * Checks if the result is successful.
     * @returns True if the result is successful; false otherwise.
     */
    public get isSuccessful(): boolean {
        return this._error === undefined;
    };

    /**
     * Checks if the result is not successful (i.e., a failure).
     * @returns True if the result is not successful (a failure); false otherwise.
     */
    public get isNotSuccessful(): boolean {
        return !this.isSuccessful;
    };
  
   /**
     * Checks if the result has a value.
     * @returns True if the result has a value; false otherwise.
     */
    public get hasValue(): boolean {
        return this.isSuccessful;
    };

    /**
     * Validates the result and throws an error if it is a failure.
     * @throws An error if the result is a failure.
     * @returns void
     */
    private validate(): void {
        if (this._error) {
            throw new Error("Validation failed");
        };
    };
};