import {
  FileKind,
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
    version: 1,
    resolveEmbeddedFile(fileName, sfc, embeddedFile) {
      if (embeddedFile.kind !== FileKind.TypeScriptHostFile)
        return

      for (const source of ['script', 'scriptSetup'] as const) {
        if (!sfc[source]?.ast)
          continue

        function walkJsxShortBind(
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

          node.forEachChild(walkJsxShortBind)
        }
        sfc[source]?.ast.forEachChild(walkJsxShortBind)
      }
    },
  }
}

export default plugin
