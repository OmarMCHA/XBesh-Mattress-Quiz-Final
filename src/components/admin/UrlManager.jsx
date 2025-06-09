import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import UrlManagerGuide from './UrlManagerGuide'
import { mattressData } from '../../data/mattressData'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 1.5rem;
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

const TabsContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
  border-bottom: 1px solid #ddd;
`

const Tab = styled.button`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  border-bottom: 3px solid ${props => props.active ? 'var(--primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--primary)' : 'var(--text-light)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    color: var(--primary);
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

const UrlTable = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  margin-bottom: 2rem;
`

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 1rem 1.5rem;
  background-color: #f9f9f9;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  color: var(--text-dark);
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
`

const TableHeaderCell = styled.div`
  &:last-child {
    text-align: right;
  }
  
  @media (max-width: 768px) {
    &:nth-child(3) {
      display: none;
    }
  }
`

const UrlItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 1fr 1fr;
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #eee;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #f9f9f9;
  }
  
  &:last-child {
    border-bottom: none;
  }
  
  ${props => props.active ? `
    background-color: rgba(67, 97, 238, 0.05);
  ` : ''}
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr 2fr 1fr;
  }
`

const UrlName = styled.div`
  font-weight: 500;
  color: var(--text-dark);
`

const UrlLink = styled.div`
  color: var(--primary);
  word-break: break-all;
  
  a {
    color: inherit;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
`

const UrlType = styled.div`
  color: var(--text-light);
  
  @media (max-width: 768px) {
    display: none;
  }
`

const UrlActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`

const ActionButton = styled.button`
  background-color: ${props => props.color || 'var(--primary)'};
  color: white;
  border: none;
  border-radius: 8px;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${props => props.hoverColor || 'var(--primary-dark)'};
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
  max-width: 600px;
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

const Select = styled.select`
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

const SaveButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
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

const ToggleGuideButton = styled.button`
  background: none;
  border: none;
  color: var(--primary);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const Badge = styled.span`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 600;
  background-color: ${props => props.color || '#e0e0e0'};
  color: ${props => props.textColor || '#333'};
  margin-left: 0.5rem;
`

function UrlManager() {
  const [urls, setUrls] = useState([])
  const [mattressUrls, setMattressUrls] = useState([])
  const [filteredUrls, setFilteredUrls] = useState([])
  const [selectedUrl, setSelectedUrl] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [showGuide, setShowGuide] = useState(true)
  const [activeTab, setActiveTab] = useState('custom')
  const [hiddenMattressUrls, setHiddenMattressUrls] = useState([])
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'external',
    active: true
  })
  
  useEffect(() => {
    // Load URLs from localStorage
    const savedUrls = localStorage.getItem('siteUrls')
    if (savedUrls) {
      const parsedUrls = JSON.parse(savedUrls)
      setUrls(parsedUrls)
      setFilteredUrls(parsedUrls)
    } else {
      // Set default URLs if none exist
      const defaultUrls = [
        {
          id: 'url-1',
          name: 'Official Website',
          url: 'https://example.com',
          type: 'external',
          active: true
        },
        {
          id: 'url-2',
          name: 'Product Catalog',
          url: 'https://example.com/products',
          type: 'external',
          active: true
        },
        {
          id: 'url-3',
          name: 'Support',
          url: 'https://example.com/support',
          type: 'external',
          active: true
        }
      ]
      
      setUrls(defaultUrls)
      setFilteredUrls(defaultUrls)
      localStorage.setItem('siteUrls', JSON.stringify(defaultUrls))
    }
    
    // Load mattress URLs from mattressData
    const mattressUrlsData = mattressData.map(mattress => ({
      id: `mattress-${mattress.id}`,
      name: mattress.name,
      url: mattress.url,
      type: 'mattress',
      active: true,
      mattressId: mattress.id,
      brand: mattress.brand
    }))
    
    setMattressUrls(mattressUrlsData)
    
    // Load hidden mattress URLs from localStorage
    const savedHiddenMattressUrls = localStorage.getItem('hiddenMattressUrls')
    if (savedHiddenMattressUrls) {
      setHiddenMattressUrls(JSON.parse(savedHiddenMattressUrls))
    }
  }, [])
  
  useEffect(() => {
    // Filter URLs based on search term and active tab
    let urlsToFilter = activeTab === 'custom' ? urls : mattressUrls
    
    if (searchTerm) {
      const filtered = urlsToFilter.filter(url => 
        url.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.url.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (url.brand && url.brand.toLowerCase().includes(searchTerm.toLowerCase()))
      )
      setFilteredUrls(filtered)
    } else {
      setFilteredUrls(urlsToFilter)
    }
  }, [searchTerm, urls, mattressUrls, activeTab])
  
  const handleAddUrl = () => {
    setFormData({
      name: '',
      url: '',
      type: 'external',
      active: true
    })
    setIsCreating(true)
    setIsModalOpen(true)
  }
  
  const handleEditUrl = (url) => {
    setSelectedUrl(url)
    setFormData({
      name: url.name,
      url: url.url,
      type: url.type === 'mattress' ? 'external' : url.type,
      active: url.active
    })
    setIsCreating(false)
    setIsModalOpen(true)
  }
  
  const handleDeleteClick = (url) => {
    setSelectedUrl(url)
    setIsConfirmationOpen(true)
  }
  
  const handleToggleActive = (url) => {
    if (url.type === 'mattress') {
      // For mattress URLs, we track hidden status in a separate array
      let updatedHiddenMattressUrls
      
      if (hiddenMattressUrls.includes(url.mattressId)) {
        // Remove from hidden list
        updatedHiddenMattressUrls = hiddenMattressUrls.filter(id => id !== url.mattressId)
      } else {
        // Add to hidden list
        updatedHiddenMattressUrls = [...hiddenMattressUrls, url.mattressId]
      }
      
      setHiddenMattressUrls(updatedHiddenMattressUrls)
      localStorage.setItem('hiddenMattressUrls', JSON.stringify(updatedHiddenMattressUrls))
      
      // Update the mattress URL in the list
      const updatedMattressUrls = mattressUrls.map(item => 
        item.id === url.id ? { ...item, active: !hiddenMattressUrls.includes(item.mattressId) } : item
      )
      setMattressUrls(updatedMattressUrls)
      
      setSuccessMessage(`Mattress URL "${url.name}" is now ${hiddenMattressUrls.includes(url.mattressId) ? 'active' : 'inactive'}`)
    } else {
      // For custom URLs, we update the active property directly
      const updatedUrls = urls.map(item => 
        item.id === url.id ? { ...item, active: !item.active } : item
      )
      
      setUrls(updatedUrls)
      localStorage.setItem('siteUrls', JSON.stringify(updatedUrls))
      
      setSuccessMessage(`URL "${url.name}" is now ${!url.active ? 'active' : 'inactive'}`)
    }
    
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedUrl(null)
  }
  
  const handleCancelDelete = () => {
    setIsConfirmationOpen(false)
    setSelectedUrl(null)
  }
  
  const handleConfirmDelete = () => {
    if (selectedUrl.type === 'mattress') {
      // For mattress URLs, we just hide them
      if (!hiddenMattressUrls.includes(selectedUrl.mattressId)) {
        const updatedHiddenMattressUrls = [...hiddenMattressUrls, selectedUrl.mattressId]
        setHiddenMattressUrls(updatedHiddenMattressUrls)
        localStorage.setItem('hiddenMattressUrls', JSON.stringify(updatedHiddenMattressUrls))
      }
      
      setSuccessMessage(`Mattress URL "${selectedUrl.name}" has been hidden`)
    } else {
      // For custom URLs, we remove them from the list
      const updatedUrls = urls.filter(url => url.id !== selectedUrl.id)
      
      setUrls(updatedUrls)
      localStorage.setItem('siteUrls', JSON.stringify(updatedUrls))
      
      setSuccessMessage(`URL "${selectedUrl.name}" deleted successfully`)
    }
    
    setIsConfirmationOpen(false)
    setSelectedUrl(null)
    
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  const handleSave = () => {
    // Validate form
    if (!formData.name.trim() || !formData.url.trim()) {
      alert('Please fill in all required fields')
      return
    }
    
    if (selectedUrl && selectedUrl.type === 'mattress') {
      // For mattress URLs, we update the mattress data
      const updatedMattressUrls = mattressUrls.map(url => 
        url.id === selectedUrl.id ? { 
          ...url, 
          name: formData.name,
          url: formData.url
        } : url
      )
      
      setMattressUrls(updatedMattressUrls)
      
      // We also need to update the actual mattress data
      // In a real application, this would update the database
      // For now, we'll just show a success message
      
      setSuccessMessage(`Mattress URL "${formData.name}" updated successfully`)
    } else {
      // For custom URLs
      let updatedUrls
      
      if (isCreating) {
        // Add new URL
        const newUrl = {
          id: `url-${Date.now()}`,
          ...formData
        }
        
        updatedUrls = [...urls, newUrl]
      } else {
        // Update existing URL
        updatedUrls = urls.map(url => 
          url.id === selectedUrl.id ? { ...url, ...formData } : url
        )
      }
      
      setUrls(updatedUrls)
      localStorage.setItem('siteUrls', JSON.stringify(updatedUrls))
      
      setSuccessMessage(isCreating ? 'URL added successfully' : 'URL updated successfully')
    }
    
    setIsModalOpen(false)
    setSelectedUrl(null)
    
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  const toggleGuide = () => {
    setShowGuide(!showGuide)
  }
  
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setSearchTerm('')
  }
  
  const isMattressUrlHidden = (mattressId) => {
    return hiddenMattressUrls.includes(mattressId)
  }
  
  return (
    <Container>
      <Header>
        URL Manager
        {activeTab === 'custom' && (
          <AddButton onClick={handleAddUrl}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Add URL
          </AddButton>
        )}
      </Header>
      
      <ToggleGuideButton onClick={toggleGuide}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          {showGuide ? (
            <path d="M18 15l-6-6-6 6"/>
          ) : (
            <path d="M6 9l6 6 6-6"/>
          )}
        </svg>
        {showGuide ? 'Hide Guide' : 'Show Guide'}
      </ToggleGuideButton>
      
      {showGuide && <UrlManagerGuide />}
      
      {successMessage && (
        <SuccessMessage>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {successMessage}
        </SuccessMessage>
      )}
      
      <TabsContainer>
        <Tab 
          active={activeTab === 'custom'} 
          onClick={() => handleTabChange('custom')}
        >
          Custom URLs
        </Tab>
        <Tab 
          active={activeTab === 'mattress'} 
          onClick={() => handleTabChange('mattress')}
        >
          Mattress URLs
        </Tab>
      </TabsContainer>
      
      <SearchContainer>
        <SearchIcon>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </SearchIcon>
        <SearchInput 
          type="text" 
          placeholder={activeTab === 'custom' ? "Search URLs..." : "Search mattress URLs by name, brand, or URL..."}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchContainer>
      
      {filteredUrls.length > 0 ? (
        <UrlTable>
          <TableHeader>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>URL</TableHeaderCell>
            <TableHeaderCell>
              {activeTab === 'custom' ? 'Type' : 'Brand'}
            </TableHeaderCell>
            <TableHeaderCell>Actions</TableHeaderCell>
          </TableHeader>
          
          {filteredUrls.map(url => {
            const isActive = url.type === 'mattress' 
              ? !isMattressUrlHidden(url.mattressId)
              : url.active;
              
            return (
              <UrlItem key={url.id} active={isActive}>
                <UrlName>
                  {url.name}
                  {url.type === 'mattress' && (
                    <Badge color="#e3f2fd" textColor="#0d47a1">Mattress</Badge>
                  )}
                </UrlName>
                <UrlLink>
                  <a href={url.url} target="_blank" rel="noopener noreferrer">
                    {url.url}
                  </a>
                </UrlLink>
                <UrlType>
                  {url.type === 'mattress' ? url.brand : (url.type === 'external' ? 'External' : 'Internal')}
                </UrlType>
                <UrlActions>
                  <ActionButton 
                    color={isActive ? '#ff9800' : '#4caf50'} 
                    hoverColor={isActive ? '#f57c00' : '#43a047'} 
                    onClick={() => handleToggleActive(url)}
                    title={isActive ? 'Deactivate' : 'Activate'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {isActive ? (
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
                  </ActionButton>
                  <ActionButton 
                    onClick={() => handleEditUrl(url)}
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                  </ActionButton>
                  <ActionButton 
                    color="#f44336" 
                    hoverColor="#d32f2f" 
                    onClick={() => handleDeleteClick(url)}
                    title={url.type === 'mattress' ? 'Hide' : 'Delete'}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                      <line x1="10" y1="11" x2="10" y2="17"></line>
                      <line x1="14" y1="11" x2="14" y2="17"></line>
                    </svg>
                  </ActionButton>
                </UrlActions>
              </UrlItem>
            )
          })}
        </UrlTable>
      ) : (
        <EmptyState>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="8" y1="15" x2="16" y2="15"></line>
            <line x1="9" y1="9" x2="9.01" y2="9"></line>
            <line x1="15" y1="9" x2="15.01" y2="9"></line>
          </svg>
          <h3>No URLs found</h3>
          <p>
            {activeTab === 'custom' 
              ? 'Try adjusting your search or add a new URL.' 
              : 'Try adjusting your search to find mattress URLs.'}
          </p>
          {activeTab === 'custom' && (
            <AddButton onClick={handleAddUrl}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add URL
            </AddButton>
          )}
        </EmptyState>
      )}
      
      {isModalOpen && (
        <Modal>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>
                {isCreating 
                  ? 'Add New URL' 
                  : selectedUrl.type === 'mattress' 
                    ? 'Edit Mattress URL' 
                    : 'Edit URL'}
              </ModalTitle>
              <CloseButton onClick={handleCloseModal}>×</CloseButton>
            </ModalHeader>
            
            <FormGroup>
              <Label>Name</Label>
              <Input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                placeholder="e.g., Official Website"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>URL</Label>
              <Input 
                type="text" 
                name="url" 
                value={formData.url} 
                onChange={handleInputChange} 
                placeholder="e.g., https://example.com"
              />
            </FormGroup>
            
            {selectedUrl?.type !== 'mattress' && (
              <FormGroup>
                <Label>Type</Label>
                <Select 
                  name="type" 
                  value={formData.type} 
                  onChange={handleInputChange}
                >
                  <option value="external">External</option>
                  <option value="internal">Internal</option>
                </Select>
              </FormGroup>
            )}
            
            {selectedUrl?.type !== 'mattress' && (
              <FormGroup>
                <Label>
                  <input 
                    type="checkbox" 
                    name="active" 
                    checked={formData.active} 
                    onChange={handleCheckboxChange} 
                    style={{ marginRight: '0.5rem' }}
                  />
                  Active
                </Label>
              </FormGroup>
            )}
            
            <ButtonGroup>
              <SaveButton onClick={handleSave}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                  <polyline points="17 21 17 13 7 13 7 21"></polyline>
                  <polyline points="7 3 7 8 15 8"></polyline>
                </svg>
                {isCreating ? 'Add URL' : 'Save Changes'}
              </SaveButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
      
      {isConfirmationOpen && selectedUrl && (
        <ConfirmationModal>
          <ConfirmationContent>
            <ConfirmationTitle>
              {selectedUrl.type === 'mattress' ? 'Hide Mattress URL' : 'Delete URL'}
            </ConfirmationTitle>
            <ConfirmationText>
              {selectedUrl.type === 'mattress'
                ? `Are you sure you want to hide "${selectedUrl.name}" from your quiz results? This will prevent this mattress URL from appearing in quiz results.`
                : `Are you sure you want to delete "${selectedUrl.name}"? This action cannot be undone.`
              }
            </ConfirmationText>
            <ConfirmationButtons>
              <CancelButton onClick={handleCancelDelete}>Cancel</CancelButton>
              <ConfirmButton onClick={handleConfirmDelete}>
                {selectedUrl.type === 'mattress' ? 'Hide' : 'Delete'}
              </ConfirmButton>
            </ConfirmationButtons>
          </ConfirmationContent>
        </ConfirmationModal>
      )}
    </Container>
  )
}

export default UrlManager
