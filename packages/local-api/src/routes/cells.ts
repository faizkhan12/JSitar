import express from "express"

export const createCellsRouter = (filename: string, dir: string) => {
  const router = express.Router()

  router.get("/cells", async (req, res) => {
    // Make sure the cell storage file exists
    // if it does not exist, add in a default list of cells
    // if it exist
    // read the file
    // parse a list of cells out of it
    // send list of cells back to browser
  })

  router.post("/cells", async (req, res) => {
    // Make sure the cell storage file exists
    // if it does not exist, create it
    // if it exist
    // take the list of cells from the request obj
    // serialize them
    // write the cells into the file
  })

  return router
}
