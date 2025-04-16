import React, { useState, useEffect } from 'react';
import { Plus, X, Divide, Equal, Calculator } from 'lucide-react';

type Operation = 'add' | 'multiply' | 'divide' | 'determinant';

const MatrixCalculator: React.FC = () => {
  const [rows1, setRows1] = useState(2);
  const [cols1, setCols1] = useState(2);
  const [rows2, setRows2] = useState(2);
  const [cols2, setCols2] = useState(2);
  const [matrix1, setMatrix1] = useState(Array(rows1).fill(Array(cols1).fill(0)));
  const [matrix2, setMatrix2] = useState(Array(rows2).fill(Array(cols2).fill(0)));
  const [operation, setOperation] = useState<Operation>('add');
  const [result, setResult] = useState<number[][]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        calculateResult();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [matrix1, matrix2, operation]);

  const updateMatrixSize = (matrixNum: 1 | 2, newRows: number, newCols: number) => {
    if (matrixNum === 1) {
      setRows1(newRows);
      setCols1(newCols);
      setMatrix1(Array(newRows).fill(Array(newCols).fill(0)));
    } else {
      setRows2(newRows);
      setCols2(newCols);
      setMatrix2(Array(newRows).fill(Array(newCols).fill(0)));
    }
    setResult([]);
    setError('');
  };

  const updateMatrixValue = (
    matrixNum: 1 | 2,
    row: number,
    col: number,
    value: string
  ) => {
    const numValue = value === '' ? 0 : parseFloat(value);
    const matrix = matrixNum === 1 ? matrix1 : matrix2;
    const setMatrix = matrixNum === 1 ? setMatrix1 : setMatrix2;
    const newMatrix = matrix.map((r, i) =>
      i === row ? r.map((c, j) => (j === col ? numValue : c)) : r
    );
    setMatrix(newMatrix);
    setResult([]);
    setError('');
  };

  const calculateResult = () => {
    try {
      setError('');
      let resultMatrix: number[][] = [];

      switch (operation) {
        case 'add':
          if (rows1 !== rows2 || cols1 !== cols2) {
            throw new Error('Matrices must have the same dimensions for addition');
          }
          resultMatrix = matrix1.map((row, i) =>
            row.map((val, j) => val + matrix2[i][j])
          );
          break;

        case 'multiply':
          if (cols1 !== rows2) {
            throw new Error('Number of columns in first matrix must equal number of rows in second matrix');
          }
          resultMatrix = Array(rows1).fill(0).map(() => Array(cols2).fill(0));
          for (let i = 0; i < rows1; i++) {
            for (let j = 0; j < cols2; j++) {
              resultMatrix[i][j] = matrix1[i].reduce(
                (sum, val, k) => sum + val * matrix2[k][j],
                0
              );
            }
          }
          break;

        case 'determinant':
          if (rows1 !== cols1) {
            throw new Error('Matrix must be square to calculate determinant');
          }
          // Simple 2x2 determinant calculation
          if (rows1 === 2) {
            const det = matrix1[0][0] * matrix1[1][1] - matrix1[0][1] * matrix1[1][0];
            resultMatrix = [[det]];
          }
          break;
      }

      setResult(resultMatrix);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const renderMatrix = (
    matrix: number[][],
    matrixNum: 1 | 2,
    rows: number,
    cols: number
  ) => (
    <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {Array(rows)
        .fill(0)
        .map((_, row) =>
          Array(cols)
            .fill(0)
            .map((_, col) => (
              <input
                key={`${row}-${col}`}
                type="number"
                value={matrix[row][col] || ''}
                onChange={(e) => updateMatrixValue(matrixNum, row, col, e.target.value)}
                className="w-16 h-16 text-center border rounded bg-white/50 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
              />
            ))
        )}
    </div>
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Calculator className="text-blue-600" />
        Matrix Calculator
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Matrix 1 */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Matrix 1</h3>
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              min="1"
              max="5"
              value={rows1}
              onChange={(e) => updateMatrixSize(1, +e.target.value, cols1)}
              className="w-20 p-2 border rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <span className="text-xl">×</span>
            <input
              type="number"
              min="1"
              max="5"
              value={cols1}
              onChange={(e) => updateMatrixSize(1, rows1, +e.target.value)}
              className="w-20 p-2 border rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          {renderMatrix(matrix1, 1, rows1, cols1)}
        </div>

        {/* Operation selector */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col gap-4">
            <button
              onClick={() => setOperation('add')}
              className={`p-4 rounded-full transition-all duration-200 ${
                operation === 'add'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <Plus size={24} />
            </button>
            <button
              onClick={() => setOperation('multiply')}
              className={`p-4 rounded-full transition-all duration-200 ${
                operation === 'multiply'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              <X size={24} />
            </button>
            <button
              onClick={() => setOperation('determinant')}
              className={`p-4 rounded-full transition-all duration-200 ${
                operation === 'determinant'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              det
            </button>
          </div>
        </div>

        {/* Matrix 2 */}
        <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Matrix 2</h3>
          <div className="flex gap-4 mb-4">
            <input
              type="number"
              min="1"
              max="5"
              value={rows2}
              onChange={(e) => updateMatrixSize(2, +e.target.value, cols2)}
              className="w-20 p-2 border rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <span className="text-xl">×</span>
            <input
              type="number"
              min="1"
              max="5"
              value={cols2}
              onChange={(e) => updateMatrixSize(2, rows2, +e.target.value)}
              className="w-20 p-2 border rounded focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </div>
          {renderMatrix(matrix2, 2, rows2, cols2)}
        </div>
      </div>

      <div className="flex justify-center my-8">
        <button
          onClick={calculateResult}
          className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg hover:from-blue-700 hover:to-blue-600 transition-colors shadow-lg"
        >
          <Equal size={24} />
          Calculate (Enter)
        </button>
      </div>

      {/* Result and Error Display */}
      {(result.length > 0 || error) && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Result</h3>
          {error ? (
            <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
          ) : (
            <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${result[0]?.length || 1}, 1fr)` }}>
              {result.map((row, i) =>
                row.map((val, j) => (
                  <div
                    key={`${i}-${j}`}
                    className="w-16 h-16 flex items-center justify-center bg-white border rounded shadow-sm"
                  >
                    {val.toFixed(2)}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MatrixCalculator;