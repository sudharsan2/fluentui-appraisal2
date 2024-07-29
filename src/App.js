import logo from './logo.svg';
import './App.css';
import CustomLayout from './components/layout';

import EmpFormPage from './pages/employeeformup';
import ManFormPage from './pages/managerform';

import NavDrawerDefault from './components/drawer';
import MGNavDrawerDefault from './components/mgdrawer';
import RVNavDrawerDefault from './components/rvdrawer';
import MDNavDrawerDefault from './components/mddrawer';
import Sample from './components/sample';
// import NavDrawerDefault from './components/drawer';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Dashboard from './pages/HRdashboard';
import HREmployee from './pages/HREmployee';
import EmployeeForm from './pages/employeeform';
import HRManager from './pages/HRManager';
import HRReviewer from './pages/HRReviewer';
import MD from './pages/MD';
import HRSummary from './pages/HRSummary';
import MGAppraisal from './pages/MGAppraisal';
import MGReviewer from './pages/MGReviewer';
import MGSummary from './pages/MGSummary'
import RVReviewer from './pages/RVReviewer';
import RVSummary from './pages/RVSummary'
import MDSummary from './pages/MDsummary';
// import FormPage from './pages/employeeformup';

function App() {
  return (

    
    <Router basename=''>
      <Routes>
        <Route path='' element={<Login/>}/>
        {/* <Route path='dashboard'  element={<CustomLayout><Dashboard/></CustomLayout>}/> */}
        <Route path='hrdashboard'  element={<CustomLayout><NavDrawerDefault><Dashboard/></NavDrawerDefault></CustomLayout>}/>
        <Route path='hremployee' element={<CustomLayout><NavDrawerDefault><HREmployee/></NavDrawerDefault></CustomLayout>}/>
        <Route path='hrmanager' element={<CustomLayout><NavDrawerDefault><HRManager/></NavDrawerDefault></CustomLayout>}/>
        <Route path='hrreviewer' element={<CustomLayout><NavDrawerDefault><HRReviewer/></NavDrawerDefault></CustomLayout>}/>
        {/* <Route path='hrmd' element={<CustomLayout><NavDrawerDefault><HRMD/></NavDrawerDefault></CustomLayout>}/> */}
        <Route path='hrsummary' element={<CustomLayout><NavDrawerDefault><HRSummary/></NavDrawerDefault></CustomLayout>}/>
        <Route path='mgappraisal' element={<CustomLayout><MGNavDrawerDefault><MGAppraisal/></MGNavDrawerDefault></CustomLayout>}/>
        <Route path='mgreviewer' element={<CustomLayout><MGNavDrawerDefault><MGReviewer/></MGNavDrawerDefault></CustomLayout>}/>
        <Route path='mgsummary' element={<CustomLayout><MGNavDrawerDefault><MGSummary/></MGNavDrawerDefault></CustomLayout>}/>
        <Route path='rvreviewer' element={<CustomLayout><RVNavDrawerDefault><RVReviewer/></RVNavDrawerDefault></CustomLayout>}/>
        <Route path='rvsummary' element={<CustomLayout><RVNavDrawerDefault><RVSummary/></RVNavDrawerDefault></CustomLayout>}/>
        <Route path='md' element={<CustomLayout><MDNavDrawerDefault><MD/></MDNavDrawerDefault></CustomLayout>}/>
        <Route path='mdsummary' element={<CustomLayout><MDNavDrawerDefault><MDSummary/></MDNavDrawerDefault></CustomLayout>}/>

        <Route path='form/:token' element={<EmpFormPage/>}/>
        <Route path='form/:token' element={<ManFormPage/>}/>
        
        

      </Routes>
    </Router>
  );
}

export default App;
