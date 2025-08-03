import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'

import ExperimentModule from '../ExperimentModule'

describe('ExperimentModule', () => {
  const mockModule = {
    id: 'test-module',
    title: 'Test Experiment Module'
  }

  test('renders expanded module by default', () => {
    render(<ExperimentModule module={mockModule} />)
    
    expect(screen.getByText('EM-1')).toBeInTheDocument()
  })

  test('collapses module when clicked', () => {
    render(<ExperimentModule module={mockModule} />)
    
    const moduleElement = screen.getByText('Test Experiment Module')
    fireEvent.click(moduleElement)
    
    // Module should be collapsed now
    expect(screen.getByText('Test Experiment Module')).toBeInTheDocument()
    expect(screen.queryByText('EM-1')).not.toBeInTheDocument()
  })

  test('shows empty state when no iterations exist', () => {
    render(<ExperimentModule module={mockModule} />)
    
    expect(screen.getByText('Adding iteration...')).toBeInTheDocument()
  })

  test('allows adding new iteration', () => {
    render(<ExperimentModule module={mockModule} />)
    
    const textarea = screen.getByPlaceholderText('To add a new iteration, start typing a prompt.')
    fireEvent.change(textarea, { target: { value: 'Test iteration' } })
    
    const doneButton = screen.getByText('DONE')
    fireEvent.click(doneButton)
    
    expect(screen.getByText('Test iteration')).toBeInTheDocument()
  })

  test('shows unlocked state when iterations exist', () => {
    render(<ExperimentModule module={mockModule} />)
    
    const textarea = screen.getByPlaceholderText('To add a new iteration, start typing a prompt.')
    fireEvent.change(textarea, { target: { value: 'Test iteration' } })
    
    const doneButton = screen.getByText('DONE')
    fireEvent.click(doneButton)
    
    expect(screen.getByText('EM-1')).toBeInTheDocument()
  })

  test('allows adding multiple iterations', () => {
    render(<ExperimentModule module={mockModule} />)
    
    const textarea = screen.getByPlaceholderText('To add a new iteration, start typing a prompt.')
    fireEvent.change(textarea, { target: { value: 'First iteration' } })
    
    const doneButton = screen.getByText('DONE')
    fireEvent.click(doneButton)
    
    const addIterationButton = screen.getByText('+ ADD ITERATION')
    fireEvent.click(addIterationButton)
    
    const newTextarea = screen.getByPlaceholderText('To add a new iteration, start typing a prompt or generate one.')
    fireEvent.change(newTextarea, { target: { value: 'Second iteration' } })
    
    const newDoneButton = screen.getByText('DONE')
    fireEvent.click(newDoneButton)
    
    expect(screen.getByText('First iteration')).toBeInTheDocument()
    expect(screen.getByText('Second iteration')).toBeInTheDocument()
  })

  test('disables done button when prompt is empty', () => {
    render(<ExperimentModule module={mockModule} />)
    
    const doneButton = screen.getByText('DONE')
    expect(doneButton).toBeDisabled()
  })

  test('shows lock icon when iterations exist', () => {
    render(<ExperimentModule module={mockModule} />)
    
    const textarea = screen.getByPlaceholderText('To add a new iteration, start typing a prompt.')
    fireEvent.change(textarea, { target: { value: 'Test iteration' } })
    
    const doneButton = screen.getByText('DONE')
    fireEvent.click(doneButton)
    
    expect(screen.getByTestId('unlock-icon')).toBeInTheDocument()
  })

  test('allows resetting module', () => {
    render(<ExperimentModule module={mockModule} />)
    
    const textarea = screen.getByPlaceholderText('To add a new iteration, start typing a prompt.')
    fireEvent.change(textarea, { target: { value: 'Test iteration' } })
    
    const doneButton = screen.getByText('DONE')
    fireEvent.click(doneButton)
    
    const resetButton = screen.getByText('RESET')
    fireEvent.click(resetButton)
    
    expect(screen.getByText('Adding iteration...')).toBeInTheDocument()
  })
}) 