import React from 'react'
import axios from "axios"
import {Route , Routes} from "react-router"
import RegisterPage from '../Routes/RegisterPage'
import OTPVerification from '../Routes/OTPVerification'
import LoginPage from '../Routes/LoginPage'
import Dashboard from '../Routes/Dashboard'
import TeamDashboard from '../Routes/TeamDashboard'
import AdminDashboard from '../Routes/AdminDashboard'
import ViewComplaint from '../Component/ViewComplaint'

function App() {
  return (
  
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/OTP" element={<OTPVerification />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/td" element={<TeamDashboard />} />
        <Route path="/ad" element={<AdminDashboard />} />
        
        
      </Routes>
  
  )
}

export default App