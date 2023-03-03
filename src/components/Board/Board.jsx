import React from 'react'
import { useGameReducer } from '../../reducers/gameState'
import { Cell } from '../Cell/Cell'
import RestartGameButton from '../RestartGameButton/RestartGameButton'

const Board = () => {
  const size = 10
  const [gameState, dispatch] = useGameReducer(size)
  console.log(gameState.board)

  return (
    <>
      <div className="">
        <div className="booeenas">
          <h1>Estado del juego: {gameState.state}</h1>
          <RestartGameButton dispatch={dispatch} />
        </div>
        <div className='container mx-auto mt-4 flex justify-center'>
          <div className={'grid grid-cols-10  gap-1 h-96 w-96 flex justify-center'}>
            {gameState.board.flat().map((cell, index) => (
              <Cell cellState={cell} dispatch={dispatch} key={index} />
            )
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Board
