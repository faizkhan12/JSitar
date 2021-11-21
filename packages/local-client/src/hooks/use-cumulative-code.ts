import { useTypedSelector } from "./use-typed-selector"

// logic for keeping reference to the previous code cell
export const useCumulativeCode = (cellId: string) => {
  return useTypedSelector((state) => {
    const { data, order } = state.cells
    const orderCells = order.map((id) => data[id])

    /**
     * this html snippet below actually declaring print function where if you
     * passed any arguments inside this fn in code editor, it will
     * display that value in preview screen
     * For example - const a = 10; print(a) - this will show
     * 10 in preview screen
     */
    const printFunc = `
        import _React from 'react';
        import _ReactDOM from 'react-dom';
        var print = (value) => {
          const root = document.querySelector('#root');
        
          if (typeof value === 'object') {
            if (value.$$typeof && value.props) {
              _ReactDOM.render(value, root);
            } else {
            root.innerHTML = JSON.stringify(value);
          }
        }
          else {
            root.innerHTML = value;
          }
        };
        `
    const printFuncNoop = `var print = () => {}`
    const cumulativeCode = []
    for (let c of orderCells) {
      // if cell type is code then we are interested
      if (c.type === "code") {
        if (c.id === cellId) {
          cumulativeCode.push(printFunc)
        } else {
          cumulativeCode.push(printFuncNoop)
        }
        cumulativeCode.push(c.content)
      }
      // if come to current cell then we don't have to push in the cumulativeCode
      if (c.id === cellId) {
        break
      }
    }
    return cumulativeCode
  }).join("\n")
}
