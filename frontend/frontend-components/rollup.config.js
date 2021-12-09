import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import { terser } from "rollup-plugin-terser";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import image from "@rollup/plugin-image";
import url from "postcss-url";
const packageJson = require("./package.json");
import stringHash from "string-hash";

export default [
  {
    input: "src/index.ts",
    // external: ["react", "react-dom", "react-router", "react-router-dom"],
    output: [
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: "./tsconfig.json" }),
      postcss({
        extract: true,
        modules: {
          generateScopedName: function (name, filename, css) {
            if (!filename.endsWith("module.css")) return name;

            const i = css.indexOf(`.${name}`);
            const lineNumber = css.substr(0, i).split(/[\r\n]/).length;
            const hash = stringHash(css).toString(36).substr(0, 5);
            const file = filename
              .substring(filename.lastIndexOf("/") + 1)
              .split(".module")[0];
            return `${file}_${name}_${hash}_${lineNumber}`;
          },
        },
        plugins: [url({ url: "inline" })],
      }),
      terser(),
      image(),
    ],
  },
  {
    input: "dist/types/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    external: [/\.css$/],
    plugins: [dts()],
  },
];
