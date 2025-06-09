import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  width: 250px;
  background: linear-gradient(180deg, var(--primary-dark) 0%, var(--primary) 100%);
  color: white;
  padding: 2rem 0;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 10px rgba(0, 0, 0, 0.1);
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    width: 24px;
    height: 24px;
  }
`

const NavItem = styled.div`
  padding: 0.85rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;
  margin: 0.2rem 0;
  border-left: 4px solid transparent;
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  border-left-color: ${props => props.active ? 'white' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    border-left-color: rgba(255, 255, 255, 0.5);
  }
`

const NavIcon = styled.span`
  margin-right: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const NavText = styled.span`
  font-weight: ${props => props.active ? '500' : 'normal'};
`

const LogoutButton = styled.div`
  margin-top: auto;
  padding: 0.85rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  
  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.75rem;
  }
`

function AdminSidebar({ activeSection, setActiveSection }) {
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    window.location.href = '/'
  }

  return (
    <SidebarContainer>
      <Logo>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
        Mattress Quiz
      </Logo>
      
      <NavItem 
        active={activeSection === 'dashboard'} 
        onClick={() => setActiveSection('dashboard')}
      >
        <NavIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </NavIcon>
        <NavText active={activeSection === 'dashboard'}>Dashboard</NavText>
      </NavItem>
      
      <NavItem 
        active={activeSection === 'mattresses'} 
        onClick={() => setActiveSection('mattresses')}
      >
        <NavIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 7v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"></path>
            <path d="M16 3v4"></path>
            <path d="M8 3v4"></path>
            <path d="M3 11h18"></path>
            <path d="M3 9h18"></path>
          </svg>
        </NavIcon>
        <NavText active={activeSection === 'mattresses'}>Mattresses</NavText>
      </NavItem>
      
      <NavItem 
        active={activeSection === 'quiz'} 
        onClick={() => setActiveSection('quiz')}
      >
        <NavIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
        </NavIcon>
        <NavText active={activeSection === 'quiz'}>Quiz Editor</NavText>
      </NavItem>
      
      <NavItem 
        active={activeSection === 'urls'} 
        onClick={() => setActiveSection('urls')}
      >
        <NavIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
        </NavIcon>
        <NavText active={activeSection === 'urls'}>URL Manager</NavText>
      </NavItem>
      
      <NavItem 
        active={activeSection === 'theme'} 
        onClick={() => setActiveSection('theme')}
      >
        <NavIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </NavIcon>
        <NavText active={activeSection === 'theme'}>Theme</NavText>
      </NavItem>
      
      <NavItem 
        active={activeSection === 'password'} 
        onClick={() => setActiveSection('password')}
      >
        <NavIcon>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
        </NavIcon>
        <NavText active={activeSection === 'password'}>Password</NavText>
      </NavItem>
      
      <LogoutButton onClick={handleLogout}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
          <polyline points="16 17 21 12 16 7"></polyline>
          <line x1="21" y1="12" x2="9" y2="12"></line>
        </svg>
        Logout
      </LogoutButton>
    </SidebarContainer>
  )
}

export default AdminSidebar
