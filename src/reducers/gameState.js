import { useReducer } from 'react'

const initialGameState = {
  board: [],
  size: 0,
  state: 'playing'
}

const createBoard = (size) => {
  const board = []
  for (let i = 0; i < size; i++) {
    board.push(new Array(size))
  }
  return board
}

const increaseNearCellsBombs = (state, x, y) => {
  const minX = Math.max(0, x - 1)
  const maxX = Math.min(state.size - 1, x + 1)
  const minY = Math.max(0, y - 1)
  const maxY = Math.min(state.size - 1, y + 1)
  console.log('Bomba en: ' + x, y)
  console.log('minx: ' + minX, minY, maxX, maxY)
  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      /* if (!board[i][j].isBomb) */
      state.board[i][j].nearBombs = state.board[i][j].nearBombs + 1
      console.log('Bombas: ' + state.board[i][j].nearBombs)
    }
  }
}

const discoveringSafePlaces = (state, x, y) => {
  if (x < 0 || y < 0 || x >= state.size || y >= state.size) return
  if (state.board[x][y].state !== CellStates.HIDDEN) return
  state.board[x][y].state = CellStates.DISCOVERED
  if (state.board[x][y].nearBombs !== 0) return
  discoveringSafePlaces(state, x - 1, y)
  discoveringSafePlaces(state, x + 1, y)
  discoveringSafePlaces(state, x, y - 1)
  discoveringSafePlaces(state, x, y + 1)
  discoveringSafePlaces(state, x - 1, y - 1)
  discoveringSafePlaces(state, x + 1, y + 1)
  discoveringSafePlaces(state, x + 1, y - 1)
  discoveringSafePlaces(state, x - 1, y + 1)
}

const generateBombs = (state) => {
  let bombCount = 0
  while (bombCount < 10) {
    const x = Math.floor(Math.random() * 10)
    const y = Math.floor(Math.random() * 10)
    console.log(x, y)
    console.log('debugiando: ' + state.board[x][y])
    if (state.board[x][y].isBomb) continue
    state.board[x][y].isBomb = true
    increaseNearCellsBombs(state, x, y)
    bombCount++
  }
}

const createInitialGameState = (size) => {
  const board = createBoard(size)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      board[i][j] = { x: i, y: j, state: CellStates.HIDDEN, isBomb: false, nearBombs: 0 }
    }
  }
  const state = { ...initialGameState, board, size }
  generateBombs(state)
  return state
}

export const CellStates = {
  HIDDEN: 1,
  DISCOVERED: 2,
  FLAGGED: 3,
  EXPLODED: 4
}

export const reducer = (state, action) => {
  let newState = { ...state }
  switch (action.type) {
    case 'DISCOVER': {
      const { x, y } = action.payload
      discoveringSafePlaces(state, x, y)
      newState.board[x][y] = { ...state.board[x][y], state: CellStates.DISCOVERED }
      checkWinConditions(newState)
      // TODO DESCUBRIR OTROS LUGARES SIN BOMBAS ( 0 )
      break
    }
    case 'FLAG': {
      const { x, y } = action.payload
      newState.board[x][y] = { ...state.board[x][y], state: CellStates.FLAGGED }
      break
    }
    case 'RESTART': {
      newState = createInitialGameState(newState.size)
      break
    }
  }
  return newState
}

const checkWinConditions = (gameState) => {
  // recorrer array. Si una cell tiene Discovered and bomb se pierde.
  gameState.state = 'win'
  gameState.board.flat().forEach(cell => {
    if (cell.state === CellStates.DISCOVERED && cell.isBomb) {
      gameState.state = 'lost'
    } else if (gameState.state !== 'lost' && cell.state === CellStates.HIDDEN && !cell.isBomb) {
      gameState.state = 'playing'
    }
  })
}

export const useGameReducer = (size) => {
  return useReducer(reducer, createInitialGameState(size))
}
