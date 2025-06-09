import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: var(--text-dark);
`

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  max-width: 600px;
  margin: 0 auto;
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
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const PasswordContainer = styled.div`
  position: relative;
`

const TogglePasswordButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  color: var(--text-light);
  
  &:hover {
    color: var(--text-dark);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const SaveButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const SuccessMessage = styled.div`
  background-color: #4caf50;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    width: 20px;
    height: 20px;
  }
`

const ErrorMessage = styled.div`
  background-color: #f44336;
  color: white;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    width: 20px;
    height: 20px;
  }
`

const PasswordStrengthMeter = styled.div`
  margin-top: 0.5rem;
`

const StrengthBar = styled.div`
  height: 5px;
  background-color: #eee;
  border-radius: 5px;
  margin-bottom: 0.5rem;
  overflow: hidden;
`

const StrengthIndicator = styled.div`
  height: 100%;
  width: ${props => props.strength}%;
  background-color: ${props => {
    if (props.strength < 30) return '#f44336';
    if (props.strength < 60) return '#ff9800';
    return '#4caf50';
  }};
  transition: width 0.3s, background-color 0.3s;
`

const StrengthText = styled.div`
  font-size: 0.8rem;
  color: var(--text-light);
`

function PasswordManager() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordStrength, setPasswordStrength] = useState(0)
  
  // Check if admin password exists in localStorage
  useEffect(() => {
    const adminPassword = localStorage.getItem('adminPassword')
    if (!adminPassword) {
      // Set default password if none exists
      localStorage.setItem('adminPassword', 'admin123')
    }
  }, [])
  
  const calculatePasswordStrength = (password) => {
    if (!password) return 0
    
    let strength = 0
    
    // Length check
    if (password.length >= 8) strength += 20
    if (password.length >= 12) strength += 10
    
    // Character variety checks
    if (/[a-z]/.test(password)) strength += 10
    if (/[A-Z]/.test(password)) strength += 15
    if (/[0-9]/.test(password)) strength += 15
    if (/[^a-zA-Z0-9]/.test(password)) strength += 20
    
    // Variety of characters
    const uniqueChars = new Set(password).size
    strength += Math.min(uniqueChars * 2, 10)
    
    return Math.min(strength, 100)
  }
  
  const handleNewPasswordChange = (e) => {
    const password = e.target.value
    setNewPassword(password)
    setPasswordStrength(calculatePasswordStrength(password))
  }
  
  const getStrengthLabel = () => {
    if (passwordStrength < 30) return 'Weak'
    if (passwordStrength < 60) return 'Moderate'
    if (passwordStrength < 80) return 'Strong'
    return 'Very Strong'
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Clear previous messages
    setSuccessMessage('')
    setErrorMessage('')
    
    // Get stored password
    const storedPassword = localStorage.getItem('adminPassword')
    
    // Validate current password
    if (currentPassword !== storedPassword) {
      setErrorMessage('Current password is incorrect')
      return
    }
    
    // Validate new password
    if (newPassword.length < 6) {
      setErrorMessage('New password must be at least 6 characters long')
      return
    }
    
    // Validate password confirmation
    if (newPassword !== confirmPassword) {
      setErrorMessage('New passwords do not match')
      return
    }
    
    // Update password
    localStorage.setItem('adminPassword', newPassword)
    
    // Show success message
    setSuccessMessage('Password updated successfully')
    
    // Clear form
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
    setPasswordStrength(0)
  }
  
  return (
    <Container>
      <Header>Password Manager</Header>
      
      <Card>
        {successMessage && (
          <SuccessMessage>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
            {successMessage}
          </SuccessMessage>
        )}
        
        {errorMessage && (
          <ErrorMessage>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            {errorMessage}
          </ErrorMessage>
        )}
        
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>Current Password</Label>
            <PasswordContainer>
              <Input 
                type={showCurrentPassword ? 'text' : 'password'} 
                value={currentPassword} 
                onChange={(e) => setCurrentPassword(e.target.value)} 
                required 
              />
              <TogglePasswordButton 
                type="button" 
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showCurrentPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  )}
                </svg>
              </TogglePasswordButton>
            </PasswordContainer>
          </FormGroup>
          
          <FormGroup>
            <Label>New Password</Label>
            <PasswordContainer>
              <Input 
                type={showNewPassword ? 'text' : 'password'} 
                value={newPassword} 
                onChange={handleNewPasswordChange} 
                required 
              />
              <TogglePasswordButton 
                type="button" 
                onClick={() => setShowNewPassword(!showNewPassword)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showNewPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  )}
                </svg>
              </TogglePasswordButton>
            </PasswordContainer>
            
            <PasswordStrengthMeter>
              <StrengthBar>
                <StrengthIndicator strength={passwordStrength} />
              </StrengthBar>
              <StrengthText>
                Password Strength: {getStrengthLabel()}
              </StrengthText>
            </PasswordStrengthMeter>
          </FormGroup>
          
          <FormGroup>
            <Label>Confirm New Password</Label>
            <PasswordContainer>
              <Input 
                type={showConfirmPassword ? 'text' : 'password'} 
                value={confirmPassword} 
                onChange={(e) => setConfirmPassword(e.target.value)} 
                required 
              />
              <TogglePasswordButton 
                type="button" 
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {showConfirmPassword ? (
                    <>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </>
                  ) : (
                    <>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </>
                  )}
                </svg>
              </TogglePasswordButton>
            </PasswordContainer>
          </FormGroup>
          
          <SaveButton type="submit">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Update Password
          </SaveButton>
        </form>
      </Card>
    </Container>
  )
}

export default PasswordManager
