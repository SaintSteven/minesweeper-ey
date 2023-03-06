/**
 * @jest-environment jsdom
 */

import React from 'react'
import RestartGameButton from './RestartGameButton'
import { render } from '@testing-library/react';

it('should mount', async () => {
  render(
    <RestartGameButton dispatch={jest.fn()} />
  )
})

it('should mount', async () => {
  render(
    <RestartGameButton dispatch={jest.fn()} />
  )
})