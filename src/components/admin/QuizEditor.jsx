import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { 
  getQuizQuestions, 
  updateQuizQuestion, 
  createQuizQuestion, 
  deleteQuizQuestion 
} from '../../services/quizService'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`

const Title = styled.h1`
  font-size: 1.8rem;
  color: var(--text-dark);
  margin: 0;
`

const AddButton = styled.button`
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

const QuestionList = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 2rem;
`

const QuestionItem = styled.div`
  padding: 1rem 1.5rem;
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

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`

const EditButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: #d32f2f;
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
  border-radius: 8px;
  width: 90%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
`

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
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

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`

const Checkbox = styled.input`
  margin-right: 0.5rem;
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
`

const OptionRemoveButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: #d32f2f;
  }
`

const AddOptionButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`

const SaveButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1.5rem;
`

const SuccessMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1100;
  animation: fadeOut 3s forwards;
  animation-delay: 2s;
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; visibility: hidden; }
  }
`

const ErrorMessage = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background-color: #f44336;
  color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  z-index: 1100;
  animation: fadeOut 3s forwards;
  animation-delay: 2s;
  
  @keyframes fadeOut {
    from { opacity: 1; }
    to { opacity: 0; visibility: hidden; }
  }
`

const ConfirmDialog = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
`

const ConfirmContent = styled.div`
  background-color: white;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  padding: 2rem;
  text-align: center;
`

const ConfirmTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-dark);
`

const ConfirmText = styled.p`
  margin-bottom: 2rem;
  color: var(--text-light);
`

const ConfirmButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`

const ConfirmButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  background-color: ${props => props.primary ? '#f44336' : '#f5f5f5'};
  color: ${props => props.primary ? 'white' : 'var(--text-dark)'};
  
  &:hover {
    background-color: ${props => props.primary ? '#d32f2f' : '#e0e0e0'};
  }
`

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1300;
`

const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-radius: 50%;
  border-top: 4px solid var(--primary);
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

function QuizEditor() {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [editedQuestion, setEditedQuestion] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [questionToDelete, setQuestionToDelete] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  
  useEffect(() => {
    loadQuestions()
  }, [])
  
  const loadQuestions = async () => {
    setIsLoading(true)
    try {
      const data = await getQuizQuestions()
      setQuestions(data || [])
    } catch (error) {
      console.error('Failed to load quiz questions:', error)
      setErrorMessage('Failed to load quiz questions. Using local data as fallback.')
      setShowError(true)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleEditQuestion = (question) => {
    setSelectedQuestion(question)
    setEditedQuestion({...question})
    setIsModalOpen(true)
    setIsCreating(false)
  }
  
  const handleAddNewQuestion = () => {
    const newQuestion = {
      id: uuidv4(),
      question: "New Question",
      description: "Description of the new question",
      scientificNote: "Scientific note for the new question",
      multiSelect: false,
      options: [
        {
          id: `option-${uuidv4()}`,
          label: "Option 1",
          description: "Description of option 1",
          image: "/images/placeholder.svg"
        },
        {
          id: `option-${uuidv4()}`,
          label: "Option 2",
          description: "Description of option 2",
          image: "/images/placeholder.svg"
        }
      ]
    }
    
    setSelectedQuestion(null)
    setEditedQuestion(newQuestion)
    setIsModalOpen(true)
    setIsCreating(true)
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
  
  const handleAddOption = () => {
    setEditedQuestion(prev => ({
      ...prev,
      options: [
        ...prev.options,
        {
          id: `option-${uuidv4()}`,
          label: 'New Option',
          description: 'Option description',
          image: '/images/placeholder.svg'
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
  
  const handleSave = async () => {
    setIsLoading(true)
    try {
      let savedQuestion
      
      if (isCreating) {
        savedQuestion = await createQuizQuestion(editedQuestion)
      } else {
        savedQuestion = await updateQuizQuestion(editedQuestion)
      }
      
      if (savedQuestion) {
        // Update the local state
        setQuestions(prev => {
          if (isCreating) {
            return [...prev, savedQuestion]
          } else {
            return prev.map(question => 
              question.id === savedQuestion.id ? savedQuestion : question
            )
          }
        })
        
        // Show success message
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
        
        // Close the modal
        handleCloseModal()
      } else {
        throw new Error('Failed to save question')
      }
    } catch (error) {
      console.error('Error saving question:', error)
      setErrorMessage('Failed to save question. Changes may not persist across sessions.')
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleDeleteClick = (question, e) => {
    e.stopPropagation()
    setQuestionToDelete(question)
    setShowConfirmDialog(true)
  }
  
  const handleConfirmDelete = async () => {
    if (!questionToDelete) return
    
    setIsLoading(true)
    try {
      const success = await deleteQuizQuestion(questionToDelete.id)
      
      if (success) {
        // Update the local state
        setQuestions(prev => prev.filter(q => q.id !== questionToDelete.id))
        
        // Show success message
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
      } else {
        throw new Error('Failed to delete question')
      }
    } catch (error) {
      console.error('Error deleting question:', error)
      setErrorMessage('Failed to delete question. Changes may not persist across sessions.')
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    } finally {
      setIsLoading(false)
      setShowConfirmDialog(false)
      setQuestionToDelete(null)
    }
  }
  
  const handleCancelDelete = () => {
    setShowConfirmDialog(false)
    setQuestionToDelete(null)
  }
  
  return (
    <Container>
      <Header>
        <Title>Quiz Editor</Title>
        <AddButton onClick={handleAddNewQuestion}>Add New Question</AddButton>
      </Header>
      
      <QuestionList>
        {questions.map(question => (
          <QuestionItem key={question.id}>
            <div>
              <QuestionTitle>{question.question}</QuestionTitle>
              <QuestionId>ID: {question.id}</QuestionId>
            </div>
            <ActionButtons>
              <EditButton onClick={() => handleEditQuestion(question)}>
                Edit
              </EditButton>
              <DeleteButton onClick={(e) => handleDeleteClick(question, e)}>
                Delete
              </DeleteButton>
            </ActionButtons>
          </QuestionItem>
        ))}
      </QuestionList>
      
      {isModalOpen && editedQuestion && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <h2>{isCreating ? 'Add New Question' : 'Edit Question'}</h2>
            
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
              <Label>
                <Checkbox 
                  type="checkbox" 
                  name="multiSelect" 
                  checked={editedQuestion.multiSelect || false} 
                  onChange={handleCheckboxChange} 
                />
                Allow Multiple Selections
              </Label>
            </FormGroup>
            
            <OptionsContainer>
              <OptionHeader>
                Options
                <AddOptionButton onClick={handleAddOption}>
                  Add Option
                </AddOptionButton>
              </OptionHeader>
              
              {editedQuestion.options.map((option, index) => (
                <OptionCard key={index}>
                  <OptionRemoveButton onClick={() => handleRemoveOption(index)}>
                    ×
                  </OptionRemoveButton>
                  
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
              <SaveButton onClick={handleSave}>
                {isCreating ? 'Create Question' : 'Save Changes'}
              </SaveButton>
              
              {!isCreating && (
                <DeleteButton onClick={() => {
                  setQuestionToDelete(editedQuestion)
                  setShowConfirmDialog(true)
                }}>
                  Delete Question
                </DeleteButton>
              )}
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
      
      {showConfirmDialog && (
        <ConfirmDialog>
          <ConfirmContent>
            <ConfirmTitle>Confirm Deletion</ConfirmTitle>
            <ConfirmText>
              Are you sure you want to delete the question "{questionToDelete?.question}"? 
              This action cannot be undone.
            </ConfirmText>
            <ConfirmButtons>
              <ConfirmButton onClick={handleCancelDelete}>Cancel</ConfirmButton>
              <ConfirmButton primary onClick={handleConfirmDelete}>Delete</ConfirmButton>
            </ConfirmButtons>
          </ConfirmContent>
        </ConfirmDialog>
      )}
      
      {showSuccess && (
        <SuccessMessage>
          Operation completed successfully!
        </SuccessMessage>
      )}
      
      {showError && (
        <ErrorMessage>
          {errorMessage}
        </ErrorMessage>
      )}
      
      {isLoading && (
        <LoadingOverlay>
          <Spinner />
        </LoadingOverlay>
      )}
    </Container>
  )
}

export default QuizEditor
