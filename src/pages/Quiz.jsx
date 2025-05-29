import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { useQuiz } from '../context/QuizContext'
import ProgressBar from '../components/ProgressBar'
import QuestionCard from '../components/QuestionCard'

const QuizContainer = styled.div`
  max-width: 1100px; /* Increased from 900px to 1100px for more width */
  margin: 2rem auto 3rem;
  padding: 0 2rem; /* Increased horizontal padding for better spacing */
  
  @media (max-width: 768px) {
    margin: 1.5rem auto 3rem;
    padding: 0 1rem;
  }
`

const QuizHeader = styled.div`
  text-align: center;
  margin-bottom: 2.5rem;
`

const QuizTitle = styled.h1`
  margin-bottom: 1.25rem;
  font-size: 2.5rem;
`

const QuizDescription = styled.p`
  color: var(--text-light);
  font-size: 1.2rem;
  max-width: 800px; /* Increased from 700px to 800px */
  margin: 0 auto;
  line-height: 1.6;
`

function Quiz() {
  const navigate = useNavigate()
  const { 
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    quizCompleted,
    handleAnswer,
    nextQuestion,
    prevQuestion
  } = useQuiz()
  
  useEffect(() => {
    if (quizCompleted) {
      navigate('/results')
    }
  }, [quizCompleted, navigate])
  
  return (
    <QuizContainer>
      <QuizHeader>
        <QuizTitle>Mattress Firmness Quiz</QuizTitle>
        <QuizDescription>
          Answer the following questions to find your ideal mattress firmness and type.
        </QuizDescription>
      </QuizHeader>
      
      <ProgressBar 
        current={currentQuestionIndex}
        total={totalQuestions}
        progress={progress}
      />
      
      <QuestionCard 
        question={currentQuestion}
        answer={answers[currentQuestion.id]}
        onAnswer={handleAnswer}
        onNext={nextQuestion}
        onPrev={prevQuestion}
        isFirst={currentQuestionIndex === 0}
        isLast={currentQuestionIndex === totalQuestions - 1}
      />
    </QuizContainer>
  )
}

export default Quiz
