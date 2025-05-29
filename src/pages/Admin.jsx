import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AdminSidebar from '../components/admin/AdminSidebar'
import Dashboard from '../components/admin/Dashboard'
import MattressManager from '../components/admin/MattressManager'
import QuizEditor from '../components/admin/QuizEditor'
import ThemeEditor from '../components/admin/ThemeEditor'
import PasswordManager from '../components/admin/PasswordManager'
import { useQuiz } from '../context/QuizContext'

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
`

const AdminContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: var(--background);
`

function Admin() {
  const navigate = useNavigate()
  const { isAdmin, checkAdminStatus } = useQuiz()
  const [activeSection, setActiveSection] = useState('dashboard')

  useEffect(() => {
    // Check if user is authenticated as admin
    const adminStatus = checkAdminStatus()
    if (!adminStatus) {
      navigate('/')
    }
  }, [checkAdminStatus, navigate])

  // Render the appropriate component based on active section
  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />
      case 'mattresses':
        return <MattressManager />
      case 'quiz':
        return <QuizEditor />
      case 'theme':
        return <ThemeEditor />
      case 'password':
        return <PasswordManager />
      default:
        return <Dashboard />
    }
  }

  if (!isAdmin) {
    return <div>Loading...</div>
  }

  return (
    <AdminContainer>
      <AdminSidebar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection} 
      />
      <AdminContent>
        {renderSection()}
      </AdminContent>
    </AdminContainer>
  )
}

export default Admin
