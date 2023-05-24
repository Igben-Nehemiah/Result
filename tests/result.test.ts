import Result from "../src/result";


describe("Result", () => {
    describe("when result is contructed with a value", () => {
        it("should create a result with a value of the given type", () => {
            const value = 100;
            const result = new Result<typeof value>(value);

            expect(result.hasValue).toBeTruthy();
            expect(result.value).toStrictEqual(value);
            expect(typeof result.value).toBe(typeof value);
        });
    });

    describe("when result is constructed with an error", () => {
        it("should create a result that has no value", () => {
            const error = new Error();
            const result = new Result(error);

            expect(result.hasValue).toBeFalsy();
        });
    });

    describe("when result is constructed with a subclass of error", () => {
        it("should create a result that has no value", () => {
            const error = new CustomError();
            const result = new Result(error);

            expect(result.hasValue).toBeFalsy();
            expect(result.isSuccessful).toBeFalsy();
            expect(result.isNotSuccessful).toBeTruthy();
        });
    });

    describe("when 'fromError' is called with an instance of error", () => {
        it("should create a result that is not successful", () => {
            const result = Result.fromError(new CustomError());

            expect(result.hasValue).toBeFalsy();
            expect(result.isSuccessful).toBeFalsy();
            expect(result.isNotSuccessful).toBeTruthy();
        });
    });


    describe("when 'onInvoke' is called on a successful result", () => {
        it ("shoud return the value of the result", () => {
            const value = 5;
            const result = new Result(value);
            
            const resultValue = result.orInvoke(() => value + 3);

            expect(resultValue).toBe(value);
        });
    });


    describe("when 'onInvoke' is called on a failed result", () => {
        it ("shoud return the value from the invoke method", () => {
            const value = 5;
            const result = new Result<number>(new Error());
            
            const resultValue = result.orInvoke(() => value + 3);

            expect(resultValue).toBe(value + 3);
        });
    });

    describe("when 'or' is called", () => {
        it ("shoud return the value of the result if no error", () => {
            const value = 5;
            const result = new Result(value);
            
            const resultValue = result.or(value + 3);

            expect(resultValue).toBe(value);
        });
    });

    describe("when 'or' is called", () => {
        it ("shoud return the default value if there is error", () => {
            const value = 5;
            const result = new Result<number>(new Error());
            
            const resultValue = result.or(3);

            expect(resultValue).toBe(3);
        });
    });

    describe("when 'match' is called on a successful result", () => {
        it ("shoud call the successful path", () => {
            const value = 5;
            const result = new Result<number>(value);
            let valueFromResult: number = 0;
            let errorFromResult: CustomError | undefined = undefined;
            
            result.match(
                (value) => { valueFromResult = value; }, 
                (error) => { errorFromResult = error; }
            );

            expect(valueFromResult).toBe(value);
            expect(errorFromResult).toBeUndefined();
        });
    });

    describe("when 'match' is called on a failed result", () => {
        it ("shoud call the failure path", () => {
            const result = new Result<number>(new CustomError());
            let valueFromResult: number | undefined = undefined;
            let errorFromResult: CustomError | undefined = undefined;
            
            result.match(
                (value) => { valueFromResult = value; }, 
                (error) => { errorFromResult = error; }
            );

            expect(valueFromResult).toBeUndefined();
            expect(errorFromResult).not.toBeUndefined();
        });
    });
});


class CustomError extends Error {}