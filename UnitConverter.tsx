import React, { useState } from 'react';

type UnitType = 'length' | 'weight' | 'temperature';

const UnitConverter: React.FC = () => {
  const [unitType, setUnitType] = useState<UnitType>('length');
  const [fromUnit, setFromUnit] = useState('meter');
  const [toUnit, setToUnit] = useState('centimeter');
  const [value, setValue] = useState('');
  const [result, setResult] = useState('');

  const lengthUnits = ['meter', 'centimeter', 'foot', 'inch'];
  const weightUnits = ['kilogram', 'gram', 'pound', 'ounce'];
  const temperatureUnits = ['celsius', 'fahrenheit', 'kelvin'];

  const getUnits = () => {
    switch (unitType) {
      case 'length':
        return lengthUnits;
      case 'weight':
        return weightUnits;
      case 'temperature':
        return temperatureUnits;
    }
  };

  const convert = (value: number, from: string, to: string, type: UnitType): number => {
    // Convert to base unit first (meter for length, gram for weight, celsius for temperature)
    let baseValue: number;

    if (type === 'length') {
      // Convert to meters first
      switch (from) {
        case 'meter':
          baseValue = value;
          break;
        case 'centimeter':
          baseValue = value / 100;
          break;
        case 'foot':
          baseValue = value * 0.3048;
          break;
        case 'inch':
          baseValue = value * 0.0254;
          break;
        default:
          baseValue = value;
      }

      // Convert from meters to target unit
      switch (to) {
        case 'meter':
          return baseValue;
        case 'centimeter':
          return baseValue * 100;
        case 'foot':
          return baseValue / 0.3048;
        case 'inch':
          return baseValue / 0.0254;
        default:
          return baseValue;
      }
    } else if (type === 'weight') {
      // Convert to grams first
      switch (from) {
        case 'kilogram':
          baseValue = value * 1000;
          break;
        case 'gram':
          baseValue = value;
          break;
        case 'pound':
          baseValue = value * 453.592;
          break;
        case 'ounce':
          baseValue = value * 28.3495;
          break;
        default:
          baseValue = value;
      }

      // Convert from grams to target unit
      switch (to) {
        case 'kilogram':
          return baseValue / 1000;
        case 'gram':
          return baseValue;
        case 'pound':
          return baseValue / 453.592;
        case 'ounce':
          return baseValue / 28.3495;
        default:
          return baseValue;
      }
    } else {
      // Temperature conversion
      // Convert to Celsius first
      switch (from) {
        case 'celsius':
          baseValue = value;
          break;
        case 'fahrenheit':
          baseValue = (value - 32) * (5/9);
          break;
        case 'kelvin':
          baseValue = value - 273.15;
          break;
        default:
          baseValue = value;
      }

      // Convert from Celsius to target unit
      switch (to) {
        case 'celsius':
          return baseValue;
        case 'fahrenheit':
          return (baseValue * 9/5) + 32;
        case 'kelvin':
          return baseValue + 273.15;
        default:
          return baseValue;
      }
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

    const convertedValue = convert(numValue, fromUnit, toUnit, unitType);
    setResult(`${numValue} ${fromUnit} = ${convertedValue.toFixed(4)} ${toUnit}`);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Unit Converter</h2>

      <div className="max-w-md mx-auto">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Unit Type
          </label>
          <select
            value={unitType}
            onChange={(e) => {
              setUnitType(e.target.value as UnitType);
              const units = e.target.value === 'length' ? lengthUnits :
                          e.target.value === 'weight' ? weightUnits :
                          temperatureUnits;
              setFromUnit(units[0]);
              setToUnit(units[1]);
            }}
            className="w-full p-2 border rounded-lg bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          >
            <option value="length">Length</option>
            <option value="weight">Weight</option>
            <option value="temperature">Temperature</option>
          </select>
        </div>

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
              {getUnits().map((unit) => (
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
              {getUnits().map((unit) => (
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

export default UnitConverter;