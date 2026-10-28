import { useState } from 'react';



import './App.css'


function calculatePayment(balance, annualRate, years) {
  const n = years * 12;                 // total number of monthly payments
  const r = annualRate / 100 / 12;      // monthly interest rate as a decimal

  if (r === 0) return balance / n;      // 0% interest: avoid dividing by zero

  return (balance * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}



function LoanForm({ onCalculate }){
  const [balance, setBalance] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('15');
  

  function handleSubmit(e) {
    e.preventDefault();
    onCalculate({
      balance: Number(balance),
      rate: Number(rate),
      term: Number(term),
    });
  }

  return (
    <>
      

      <form className="input_div" onSubmit={handleSubmit}>
        <h3>Loan Balance</h3>
        <input  step="0.01" data-testid="balance" type="number" min="0" onChange={(e) => setBalance(e.target.value)} required ></input>
        <h3>Interest Rate</h3>
        <input step="0.01" data-testid="rate" type="number" min ="0" onChange={(e) => setRate(e.target.value)} required ></input>
        <h3>Loan Term</h3>
        <select data-testid="term" value={term} onChange={(e) => setTerm(e.target.value)} required>
          <option value="15">15</option>
          <option value="30">30</option>
        </select>
        <button data-testid="submit" type="submit" >Calculate</button>
      </form>
      
    </>
  )


}
function App() {
  const [payment, setPayment] = useState(null);

  // Add your code here
  function handleCalculate({balance, rate, term})
  {
     console.log(balance,rate,term)
    setPayment(calculatePayment(Number(balance), Number(rate), Number(term)));
    //create calculate payment function, and finish submit.
  }
  
  return (
    <>
      <h1 className="mortgage-title">Mortgage Calculator</h1>

      <LoanForm onCalculate={handleCalculate}/>
      <div className='input_div' id="output" data-testid="output">
        {payment !== null ? <div >${payment.toFixed(2)} is your payment </div> : null}
      </div>
      
    </>
  )
}




export default App
