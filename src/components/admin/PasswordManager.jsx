import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: var(--text-dark);
`

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 500px;
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
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`

const ErrorMessage = styled.div`
  color: var(--danger);
  margin-top: 0.5rem;
  font-size: 0.9rem;
`

const SuccessMessage = styled.div`
  color: var(--success);
  margin-top: 0.5rem;
  font-size: 0.9rem;
`

function PasswordManager() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      setError('All fields are required')
      return
    }
    
    if (newPassword !== confirmPassword) {
      setError('New passwords do not match')
      return
    }
    
    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long')
      return
    }
    
    // In a real app, you would verify the current password and update to the new one
    // For this example, we'll just check if the current password is 'admin123'
    if (currentPassword !== 'admin123') {
      setError('Current password is incorrect')
      return
    }
    
    // Update the password in localStorage (in a real app, this would be done on the server)
    localStorage.setItem('adminPassword', newPassword)
    
    // Show success message
    setSuccess('Password updated successfully')
    
    // Clear form
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }
  
  return (
    <Container>
      <Header>Password Manager</Header>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Current Password</Label>
            <Input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>New Password</Label>
            <Input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Confirm New Password</Label>
            <Input 
              type="password" 
              value={confirmPassword} 
              onChange={(e) => setConfirmPassword(e.target.value)} 
            />
          </FormGroup>
          
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {success && <SuccessMessage>{success}</SuccessMessage>}
          
          <Button type="submit">Update Password</Button>
        </form>
      </Card>
    </Container>
  )
}

export default PasswordManager
