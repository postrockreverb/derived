import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import babel from '@rollup/plugin-babel';
import dts from 'rollup-plugin-dts';
import filesize from 'rollup-plugin-filesize';

import pkg from './package.json' assert { type: 'json' };

const extensions = ['.ts', '.tsx'];

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: pkg.module,
        format: 'esm',
        exports: 'named',
        sourcemap: true,
        strict: true,
      },
    ],
    plugins: [
      external(),
      resolve({ extensions }),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        presets: ['@babel/preset-env', '@babel/preset-react'],
      }),
      terser(),
      filesize(),
    ],
    external: Object.keys(pkg.peerDependencies),
  },
  {
    input: './dist/index.d.ts',
    output: [{ file: './dist/index.d.ts', format: 'esm' }],
    plugins: [dts()],
  },
];
