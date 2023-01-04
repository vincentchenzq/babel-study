/* eslint-disable no-unused-vars */
const fs = require('fs')
const path = require('path')
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
const compiler = require('vue-template-compiler')
const glob = require('glob')

/**
 *
 * @param {string} p 路径
 */
function resolve (p) {
  return path.resolve(__dirname, '..', p)
}
// 所有组件的组件的 名称和路径映射
const allComponentMaps = fs
  .readdirSync(resolve('src/common/components/basic'))
  .reduce((prev, cur) => {
    // 我们项目不存在直接放外面的组件
    if (!cur.includes('.')) {
      prev[cur] = `@/common/components/basic/${cur}`
    }
    return prev
  }, {})

fs.readdirSync(resolve('src/common/components/business')).reduce(
  (prev, cur) => {
    // 我们项目不存在直接放外面的组件
    if (!cur.includes('.')) {
      prev[cur] = `@/common/components/business/${cur}`
    }
    return prev
  },
  allComponentMaps
)

console.log('allComponentMaps is ')
console.log(allComponentMaps)

// 所有的组件名
const allComponentList = Object.keys(allComponentMaps)

console.log(`allComponentList is ${allComponentList}`)

/**
 * 字符串横杠转驼峰
 * @param {string} str
 * @returns
 */
function strToCamel (str) {
  return str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .slice(1)
}

/**
 *
 * @param {string} str
 * @returns
 */
function camelToStr (str) {
  return str.replace(/-([a-z])/g, function (all, letter) {
    return letter.toUpperCase()
  })
}

/**
 *
 * @param {t.Node} node
 * @param {Set} result
 */
function parseHTML (node, result = new Set()) {
  if (allComponentList.some((item) => item === node.tag)) {
    result.add(node.tag)
  } else {
    (node.children || []).forEach((element) => {
      parseHTML(element, result)
    })
  }
  return result
}

/**
 *
 * @param {t.parseScriptAst} scriptAst
 * @param {Set} scriptAst
 */
function parseScriptAst (scriptAst, tempRes) {
  traverse(scriptAst, {
    ImportDefaultSpecifier (path, state) {
      const node = path.node
      if (tempRes.has(node.local.name)) {
        result.delete(node.local.name)
      }
    },
    ...require('@vue/babel-plugin-transform-vue-jsx')({ types: t }).visitor
  })
  // 将用到的业务组件，并且没有引入的 引入一下
  traverse(scriptAst, {
    Program (path, state) {
      const node = path.node
      const body = node.body
      tempRes.forEach((componentName) => {
        const importDefaultSpecifier = t.importDefaultSpecifier(
          t.identifier(camelToStr(componentName))
        )
        const importDeclaration = t.importDeclaration(
          [importDefaultSpecifier],
          t.StringLiteral(allComponentMaps[componentName])
        )
        body.unshift(importDeclaration)
      })
    }
  })
  // 自动注册组件
  traverse(scriptAst, {
    ExportDefaultDeclaration (path, state) {
      const allProperties = path.node.declaration.properties
      // 判断是否有components
      const hasComponents = allProperties
        .filter((item) => item.type === 'ObjectProperty')
        .filter((item) => item.key.name === 'components')

      console.log(hasComponents)

      let components = null
      if (!hasComponents.length) {
        components = t.objectProperty(
          t.identifier('components'),
          t.objectExpression([])
        )
        allProperties.push(components)
      } else {
        components = hasComponents[0]
      }
      components.value.properties = components.value.properties || []
      tempRes.forEach((item) => {
        const component = t.objectProperty(
          t.identifier(camelToStr(item)),
          t.identifier(camelToStr(item))
        )
        components.value.properties.push(component)
      })
    }
  })
}
var result = new Set()
// 目标文件
function main (targetFile) {
  console.log(`当前文件名是${targetFile}`)
  // 得到文件内容
  const content = fs.readFileSync(targetFile).toString()
  result = parseHTML(compiler.compile(content).ast)

  // 提取js的内容
  const scriptContent = /<script>([\s\S]+?)<\/script>/.exec(content)[1]

  // 得到ast
  const scriptAst = parser.parse(scriptContent, {
    sourceType: 'module', // 此处按需引入你需要引入的plugin等
    plugins: ['jsx']
  })

  // 遍历ast的时候如果没有用某个组件就把他删掉
  const tempRes = new Set(result)

  parseScriptAst(scriptAst, tempRes)

  const sc = generator(scriptAst.program)
  // 先随便生成到一个地方做测试
  fs.writeFileSync(
    targetFile,
    content.replace(
      /<script>([\s\S]+?)<\/script>/,
      `<script>\n${sc.code}\n</script>`
    )
  )
}

const files = glob.sync(`${resolve('src')}/**/**.vue`, {})
console.log(files)
files.forEach(main)
