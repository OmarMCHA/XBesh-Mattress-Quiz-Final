import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 2rem;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`

const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5rem;
  color: var(--text-dark);
`

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-light);
  
  &:hover {
    color: var(--text-dark);
  }
`

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-dark);
`

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`

const Button = styled.button`
  width: 100%;
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`

const ErrorMessage = styled.div`
  color: var(--danger);
  margin-bottom: 1rem;
  font-size: 0.9rem;
`

function AdminLogin({ isOpen, onClose }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    
    // Check if password is correct
    // In a real app, you would verify this against a secure backend
    // For this example, we'll use a hardcoded password 'admin123'
    const correctPassword = localStorage.getItem('adminPassword') || 'admin123'
    
    if (password === correctPassword) {
      // Set authentication in localStorage
      localStorage.setItem('adminAuthenticated', 'true')
      
      // Close modal and navigate to admin page
      onClose()
      navigate('/admin')
    } else {
      setError('Incorrect password')
    }
  }
  
  if (!isOpen) return null
  
  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <ModalHeader>
          <ModalTitle>Admin Login</ModalTitle>
          <CloseButton onClick={onClose}>×</CloseButton>
        </ModalHeader>
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Password</Label>
            <Input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              placeholder="Enter admin password"
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          
          <Button type="submit">Login</Button>
        </form>
      </ModalContent>
    </ModalOverlay>
  )
}

export default AdminLogin
