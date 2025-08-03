import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import App from './App'

describe('App', () => {
  test('renders the app with header', () => {
    render(<App />)

    expect(screen.getByText('Experiment Module Challenge')).toBeInTheDocument()
  })

  test('renders the experimental module panel', () => {
    render(<App />)

    expect(screen.getByText('Experimental Module Panel')).toBeInTheDocument()
  })

  test('renders the add module button', () => {
    render(<App />)

    expect(screen.getByText('+ Add Experiment Module')).toBeInTheDocument()
  })

  test('app has correct styling classes', () => {
    render(<App />)

    const mainContainer = screen.getByText('Experiment Module Challenge').closest('.min-h-screen')
    expect(mainContainer).toHaveClass('min-h-screen', 'bg-gray-900')
  })
})
