import Result from "../src/result";

class CustomError extends Error {

}


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
        });
    });
});