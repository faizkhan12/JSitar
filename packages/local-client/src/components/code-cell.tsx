import { useEffect } from "react"
import { useActions } from "../hooks/use-actions"
import { useCumulativeCode } from "../hooks/use-cumulative-code"
import { useTypedSelector } from "../hooks/use-typed-selector"
import { Cell } from "../redux"
import "./code-cell.css"
import CodeEditor from "./code-editor"
import Preview from "./preview"
import Resizable from "./resizable"

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions()
  const bundle = useTypedSelector((state) => state.bundles[cell.id])
  const cumulativeCode = useCumulativeCode(cell.id)
  useEffect(() => {
    console.log(cell.content)
    if (!bundle) {
      createBundle(cell.id, cumulativeCode)
      return
    }

    // debounce logic
    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode)
    }, 750)

    return () => {
      clearTimeout(timer)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle, cumulativeCode])

  return (
    <Resizable direction='vertical'>
      <div
        style={{
          height: "calc(100% - 10px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resizable direction='horizontal'>
          <CodeEditor
            initialValue={
              !cell.content
                ? "// Use Print() to print the values in preview => Ex - print(10) will preview 10 in the preview sceeen"
                : cell.content
            }
            // initialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resizable>
        <div className='progress-wrapper'>
          {!bundle || bundle.loading ? (
            <div className='progress-cover'>
              <progress className='progress is-small is-primary' max='100'>
                Loading
              </progress>
            </div>
          ) : (
            <Preview code={bundle.code} err={bundle.err} />
          )}
        </div>
      </div>
    </Resizable>
  )
}

export default CodeCell
