import express from "express"
import fs from "fs/promises"
import path from "path"

interface Cell {
  id: string
  content: string
  type: "text" | "code"
}

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json())

  const fullPath = path.join(dir, filename)

  router.get("/cells", async (req, res) => {
    try {
      // read the file
      const result = await fs.readFile(fullPath, { encoding: "utf8" })
      res.send(JSON.parse(result))
    } catch (err) {
      if (err.code === "ENOENT") {
        // add code to create a file and add default cells
        await fs.writeFile(fullPath, "[]", "utf-8") // '[]' is a default cell for now
        res.send([])
      } else {
        throw err
      }
    }
    // parse a list of cells out of it
    // send list of cells back to browser
  })

  router.post("/cells", async (req, res) => {
    // take the list of cells from the request obj and serialize them
    const { cells }: { cells: Cell[] } = req.body
    // write the cells into the file
    await fs.writeFile(fullPath, JSON.stringify(cells), "utf8")

    res.send({
      status: "OK",
    })
  })

  return router
}
