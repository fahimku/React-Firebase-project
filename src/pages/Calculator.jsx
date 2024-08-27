import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calculate } from '../redux/actions/calculate.action';
import { Input, Button, Select } from 'antd';

const { Option } = Select;

export function Calculator() {

  const dispatch = useDispatch();
  const { calculater } = useSelector(state => state);
  console.log(calculater);

  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [operator, setOperator] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    if (number1 === '' || number2 === '' || operator === '') {
      setError('Please enter both numbers and select an operator.');
      setResult(null);
      return;
    }
    dispatch(calculate(number1, number2, operator)); // api not found now

    let calcResult;
    switch (operator) {
      case 'add':
        calcResult = Number(number1) + Number(number2);
        break;
      case 'subtract':
        calcResult = Number(number1) - Number(number2);
        break;
      case 'multiply':
        calcResult = Number(number1) * Number(number2);
        break;
      default:
        setError('Invalid operator selected.');
        return;
    }

    setError('');
    setResult(calcResult);
  };

  const handleClear = () => {
    setNumber1('');
    setNumber2('');
    setOperator(null);
    setResult(null);
    setError('');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', marginTop: '50px'  }}>
      <h1>Calculator</h1>
      <div style={{ marginBottom: '10px' }}>
        <Input
          type="number"
          value={number1}
          onChange={(e) => setNumber1(Number(e.target.value))}
          placeholder="First Number"
          style={{ width: '200px', marginRight: '10px' }}
        />
        <Input
          type="number"
          value={number2}
          onChange={(e) => setNumber2(Number(e.target.value))}
          placeholder="Second Number"
          style={{ width: '200px', marginRight: '10px' }}
        />
        <Select
          placeholder="Select Operator"
          value={operator}
          onChange={(value) => setOperator(value)}
          style={{ width: '200px', marginRight: '10px' }}
        >
          <Option value="add">+</Option>
          <Option value="subtract">-</Option>
          <Option value="multiply">*</Option>
        </Select>
        <Button type="primary" onClick={handleCalculate}>
          Calculate
        </Button>
        {" "}
        <Button type="default" onClick={handleClear}>
          Clear
        </Button>
      </div>
      {result !== null && (
        <div style={{ marginTop: '10px' }}>
          <h3>Result: {result}</h3>
        </div>
      )}
      {error && (
        <div style={{ marginTop: '10px', color: 'red' }}>
          <h3>Error: {error}</h3>
        </div>
      )}
    </div>
  );
}
