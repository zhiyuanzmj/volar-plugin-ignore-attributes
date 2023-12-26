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
