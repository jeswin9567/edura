import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/home';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup'
import Uhome from './pages/uhome/userhome';
import Adhome from './pages/admin/adhome';
import Scholarship from './pages/user/scholarships/scholar';
import Ascholar from './pages/admin/functionalities/ascholar';
import Aloan from './pages/admin/functionalities/aloan';
import AEntrance from './pages/admin/functionalities/aentrance';
import ScholarshipForm from './components/common/ScholarShipForm';
import StudentLoanForm from './components/common/StudentLoan';
import EntranceForm from './components/common/EntranceForm';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/userhome" element={<Uhome/>} />
        <Route path="/adhome" element={<Adhome />} />
        <Route path="/scholarship" element={<Scholarship />} />
        <Route path="/admin/scholar" element={<Ascholar />} />
        <Route path='/admin/loan' element={<Aloan />} />
        <Route path='/admin/entrance' element={<AEntrance />} />
        <Route path = "/addscholar" element={<ScholarshipForm />} />
        <Route path = "/addLoan" element = {<StudentLoanForm />} />
        <Route path ="/addEntrance" element= {<EntranceForm />} />
      </Routes>
    </Router>
  );
}

export default App;
