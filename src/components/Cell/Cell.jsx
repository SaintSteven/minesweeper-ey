import { CellStates } from "../../reducers/gameState"
import { useState, useEffect } from 'react'

export const Cell = ({ cellState, dispatch }) => {
  const [state, setState] = useState(cellState);
  useEffect(() => {
    setState(cellState)
  }, [cellState])

  let color = 'bg-slate-50'
  if (cellState.state == CellStates.DISCOVERED) {
    color = 'bg-slate-200'
  }
  if (cellState.state == CellStates.FLAGGED) {
    color = 'bg-red-200'
  }
  // if (cellState.state != CellStates.HIDDEN)
  console.log(cellState)
  const handleAction = e => {
    e.preventDefault()
    if (e.type == 'click')
      dispatch({ type: "DISCOVER", payload: { x: cellState.x, y: cellState.y } })
    if (e.type == 'contextmenu')
      dispatch({ type: "FLAG", payload: { x: cellState.x, y: cellState.y } })
  }
  return (
    <div className={`${color} h-8 w-8 items-center justify-center border border-gray-500`} onContextMenu={handleAction} onClick={e => handleAction(e)}>
      {cellState.isBomb ? '💣' : cellState.nearBombs}
    </div>
  )
}

//bg-gray-400 h-8 w-8 items-center justify-center border border-gray-500