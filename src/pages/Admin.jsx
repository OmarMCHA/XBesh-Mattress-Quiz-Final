import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import AdminSidebar from '../components/admin/AdminSidebar'
import Dashboard from '../components/admin/Dashboard'
import MattressManager from '../components/admin/MattressManager'
import QuizEditor from '../components/admin/QuizEditor'
import ThemeEditor from '../components/admin/ThemeEditor'
import PasswordManager from '../components/admin/PasswordManager'
import UrlManager from '../components/admin/UrlManager'
import { useQuiz } from '../context/QuizContext'

const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: var(--background);
`

const AdminContent = styled.div`
  flex: 1;
  padding: 2rem;
  background-color: var(--background);
  overflow-x: hidden;
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  flex-direction: column;
  background-color: var(--background);
`

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: var(--primary);
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
  
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const LoadingText = styled.div`
  color: var(--text-dark);
  font-size: 1.2rem;
`

function Admin() {
  const navigate = useNavigate()
  const { isAdmin, checkAdminStatus } = useQuiz()
  const [activeSection, setActiveSection] = useState('dashboard')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated as admin
    const adminStatus = checkAdminStatus()
    if (!adminStatus) {
      navigate('/')
    } else {
      // Simulate loading for a smoother transition
      setTimeout(() => {
        setLoading(false)
      }, 800)
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
      case 'urls':
        return <UrlManager />
      default:
        return <Dashboard />
    }
  }

  if (!isAdmin || loading) {
    return (
      <LoadingContainer>
        <Spinner />
        <LoadingText>Loading admin panel...</LoadingText>
      </LoadingContainer>
    )
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
