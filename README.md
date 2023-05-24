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
const result = new Result<number>(12);
result.or(4);
console.log(result.value); // 12

```
-
## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

Library Name is licensed under the MIT License. See [LICENSE](LICENSE) for more information.





