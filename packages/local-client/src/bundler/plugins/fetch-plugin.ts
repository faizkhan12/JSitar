import axios from "axios"
import * as esbuild from "esbuild-wasm"
import localForage from "localforage"

const fileCache = localForage.createInstance({
  name: "filecache",
})

export const fetchPlugin = (inputCode: string) => {
  return {
    name: "fetch-plugin",
    setup(build: esbuild.PluginBuild) {
      // load root entry file of index.js
      build.onLoad({ filter: /(^index\.js$)/ }, () => {
        return {
          loader: "jsx",
          contents: inputCode,
        }
      })
      // load default file other than index.js
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        // check if file is already fetched and if it is in the cache
        const cachedResult = await fileCache.getItem<esbuild.OnLoadResult>(
          args.path
        )
        // if it is, return
        if (cachedResult) {
          return cachedResult
        }
      })

      // load, request & fetch css file in a module
      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)
        // regex expression to remove new lines, double quotes and single quotes
        const escaped = data
          .replace(/\n/g, "")
          .replace(/"/g, '\\"')
          .replace(/'/g, "\\'")

        // esbuild can't seperate css file with js file
        // so here is a workaround of how we can import css files
        const contents = `
          const style = document.createElement('style');
          style.innerText = '${escaped}';
          document.head.appendChild(style);
        `

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents,
          resolveDir: new URL("./", request.responseURL).pathname,
        }
        // store response in cache since it not stored
        await fileCache.setItem(args.path, result)

        return result
      })

      // load, request & fetch js file in a module
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path)

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        }

        // store response in cache since it not stored
        await fileCache.setItem(args.path, result)

        return result
      })
    },
  }
}
