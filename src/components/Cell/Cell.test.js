/**
 * @jest-environment jsdom
 */

import React from 'react'
import Cell from './Cell'
import { render } from '@testing-library/react';

it('should first', async () => {
  render(
    <Cell cellstate={jest.fn()} />
  )
})
