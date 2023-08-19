import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/index.js',
      format: 'es'
    },
    {
      file: 'lib/index.umd.cjs',
      format: 'cjs'
    }
  ],
  plugins: [
    // 添加 rollup-plugin-terser 插件
    terser() // 压缩混淆代码
  ]
};