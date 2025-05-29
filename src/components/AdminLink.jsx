import React, { useState } from 'react'
import styled from 'styled-components'
import AdminLogin from './AdminLogin'

const LinkContainer = styled.div`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 100;
`

const AdminButton = styled.button`
  background: none;
  border: none;
  color: var(--text-light);
  font-size: 0.8rem;
  text-decoration: underline;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  
  &:hover {
    opacity: 1;
  }
`

function AdminLink() {
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  
  return (
    <LinkContainer>
      <AdminButton onClick={() => setIsLoginOpen(true)}>
        Admin
      </AdminButton>
      
      <AdminLogin 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
      />
    </LinkContainer>
  )
}

export default AdminLink
