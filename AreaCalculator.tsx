import React, { useState } from 'react';

const AreaCalculator: React.FC = () => {
  const [fromUnit, setFromUnit] = useState('acre');
  const [toUnit, setToUnit] = useState('hectare');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const areaUnits = ['acre', 'hectare', 'square meter', 'square foot', 'square inch'];

  const convert = (value: number, from: string, to: string): number => {
    // Convert to square meters first (base unit)
    let baseValue: number;

    // Convert to square meters
    switch (from) {
      case 'acre':
        baseValue = value * 4046.86;
        break;
      case 'hectare':
        baseValue = value * 10000;
        break;
      case 'square meter':
        baseValue = value;
        break;
      case 'square foot':
        baseValue = value * 0.092903;
        break;
      case 'square inch':
        baseValue = value * 0.00064516;
        break;
      default:
        baseValue = value;
    }

    // Convert from square meters to target unit
    switch (to) {
      case 'acre':
        return baseValue / 4046.86;
      case 'hectare':
        return baseValue / 10000;
      case 'square meter':
        return baseValue;
      case 'square foot':
        return baseValue / 0.092903;
      case 'square inch':
        return baseValue / 0.00064516;
      default:
        return baseValue;
    }
  };

  const handleConvert = () => {
    if (!value) {
      setResult('Please enter a value');
      return;
    }

    const numValue = parseFloat(value);
    if (isNaN(numValue)) {
      setResult('Please enter a valid number');
      return;
    }

    const convertedValue = convert(numValue, fromUnit, toUnit);
    setResult(`${numValue} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Area Calculator</h2>

      <div className="max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              From
            </label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {areaUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              To
            </label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="w-full p-2 border rounded-lg bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            >
              {areaUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Value
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleConvert();
              }
            }}
            className="w-full p-2 border rounded-lg bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            placeholder="Enter value..."
          />
        </div>

        <button
          onClick={handleConvert}
          className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors shadow-lg"
        >
          Convert
        </button>

        {result && (
          <div className="mt-6 p-4 bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-sm">
            <p className="text-lg font-semibold text-center">{result}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AreaCalculator;