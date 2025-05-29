import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useQuiz } from '../context/QuizContext'

const HeaderContainer = styled.header`
  background-color: var(--background);
  box-shadow: var(--shadow-sm);
  padding: 1rem 0;
`

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: var(--font-serif);
  font-weight: 700;
  font-size: 1.5rem;
  color: var(--text);
  
  &:hover {
    color: var(--primary);
  }
`

const LogoIcon = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  background-color: var(--primary);
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  align-items: center;
`

const NavLink = styled(Link)`
  font-weight: 500;
  color: var(--text);
  
  &:hover {
    color: var(--primary);
  }
`

const StartButton = styled(Link)`
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  transition: background-color var(--transition);
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`

const RestartButton = styled.button`
  background-color: var(--primary-light);
  color: var(--primary);
  padding: 0.5rem 1.25rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  border: none;
  transition: all var(--transition);
  
  &:hover {
    background-color: var(--primary);
    color: white;
  }
`

function Header() {
  const { resetQuiz, quizCompleted } = useQuiz()
  
  const handleRestart = () => {
    resetQuiz()
  }
  
  return (
    <HeaderContainer>
      <div className="container">
        <HeaderContent>
          <Logo to="/">
            <LogoIcon>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="12" width="16" height="7" rx="1" fill="white"/>
                <rect x="6" y="6" width="12" height="6" rx="1" fill="#E2E8FF"/>
              </svg>
            </LogoIcon>
            SleepPerfect
          </Logo>
          
          <Nav>
            <NavLink to="/">Home</NavLink>
            {quizCompleted ? (
              <RestartButton onClick={handleRestart}>Restart Quiz</RestartButton>
            ) : (
              <StartButton to="/quiz">Start Quiz</StartButton>
            )}
          </Nav>
        </HeaderContent>
      </div>
    </HeaderContainer>
  )
}

export default Header
