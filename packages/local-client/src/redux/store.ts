import { applyMiddleware, createStore } from "redux"
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk"
import { persistMiddleware } from "./middleware/persist-middleware"
import reducers from "./reducers"

export const store = createStore(
  reducers,
  {},
  composeWithDevTools(applyMiddleware(persistMiddleware, thunk))
)

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "code",
//   },
// })

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//   },
// })

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "code",
//   },
// })

// store.dispatch({
//   type: ActionType.INSERT_CELL_AFTER,
//   payload: {
//     id: null,
//     type: "text",
//   },
// })
