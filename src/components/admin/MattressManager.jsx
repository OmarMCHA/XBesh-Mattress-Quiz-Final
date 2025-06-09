import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mattressData } from '../../data/mattressData'

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

const MattressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const MattressCard = styled.div`
  background-color: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
  
  ${props => props.hidden && `
    opacity: 0.6;
    &:before {
      content: 'HIDDEN';
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 0.3rem 0.6rem;
      border-radius: 4px;
      font-size: 0.7rem;
      z-index: 1;
    }
  `}
`

const MattressImage = styled.div`
  height: 180px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
`

const MattressInfo = styled.div`
  padding: 1.2rem;
`

const MattressName = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--text-dark);
`

const MattressBrand = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`

const MattressType = styled.div`
  font-size: 0.9rem;
  color: var(--text-light);
`

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
`

const Stars = styled.div`
  display: flex;
  color: #FFB900;
  margin-right: 0.5rem;
`

const ReviewCount = styled.span`
  color: var(--text-light);
  font-size: 0.9rem;
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

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
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

const ArrayInput = styled.div`
  margin-top: 0.5rem;
`

const ArrayItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`

const ArrayItemInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  transition: border-color 0.2s;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background-color: #d32f2f;
  }
  
  svg {
    width: 16px;
    height: 16px;
  }
`

const AddItemButton = styled.button`
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

const ToggleVisibilityButton = styled.button`
  background-color: ${props => props.hidden ? '#4caf50' : '#ff9800'};
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
    background-color: ${props => props.hidden ? '#43a047' : '#f57c00'};
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

const ReviewsSection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #eee;
  padding-top: 1.5rem;
`

const ReviewItem = styled.div`
  background-color: var(--background-alt);
  border-radius: 8px;
  padding: 1.2rem;
  margin-bottom: 1rem;
  position: relative;
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`

const ReviewTitle = styled.h4`
  margin: 0;
  font-size: 1.1rem;
`

const ReviewAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-light);
`

