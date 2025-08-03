import { useState } from 'react'

import ExperimentModule from './ExperimentModule'

const ExperimentalModulePanel = () => {
  const [experimentModules, setExperimentModules] = useState([])

  const handleAddExperimentModule = () => {
    const newModule = {
      id: `module-${Date.now()}`,
      title: `Experiment Module ${experimentModules.length + 1}`
    };
    setExperimentModules(prev => [...prev, newModule]);
  }

  return (
    <>
      <div className="flex flex-col items-center justify-space-between space-y-4 mb-6">
        <h2 className="text-white text-xl font-semibold">Experimental Module Panel</h2>
        <button
          onClick={handleAddExperimentModule}
          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors font-medium"
        >
          + Add Experiment Module
        </button>
      </div>
      <div>
        {!experimentModules.length && (
          <>
            <div className="flex items-center justify-center">
              <h2 className="text-white text-center text-xl font-semibold mt-40 text-gray-400">No experiment modules added yet. Add one to get started.</h2>
            </div>
          </>
        )}
        {experimentModules.length && (
          <div>
            {experimentModules.map((module) => (
              <ExperimentModule key={module.id} module={module} />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default ExperimentalModulePanel;