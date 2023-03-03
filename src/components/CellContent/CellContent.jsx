import React from 'react'
import { CellStates } from '../../reducers/gameState'
import PropTypes from 'prop-types'

const CellContent = ({ cellState }) => {
  if (cellState.state === CellStates.HIDDEN) return
  if (cellState.isBomb && cellState.state === CellStates.DISCOVERED) return '💣'
  if (cellState.state === CellStates.FLAGGED) return '🏴‍☠️'
  if (cellState.state === CellStates.DISCOVERED) {
    let textColor = 'text-transparent'
    if (cellState.nearBombs === 1) textColor = 'text-blue-900'
    if (cellState.nearBombs === 2) textColor = 'text-orange-900'
    if (cellState.nearBombs >= 3) textColor = 'text-red-900'
    return <p className={`${textColor} font-bold text-2xl`}>{cellState.nearBombs}</p>
  }
}

CellContent.propTypes = {
  cellState: PropTypes.object
}

export default CellContent
