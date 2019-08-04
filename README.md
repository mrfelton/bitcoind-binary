# bitcoind-binary

[![](https://img.shields.io/badge/project-bitcoind-blue.svg?style=flat-square)](https://github.com/lightningnetwork/bitcoind)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Dependency Status](https://david-dm.org/mrfelton/bitcoind-binary.svg?style=flat-square)](https://david-dm.org/mrfelton/bitcoind-binary)

> install bitcoind from npm

This package will download and install a precompiled [bitcoind](https://github.com/lightningnetwork/bitcoind) binary.

The bitcoind binary gets installed into the `vendor` directory inside the module folder and symlinked into your node bin directory.

## Table of Contents

- [Install](#install)
- [Usage](#usage)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Install

```
npm install bitcoind-binary --save
```

## Usage

```sh
> npm install bitcoind-binary
> npx bitcoind --version
bitcoind version 0.18.0
```

## Maintainers

[@Tom Kirkpatrick (mrfelton)](https://github.com/mrfelton).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/mrfelton/bitcoind-binary/issues/new) or submit PRs.

bitcoind-binary follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct.

## License

[MIT](LICENSE) © Tom Kirkpatrick
