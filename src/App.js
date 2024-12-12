import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HelpDeskInterface from './components/HelpDeskInterface';
import SignInModal from './components/SignInModal';
import SignUpPage from './components/SignUpPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<HelpDeskInterface/>}/>
        <Route path='/signin' element={<SignInModal/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/forgot-password' element={<ForgotPasswordPage/>}/>
        
      </Routes>
    </Router>
  )
}

export default App
