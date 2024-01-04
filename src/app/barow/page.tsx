'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';

const Page = () => {
  return (
    <>
      <h1>Welcome to the Loan Calculator</h1>
      <p>
        This is a simple loan calculator. Enter the amount of the loan, the
        number of months, and the interest rate.
      </p>
    </>
  );
};


function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState('');
  const [numberOfMonths, setNumberOfMonths] = useState('');
  const [result, setResult] = useState(null);

  const calculateLoan = () => {
    const amount = parseFloat(loanAmount);
    const months = parseInt(numberOfMonths);
    const interestRate = 0.0874; // 8.74%

    const monthlyInterestRate = interestRate / 12;
    const monthlyPayment = (amount * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -months));

    setResult(monthlyPayment.toFixed(2));
  };

  const resetFields = () => {
    setLoanAmount('');
    setNumberOfMonths('');
    setResult(null);
  };

  return (
    <div>
      <Page />
      <TextField
        id="outlined-basic-loan-amount"
        label="Loan Amount"
        variant="outlined"
        value={loanAmount}
        onChange={(e) => setLoanAmount(e.target.value)}
        style={{ marginBottom: '10px' }} />
      <br />
      <TextField
        id="outlined-basic-months"
        label="Number of Months"
        variant="outlined"
        value={numberOfMonths}
        onChange={(e) => setNumberOfMonths(e.target.value)}
        style={{ marginBottom: '10px' }} />
      <br />
      <Button variant="contained" onClick={calculateLoan} style={{ marginBottom: '10px' }}>
        Calculate
      </Button>
      <Button variant="contained" onClick={resetFields} style={{ marginLeft: '10px', marginBottom: '10px' }} startIcon={<RefreshIcon />}>
        Reset
      </Button>
      {result && <p>Monthly Payment: ${result}</p>}
    </div>
  );
}


export default LoanCalculator;
