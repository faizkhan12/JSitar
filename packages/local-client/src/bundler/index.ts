import * as esbuild from "esbuild-wasm"
import { fetchPlugin } from "./plugins/fetch-plugin"
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin"

let service: esbuild.Service

/**
 * initialize es build for transpiling & bundeling the code
 */
const bundle = async (rawCode: string) => {
  if (!service) {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    })
  }

  /**
   * This is where we bundled our data :)
   */
  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(rawCode)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window", // automatically done by webpack :(
      },
      jsxFactory: "_React.createElement",
      jsxFragment: "_React.Fragment",
    })
    return {
      code: result.outputFiles[0].text,
      err: "",
    }
  } catch (err: any) {
    return {
      code: "",
      err: err.message,
    }
  }
}

export default bundle
