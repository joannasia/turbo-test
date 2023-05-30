const resolve = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const svgr = require("@svgr/rollup");
const peerDepsExternal = require("rollup-plugin-peer-deps-external");
const glob = require("glob");
const preserveDirectives = require("rollup-plugin-preserve-directives").default;

// eslint-disable-next-line import/no-anonymous-default-export
module.exports = {
  input: [
    ...glob.sync("./src/**/!(*.test).{ts,tsx}"),
    ...glob.sync("./src/**/*.svg"),
  ],
  output: {
    dir: "./lib",
    format: "cjs",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: "inline",
    exports: "auto",
  },
  plugins: [
    peerDepsExternal({
      includeDependencies: true,
    }),
    resolve({
      extensions: [".ts", ".tsx", ".js", ".jsx"],
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.json",
      declaration: true,
      declarationDir: "./lib",
    }),
    svgr({
      removeViewBox: false,
      prefixIds: false,
      svgo: false,
    }),
    preserveDirectives(),
  ],
};