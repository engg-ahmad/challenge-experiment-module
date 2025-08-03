import React, { useState } from 'react'

const titleLengthOptions = [
  { label: 'SHORT', value: 'short' },
  { label: 'MEDIUM LENGTH', value: 'medium' },
  { label: 'VERY VERY VERY LONG (UP TO 35 CHAR)', value: 'long' }
]

const Iteration = ({ 
  iteration, 
  onUpdateTitle, 
  onRemove,
  selectedTitleLength,
  onTitleLengthChange,
}) => {
  const [editingTitle, setEditingTitle] = useState('')
  const [isExpanded, setIsExpanded] = useState(false)
  
  const handleUpdateTitle = () => {
    if (editingTitle.trim()) {
      onUpdateTitle(iteration.id, editingTitle)
      setEditingTitle('')
    }
  }

  if (!isExpanded) {
    return (
      <div 
        className="flex items-center justify-between py-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700 transition-colors"
        onClick={() => setIsExpanded(true)}
      >
        <span className="text-gray-300">{iteration.id}</span>
        <span className="text-gray-300">{iteration.title}</span>
                 <div className="flex items-center space-x-2">
           <span className="text-gray-300">Selection</span>
           {iteration.selected && (
             <div data-testid="selection-indicator" className="w-3 h-3 bg-green-500 rounded-full"></div>
           )}
         </div>
      </div>
    )
  }

  return (
    <div className="bg-black border border-white rounded-lg p-6 mb-3">
      <div className="flex items-center justify-space-between mb-4">
        <span className="text-white text-sm">{iteration.id}:</span>
        <input
          type="text"
          value={editingTitle || iteration.title}
          onChange={(e) => setEditingTitle(e.target.value)}
          onBlur={handleUpdateTitle}
          onKeyDown={(e) => e.key === 'Enter' && handleUpdateTitle()}
          className="ml-4 text-white text-sm bg-transparent border-none outline-none focus:outline-none"
          placeholder="Enter title..."
        />
      </div>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {titleLengthOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => onTitleLengthChange(iteration.id, option.value)}
            className={`px-4 py-2 rounded border text-sm font-medium transition-colors ${
              selectedTitleLength === option.value
                ? 'bg-green-500 border-green-500 text-white'
                : 'bg-black border-white text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
      
      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <button 
          onClick={() => onRemove(iteration.id)}
          className="text-white hover:text-gray-300 transition-colors text-sm"
        >
          REMOVE
        </button>
        <button 
          onClick={() => setIsExpanded(false)}
          className="text-white hover:text-gray-300 transition-colors text-sm"
        >
          DONE
        </button>
      </div>
    </div>
  )
}

export default Iteration 