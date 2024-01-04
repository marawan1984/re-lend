'use client'
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import RefreshIcon from '@mui/icons-material/Refresh';

const CompoundInterestCalculator = () => {
  const [principal, setPrincipal] = useState("");

  const [compoundsPerYear, setCompoundsPerYear] = useState("");
  const [years, setYears] = useState("");
  const [result, setResult] = useState(null);

  const calculateCompoundInterest = () => {
    const P = parseFloat(principal);
    const r = 0.0425;
    const n = parseFloat(compoundsPerYear);
    const t = parseFloat(years);

    const A = P * Math.pow(1 + r / n, n * t);

    setResult(A.toString());
  };

  const resetFields = () => {
    setPrincipal("");
    setCompoundsPerYear("");
    setYears("");
    setResult(null);
  };

  return (
    <div>
      <TextField
        id="outlined-basic-principal"
        label="Principal"
        variant="outlined"
        value={principal}
        onChange={(e) => setPrincipal(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <TextField
        id="outlined-basic-compounds"
        label="Compounds per Year"
        variant="outlined"
        value={compoundsPerYear}
        onChange={(e) => setCompoundsPerYear(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <TextField
        id="outlined-basic-years"
        label="Years"
        variant="outlined"
        value={years}
        onChange={(e) => setYears(e.target.value)}
        style={{ marginBottom: "10px" }}
      />
      <br />
      <Button
        variant="contained"
        onClick={calculateCompoundInterest}
        style={{ marginBottom: "10px" }}
      >
        Calculate
      </Button>
      <Button
        variant="contained"
        onClick={resetFields}
        style={{ marginLeft: "10px", marginBottom: "10px" }}
        startIcon={<RefreshIcon />}
      >
        Reset
      </Button>
      {result !== null && <p>Future Value: {result}</p>}
    </div>
  );
};

const Page = () => {
  return (
    <>
      <h1>WELCOME</h1>
      <p>
        Dive into the world of annual investments with a 4.25% interest
        rate&mdash;an opportunity that balances attractive returns with a
        prudent risk approach. This stable and competitive interest rate not
        only preserves your wealth against inflation but also fosters steady
        financial growth. Whether you&apos;re a seasoned investor or a beginner,
        the 4.25% rate serves as a reliable foundation for building and
        diversifying your portfolio, promising a prosperous financial future.
      </p>
      <CompoundInterestCalculator />
    </>
  );
};

export default Page;
