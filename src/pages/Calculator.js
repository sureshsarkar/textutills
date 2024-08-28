import React, { useState } from 'react';


function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        if (input.includes('%')) {
            const percentageResult = calculatePercentage(input);
            setResult(percentageResult);
            setInput(percentageResult.toString());
          } else{
              setResult(eval(input));
          }
      } catch (error) {
        setResult('Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    }else {
      setInput(input + value);
    }
  };
  const handleSquire= ()=>{
    setResult(input*input);
  }
const handleRemove = ()=>{
    setInput(input.slice(0, input.length - 1));

}
  const calculatePercentage = (expression) => {
    const parts = expression.split('%');
    if (parts.length !== 2) {
      throw new Error('Invalid percentage expression');
    }
    
    const percentage = parseFloat(parts[0]);
    const baseValue = parseFloat(parts[1]);
    
    if (isNaN(percentage) || isNaN(baseValue)) {
      throw new Error('Invalid numbers in the expression');
    }
    
    return (percentage / 100) * baseValue;
  };


  return (
    <div className="calculator">
      <div className="display">
        <div className="input">{input}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        <button onClick={() => handleClick('1')}>1</button>
        <button onClick={() => handleClick('2')}>2</button>
        <button onClick={() => handleClick('3')}>3</button>
        <button onClick={() => handleClick('+')}>+</button>

        <button onClick={() => handleClick('4')}>4</button>
        <button onClick={() => handleClick('5')}>5</button>
        <button onClick={() => handleClick('6')}>6</button>
        <button onClick={() => handleClick('-')}>-</button>

        <button onClick={() => handleClick('7')}>7</button>
        <button onClick={() => handleClick('8')}>8</button>
        <button onClick={() => handleClick('9')}>9</button>
        <button onClick={() => handleClick('*')}>*</button>

        <button onClick={() => handleClick('0')}>0</button>
        <button onClick={() => handleClick('.')}>.</button>
        <button onClick={() => handleClick('C')}>C</button>
        <button onClick={() => handleClick('/')}>/</button>
        <button onClick={() => handleClick('%')} className="percentage">%</button>
        <button onClick={() => handleSquire()} className="squire">x<sup>2</sup></button>
        <button onClick={() => handleRemove()} >x</button>

        <button className="equal" onClick={() => handleClick('=')}>=</button>
      </div>
    </div>
  );
}

export default Calculator;
