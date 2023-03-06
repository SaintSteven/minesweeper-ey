/**
 * @jest-environment jsdom
 */

import React from 'react'
import { Cell } from './Cell'
import { render } from '@testing-library/react';
import { mockCell } from '../../assets/constants/mocks';

it('should first', async () => {
  render(
    <Cell cellState={mockCell} dispatch={jest.fn()} />
  )
})
