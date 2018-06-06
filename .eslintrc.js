module.exports = {
  // 默认情况下，ESLint会在所有父级组件中寻找配置文件，一直到根目录。
  // ESLint一旦发现配置文件中有 "root": true，它就会停止在父级目录中寻找。
  root: true,
  // 对Babel解析器的包装使其与 ESLint 兼容。
  parser: 'babel-eslint',
  parserOptions: {
    // ECMAScript 版本
    ecmaVersion: 6,
    sourceType: 'module', // module
    // 想使用的额外的语言特性:
    ecmaFeatures: {
      // 允许在全局作用域下使用 return 语句
      globalReturn: true,
      // impliedStric
      impliedStrict: true,
      // 启用 JSX
      jsx: true
    }
  },
  // 全局变量
  globals: {
    $: true,
    jQuery: true
  },
  env: {
    // 环境定义了预定义的全局变量
    browser: true,
    node: true,
    commonjs: true,
    amd: true,
    es6: true,
    mocha: true
  },
  // 扩展的代码编写风格指南
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  // --> eslint-config-standard
  // extends: "eslint:recommended",
  // --> eslint-config-airbnb
  extends: 'airbnb/legacy',
  // required to lint *.vue files
  plugins: [
    // 此插件用来识别.html 和 .vue文件中的js代码
    'html',
    'import',
    'node',
    'promise',
    'standard'
  ],
  /**
   * "off" 或 0 - 关闭
   * "warn" 或 1 - 开启 [使用警告级别的错误：warn (不会导致程序退出)]
   * "error" 或 2 - 开启 [使用错误级别的错误：error (当被触发的时候，程序会退出)]
   * --------------------------------------------------------------------
   * 设置某些自定义规则 可忽略airbnb某些规则
   *
   */
  rules: {
    // 是否禁用console
    'no-console': 'off',
    // 是否允许对 function 的参数重新赋值
    'no-param-reassign': 'off',
    // 是否强制使用一致的换行风格
    // 'unix' 代表 LF  'windows' 代表CRLF
    'linebreak-style': [2, 'windows']
  }
};
