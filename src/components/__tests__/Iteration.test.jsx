import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Iteration from '../Iteration'

describe('Iteration', () => {
  const mockIteration = {
    id: 'EM-1',
    title: 'Test Iteration',
    selected: false,
    selectedTitleLength: 'short'
  }

  const mockProps = {
    iteration: mockIteration,
    onUpdateTitle: jest.fn(),
    onRemove: jest.fn(),
    selectedTitleLength: 'short',
    onTitleLengthChange: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('renders collapsed iteration by default', () => {
    render(<Iteration {...mockProps} />)
    
    expect(screen.getByText('EM-1')).toBeInTheDocument()
    expect(screen.getByText('Test Iteration')).toBeInTheDocument()
    expect(screen.getByText('Selection')).toBeInTheDocument()
  })

  test('expands iteration when clicked', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    // Should show expanded state with title length options
    expect(screen.getByText('SHORT')).toBeInTheDocument()
    expect(screen.getByText('MEDIUM LENGTH')).toBeInTheDocument()
    expect(screen.getByText('VERY VERY VERY LONG (UP TO 35 CHAR)')).toBeInTheDocument()
  })

  test('shows editable title input when expanded', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const titleInput = screen.getByDisplayValue('Test Iteration')
    expect(titleInput).toBeInTheDocument()
  })

  test('allows editing iteration title', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const titleInput = screen.getByDisplayValue('Test Iteration')
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } })
    fireEvent.blur(titleInput)
    
    expect(mockProps.onUpdateTitle).toHaveBeenCalledWith('EM-1', 'Updated Title')
  })

  test('saves title on Enter key press', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const titleInput = screen.getByDisplayValue('Test Iteration')
    fireEvent.change(titleInput, { target: { value: 'Updated Title' } })
    fireEvent.keyDown(titleInput, { key: 'Enter', code: 'Enter' })
    
    expect(mockProps.onUpdateTitle).toHaveBeenCalledWith('EM-1', 'Updated Title')
  })

  test('allows changing title length', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const mediumButton = screen.getByText('MEDIUM LENGTH')
    fireEvent.click(mediumButton)
    
    expect(mockProps.onTitleLengthChange).toHaveBeenCalledWith('EM-1', 'medium')
  })

  test('shows selected title length with correct styling', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const shortButton = screen.getByText('SHORT')
    expect(shortButton).toHaveClass('bg-green-500', 'border-green-500', 'text-white')
  })

  test('allows removing iteration', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const removeButton = screen.getByText('REMOVE')
    fireEvent.click(removeButton)
    
    expect(mockProps.onRemove).toHaveBeenCalledWith('EM-1')
  })

  test('collapses iteration when DONE is clicked', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const doneButton = screen.getByText('DONE')
    fireEvent.click(doneButton)
    
    // Should be collapsed again
    expect(screen.getByText('EM-1')).toBeInTheDocument()
    expect(screen.queryByText('SHORT')).not.toBeInTheDocument()
  })

  test('shows selection indicator when iteration is selected', () => {
    const selectedIteration = { ...mockIteration, selected: true }
    render(<Iteration {...mockProps} iteration={selectedIteration} />)
    
    const selectionIndicator = screen.getByTestId('selection-indicator')
    expect(selectionIndicator).toBeInTheDocument()
  })

  test('does not show selection indicator when iteration is not selected', () => {
    render(<Iteration {...mockProps} />)
    
    const selectionIndicator = screen.queryByTestId('selection-indicator')
    expect(selectionIndicator).not.toBeInTheDocument()
  })

  test('has correct styling for collapsed state', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1').closest('div')
    expect(iterationElement).toHaveClass('flex', 'items-center', 'justify-between', 'py-3', 'border-b', 'border-gray-700')
  })

  test('has correct styling for expanded state', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const expandedContainer = screen.getByText('SHORT').closest('.bg-black')
    expect(expandedContainer).toHaveClass('bg-black', 'border', 'border-white', 'rounded-lg', 'p-6', 'mb-3')
  })

  test('does not save empty title', () => {
    render(<Iteration {...mockProps} />)
    
    const iterationElement = screen.getByText('EM-1')
    fireEvent.click(iterationElement)
    
    const titleInput = screen.getByDisplayValue('Test Iteration')
    fireEvent.change(titleInput, { target: { value: '   ' } })
    fireEvent.blur(titleInput)
    
    expect(mockProps.onUpdateTitle).not.toHaveBeenCalled()
  })
}) 