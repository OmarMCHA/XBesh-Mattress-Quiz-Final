import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { quizQuestions } from '../../data/quizQuestions'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 1rem;
  font-size: 1.8rem;
  color: var(--text-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const AddButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const SearchContainer = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const SearchIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-light);
`

const QuestionList = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 2rem;
`

const QuestionItem = styled.div`
  padding: 1.2rem 1.5rem;
  border-bottom: 1px solid #eee;
  cursor: pointer;
  transition: background-color 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  ${props => props.hidden && `
    opacity: 0.6;
    background-color: #f9f9f9;
  `}
`

const QuestionInfo = styled.div`
  flex: 1;
`

const QuestionTitle = styled.div`
  font-weight: 500;
  color: var(--text-dark);
`

const QuestionId = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
  margin-top: 0.25rem;
`

const QuestionActions = styled.div`
  display: flex;
  gap: 0.5rem;
`

const EditButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const VisibilityButton = styled.button`
  background-color: ${props => props.hidden ? '#4caf50' : '#ff9800'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: ${props => props.hidden ? '#43a047' : '#f57c00'};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const Modal = styled.div`
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
  border-radius: 12px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`

const ModalTitle = styled.h2`
  margin: 0;
  color: var(--text-dark);
  font-size: 1.5rem;
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
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
`

const Checkbox = styled.input`
  margin-right: 0.5rem;
  width: 18px;
  height: 18px;
`

const OptionsContainer = styled.div`
  margin-top: 1.5rem;
`

const OptionHeader = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: var(--text-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const OptionCard = styled.div`
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  position: relative;
  border: 1px solid #eee;
  
  ${props => props.hidden && `
    opacity: 0.6;
    border: 1px dashed #ccc;
  `}
`

const OptionRemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const OptionVisibilityButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 3.5rem;
  background-color: ${props => props.hidden ? '#4caf50' : '#ff9800'};
  color: white;
  border: none;
  border-radius: 8px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.hidden ? '#43a047' : '#f57c00'};
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const AddOptionButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const SaveButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
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

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  margin-right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 1.5rem;
`

const EmptyState = styled.div`
  text-align: center;
  padding: 3rem;
  color: var(--text-light);
  
  svg {
    width: 64px;
    height: 64px;
    margin-bottom: 1rem;
    color: var(--text-light);
    opacity: 0.5;
  }
  
  h3 {
    margin-bottom: 0.5rem;
    color: var(--text-dark);
  }
  
  p {
    margin-bottom: 1.5rem;
  }
`

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1100;
`

const ConfirmationContent = styled.div`
  background-color: white;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`

const ConfirmationTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-dark);
`

const ConfirmationText = styled.p`
  margin-bottom: 2rem;
  color: var(--text-light);
`

const ConfirmationButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const CancelButton = styled.button`
  background-color: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #c0c0c0;
  }
