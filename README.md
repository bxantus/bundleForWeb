# bundleForWeb

Contains a simple Deno module for bundling Deno compatible typescript sources targeting the web.
It uses esbuild and the deno esbuild plugin to perform this task.

By default linked source maps will be generated as well.

> **NOTE:** esbuild only transpiles your source, no type checking will be done. You should use either
`deno check` or your IDE (like vscode) to be sure that your code typechecks nicely.

## Example build script 

Assuming that you have your source files under the `src` folder (including index.html) you could write
a `build/compile.ts` script bundling your sources in `out` folder like this

```ts
import { bundle } from "https://raw.githubusercontent.com/bxantus/bundleForWeb/v1.0.0/bundler.ts";

const srcFile = "src/main.ts" // your main script file
const out = "out"

Deno.mkdirSync(`${out}/css`, { recursive: true })

const filesToCopy = ["index.html", "css/styles.css"]
for (const f of filesToCopy){
    console.log(`copy src/${f} -> ${out}/${f}`)
    Deno.copyFileSync(`src/${f}`, `${out}/${f}` )
}

await bundle(srcFile, {
    importMap: "src/import_map.json" // optional: if you want to specify import maps
})

```