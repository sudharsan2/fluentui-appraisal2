import logo from './logo.svg';
import './App.css';
import CustomLayout from './components/layout';
import NavDrawerDefault from './components/drawer';
import Sample from './components/sample';
// import NavDrawerDefault from './components/drawer';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/dashboard';
import Employee from './pages/Employee';
import EmployeeForm from './pages/employeeform';
import Manager from './pages/Manager';
import Reviewer from './pages/Reviewer';
import Summary from './pages/Summary';

function App() {
  return (

    
    <Router basename=''>
      <Routes>
        <Route path='' element={<Login/>}/>
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route path='dashboard'  element={<CustomLayout><NavDrawerDefault><Dashboard/></NavDrawerDefault></CustomLayout>}/>
        <Route path='employee' element={<CustomLayout><NavDrawerDefault><Employee/></NavDrawerDefault></CustomLayout>}/>
        <Route path='manager' element={<CustomLayout><NavDrawerDefault><Manager/></NavDrawerDefault></CustomLayout>}/>
        <Route path='reviewer' element={<CustomLayout><NavDrawerDefault><Reviewer/></NavDrawerDefault></CustomLayout>}/>
        <Route path='summary' element={<CustomLayout><NavDrawerDefault><Summary/></NavDrawerDefault></CustomLayout>}/>
      
        <Route path='form/:token' element={<EmployeeForm/>}/>
        
        

      </Routes>
    </Router>
  );
}

export default App;
