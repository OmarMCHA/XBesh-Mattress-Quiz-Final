
import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'
import { 
  getMattresses, 
  updateMattress, 
  createMattress, 
  deleteMattress,
  initializeMattressData
} from '../../services/mattressService'

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

const MattressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const MattressCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const MattressImage = styled.div`
  height: 180px;
  background-image: url(${props => props.src || '/images/placeholder.svg'});
  background-size: cover;
  background-position: center;
  position: relative;
`

const MattressInfo = styled.div`
  padding: 1rem;
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

const CardActions = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 5px;
  z-index: 10;
`

const ActionButton = styled.button`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  background-color: rgba(255, 255, 255, 0.9);
  color: ${props => props.color || 'var(--text-dark)'};
  
  &:hover {
    background-color: white;
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
  border-radius: 4px;
  font-size: 0.9rem;
`

const RemoveButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  margin-left: 0.5rem;
  cursor: pointer;
  
  &:hover {
    background-color: #d32f2f;
  }
`

const AddItemButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  
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

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  margin-top: 1rem;
  margin-left: 1rem;
  
  &:hover {
    background-color: #d32f2f;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  margin-top: 1.5rem;
`

const ReviewsSection = styled.div`
  margin-top: 2rem;
  border-top: 1px solid #ddd;
  padding-top: 1.5rem;
`

const ReviewItem = styled.div`
  background-color: var(--background-alt);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  position: relative;
`

const ReviewHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
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

const ImagePreview = styled.div`
  margin-top: 0.5rem;
  width: 100%;
  height: 150px;
  background-image: url(${props => props.src || '/images/placeholder.svg'});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 1px solid #ddd;
`

function MattressManager() {
  const [mattresses, setMattresses] = useState([])
  const [selectedMattress, setSelectedMattress] = useState(null)
  const [editedMattress, setEditedMattress] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)
  const [mattressToDelete, setMattressToDelete] = useState(null)
  const [isCreating, setIsCreating] = useState(false)
  
  useEffect(() => {
    const init = async () => {
      setIsLoading(true);
      try {
        // First, ensure the database is initialized
        await initializeMattressData();
        
        // Then load the mattresses
        await loadMattresses();
      } catch (error) {
        console.error('Failed to initialize or load mattresses:', error);
        setErrorMessage('Failed to initialize or load mattresses. Using local data as fallback.');
        setShowError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    init();
  }, [])
  
  const loadMattresses = async () => {
    setIsLoading(true)
    try {
      const data = await getMattresses()
      if (data && data.length > 0) {
        console.log(`Loaded ${data.length} mattresses successfully`);
        console.log('Sample mattress data:', data[0]);
        setMattresses(data)
      } else {
        throw new Error('No mattresses returned from database');
      }
    } catch (error) {
      console.error('Failed to load mattresses:', error)
      setErrorMessage('Failed to load mattresses. Using local data as fallback.')
      setShowError(true)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleMattressClick = (mattress) => {
    console.log('Clicked mattress:', mattress);
    setSelectedMattress(mattress)
    setEditedMattress({...mattress})
    setIsModalOpen(true)
    setIsCreating(false)
  }
  
  const handleAddNewMattress = () => {
    const newMattress = {
      id: uuidv4(),
      name: "New Mattress",
      brand: "Brand Name",
      type: "Memory Foam",
      firmness: 5,
      price: 999,
      url: "",
      features: ["Feature 1", "Feature 2"],
      pros: ["Pro 1", "Pro 2"],
      cons: ["Con 1", "Con 2"],
      warranty: "10-year warranty",
      trialPeriod: "100-night trial",
      shipping: "Free shipping",
      returns: "Free returns",
      idealFor: ["Side sleepers", "Back sleepers"],
      description: "Description of the new mattress.",
      expertOpinion: "Expert opinion about the new mattress.",
      image: "https://images.pexels.com/photos/6186440/pexels-photo-6186440.jpeg",
      reviewCount: 0,
      rating: 5.0,
      reviews: [
        {
          stars: 5,
          title: "Sample Review",
          text: "This is a sample review for the new mattress.",
          author: "Sample User",
          date: new Date().toISOString().split('T')[0]
        }
      ]
    }
    
    setSelectedMattress(null)
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
    console.log(`Input changed: ${name} = ${value}`);
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
  
  const handleSave = async () => {
    setIsLoading(true)
    try {
      console.log('Saving mattress with image URL:', editedMattress.image);
      
      let savedMattress
      
      if (isCreating) {
        savedMattress = await createMattress(editedMattress)
      } else {
        savedMattress = await updateMattress(editedMattress)
      }
      
      if (savedMattress) {
        console.log('Saved mattress returned from API:', savedMattress);
        console.log('Saved image URL:', savedMattress.image);
        
        // Update the local state
        setMattresses(prev => {
          if (isCreating) {
            return [...prev, savedMattress]
          } else {
            return prev.map(mattress => 
              mattress.id === savedMattress.id ? savedMattress : mattress
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
        
        // Reload mattresses to ensure we have the latest data
        await loadMattresses()
      } else {
        throw new Error('Failed to save mattress')
      }
    } catch (error) {
      console.error('Error saving mattress:', error)
      setErrorMessage('Failed to save mattress. Changes may not persist across sessions.')
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleDeleteClick = (mattress, e) => {
    e.stopPropagation()
    setMattressToDelete(mattress)
    setShowConfirmDialog(true)
  }
  
  const handleConfirmDelete = async () => {
    if (!mattressToDelete) return
    
    setIsLoading(true)
    try {
      const success = await deleteMattress(mattressToDelete.id)
      
      if (success) {
        // Update the local state
        setMattresses(prev => prev.filter(m => m.id !== mattressToDelete.id))
        
        // Show success message
        setShowSuccess(true)
        setTimeout(() => {
          setShowSuccess(false)
        }, 5000)
        
        // Reload mattresses to ensure we have the latest data
        await loadMattresses()
      } else {
        throw new Error('Failed to delete mattress')
      }
    } catch (error) {
      console.error('Error deleting mattress:', error)
      setErrorMessage('Failed to delete mattress. Changes may not persist across sessions.')
      setShowError(true)
      setTimeout(() => {
        setShowError(false)
      }, 5000)
    } finally {
      setIsLoading(false)
      setShowConfirmDialog(false)
      setMattressToDelete(null)
    }
  }
  
  const handleCancelDelete = () => {
    setShowConfirmDialog(false)
    setMattressToDelete(null)
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
        <Title>Mattress Manager</Title>
        <AddButton onClick={handleAddNewMattress}>Add New Mattress</AddButton>
      </Header>
      
      <MattressGrid>
        {mattresses.map(mattress => (
          <MattressCard key={mattress.id} onClick={() => handleMattressClick(mattress)}>
            <MattressImage src={mattress.image}>
              <CardActions>
                <ActionButton 
                  color="#f44336" 
                  onClick={(e) => handleDeleteClick(mattress, e)}
                  title="Delete mattress"
                >
                  ×
                </ActionButton>
              </CardActions>
            </MattressImage>
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
      
      {isModalOpen && editedMattress && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <h2>{isCreating ? 'Add New Mattress' : 'Edit Mattress'}</h2>
            
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
                  type