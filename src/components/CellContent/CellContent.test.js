/**
 * @jest-environment jsdom
 */

import React from 'react'
import { render, screen } from '@testing-library/react'
import CellContent from './CellContent'
import { CellStates } from '../../reducers/gameState'
import '../../@testing-library/jest-dom/extend-expect'

describe('CellContent', () => {
  it('renders nothing when cell state is hidden', () => {
    const { container } = render(<CellContent cellState={{ state: CellStates.HIDDEN }} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders a bomb when cell state is discovered and contains a bomb', () => {
    const { getByText } = render(<CellContent cellState={{ state: CellStates.DISCOVERED, isBomb: true }} />)
    expect(getByText('💣')).toBeInTheDocument
  })

  it('renders a flag when cell state is flagged', () => {
    const { getByText } = render(<CellContent cellState={{ state: CellStates.FLAGGED }} />)
    expect(getByText('🏴‍☠️')).toBeInTheDocument
  })

  it('renders a number when cell state is discovered and nearBombs is greater than 0', () => {
    const { getByText } = render(<CellContent cellState={{ state: CellStates.DISCOVERED, nearBombs: 1 }} />)
    expect(getByText('1')).toBeInTheDocument
  })

  it('sets the text color to blue when nearBombs is 1', () => {
    const CellContentComponent = render(<CellContent cellState={{ state: CellStates.DISCOVERED, nearBombs: 1 }} />)
    //coselito uwuwuwu
    // expect(CellContentComponent.firstChild).toHaveClass('text-blue-900')
    expect(CellContentComponent.firstChild).toHaveClass('text-blue-900')
    expect(screen.getByText('1')).toBeInTheDocument()

    /* expect(CellContentComponent.getElementsByClassName('text-blue-900').length).toBe(1) */
  })

  it('sets the text color to orange when nearBombs is 2', () => {
    const { getByText } = render(<CellContent cellState={{ state: CellStates.DISCOVERED, nearBombs: 2 }} />)
    expect(getByText('2')).toHaveClass('text-orange-900')
  })

  it('sets the text color to red when nearBombs is greater than 2', () => {
    const { getByText } = render(<CellContent cellState={{ state: CellStates.DISCOVERED, nearBombs: 3 }} />)
    expect(getByText('3')).toHaveClass('text-red-900')
  })
})