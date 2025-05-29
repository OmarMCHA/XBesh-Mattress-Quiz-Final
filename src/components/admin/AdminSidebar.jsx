import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const SidebarContainer = styled.div`
  width: 250px;
  background-color: var(--primary-dark);
  color: white;
  padding: 2rem 0;
  height: 100vh;
  position: sticky;
  top: 0;
  display: flex;
  flex-direction: column;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  padding: 0 1.5rem 2rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  margin-bottom: 2rem;
`

const NavItem = styled.div`
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  background-color: ${props => props.active ? 'rgba(255, 255, 255, 0.1)' : 'transparent'};
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

const NavIcon = styled.span`
  margin-right: 0.75rem;
  font-size: 1.2rem;
  width: 24px;
  text-align: center;
`

const LogoutButton = styled.div`
  margin-top: auto;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.2s;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`

function AdminSidebar({ activeSection, setActiveSection }) {
  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    window.location.href = '/'
  }

  return (
    <SidebarContainer>
      <Logo>Mattress Quiz Admin</Logo>
      
      <NavItem 
        active={activeSection === 'dashboard'} 
        onClick={() => setActiveSection('dashboard')}
      >
        <NavIcon>📊</NavIcon> Dashboard
      </NavItem>
      
      <NavItem 
        active={activeSection === 'mattresses'} 
        onClick={() => setActiveSection('mattresses')}
      >
        <NavIcon>🛏️</NavIcon> Mattress Manager
      </NavItem>
      
      <NavItem 
        active={activeSection === 'quiz'} 
        onClick={() => setActiveSection('quiz')}
      >
        <NavIcon>❓</NavIcon> Quiz Editor
      </NavItem>
      
      <NavItem 
        active={activeSection === 'theme'} 
        onClick={() => setActiveSection('theme')}
      >
        <NavIcon>🎨</NavIcon> Theme Editor
      </NavItem>
      
      <NavItem 
        active={activeSection === 'password'} 
        onClick={() => setActiveSection('password')}
      >
        <NavIcon>🔑</NavIcon> Password Manager
      </NavItem>
      
      <LogoutButton onClick={handleLogout}>
        <NavIcon>🚪</NavIcon> Logout
      </LogoutButton>
    </SidebarContainer>
  )
}

export default AdminSidebar
