import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: var(--text-dark);
`

const ThemeGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`

const ThemeSection = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const SectionTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
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

const ColorInput = styled.div`
  display: flex;
  align-items: center;
`

const ColorPreview = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 4px;
  background-color: ${props => props.color};
  margin-right: 1rem;
  border: 1px solid #ddd;
`

const ColorPicker = styled.input`
  flex: 1;
`

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
`

const PreviewContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
`

const PreviewTitle = styled.h2`
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  color: var(--text-dark);
`

const PreviewContent = styled.div`
  padding: 2rem;
  border-radius: 8px;
  background-color: ${props => props.bgColor || 'var(--background)'};
`

const PreviewHeading = styled.h3`
  font-family: ${props => props.fontFamily || 'inherit'};
  color: ${props => props.color || 'var(--text-dark)'};
  margin-bottom: 1rem;
`

const PreviewText = styled.p`
  font-family: ${props => props.fontFamily || 'inherit'};
  color: ${props => props.color || 'var(--text-dark)'};
  margin-bottom: 1rem;
`

const PreviewButton = styled.button`
  background-color: ${props => props.bgColor || 'var(--primary)'};
  color: ${props => props.color || 'white'};
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-family: ${props => props.fontFamily || 'inherit'};
  cursor: pointer;
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

