import logo from './logo.svg';
import './App.css';
import CustomLayout from './components/layout';
import NavDrawerDefault from './components/drawer';
import Sample from './components/sample';
// import NavDrawerDefault from './components/drawer';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/HRdashboard';
import HREmployee from './pages/HREmployee';
import EmployeeForm from './pages/employeeform';
import HRManager from './pages/HRManager';
import HRReviewer from './pages/HRReviewer';
import HRSummary from './pages/HRSummary';
import MGAppraisal from './pages/MGAppraisal';

function App() {
  return (

    
    <Router basename=''>
      <Routes>
        <Route path='' element={<Login/>}/>
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route path='dashboard'  element={<CustomLayout><NavDrawerDefault><Dashboard/></NavDrawerDefault></CustomLayout>}/>
        <Route path='hremployee' element={<CustomLayout><NavDrawerDefault><HREmployee/></NavDrawerDefault></CustomLayout>}/>
        <Route path='hrmanager' element={<CustomLayout><NavDrawerDefault><HRManager/></NavDrawerDefault></CustomLayout>}/>
        <Route path='hrreviewer' element={<CustomLayout><NavDrawerDefault><HRReviewer/></NavDrawerDefault></CustomLayout>}/>
        <Route path='hrsummary' element={<CustomLayout><NavDrawerDefault><HRSummary/></NavDrawerDefault></CustomLayout>}/>
        <Route path='mgappraisal' element={<CustomLayout><NavDrawerDefault><MGAppraisal/></NavDrawerDefault></CustomLayout>}/>
      
        <Route path='form/:token' element={<EmployeeForm/>}/>
        
        

      </Routes>
    </Router>
  );
}

export default App;