const ReviewText = styled.p`
  margin: 0.5rem 0 0;
  font-size: 0.95rem;
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

function MattressManager() {
  const [mattresses, setMattresses] = useState([])
  const [filteredMattresses, setFilteredMattresses] = useState([])
  const [selectedMattress, setSelectedMattress] = useState(null)
  const [editedMattress, setEditedMattress] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    // Check if we have saved mattresses in localStorage
    const savedMattresses = localStorage.getItem('mattresses')
    if (savedMattresses) {
      const parsedMattresses = JSON.parse(savedMattresses)
      setMattresses(parsedMattresses)
      setFilteredMattresses(parsedMattresses)
    } else {
      // Use the imported data and add a hidden property
      const mattressesWithHidden = mattressData.map(mattress => ({
        ...mattress,
        hidden: false
      }))
      setMattresses(mattressesWithHidden)
      setFilteredMattresses(mattressesWithHidden)
      
      // Save to localStorage
      localStorage.setItem('mattresses', JSON.stringify(mattressesWithHidden))
    }
  }, [])
  
  useEffect(() => {
    // Filter mattresses based on search term
    if (searchTerm) {
      const filtered = mattresses.filter(mattress => 
        mattress.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mattress.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mattress.type.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredMattresses(filtered)
    } else {
      setFilteredMattresses(mattresses)
    }
  }, [searchTerm, mattresses])
  
  const handleMattressClick = (mattress) => {
    setSelectedMattress(mattress)
    setEditedMattress({...mattress})
    setIsModalOpen(true)
    setIsCreating(false)
  }
  
  const handleAddMattress = () => {
    // Create a new mattress template
    const newMattress = {
      id: `mattress-${Date.now()}`,
      name: 'New Mattress',
      brand: 'Brand Name',
      type: 'Memory Foam',
      firmness: 5,
      price: 999,
      url: 'https://example.com',
      image: 'https://via.placeholder.com/400x300',
      warranty: '10 years',
      trialPeriod: '100 nights',
      shipping: 'Free shipping',
      returns: 'Free returns',
      rating: 4.5,
      reviewCount: 0,
      description: 'Mattress description goes here.',
      expertOpinion: 'Expert opinion goes here.',
      features: ['Feature 1', 'Feature 2', 'Feature 3'],
      pros: ['Pro 1', 'Pro 2', 'Pro 3'],
      cons: ['Con 1', 'Con 2'],
      idealFor: ['Side sleepers', 'Back pain sufferers'],
      reviews: [],
      hidden: false
    }
    
    setSelectedMattress(newMattress)
    setEditedMattress(newMattress)
    setIsModalOpen(true)
    setIsCreating(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMattress(null)
    setEditedMattress(null)
    setIsCreating(false)
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setEditedMattress(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleNumberChange = (e) => {
    const { name, value } = e.target
    setEditedMattress(prev => ({
      ...prev,
      [name]: parseFloat(value)
    }))
  }
  
  const handleArrayItemChange = (arrayName, index, value) => {
    setEditedMattress(prev => {
      const newArray = [...prev[arrayName]]
      newArray[index] = value
      return {
        ...prev,
        [arrayName]: newArray
      }
    })
  }
  
  const handleAddArrayItem = (arrayName) => {
    setEditedMattress(prev => ({
      ...prev,
      [arrayName]: [...prev[arrayName], '']
    }))
  }
  
  const handleRemoveArrayItem = (arrayName, index) => {
    setEditedMattress(prev => {
      const newArray = [...prev[arrayName]]
      newArray.splice(index, 1)
      return {
        ...prev,
        [arrayName]: newArray
      }
    })
  }
  
  const handleReviewChange = (index, field, value) => {
    setEditedMattress(prev => {
      const newReviews = [...prev.reviews]
      newReviews[index] = {
        ...newReviews[index],
        [field]: field === 'stars' ? parseInt(value) : value
      }
      return {
        ...prev,
        reviews: newReviews
      }
    })
  }
  
  const handleAddReview = () => {
    setEditedMattress(prev => ({
      ...prev,
      reviews: [
        ...prev.reviews,
        {
          stars: 5,
          title: '',
          text: '',
          author: '',
          date: new Date().toISOString().split('T')[0]
        }
      ]
    }))
  }
  
  const handleRemoveReview = (index) => {
    setEditedMattress(prev => {
      const newReviews = [...prev.reviews]
      newReviews.splice(index, 1)
      return {
        ...prev,
        reviews: newReviews
      }
    })
  }
  
  const handleToggleVisibility = () => {
    setEditedMattress(prev => ({
      ...prev,
      hidden: !prev.hidden
    }))
  }
  
  const handleDeleteClick = () => {
    setIsConfirmationOpen(true)
  }
  
  const handleCancelDelete = () => {
    setIsConfirmationOpen(false)
  }
  
  const handleConfirmDelete = () => {
    // Remove the mattress from the list
    const updatedMattresses = mattresses.filter(
      mattress => mattress.id !== selectedMattress.id
    )
    
    setMattresses(updatedMattresses)
    
    // Save to localStorage
    localStorage.setItem('mattresses', JSON.stringify(updatedMattresses))
    
    // Close modals
    setIsConfirmationOpen(false)
    handleCloseModal()
    
    // Show success message
    setSuccessMessage('Mattress deleted successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  const handleSave = () => {
    let updatedMattresses
    
    if (isCreating) {
      // Add the new mattress to the list
      updatedMattresses = [...mattresses, editedMattress]
    } else {
      // Update the existing mattress
      updatedMattresses = mattresses.map(mattress => 
        mattress.id === editedMattress.id ? editedMattress : mattress
      )
    }
    
    setMattresses(updatedMattresses)
    
    // Save to localStorage
    localStorage.setItem('mattresses', JSON.stringify(updatedMattresses))
    
    handleCloseModal()
    
    // Show success message
    setSuccessMessage(isCreating ? 'Mattress added successfully!' : 'Mattress updated successfully!')
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  // Generate star rating
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={`full-${i}`}>★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half">★</span>);
    }
    
    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<span key={`empty-${i}`} style={{ opacity: 0.3 }}>★</span>);
    }
    
    return stars;
  };
  
  // Format review count
  const formatReviewCount = (count) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k reviews`;
    }
    return `${count} reviews`;
  };
  
  return (
    <Container>
      <Header>
        Mattress Manager
        <AddButton onClick={handleAddMattress}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Mattress
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
          placeholder="Search mattresses..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      
      {filteredMattresses.length > 0 ? (
        <MattressGrid>
          {filteredMattresses.map(mattress => (
            <MattressCard 
              key={mattress.id} 
              onClick={() => handleMattressClick(mattress)}
              hidden={mattress.hidden}
            >
              <MattressImage src={mattress.image} />
              <MattressInfo>
                <MattressName>{mattress.name}</MattressName>
                <MattressBrand>{mattress.brand}</MattressBrand>
                <MattressType>{mattress.type}</MattressType>
                {mattress.rating && (
                  <RatingContainer>
                    <Stars>{renderStars(mattress.rating)}</Stars>
                    <ReviewCount>{mattress.rating.toFixed(1)} ({formatReviewCount(mattress.reviewCount)})</ReviewCount>
                  </RatingContainer>
                )}
              </MattressInfo>
            </MattressCard>
          ))}
        </MattressGrid>
      ) : (
        <EmptyState>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"></rect>
            <path d="M2 8h20"></path>
            <path d="M6 16h.01"></path>
            <path d="M10 16h.01"></path>
            <path d="M14 16h.01"></path>
            <path d="M18 16h.01"></path>
          </svg>
          <h3>No mattresses found</h3>
          <p>Try adjusting your search or add a new mattress.</p>
          <AddButton onClick={handleAddMattress}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add Mattress
          </AddButton>
        </EmptyState>
      )}
      
      {isModalOpen && editedMattress && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>{isCreating ? 'Add New Mattress' : 'Edit Mattress'}</ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            
            <FormGrid>
              <FormGroup>
                <Label>Name</Label>
                <Input 
                  type="text" 
                  name="name" 
                  value={editedMattress.name} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Brand</Label>
                <Input 
                  type="text" 
                  name="brand" 
                  value={editedMattress.brand} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Type</Label>
                <Input 
                  type="text" 
                  name="type" 
                  value={editedMattress.type} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Firmness (1-10)</Label>
                <Input 
                  type="number" 
                  name="firmness" 
                  min="1" 
                  max="10" 
                  step="0.1" 
                  value={editedMattress.firmness} 
                  onChange={handleNumberChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Price (USD)</Label>
                <Input 
                  type="number" 
                  name="price" 
                  value={editedMattress.price} 
                  onChange={handleNumberChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>URL</Label>
                <Input 
                  type="text" 
                  name="url" 
                  value={editedMattress.url} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Image URL</Label>
                <Input 
                  type="text" 
                  name="image" 
                  value={editedMattress.image} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Warranty</Label>
                <Input 
                  type="text" 
                  name="warranty" 
                  value={editedMattress.warranty} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Trial Period</Label>
                <Input 
                  type="text" 
                  name="trialPeriod" 
                  value={editedMattress.trialPeriod} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Shipping</Label>
                <Input 
                  type="text" 
                  name="shipping" 
                  value={editedMattress.shipping} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Returns</Label>
                <Input 
                  type="text" 
                  name="returns" 
                  value={editedMattress.returns} 
                  onChange={handleInputChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Rating (1-5)</Label>
                <Input 
                  type="number" 
                  name="rating" 
                  min="1" 
                  max="5" 
                  step="0.1" 
                  value={editedMattress.rating} 
                  onChange={handleNumberChange} 
                />
              </FormGroup>
              
              <FormGroup>
                <Label>Review Count</Label>
                <Input 
                  type="number" 
                  name="reviewCount" 
                  value={editedMattress.reviewCount} 
                  onChange={handleNumberChange} 
                />
              </FormGroup>
            </FormGrid>
            
            <FormGroup>
              <Label>Description</Label>
              <TextArea 
                name="description" 
                value={editedMattress.description} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Expert Opinion</Label>
              <TextArea 
                name="expertOpinion" 
                value={editedMattress.expertOpinion} 
                onChange={handleInputChange} 
              />
            </FormGroup>
            
            <FormGroup>
              <Label>Features</Label>
              <ArrayInput>
                {editedMattress.features.map((feature, index) => (
                  <ArrayItem key={index}>
                    <ArrayItemInput 
                      type="text" 
                      value={feature} 
                      onChange={(e) => handleArrayItemChange('features', index, e.target.value)} 
                    />
                    <RemoveButton onClick={() => handleRemoveArrayItem('features', index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </RemoveButton>
                  </ArrayItem>
                ))}
                <AddItemButton onClick={() => handleAddArrayItem('features')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Feature
                </AddItemButton>
              </ArrayInput>
            </FormGroup>
            
            <FormGroup>
              <Label>Pros</Label>
              <ArrayInput>
                {editedMattress.pros.map((pro, index) => (
                  <ArrayItem key={index}>
                    <ArrayItemInput 
                      type="text" 
                      value={pro} 
                      onChange={(e) => handleArrayItemChange('pros', index, e.target.value)} 
                    />
                    <RemoveButton onClick={() => handleRemoveArrayItem('pros', index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </RemoveButton>
                  </ArrayItem>
                ))}
                <AddItemButton onClick={() => handleAddArrayItem('pros')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Pro
                </AddItemButton>
              </ArrayInput>
            </FormGroup>
            
            <FormGroup>
              <Label>Cons</Label>
              <ArrayInput>
                {editedMattress.cons.map((con, index) => (
                  <ArrayItem key={index}>
                    <ArrayItemInput 
                      type="text" 
                      value={con} 
                      onChange={(e) => handleArrayItemChange('cons', index, e.target.value)} 
                    />
                    <RemoveButton onClick={() => handleRemoveArrayItem('cons', index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </RemoveButton>
                  </ArrayItem>
                ))}
                <AddItemButton onClick={() => handleAddArrayItem('cons')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Con
                </AddItemButton>
              </ArrayInput>
            </FormGroup>
            
            <FormGroup>
              <Label>Ideal For</Label>
              <ArrayInput>
                {editedMattress.idealFor.map((ideal, index) => (
                  <ArrayItem key={index}>
                    <ArrayItemInput 
                      type="text" 
                      value={ideal} 
                      onChange={(e) => handleArrayItemChange('idealFor', index, e.target.value)} 
                    />
                    <RemoveButton onClick={() => handleRemoveArrayItem('idealFor', index)}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                      </svg>
                    </RemoveButton>
                  </ArrayItem>
                ))}
                <AddItemButton onClick={() => handleAddArrayItem('idealFor')}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                  Add Ideal For
                </AddItemButton>
              </ArrayInput>
            </FormGroup>
            
            <ReviewsSection>
              <h3>Reviews</h3>
              {editedMattress.reviews && editedMattress.reviews.map((review, index) => (
                <ReviewItem key={index}>
                  <RemoveButton 
                    onClick={() => handleRemoveReview(index)}
                    style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </RemoveButton>
                  
                  <ReviewHeader>
                    <FormGroup>
                      <Label>Title</Label>
                      <Input 
                        type="text" 
                        value={review.title} 
                        onChange={(e) => handleReviewChange(index, 'title', e.target.value)} 
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Stars (1-5)</Label>
                      <Input 
                        type="number" 
                        min="1" 
                        max="5" 
                        value={review.stars} 
                        onChange={(e) => handleReviewChange(index, 'stars', e.target.value)} 
                        style={{ width: '80px' }}
                      />
                    </FormGroup>
                  </ReviewHeader>
                  
                  <ReviewAuthor>
                    <FormGroup>
                      <Label>Author</Label>
                      <Input 
                        type="text" 
                        value={review.author} 
                        onChange={(e) => handleReviewChange(index, 'author', e.target.value)} 
                      />
                    </FormGroup>
                    <FormGroup>
                      <Label>Date</Label>
                      <Input 
                        type="date" 
                        value={review.date} 
                        onChange={(e) => handleReviewChange(index, 'date', e.target.value)} 
                      />
                    </FormGroup>
                  </ReviewAuthor>
                  
                  <FormGroup>
                    <Label>Review Text</Label>
                    <TextArea 
                      value={review.text} 
                      onChange={(e) => handleReviewChange(index, 'text', e.target.value)} 
                    />
                  </FormGroup>
                </ReviewItem>
              ))}
              <AddItemButton onClick={handleAddReview}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add Review
              </AddItemButton>
            </ReviewsSection>
            
            <ButtonGroup>
              {!isCreating && (
                <>
                  <DeleteButton onClick={handleDeleteClick}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                    Delete
                  </DeleteButton>
                  
                  <ToggleVisibilityButton 
                    hidden={editedMattress.hidden}
                    onClick={handleToggleVisibility}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {editedMattress.hidden ? (
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
                    {editedMattress.hidden ? 'Show Mattress' : 'Hide Mattress'}
                  </ToggleVisibilityButton>
                </>
              )}
              
              <SaveButton onClick={handleSave}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                {isCreating ? 'Add Mattress' : 'Save Changes'}
              </SaveButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
      
      {isConfirmationOpen && (
        <ConfirmationModal>
          <ConfirmationContent>
            <ConfirmationTitle>Delete Mattress</ConfirmationTitle>
            <ConfirmationText>
              Are you sure you want to delete "{selectedMattress.name}"? This action cannot be undone.
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

export default MattressManager
