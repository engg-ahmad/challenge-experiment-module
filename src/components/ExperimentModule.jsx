import React, { useState } from 'react'
import { FaLock, FaUnlock } from 'react-icons/fa'

import Iteration from './Iteration'

const ExpandedEmptyState = ({
  module,
  setCollapsed,
  iterations,
  setIterations
}) => {
  const [prompt, setPrompt] = useState('')

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
        <div
          className="flex items-center justify-between mb-6 cursor-pointer"
          onClick={() => setCollapsed(true)}
        >
          <span className="text-white text-lg font-semibold">{module.title}</span>
          <FaUnlock data-testid="unlock-icon" className="text-gray-400 w-5 h-5" />
        </div>
      
      <div className="space-y-4">
        <div className="flex items-center space-x-1 bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:border-gray-500">
          <span className="bg-gray-700 text-white px-3 py-2 rounded focus:outline-none focus:border-gray-500">EM-1</span>
          <span>Adding iteration...</span>
        </div>
        
        <div>
          <textarea
            value={prompt}
            placeholder="To add a new iteration, start typing a prompt."
            className="w-full bg-gray-700 text-gray-300 px-3 py-3 rounded border border-gray-600 focus:outline-none focus:border-gray-500 resize-none"
            rows="4"
            onChange={(e) => setPrompt(e.target.value)}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-4 mt-6">
        <button
          onClick={() => setCollapsed(true)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          CANCEL
        </button>
        <button
          onClick={() => {
            if (!prompt) return
            setIterations([
              ...iterations,
              { id: `EM-${iterations.length + 1}`, title:prompt, selectedTitleLength: 'short' }
            ])
          }}
          className="text-white font-bold hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!prompt}
        >
          DONE
        </button>
      </div>
    </div>
  )
}

const ExpandedUnlockedState = ({
  module,
  setCollapsed,
  iterations,
  setIterations
}) => {
  const [prompt, setPrompt] = useState('')
  const [isAddingIteration, setIsAddingIteration] = useState(false)

  const handleAddIteration = () => {
    setIterations([...iterations, { id: `EM-${iterations.length + 1}`, title: prompt, selectedTitleLength: 'short' }])
    setIsAddingIteration(false)
    setPrompt('')
  }

  const handleRemoveIteration = (iterationId) => {
    setIterations(prev => prev.filter(iteration => iteration.id !== iterationId))
  }

  const handleUpdateIterationTitle = (iterationId, newTitle) => {
    setIterations(prev => prev.map(iteration => 
      iteration.id === iterationId 
        ? { ...iteration, title: newTitle.trim() }
        : iteration
    ))
  }

  const handleUpdateIterationTitleLength = (iterationId, newTitleLength) => {
    setIterations(prev => prev.map(iteration => 
      iteration.id === iterationId 
        ? { ...iteration, selectedTitleLength: newTitleLength }
        : iteration
    ))
  }

  const handleLockModule = () => {
    setCollapsed(true)
  }

  const handleResetModule = () => {
    setIterations([])
  }

  if (!iterations.length) return null

  return (
    <div className="bg-gray-800 rounded-lg p-6 mb-4">
              <div 
          className="flex items-center justify-between mb-6 cursor-pointer"
          onClick={() => setCollapsed(true)}
        >
          <span className="text-white text-lg font-semibold">{module?.title}</span>
          <FaUnlock data-testid="unlock-icon" className="text-gray-400 w-5 h-5" />
        </div>
      
      <div className="space-y-2 mb-6">
        {iterations.map((iteration, _index) => (
          <Iteration
            key={iteration.id}
            iteration={iteration}
            onUpdateTitle={handleUpdateIterationTitle}
            onRemove={handleRemoveIteration}
            selectedTitleLength={iteration.selectedTitleLength}
            onTitleLengthChange={handleUpdateIterationTitleLength}
          />
        ))}

        {isAddingIteration && (
          <div className="flex items-center justify-between py-3 border-b border-gray-700">
            <span className="text-gray-300">{`EM-${iterations.length + 1}`}</span>
            <span className="text-gray-300">Adding iteration...</span>
            <div></div>
          </div>
        )}
      </div>
      
      {/* Add Iteration Input Area */}
      {isAddingIteration && (
        <div className="mb-6">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="To add a new iteration, start typing a prompt or generate one."
            className="w-full bg-gray-700 text-gray-300 px-3 py-3 rounded border border-gray-600 focus:outline-none focus:border-gray-500 resize-none"
            rows="4"
          />
          <p className="text-gray-400 text-sm mt-1">
            To add a new iteration, start typing a prompt.
          </p>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex space-x-6">
        {!isAddingIteration ? (
          <>
            <button 
              onClick={handleLockModule}
              className="text-gray-400 hover:text-white transition-colors"
            >
              LOCK
            </button>
            <button 
              onClick={handleResetModule}
              className="text-gray-400 hover:text-white transition-colors"
            >
              RESET
            </button>
              <button 
                onClick={() => setIsAddingIteration(true)}
                className="text-white font-bold"
              >
                + ADD ITERATION
              </button>
            </>
          ) : (
          <>
            <button
              onClick={() => setIsAddingIteration(false)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              CANCEL
            </button>
            <button
              onClick={handleAddIteration}
              className="text-white font-bold hover:text-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!prompt}
            >
              DONE
            </button> 
          </>
        )}
      </div>
    </div>
  )
}

const ExperimentModule = ({ module }) => {
  const [collapsed, setCollapsed] = useState(false)
  let [iterations, setIterations] = useState([])

  if (collapsed) {
    return (
      <div className="bg-gray-800 rounded-lg p-6 mb-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={() => setCollapsed(false)}
        >
          <span className="text-gray-500 text-lg">{module?.title}</span>
            {iterations?.length ? <FaLock data-testid="lock-icon" className="text-gray-400 w-5 h-5" /> : null}
        </div>
      </div>
    )
  }

  if (!iterations?.length) {
    return <ExpandedEmptyState
      module={module}
      setCollapsed={setCollapsed}
      iterations={iterations}
      setIterations={setIterations}
    />
  }

  return <ExpandedUnlockedState
    module={module}
    setCollapsed={setCollapsed}
    iterations={iterations}
    setIterations={setIterations}
  />
}

export default ExperimentModule;