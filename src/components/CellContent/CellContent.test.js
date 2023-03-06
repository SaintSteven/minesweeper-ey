/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render } from '@testing-library/react'
import CellContent from './CellContent'
import { CellStates } from '../../reducers/gameState'

describe('CellContent', () => {
  it('renders nothing when cell state is hidden', () => {
    const { container } = render(<CellContent cellState={{ state: CellStates.HIDDEN }} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a bomb when cell state is discovered and contains a bomb', () => {
    const { getByText } = render(<CellContent cellState={{ state: CellStates.DISCOVERED, isBomb: true }} />)
    expect(getByText('💣')).toBeInTheDocument()
  })

  it('renders a flag when cell state is flagged', () => {
    const { getByText } = render(<CellContent cellState={{ state: CellStates.FLAGGED }} />)
    expect(getByText('🏴‍☠️')).toBeInTheDocument()
  })

  it('renders a number when cell state is discovered and nearBombs is greater than 0', () => {
    const { getByText } = render(<CellContent cellState={{ state: CellStates.DISCOVERED, nearBombs: 1 }} />)
    expect(getByText('1')).toBeInTheDocument()
  })
})
