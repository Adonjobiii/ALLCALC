import React, { useState, useEffect } from 'react';
import { Calculator, Grid3X3, Ruler, Scale } from 'lucide-react';
import MatrixCalculator from './components/MatrixCalculator';
import ScientificCalculator from './components/ScientificCalculator';
import UnitConverter from './components/UnitConverter';
import AreaCalculator from './components/AreaCalculator';

function App() {
  const [activeTab, setActiveTab] = useState('matrix');

  // Keyboard shortcuts for tab switching
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case '1':
            setActiveTab('matrix');
            break;
          case '2':
            setActiveTab('scientific');
            break;
          case '3':
            setActiveTab('units');
            break;
          case '4':
            setActiveTab('area');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-blue-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-3 rounded-lg shadow-lg">
            <Grid3X3 size={32} />
          </div>
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
            ALLCALC
          </h1>
        </div>

        {/* Navigation */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg mb-8 border border-blue-100">
          <div className="flex flex-wrap gap-2 p-2">
            <button
              onClick={() => setActiveTab('matrix')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'matrix'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                  : 'hover:bg-blue-50'
              }`}
            >
              <Grid3X3 size={20} />
              Matrix (Ctrl+1)
            </button>
            <button
              onClick={() => setActiveTab('scientific')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'scientific'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                  : 'hover:bg-blue-50'
              }`}
            >
              <Calculator size={20} />
              Scientific (Ctrl+2)
            </button>
            <button
              onClick={() => setActiveTab('units')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'units'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                  : 'hover:bg-blue-50'
              }`}
            >
              <Ruler size={20} />
              Units (Ctrl+3)
            </button>
            <button
              onClick={() => setActiveTab('area')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === 'area'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md'
                  : 'hover:bg-blue-50'
              }`}
            >
              <Scale size={20} />
              Area (Ctrl+4)
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-lg p-6 border border-blue-100">
          {activeTab === 'matrix' && <MatrixCalculator />}
          {activeTab === 'scientific' && <ScientificCalculator />}
          {activeTab === 'units' && <UnitConverter />}
          {activeTab === 'area' && <AreaCalculator />}
        </div>
      </div>
    </div>
  );
}

export default App;