import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import Header from '../Header'

describe('Header', () => {
  test('renders the header title', () => {
    render(<Header />)
    
    expect(screen.getByText('Experiment Module Challenge')).toBeInTheDocument()
  })

  test('header has correct styling', () => {
    render(<Header />)
    
    const header = screen.getByText('Experiment Module Challenge')
    expect(header).toHaveClass('text-4xl', 'font-bold', 'text-white', 'mb-4')
  })
}) 