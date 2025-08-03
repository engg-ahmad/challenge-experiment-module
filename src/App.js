import Header from './components/Header'
import ExperimentalModulePanel from './components/ExperimentalModulePanel'

import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />
        <div className="mb-8">
          <ExperimentalModulePanel />
        </div>
      </div>
    </div>
  );
}

export default App;
