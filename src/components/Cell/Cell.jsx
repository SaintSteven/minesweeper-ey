import React from 'react'
import CellContent from '../CellContent/CellContent'
import { CellStates } from '../../reducers/gameState'
import PropTypes from 'prop-types'

export const Cell = ({ cellState, dispatch }) => {
  let color = 'bg-slate-50'
  if (cellState.state === CellStates.DISCOVERED) {
    color = 'bg-slate-200'
  }
  if (cellState.state === CellStates.FLAGGED) {
    color = 'bg-red-200'
  }
  // if (cellState.state != CellStates.HIDDEN)
  console.log(cellState)
  const handleAction = e => {
    e.preventDefault()
    if (e.type === 'click' && cellState.state === CellStates.HIDDEN) dispatch({ type: 'DISCOVER', payload: { x: cellState.x, y: cellState.y } })
    if (e.type === 'contextmenu') {
      if (cellState.state === CellStates.HIDDEN) {
        dispatch({ type: 'FLAG', payload: { x: cellState.x, y: cellState.y } })
      } else if (cellState.state === CellStates.FLAGGED) {
        dispatch({ type: 'UNFLAG', payload: { x: cellState.x, y: cellState.y } })
      }
    }
  }

  return (
    <div className={`${color} h-8 w-8 items-center grid place-content-center border border-gray-500`} onContextMenu={handleAction} onClick={e => handleAction(e)}>
      <CellContent cellState={cellState} />
    </div>
  )
}

Cell.propTypes = {
  dispatch: PropTypes.func,
  cellState: PropTypes.object
}

// bg-gray-400 h-8 w-8 items-center justify-center border border-gray-500
