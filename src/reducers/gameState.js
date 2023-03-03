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
  for (let i = minX; i <= maxX; i++) {
    for (let j = minY; j <= maxY; j++) {
      state.board[i][j].nearBombs = state.board[i][j].nearBombs + 1
    }
  }
}

const discoveringSafePlaces = (state, x, y) => {
  if (x < 0 || y < 0 || x >= state.size || y >= state.size) return
  if (state.board[x][y].state !== CellStates.HIDDEN) return
  state.board[x][y].state = CellStates.DISCOVERED
  if (state.board[x][y].nearBombs !== 0) return
  for (let _x = x - 1; _x <= x + 1; _x++) {
    for (let _y = y - 1; _y <= y + 1; _y++) {
      discoveringSafePlaces(state, _x, _y)
    }
  }
}

const generateBombs = (state) => {
  const bombsMap = []
  let bombCount = 0
  while (bombCount < 10) {
    const x = Math.floor(Math.random() * 10)
    const y = Math.floor(Math.random() * 10)
    if (bombsMap.some((bomb) => bomb.x === x && bomb.y === y)) continue
    bombsMap.push({ x, y })
    bombCount++
  }
  return bombsMap
}

const setBombs = (state, bombsMap) => {
  bombsMap.forEach(bomb => {
    state.board[bomb.x][bomb.y].isBomb = true
    increaseNearCellsBombs(state, bomb.x, bomb.y)
  })
}

const createInitialGameState = (size) => {
  const board = createBoard(size)
  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      board[i][j] = { x: i, y: j, state: CellStates.HIDDEN, isBomb: false, nearBombs: 0 }
    }
  }
  const state = { ...initialGameState, board, size }
  const bombsMap = generateBombs()
  setBombs(state, bombsMap)
  return state
}

export const CellStates = {
  HIDDEN: 1,
  DISCOVERED: 2,
  FLAGGED: 3,
  EXPLODED: 4
}

export const reducer = (state, action) => {
  console.log('holaaa')
  if (action.type !== 'RESTART' && state.state === 'lost') return state
  let newState = { ...state }
  switch (action.type) {
    case 'DISCOVER': {
      const { x, y } = action.payload
      discoveringSafePlaces(state, x, y)
      newState.board[x][y] = { ...state.board[x][y], state: CellStates.DISCOVERED }
      checkWinConditions(newState)
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
    case 'UNFLAG': {
      const { x, y } = action.payload
      newState.board[x][y] = { ...state.board[x][y], state: CellStates.HIDDEN }
      break
    }
  }
  return newState
}

const discoverBoard = (gameState) => {
  gameState.board.flat().forEach(cell => {
    if (cell.isBomb) cell.state = CellStates.DISCOVERED
  })
}

const checkWinConditions = (gameState) => {
  gameState.state = 'win'
  gameState.board.flat().forEach(cell => {
    if (cell.state === CellStates.DISCOVERED && cell.isBomb) {
      gameState.state = 'lost'
      discoverBoard(gameState)
    } else if (gameState.state !== 'lost' && cell.state === CellStates.HIDDEN && !cell.isBomb) {
      gameState.state = 'playing'
    }
  })
}

export const useGameReducer = (size) => {
  return useReducer(reducer, createInitialGameState(size))
}
