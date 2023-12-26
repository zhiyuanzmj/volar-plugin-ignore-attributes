# volar-plugin-ignore-attributes

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

A volar plugin to ignore unocss [attributes](https://github.com/zhiyuanzmj/volar-plugin-ignore-attributes/blob/master/src/rule.ts) for jsx.

## Installation

```sh
pnpm add -D volar-plugin-ignore-attributes
```

## Volar Config

```jsonc {5}
// tsconfig.json
{
  "vueCompilerOptions": {
    "plugins": [
      "volar-plugin-ignore-attributes"
    ]

    // Optional
    // "ignoreAttributes": {
    //   "include": ["icon"],
    //   "exclude": ["visible"]
    // }
  }
}
```

## License

[MIT](./LICENSE) License © 2023-PRESENT [zhiyuanzmj](https://github.com/zhiyuanzmj)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/volar-plugin-ignore-attributes?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/volar-plugin-ignore-attributes
[npm-downloads-src]: https://img.shields.io/npm/dm/volar-plugin-ignore-attributes?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/volar-plugin-ignore-attributes
[bundle-src]: https://img.shields.io/bundlephobia/minzip/volar-plugin-ignore-attributes?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=volar-plugin-ignore-attributes
[license-src]: https://img.shields.io/github/license/antfu/volar-plugin-ignore-attributes.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/volar-plugin-ignore-attributes/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/volar-plugin-ignore-attributes
