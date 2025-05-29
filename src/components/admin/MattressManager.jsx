import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mattressData } from '../../data/mattressData'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: var(--text-dark);
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
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`

const MattressImage = styled.div`
  height: 180px;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center;
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

const AddButton = styled.button`
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

function MattressManager() {
  const [mattresses, setMattresses] = useState([])
  const [selectedMattress, setSelectedMattress] = useState(null)
  const [editedMattress, setEditedMattress] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  useEffect(() => {
    // In a real app, you would fetch this from your backend
    setMattresses(mattressData)
  }, [])
  
  const handleMattressClick = (mattress) => {
    setSelectedMattress(mattress)
    setEditedMattress({...mattress})
    setIsModalOpen(true)
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedMattress(null)
    setEditedMattress(null)
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
  
  const handleSave = () => {
    // In a real app, you would send this to your backend
    setMattresses(prev => 
      prev.map(mattress => 
        mattress.id === editedMattress.id ? editedMattress : mattress
      )
    )
    handleCloseModal()
    
    // Show success message
    alert('Mattress updated successfully!')
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
      <Header>Mattress Manager</Header>
      
      <MattressGrid>
        {mattresses.map(mattress => (
          <MattressCard key={mattress.id} onClick={() => handleMattressClick(mattress)}>
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
      
      {isModalOpen && editedMattress && (
        <Modal>
          <ModalContent>
            <CloseButton onClick={handleCloseModal}>×</CloseButton>
            <h2>Edit Mattress</h2>
            
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
                      Remove
                    </RemoveButton>
                  </ArrayItem>
                ))}
                <AddButton onClick={() => handleAddArrayItem('features')}>
                  Add Feature
                </AddButton>
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
                      Remove
                    </RemoveButton>
                  </ArrayItem>
                ))}
                <AddButton onClick={() => handleAddArrayItem('pros')}>
                  Add Pro
                </AddButton>
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
                      Remove
                    </RemoveButton>
                  </ArrayItem>
                ))}
                <AddButton onClick={() => handleAddArrayItem('cons')}>
                  Add Con
                </AddButton>
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
                      Remove
                    </RemoveButton>
                  </ArrayItem>
                ))}
                <AddButton onClick={() => handleAddArrayItem('idealFor')}>
                  Add Ideal For
                </AddButton>
              </ArrayInput>
            </FormGroup>
            
            <ReviewsSection>
              <h3>Reviews</h3>
              {editedMattress.reviews && editedMattress.reviews.map((review, index) => (
                <ReviewItem key={index}>
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
                  
                  <RemoveButton onClick={() => handleRemoveReview(index)}>
                    Remove Review
                  </RemoveButton>
                </ReviewItem>
              ))}
              <AddButton onClick={handleAddReview}>
                Add Review
              </AddButton>
            </ReviewsSection>
            
            <SaveButton onClick={handleSave}>Save Changes</SaveButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  )
}

export default MattressManager
