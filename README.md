# Result

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





