import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import ExperimentalModulePanel from '../ExperimentalModulePanel'

describe('ExperimentalModulePanel', () => {
  test('renders the panel title', () => {
    render(<ExperimentalModulePanel />)
    
    expect(screen.getByText('Experimental Module Panel')).toBeInTheDocument()
  })

  test('renders the add module button', () => {
    render(<ExperimentalModulePanel />)
    
    expect(screen.getByText('+ Add Experiment Module')).toBeInTheDocument()
  })

  test('shows empty state when no modules exist', () => {
    render(<ExperimentalModulePanel />)
    
    expect(screen.getByText(/No experiment modules added yet/)).toBeInTheDocument()
  })

  test('adds a new module when add button is clicked', () => {
    render(<ExperimentalModulePanel />)
    
    const addButton = screen.getByText('+ Add Experiment Module')
    fireEvent.click(addButton)
    
    expect(screen.queryByText(/No experiment modules added yet/)).not.toBeInTheDocument()
  })

  test('renders experiment modules after adding them', () => {
    render(<ExperimentalModulePanel />)
    
    const addButton = screen.getByText('+ Add Experiment Module')
    fireEvent.click(addButton)
    
    expect(screen.getByText('Experiment Module 1')).toBeInTheDocument()
  })

  test('add button has correct styling', () => {
    render(<ExperimentalModulePanel />)
    
    const addButton = screen.getByText('+ Add Experiment Module')
    expect(addButton).toHaveClass('bg-green-600', 'text-white', 'py-2', 'px-4', 'rounded-md')
  })
}) 