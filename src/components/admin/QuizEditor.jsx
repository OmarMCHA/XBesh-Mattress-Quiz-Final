import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { quizQuestions } from '../../data/quizQuestions'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: var(--text-dark);
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

function QuizEditor() {
  const [questions, setQuestions] = useState([])
  const [selectedQuestion, setSelectedQuestion] = useState(null)
  const [editedQuestion, setEditedQuestion] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    setQuestions(quizQuestions)
  }, [])
  
  const handleEditQuestion = (question) => {
    setSelectedQuestion(question)
    setEditedQuestion({...question})
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedQuestion(null)
    setEditedQuestion(null)
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
          id: `option-${Date.now()}`,
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
  
  const handleSave = () => {
    // In a real app, you would send this to your backend
    setQuestions(prev => 
      prev.map(question => 
        question.id === editedQuestion.id ? editedQuestion : question
      )
    )
    handleCloseModal()
    
    // Show success message
    alert('Question updated successfully!')
  }
  
  return (
    <Container>
      <Header>Quiz Editor</Header>
      
      <QuestionList>
        {questions.map(question => (
          <QuestionItem key={question.id}>
            <div>
              <QuestionTitle>{question.question}</QuestionTitle>
              <QuestionId>ID: {question.id}</QuestionId>
            </div>
            <EditButton onClick={() => handleEditQuestion(question)}>
              Edit
            </EditButton>
          </QuestionItem>
        ))}
      </QuestionList>
      
      {isModalOpen && editedQuestion && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <h2>Edit Question</h2>
            
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
            
            <SaveButton onClick={handleSave}>Save Changes</SaveButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default QuizEditor
