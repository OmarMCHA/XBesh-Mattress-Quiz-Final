import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Card = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  padding: 3rem; /* Increased from 2.5rem to 3rem */
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    padding: 1.75rem;
  }
`

const QuestionHeader = styled.div`
  margin-bottom: 3rem; /* Increased from 2.5rem to 3rem */
`

const QuestionTitle = styled.h2`
  margin-bottom: 1.5rem; /* Increased from 1.25rem to 1.5rem */
  color: var(--text);
  font-size: 2rem; /* Increased from 1.85rem to 2rem */
  line-height: 1.3;
`

const QuestionDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 1.5rem; /* Increased from 1.25rem to 1.5rem */
  line-height: 1.6;
  font-size: 1.2rem; /* Increased from 1.15rem to 1.2rem */
`

const ScientificNote = styled.div`
  background-color: var(--primary-light);
  border-left: 4px solid var(--primary);
  padding: 1.75rem; /* Increased from 1.5rem to 1.75rem */
  border-radius: var(--radius-sm);
  margin-top: 1.75rem; /* Increased from 1.5rem to 1.75rem */
  font-size: 1.1rem; /* Increased from 1.05rem to 1.1rem */
  line-height: 1.6;
`

const OptionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); /* Increased from 220px to 250px */
  gap: 1.75rem; /* Increased from 1.5rem to 1.75rem */
  margin-bottom: 3rem; /* Increased from 2.5rem to 3rem */
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`

const OptionCard = styled.div`
  border: 2px solid ${props => props.selected ? 'var(--primary)' : 'var(--border)'};
  background-color: ${props => props.selected ? 'var(--primary-light)' : 'white'};
  border-radius: var(--radius-md);
  padding: 1.75rem; /* Increased from 1.5rem to 1.75rem */
  cursor: pointer;
  transition: all var(--transition);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  
  &:hover {
    border-color: var(--primary);
    transform: translateY(-2px);
  }
`

const OptionImage = styled.div`
  width: 120px; /* Increased from 100px to 120px */
  height: 120px; /* Increased from 100px to 120px */
  margin-bottom: 1.5rem; /* Increased from 1.25rem to 1.5rem */
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`

const OptionLabel = styled.h4`
  margin-bottom: 0.875rem; /* Increased from 0.75rem to 0.875rem */
  color: var(--text);
  font-size: 1.35rem; /* Increased from 1.25rem to 1.35rem */
`

const OptionDescription = styled.p`
  font-size: 1.1rem; /* Increased from 1rem to 1.1rem */
  color: var(--text-light);
  margin: 0;
  line-height: 1.5;
`

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 2.5rem; /* Increased from 2rem to 2.5rem */
`

const Button = styled.button`
  padding: 1rem 2rem; /* Increased from 0.875rem 1.75rem to 1rem 2rem */
  border-radius: var(--radius-md);
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all var(--transition);
  font-size: 1.15rem; /* Increased from 1.1rem to 1.15rem */
  white-space: nowrap;
`

const PrevButton = styled(Button)`
  background-color: var(--background-alt);
  color: var(--text);
  
  &:hover {
    background-color: var(--border);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const NextButton = styled(Button)`
  background-color: var(--primary);
  color: white;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

function QuestionCard({ question, answer, onAnswer, onNext, onPrev, isFirst, isLast }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  
  useEffect(() => {
    if (answer) {
      if (question.multiSelect) {
        setSelectedOptions(Array.isArray(answer) ? answer : [answer]);
      } else {
        setSelectedOptions([answer]);
      }
    } else {
      setSelectedOptions([]);
    }
  }, [answer, question.multiSelect]);
  
  const handleOptionClick = (optionId) => {
    let newSelectedOptions;
    
    if (question.multiSelect) {
      if (selectedOptions.includes(optionId)) {
        newSelectedOptions = selectedOptions.filter(id => id !== optionId);
      } else {
        newSelectedOptions = [...selectedOptions, optionId];
      }
    } else {
      newSelectedOptions = [optionId];
    }
    
    setSelectedOptions(newSelectedOptions);
    
    if (question.multiSelect) {
      onAnswer(question.id, newSelectedOptions);
    } else {
      onAnswer(question.id, optionId);
    }
  };
  
  const isOptionSelected = (optionId) => {
    return selectedOptions.includes(optionId);
  };
  
  const isNextDisabled = selectedOptions.length === 0;
  
  return (
    <Card>
      <QuestionHeader>
        <QuestionTitle>{question.question}</QuestionTitle>
        <QuestionDescription>{question.description}</QuestionDescription>
        {question.scientificNote && (
          <ScientificNote>
            <strong>Scientific Note:</strong> {question.scientificNote}
          </ScientificNote>
        )}
      </QuestionHeader>
      
      <OptionsGrid>
        {question.options.map(option => (
          <OptionCard 
            key={option.id} 
            selected={isOptionSelected(option.id)}
            onClick={() => handleOptionClick(option.id)}
          >
            <OptionImage>
              <img src={option.image} alt={option.label} />
            </OptionImage>
            <OptionLabel>{option.label}</OptionLabel>
            <OptionDescription>{option.description}</OptionDescription>
          </OptionCard>
        ))}
      </OptionsGrid>
      
      <ButtonContainer>
        <PrevButton onClick={onPrev} disabled={isFirst}>
          Previous
        </PrevButton>
        <NextButton onClick={onNext} disabled={isNextDisabled}>
          {isLast ? 'See Results' : 'Next Question'}
        </NextButton>
      </ButtonContainer>
    </Card>
  )
}

export default QuestionCard