function ThemeEditor() {
  // In a real app, you would fetch the current theme from your backend
  const [theme, setTheme] = useState({
    colors: {
      primary: '#4a90e2',
      primaryDark: '#3a7bc8',
      secondary: '#6c757d',
      background: '#f8f9fa',
      textDark: '#343a40',
      textLight: '#6c757d',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545'
    },
    fonts: {
      heading: 'Poppins, sans-serif',
      body: 'Inter, sans-serif',
      button: 'Poppins, sans-serif'
    },
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
  })
  
  const handleColorChange = (colorName, value) => {
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorName]: value
      }
    }))
  }
  
  const handleFontChange = (fontName, value) => {
    setTheme(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [fontName]: value
      }
    }))
  }
  
  const handleInputChange = (section, name, value) => {
    setTheme(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }))
  }
  
  const handleSave = () => {
    // In a real app, you would send this to your backend
    
    // Create a CSS variables string
    const cssVariables = `
      :root {
        --primary: ${theme.colors.primary};
        --primary-dark: ${theme.colors.primaryDark};
        --secondary: ${theme.colors.secondary};
        --background: ${theme.colors.background};
        --text-dark: ${theme.colors.textDark};
        --text-light: ${theme.colors.textLight};
        --success: ${theme.colors.success};
        --warning: ${theme.colors.warning};
        --danger: ${theme.colors.danger};
        --border-radius: ${theme.borderRadius};
        --box-shadow: ${theme.boxShadow};
      }
      
      body {
        font-family: ${theme.fonts.body};
        background-color: var(--background);
        color: var(--text-dark);
      }
      
      h1, h2, h3, h4, h5, h6 {
        font-family: ${theme.fonts.heading};
      }
      
      button, .btn {
        font-family: ${theme.fonts.button};
      }
    `
    
    // In a real app, you would save this to a CSS file or database
    console.log(cssVariables)
    
    // Show success message
    alert('Theme updated successfully!')
  }
  
  const fontOptions = [
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Georgia, serif',
    'Times New Roman, serif',
    'Courier New, monospace',
    'Verdana, sans-serif',
    'Roboto, sans-serif',
    'Open Sans, sans-serif',
    'Lato, sans-serif',
    'Montserrat, sans-serif',
    'Poppins, sans-serif',
    'Inter, sans-serif',
    'Playfair Display, serif',
    'Merriweather, serif',
    'Source Sans Pro, sans-serif'
  ]
  
  return (
    <Container>
      <Header>Theme Editor</Header>
      
      <PreviewContainer>
        <PreviewTitle>Live Preview</PreviewTitle>
        <PreviewContent bgColor={theme.colors.background}>
          <PreviewHeading 
            fontFamily={theme.fonts.heading}
            color={theme.colors.textDark}
          >
            This is a heading
          </PreviewHeading>
          
          <PreviewText 
            fontFamily={theme.fonts.body}
            color={theme.colors.textDark}
          >
            This is a paragraph of text that shows how your content will look with the selected theme settings. The quick brown fox jumps over the lazy dog.
          </PreviewText>
          
          <PreviewButton 
            bgColor={theme.colors.primary}
            color="white"
            fontFamily={theme.fonts.button}
          >
            Primary Button
          </PreviewButton>
        </PreviewContent>
      </PreviewContainer>
      
      <ThemeGrid>
        <ThemeSection>
          <SectionTitle>Colors</SectionTitle>
          
          <FormGroup>
            <Label>Primary Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.primary} />
              <ColorPicker 
                type="color" 
                value={theme.colors.primary} 
                onChange={(e) => handleColorChange('primary', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Primary Dark Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.primaryDark} />
              <ColorPicker 
                type="color" 
                value={theme.colors.primaryDark} 
                onChange={(e) => handleColorChange('primaryDark', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Secondary Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.secondary} />
              <ColorPicker 
                type="color" 
                value={theme.colors.secondary} 
                onChange={(e) => handleColorChange('secondary', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Background Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.background} />
              <ColorPicker 
                type="color" 
                value={theme.colors.background} 
                onChange={(e) => handleColorChange('background', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Text Dark Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.textDark} />
              <ColorPicker 
                type="color" 
                value={theme.colors.textDark} 
                onChange={(e) => handleColorChange('textDark', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Text Light Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.textLight} />
              <ColorPicker 
                type="color" 
                value={theme.colors.textLight} 
                onChange={(e) => handleColorChange('textLight', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
        </ThemeSection>
        
        <ThemeSection>
          <SectionTitle>Status Colors</SectionTitle>
          
          <FormGroup>
            <Label>Success Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.success} />
              <ColorPicker 
                type="color" 
                value={theme.colors.success} 
                onChange={(e) => handleColorChange('success', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Warning Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.warning} />
              <ColorPicker 
                type="color" 
                value={theme.colors.warning} 
                onChange={(e) => handleColorChange('warning', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
          
          <FormGroup>
            <Label>Danger Color</Label>
            <ColorInput>
              <ColorPreview color={theme.colors.danger} />
              <ColorPicker 
                type="color" 
                value={theme.colors.danger} 
                onChange={(e) => handleColorChange('danger', e.target.value)} 
              />
            </ColorInput>
          </FormGroup>
        </ThemeSection>
        
        <ThemeSection>
          <SectionTitle>Typography</SectionTitle>
          
          <FormGroup>
            <Label>Heading Font</Label>
            <Select 
              value={theme.fonts.heading} 
              onChange={(e) => handleFontChange('heading', e.target.value)}
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font.split(',')[0]}</option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Body Font</Label>
            <Select 
              value={theme.fonts.body} 
              onChange={(e) => handleFontChange('body', e.target.value)}
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font.split(',')[0]}</option>
              ))}
            </Select>
          </FormGroup>
          
          <FormGroup>
            <Label>Button Font</Label>
            <Select 
              value={theme.fonts.button} 
              onChange={(e) => handleFontChange('button', e.target.value)}
            >
              {fontOptions.map(font => (
                <option key={font} value={font}>{font.split(',')[0]}</option>
              ))}
            </Select>
          </FormGroup>
        </ThemeSection>
        
        <ThemeSection>
          <SectionTitle>Other Styles</SectionTitle>
          
          <FormGroup>
            <Label>Border Radius</Label>
            <Input 
              type="text" 
              value={theme.borderRadius} 
              onChange={(e) => setTheme(prev => ({...prev, borderRadius: e.target.value}))} 
              placeholder="e.g., 8px"
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Box Shadow</Label>
            <Input 
              type="text" 
              value={theme.boxShadow} 
              onChange={(e) => setTheme(prev => ({...prev, boxShadow: e.target.value}))} 
              placeholder="e.g., 0 2px 8px rgba(0, 0, 0, 0.1)"
            />
          </FormGroup>
        </ThemeSection>
      </ThemeGrid>
      
      <SaveButton onClick={handleSave}>Save Theme</SaveButton>
    </Container>
  )
}

export default ThemeEditor
