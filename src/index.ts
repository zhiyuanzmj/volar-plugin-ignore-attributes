import {
  replaceSourceRange,
} from '@vue/language-core'
import type {
  VueLanguagePlugin,
} from '@vue/language-core'
import { getRules } from './rule'

interface Options {
  include?: string[]
  exclude?: string[]
  flex?: string
}

function isMatched(rule: string | RegExp, name: string) {
  return typeof rule === 'string'
    ? rule === name
    : rule.test(name)
}

function toRegex(rule: string | RegExp) {
  let _rule = rule
  if (typeof _rule === 'string') {
    if (/^\/.*\/$/.test(_rule))
      _rule = new RegExp(_rule)
  }
  return _rule
}

const plugin: VueLanguagePlugin = ({ modules: { typescript: ts }, vueCompilerOptions }) => {
  const cache = new Map<string, boolean>()
  const options = (vueCompilerOptions as any).ignoreAttributes ?? {} as Options
  const rules = getRules(options.prefix)
  rules.push(...options.include?.map(toRegex) || [])

  const exclude = [/^v-.*/, ...options.exclude?.map(toRegex) || []]

  return {
    name: 'ignore-attributes',
    version: 2,
    resolveEmbeddedCode(fileName, sfc, embeddedFile) {
      if (!['jsx', 'tsx'].includes(embeddedFile.lang))
        return

      for (const source of ['script', 'scriptSetup'] as const) {
        if (!sfc[source]?.ast)
          continue

        function walk(
          node: import('typescript/lib/tsserverlibrary').Node,
        ) {
          const properties = ts.isJsxElement(node)
            ? node.openingElement.attributes.properties
            : ts.isJsxSelfClosingElement(node)
              ? node.attributes.properties
              : []
          for (const attribute of properties) {
            if (
              ts.isJsxAttribute(attribute)
              && (!attribute.initializer
              || ts.isStringLiteral(attribute.initializer))
            ) {
              const attributeName = attribute.name.getText(sfc[source]?.ast)
              if (exclude.some(rule => isMatched(rule, attributeName)))
                continue

              const hasCached = cache.has(attributeName)
              const result = hasCached
                ? cache.get(attributeName)!
                : rules.some((rule) => {
                  const result = isMatched(rule, attributeName)
                  return result
                })
              if (!hasCached)
                cache.set(attributeName, result)

              if (result) {
                replaceSourceRange(
                  embeddedFile.content,
                  source,
                  attribute.getStart(sfc[source]?.ast, false),
                  attribute.getEnd(),
                )
              }
            }
          }

          node.forEachChild(walk)
        }
        sfc[source]?.ast.forEachChild(walk)
      }
    },
  }
}

export default plugin
