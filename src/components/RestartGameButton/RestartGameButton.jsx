import React from 'react'
import PropTypes from 'prop-types'

const RestartGameButton = ({ dispatch }) => {
  return (
    <div onClick={() => dispatch({ type: 'RESTART' })} >RestartGameButton</div>
  )
}

RestartGameButton.propTypes = {
  dispatch: PropTypes.func
}

export default RestartGameButton
