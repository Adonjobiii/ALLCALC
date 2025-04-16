import React, { useState, useEffect } from 'react';
import { Calculator } from 'lucide-react';

const ScientificCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [memory, setMemory] = useState<number>(0);
  const [lastOperation, setLastOperation] = useState<string>('');
  const [clearNext, setClearNext] = useState(false);

  const scientificFunctions = [
    'sin',
    'cos',
    'tan',
    'log',
    'ln',
    'sqrt',
    'x²',
    'x³',
    'π',
    'e',
    'MC',
    'MR',
    'M+',
    'M-',
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleNumber(e.key);
      } else if (e.key === '.') {
        handleNumber('.');
      } else if (e.key === 'Enter') {
        handleOperation('=');
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleOperation(e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display]);

  const handleNumber = (num: string) => {
    if (clearNext) {
      setDisplay(num);
      setClearNext(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleOperation = (op: string) => {
    const currentValue = parseFloat(display);

    switch (op) {
      case 'sin':
        setDisplay(Math.sin(currentValue).toString());
        break;
      case 'cos':
        setDisplay(Math.cos(currentValue).toString());
        break;
      case 'tan':
        setDisplay(Math.tan(currentValue).toString());
        break;
      case 'log':
        setDisplay(Math.log10(currentValue).toString());
        break;
      case 'ln':
        setDisplay(Math.log(currentValue).toString());
        break;
      case 'sqrt':
        setDisplay(Math.sqrt(currentValue).toString());
        break;
      case 'x²':
        setDisplay(Math.pow(currentValue, 2).toString());
        break;
      case 'x³':
        setDisplay(Math.pow(currentValue, 3).toString());
        break;
      case 'π':
        setDisplay(Math.PI.toString());
        break;
      case 'e':
        setDisplay(Math.E.toString());
        break;
      case 'MC':
        setMemory(0);
        break;
      case 'MR':
        setDisplay(memory.toString());
        break;
      case 'M+':
        setMemory(memory + currentValue);
        break;
      case 'M-':
        setMemory(memory - currentValue);
        break;
      case '=':
        try {
          // Safe evaluation of the mathematical expression
          const result = Function('"use strict";return (' + display.replace('×', '*').replace('÷', '/') + ')')();
          setDisplay(result.toString());
          setLastOperation('');
        } catch (error) {
          setDisplay('Error');
        }
        setClearNext(true);
        break;
      default:
        if (clearNext) {
          setLastOperation(op);
          setClearNext(false);
        } else {
          setDisplay(display + op);
        }
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-blue-600" />
        Scientific Calculator
      </h2>
      
      <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-xl shadow-sm mb-4">
        <input
          type="text"
          value={display}
          readOnly
          className="w-full text-right text-2xl p-4 rounded-lg bg-white/50 border focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
        />
        {memory !== 0 && (
          <div className="text-right text-sm text-blue-600 mt-1">
            Memory: {memory}
          </div>
        )}
      </div>

      <div className="grid grid-cols-5 gap-2">
        {scientificFunctions.map((func) => (
          <button
            key={func}
            onClick={() => handleOperation(func)}
            className="p-4 bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg hover:from-blue-200 hover:to-blue-100 transition-colors shadow-sm"
          >
            {func}
          </button>
        ))}
        
        <div className="col-span-5 grid grid-cols-4 gap-2 mt-2">
          {[7, 8, 9, '÷', 4, 5, 6, '×', 1, 2, 3, '-', 0, '.', '=', '+'].map(
            (item) => (
              <button
                key={item}
                onClick={() =>
                  typeof item === 'number'
                    ? handleNumber(item.toString())
                    : handleOperation(item.toString())
                }
                className={`p-4 ${
                  item === '='
                    ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                    : typeof item === 'number'
                    ? 'bg-white'
                    : 'bg-gradient-to-br from-gray-100 to-gray-50'
                } rounded-lg hover:opacity-90 transition-all duration-200 shadow-sm`}
              >
                {item}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;