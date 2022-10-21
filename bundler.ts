import * as path from "https://deno.land/std@0.141.0/path/mod.ts"
import * as esbuild from "https://deno.land/x/esbuild@v0.15.10/mod.js";
import { denoPlugin } from "https://deno.land/x/esbuild_deno_loader@0.6.0/mod.ts";

interface BundleOptions {
    outName?:string   ///< output file name, defaults to "bundle.js"
    outDir?:string    ///< directory to place output files

    minify?:boolean
    importMap?:string ///< optional path to import maps used by the bundle
}

export async function bundle(srcFile:string, options?:BundleOptions) {
    console.log(`Compiling ${srcFile}`)

    try {
        const outfile = path.join(options?.outDir ?? "out", options?.outName ?? "bundle.js")
        const importMapURL = options?.importMap ? path.toFileUrl(path.resolve(options.importMap)) : undefined
        await esbuild.build({
            plugins: [denoPlugin({ importMapURL })],
            entryPoints: [srcFile],
            outfile,
            bundle: true,
            format: "esm",
            sourcemap: "linked",
            minify: options?.minify,
            logLevel: 'info'
        })
    } catch (err) {
        console.error("Build failed")
    } finally {
        esbuild.stop();
    }
}

