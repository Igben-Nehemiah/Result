# Result
In functional programming, a Result Monad is a type that represents the result of a computation that can potentially fail or produce an error. It provides a way to handle errors or exceptional cases in a functional and composable manner.

The Result Monad typically has two possible values:

- Success: Represents a successful computation or operation. It contains the result or value 
produced by the computation.

- Failure: Represents a failed computation or operation. It contains information about the error or exceptional condition that occurred.

The key idea behind the Result Monad is to encapsulate the success or failure of a computation within the monadic type. By using this monadic structure, you can chain operations together and propagate the error state without explicit error handling in each step.

[![Build and Test](https://github.com/Igben-Nehemiah/Result/actions/workflows/build-test.yml/badge.svg)](https://github.com/Igben-Nehemiah/Result/actions/workflows/build-test.yml)


[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

A simple Typescript utility library for functional programming with result monad.

## Installation 

You can install Library Name via [NPM](https://www.npmjs.com/package/@nehemy/result-monad):
```typescript
npm install @nehemy/result
```

## Usage

To use Result, simply add a reference to the package in your typescript project and include the appropriate import:

```typescript
import { Result } from "@nehemy/result";
```

Then, you can use the result class as follow and its methods:

```typescript
let result = new Result<number>(12);
let failureResult = new Result<number>(new Error()); 

console.log(result.hasValue); // true
console.log(result.isSuccessful); // true
console.log(result.isNotSuccessful); // false
console.log(result.value); // 12

console.log(failureResult.hasValue); // false
console.log(failureResult.isSuccessful); // false
console.log(failureResult.isNotSuccessful); // true
// it is important to check if result is successful before getting result's value
console.log(failureResult.value); // throws error


result = new Result<number>(12);
failureResult = new Result<number>(new Error());

result.or(4);
console.log(result.value); // 12

failureResult.or(4);
console.log(failureResult.value); // 4

result.orInvoke(() => 4); // 12
failureResult.orInvoke(() => 4); //4 


result.match(
  value => console.log(value),
  error => console.log("Error")
); // 12

failureResult.match(
  value => console.log(value),
  error => console.log("Error")
); // "Error"

```

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Library Name is licensed under the MIT License. See [LICENSE](LICENSE) for more information.





