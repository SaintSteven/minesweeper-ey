import React, { useState } from 'react'
import { useGameReducer } from '../../reducers/gameState'
import { Cell } from '../Cell/Cell'

const Board = () => {
  const size = 10
  let id = Math.random() * 1000
  const [gameState, dispatch] = useGameReducer(size)
  console.log(gameState.board)

  return (
    <>
      <div className={`grid grid-cols-10 gap-1 h-96 w-96 flex justify-center`}>
        {[...Array(size)].map((_, x) => {
          return (
            [...Array(size)].map((_, y) => {
              return (
                <Cell cellState={JSON.parse(JSON.stringify(gameState.board[x][y]))} dispatch={dispatch} />
              )
            }))
        })
        }
      </div>
    </>
  )
}

export default Board