`

const ConfirmButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background-color: #d32f2f;
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

function QuizEditor() {
  const [questions, setQuestions] = useState([])
  const [filteredQuestions, setFilteredQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [editedQuestion, setEditedQuestion] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    // Check if we have saved questions in localStorage
    const savedQuestions = localStorage.getItem('quizQuestions')
    if (savedQuestions) {
      const parsedQuestions = JSON.parse(savedQuestions)
      setQuestions(parsedQuestions)
      setFilteredQuestions(parsedQuestions)
    } else {
      // Use the imported data and add a hidden property to questions and options
      const questionsWithHidden = quizQuestions.map(question => ({
        ...question,
        hidden: false,
        options: question.options.map(option => ({
          ...option,
          hidden: false
        }))
      }))
      setQuestions(questionsWithHidden)
      setFilteredQuestions(questionsWithHidden)
      
      // Save to localStorage
      localStorage.setItem('quizQuestions', JSON.stringify(questionsWithHidden))
    }
  }, [])
  
  useEffect(() => {
    // Filter questions based on search term
    if (searchTerm) {
      const filtered = questions.filter(question => 
        question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.id.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredQuestions(filtered)
    } else {
      setFilteredQuestions(questions)
    }
  }, [searchTerm, questions])
  
  const handleEditQuestion = (question) => {
    setSelectedQuestion(question)
    setEditedQuestion({...question})
    setIsModalOpen(true)
    setIsCreating(false)
  }
  
  const handleAddQuestion = () => {
    // Create a new question template
    const newQuestion = {
      id: `question-${Date.now()}`,
      question: 'New Question',
      description: 'Question description goes here.',
      scientificNote: 'Scientific note goes here.',
      multiSelect: false,
      options: [
        {
          id: `option-${Date.now()}-1`,
          label: 'Option 1',
          description: 'Option description',
          image: '/images/placeholder.svg',
          hidden: false
        },
        {
          id: `option-${Date.now()}-2`,
          label: 'Option 2',
          description: 'Option description',
          image: '/images/placeholder.svg',
          hidden: false
        }
      ],
      hidden: false
    }
    
    setSelectedQuestion(newQuestion)
    setEditedQuestion(newQuestion)
    setIsModalOpen(true)
    setIsCreating(true)
  }
  
  const handleToggleQuestionVisibility = (e, question) => {
    e.stopPropagation()
    
    // Toggle visibility
    const updatedQuestions = questions.map(q => 
      q.id === question.id ? { ...q, hidden: !q.hidden } : q
    )
    
    setQuestions(updatedQuestions)
    
    // Save to localStorage
    localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions))
    
    // Show success message
    setSuccessMessage(
      question.hidden 
        ? `Question "${question.question}" is now visible` 
        : `Question "${question.question}" is now hidden`
    )
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedQuestion(null)
    setEditedQuestion(null)
    setIsCreating(false)
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedQuestion(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setEditedQuestion(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handleOptionChange = (index, field, value) => {
    setEditedQuestion(prev => {
      const newOptions = [...prev.options]
      newOptions[index] = {
        ...newOptions[index],
        [field]: value
      }
      return {
        ...prev,
        options: newOptions
      }
    })
  }
  
  const handleToggleOptionVisibility = (index) => {
    setEditedQuestion(prev => {
      const newOptions = [...prev.options]
      newOptions[index] = {
        ...newOptions[index],
        hidden: !newOptions[index].hidden
      }
      return {
        ...prev,
        options: newOptions
      }
    })
  }
  
  const handleAddOption = () => {
    setEditedQuestion(prev => ({
      ...prev,
      options: [
        ...prev.options,
        {
          id: `option-${Date.now()}`,
          label: 'New Option',
          description: 'Option description',
          image: '/images/placeholder.svg',
          hidden: false
        }
      ]
    }))
  }
  
  const handleRemoveOption = (index) => {
    setEditedQuestion(prev => {
      const newOptions = [...prev.options]
      newOptions.splice(index, 1)
      return {
        ...prev,
        options: newOptions
      }
    })
  }
  
  const handleDeleteClick = () => {
    setIsConfirmationOpen(true)
  }
  
  const handleCancelDelete = () => {
    setIsConfirmationOpen(false)
  }
  
  const handleConfirmDelete = () => {
    // Remove the question from the list
    const updatedQuestions = questions.filter(
      question => question.id !== selectedQuestion.id
    )
    
    setQuestions(updatedQuestions)
    
    // Save to localStorage
    localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions))
    
    // Close modals
    setIsConfirmationOpen(false)
    handleCloseModal()
    
    // Show success message
    setSuccessMessage('Question deleted successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  const handleSave = () => {
    let updatedQuestions
    
    if (isCreating) {
      // Add the new question to the list
      updatedQuestions = [...questions, editedQuestion]
    } else {
      // Update the existing question
      updatedQuestions = questions.map(question => 
        question.id === editedQuestion.id ? editedQuestion : question
      )
    }
    
    setQuestions(updatedQuestions)
    
    // Save to localStorage
    localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions))
    
    handleCloseModal()
    
    // Show success message
    setSuccessMessage(isCreating ? 'Question added successfully!' : 'Question updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  return (
    <Container>
      <Header>
        Quiz Editor
        <AddButton onClick={handleAddQuestion}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Question
        </AddButton>
      </Header>
      
      {successMessage && (
        <SuccessMessage>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {successMessage}
        </SuccessMessage>
      )}
      
      <SearchContainer>
        <SearchIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder="Search questions..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      
      {filteredQuestions.length > 0 ? (
        <QuestionList>
          {filteredQuestions.map(question => (
            <QuestionItem 
              key={question.id}
              hidden={question.hidden}
            >
              <QuestionInfo onClick={() => handleEditQuestion(question)}>
                <QuestionTitle>{question.question}</QuestionTitle>
                <QuestionId>ID: {question.id}</QuestionId>
              </QuestionInfo>
              <QuestionActions>
                <VisibilityButton 
                  hidden={question.hidden}
                  onClick={(e) => handleToggleQuestionVisibility(e, question)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    {question.hidden ? (
                      <>
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </>
                    ) : (
                      <>
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                        <line x1="1" y1="1" x2="23" y2="23"></line>
                      </>
                    )}
                  </svg>
                </VisibilityButton>
                <EditButton onClick={() => handleEditQuestion(question)}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                  </svg>
                  Edit
                </EditButton>
              </QuestionActions>
            </QuestionItem>
          ))}
        </QuestionList>
      ) : (
        <EmptyState>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="15" x2="16" y2="15"></line>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <h3>No questions found</h3>
          <p>Try adjusting your search or add a new question.</p>
          <AddButton onClick={handleAddQuestion}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Question
          </AddButton>
        </EmptyState>
      )}
      
      {isModalOpen && editedQuestion && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{isCreating ? 'Add New Question' : 'Edit Question'}</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Question ID</Label>
              <Input 
                type="text" 
                name="id" 
                value={editedQuestion.id} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Question Text</Label>
              <Input 
                type="text" 
                name="question" 
                value={editedQuestion.question} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Description</Label>
              <TextArea 
                name="description" 
                value={editedQuestion.description} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Scientific Note</Label>
              <TextArea 
                name="scientificNote" 
                value={editedQuestion.scientificNote} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <CheckboxContainer>
                <Checkbox 
                  type="checkbox" 
                  name="multiSelect" 
                  checked={editedQuestion.multiSelect || false} 
                  onChange={handleCheckboxChange} 
                  id="multiSelect"
                />
                <Label htmlFor="multiSelect" style={{ display: 'inline', marginBottom: 0 }}>
                  Allow Multiple Selections
                </Label>
              </CheckboxContainer>
            </FormGroup>
            
            <OptionsContainer>
              <OptionHeader>
                Options
                <AddOptionButton onClick={handleAddOption}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Option
                </AddOptionButton>
              </OptionHeader>
              
              {editedQuestion.options.map((option, index) => (
                <OptionCard key={index} hidden={option.hidden}>
                  <OptionRemoveButton onClick={() => handleRemoveOption(index)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </OptionRemoveButton>
                  
                  <OptionVisibilityButton 
                    hidden={option.hidden}
                    onClick={() => handleToggleOptionVisibility(index)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {option.hidden ? (
                        <>
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </>
                      ) : (
                        <>
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </>
                      )}
                    </svg>
                  </OptionVisibilityButton>
                  
                  <FormGroup>
                    <Label>Option ID</Label>
                    <Input 
                      type="text" 
                      value={option.id} 
                      onChange={(e) => handleOptionChange(index, 'id', e.target.value)} 
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Label</Label>
                    <Input 
                      type="text" 
                      value={option.label} 
                      onChange={(e) => handleOptionChange(index, 'label', e.target.value)} 
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Description</Label>
                    <Input 
                      type="text" 
                      value={option.description} 
                      onChange={(e) => handleOptionChange(index, 'description', e.target.value)} 
                    />
                  </FormGroup>
                  
                  <FormGroup>
                    <Label>Image URL</Label>
                    <Input 
                      type="text" 
                      value={option.image} 
                      onChange={(e) => handleOptionChange(index, 'image', e.target.value)} 
                    />
                  </FormGroup>
                </OptionCard>
              ))}
            </OptionsContainer>
            
            <ButtonGroup>
              {!isCreating && (
                <DeleteButton onClick={handleDeleteClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                  </svg>
                  Delete
                </DeleteButton>
              )}
              
              <SaveButton onClick={handleSave}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                {isCreating ? 'Add Question' : 'Save Changes'}
              </SaveButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
      
      {isConfirmationOpen && (
        <ConfirmationModal>
          <ConfirmationContent>
            <ConfirmationTitle>Delete Question</ConfirmationTitle>
            <ConfirmationText>
              Are you sure you want to delete "{selectedQuestion.question}"? This action cannot be undone.
            </ConfirmationText>
            <ConfirmationButtons>
              <CancelButton onClick={handleCancelDelete}>Cancel</CancelButton>
              <ConfirmButton onClick={handleConfirmDelete}>Delete</ConfirmButton>
            </ConfirmationButtons>
          </ConfirmationContent>
        </ConfirmationModal>
      )}
    </Container>
  )
}

export default QuizEditor
