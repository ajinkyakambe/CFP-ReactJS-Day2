
import './App.css';
import PayrollForm from './components/payroll-form/payroll-form';
import Home from './components/home/home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
       <Routes>
       
        {/*Home Route*/}
       <Route path='/home' element={<Home/>} />
        {/*Payroll Form Route*/}
       <Route path='/payroll-form' element={<PayrollForm/>} />
        {/*Payroll Form Route with passed id*/}
       <Route path="/payroll-form/:id" element={<PayrollForm/>} />
       
        
       </Routes>
      </Router>
    </div>
   
  );
}

export default App;
