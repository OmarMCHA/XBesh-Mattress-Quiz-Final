import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: var(--text-dark);
`

const ThemeCard = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const ColorItem = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 1rem;
`

const ColorLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-dark);
`

const ColorPickerContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`

const ColorPreview = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.color || '#ffffff'};
  margin-right: 1rem;
  border: 1px solid #ddd;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  padding: 0;
  
  &:hover {
    border-color: #999;
    transform: scale(1.05);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.3);
  }
`

const ColorInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const PreviewSection = styled.div`
  margin-top: 2rem;
`

const PreviewTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-dark);
`

const PreviewContainer = styled.div`
  background-color: ${props => props.bgColor || 'var(--background)'};
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #ddd;
`

const PreviewButton = styled.button`
  background-color: ${props => props.bgColor || 'var(--primary)'};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  margin-right: 1rem;
  margin-bottom: 1rem;
  
  &:hover {
    background-color: ${props => props.hoverColor || 'var(--primary-dark)'};
  }
`

const PreviewText = styled.p`
  color: ${props => props.color || 'var(--text-dark)'};
  margin-bottom: 1rem;
  line-height: 1.5;
`

const PreviewHeading = styled.h4`
  color: ${props => props.color || 'var(--text-dark)'};
  margin-bottom: 1rem;
`

const SaveButton = styled.button`
  background-color: var(--primary);
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  
  &:hover {
    background-color: var(--primary-dark);
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const ResetButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
  margin-right: 1rem;
  
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

const FontSection = styled.div`
  margin-top: 2rem;
`

const FontGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`

const FontItem = styled.div`
  display: flex;
  flex-direction: column;
`

const FontLabel = styled.label`
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: var(--text-dark);
`

const FontSelect = styled.select`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const FontSizeInput = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  
  &:focus {
    border-color: var(--primary);
    outline: none;
  }
`

const PopoverContainer = styled.div`
  position: absolute;
  z-index: 100;
  top: calc(100% + 10px);
  left: 0;
  border-radius: 8px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  background: white;
  padding: 1rem;
  width: 240px;
`

const SwatchesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1rem;
`

const Swatch = styled.button`
  width: 24px;
  height: 24px;
  border-radius: 4px;
  background: ${props => props.color};
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0;
  
  &:hover {
    transform: scale(1.1);
  }
  
  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(67, 97, 238, 0.3);
  }
`

// Custom Color Picker Components
const CustomColorPicker = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`

const SaturationArea = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
  background-image: linear-gradient(to top, #000, transparent), 
                    linear-gradient(to right, #fff, transparent);
  background-color: ${props => props.hue || '#ff0000'};
  border-radius: 4px 4px 0 0;
  margin-bottom: 10px;
  cursor: crosshair;
`

const SaturationPointer = styled.div`
  position: absolute;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
  transform: translate(-50%, -50%);
  pointer-events: none;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  background-color: ${props => props.color};
`

const HueSlider = styled.input.attrs({ type: 'range', min: 0, max: 360, step: 1 })`
  -webkit-appearance: none;
  width: 100%;
  height: 20px;
  border-radius: 0 0 4px 4px;
  background: linear-gradient(
    to right,
    #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000
  );
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid white;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: white;
    border: 2px solid white;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.3);
    cursor: pointer;
  }
`

function ThemeEditor() {
  const defaultTheme = {
    colors: {
      primary: '#4361ee',
      primaryDark: '#3a0ca3',
      secondary: '#7209b7',
      accent: '#f72585',
      background: '#f8f9fa',
      backgroundAlt: '#ffffff',
      textDark: '#333333',
      textLight: '#666666',
      border: '#dddddd'
    },
    fonts: {
      primary: 'Roboto, sans-serif',
      secondary: 'Poppins, sans-serif',
      heading: 'Montserrat, sans-serif',
      baseSize: '16px',
      headingSize: '24px'
    }
  }
  
  const [theme, setTheme] = useState(defaultTheme)
  const [successMessage, setSuccessMessage] = useState('')
  const [activeColorPicker, setActiveColorPicker] = useState(null)
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState({ x: 100, y: 0 }) // x: saturation, y: value
  const popoverRef = useRef(null)
  const saturationRef = useRef(null)
  
  // Predefined color palette
  const colorPalette = [
    // Blues
    '#0466c8', '#0353a4', '#023e7d', '#002855', '#001845',
    // Purples
    '#7209b7', '#560bad', '#480ca8', '#3a0ca3', '#3f37c9',
    // Reds
    '#d00000', '#dc2f02', '#e85d04', '#f48c06', '#faa307',
    // Greens
    '#007f5f', '#2b9348', '#55a630', '#80b918', '#aacc00',
    // Grays
    '#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#adb5bd',
    '#6c757d', '#495057', '#343a40', '#212529', '#000000'
  ]
  
  useEffect(() => {
    // Load theme from localStorage if available
    const savedTheme = localStorage.getItem('siteTheme')
    if (savedTheme) {
      try {
        setTheme(JSON.parse(savedTheme))
      } catch (error) {
        console.error('Error parsing saved theme:', error)
        // If there's an error parsing, use default theme
        setTheme(defaultTheme)
      }
    }
    
    // Close color picker when clicking outside
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target) && 
          !event.target.closest('.color-preview')) {
        setActiveColorPicker(null)
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  
  // Convert HSV to RGB
  const hsvToRgb = (h, s, v) => {
    h = h / 360
    s = s / 100
    v = v / 100
    
    let r, g, b;
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    
    return {
      r: Math.round(r * 255),
      g: Math.round(g * 255),
      b: Math.round(b * 255)
    };
  }
  
  // Convert RGB to Hex
  const rgbToHex = (r, g, b) => {
    return '#' + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }
  
  // Convert Hex to HSV
  const hexToHsv = (hex) => {
    // Remove # if present
    hex = hex.replace(/^#/, '');
    
    // Parse the hex values
    let r, g, b;
    if (hex.length === 3) {
      r = parseInt(hex[0] + hex[0], 16);
      g = parseInt(hex[1] + hex[1], 16);
      b = parseInt(hex[2] + hex[2], 16);
    } else {
      r = parseInt(hex.substring(0, 2), 16);
      g = parseInt(hex.substring(2, 4), 16);
      b = parseInt(hex.substring(4, 6), 16);
    }
    
    // Convert RGB to HSV
    r /= 255;
    g /= 255;
    b /= 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    
    let h, s, v;
    
    // Calculate hue
    if (delta === 0) {
      h = 0;
    } else if (max === r) {
      h = ((g - b) / delta) % 6;
    } else if (max === g) {
      h = (b - r) / delta + 2;
    } else {
      h = (r - g) / delta + 4;
    }
    
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    
    // Calculate saturation and value
    s = max === 0 ? 0 : Math.round((delta / max) * 100);
    v = Math.round(max * 100);
    
    return { h, s, v };
  }
  
  // Update color when saturation area is clicked
  const handleSaturationChange = (e) => {
    if (!saturationRef.current) return;
    
    const rect = saturationRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
    const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
    
    setSaturation({ x, y });
    
    // Calculate color from HSV
    const s = x;
    const v = 100 - y;
    const { r, g, b } = hsvToRgb(hue, s, v);
    const hexColor = rgbToHex(r, g, b);
    
    if (activeColorPicker) {
      handleColorChange(activeColorPicker, hexColor);
    }
  }
  
  // Handle mouse move on saturation area
  const handleSaturationMouseMove = (e) => {
    if (e.buttons !== 1) return; // Only respond to left mouse button
    handleSaturationChange(e);
  }
  
  // Handle hue change
  const handleHueChange = (e) => {
    const newHue = parseInt(e.target.value);
    setHue(newHue);
    
    // Recalculate color with new hue
    const s = saturation.x;
    const v = 100 - saturation.y;
    const { r, g, b } = hsvToRgb(newHue, s, v);
    const hexColor = rgbToHex(r, g, b);
    
    if (activeColorPicker) {
      handleColorChange(activeColorPicker, hexColor);
    }
  }
  
  // Initialize color picker with current color
  const initializeColorPicker = (colorKey) => {
    const currentColor = theme.colors[colorKey];
    const { h, s, v } = hexToHsv(currentColor);
    
    setHue(h);
    setSaturation({ x: s, y: 100 - v });
    setActiveColorPicker(colorKey);
  }
  
  const handleColorChange = (colorKey, value) => {
    setTheme(prev => ({
      ...prev,
      colors: {
        ...prev.colors,
        [colorKey]: value
      }
    }))
  }
  
  const handleFontChange = (fontKey, value) => {
    setTheme(prev => ({
      ...prev,
      fonts: {
        ...prev.fonts,
        [fontKey]: value
      }
    }))
  }
  
  const handleSave = () => {
    // Save theme to localStorage
    localStorage.setItem('siteTheme', JSON.stringify(theme))
    
    // Update CSS variables
    const root = document.documentElement
    
    // Set color variables
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVarName = `--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVarName, value)
    })
    
    // Set font variables
    Object.entries(theme.fonts).forEach(([key, value]) => {
      const cssVarName = `--font-${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`
      root.style.setProperty(cssVarName, value)
    })
    
    // Show success message
    setSuccessMessage('Theme saved successfully! Changes will be applied to the entire site.')
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  const handleReset = () => {
    setTheme(defaultTheme)
    setSuccessMessage('Theme reset to defaults.')
    setTimeout(() => setSuccessMessage(''), 3000)
  }
  
  const toggleColorPicker = (colorKey) => {
    if (activeColorPicker === colorKey) {
      setActiveColorPicker(null)
    } else {
      initializeColorPicker(colorKey)
    }
  }
  
  const fontOptions = [
    { value: 'Arial, sans-serif', label: 'Arial' },
    { value: 'Roboto, sans-serif', label: 'Roboto' },
    { value: 'Poppins, sans-serif', label: 'Poppins' },
    { value: 'Montserrat, sans-serif', label: 'Montserrat' },
    { value: 'Open Sans, sans-serif', label: 'Open Sans' },
    { value: 'Lato, sans-serif', label: 'Lato' },
    { value: 'Raleway, sans-serif', label: 'Raleway' },
    { value: 'Playfair Display, serif', label: 'Playfair Display' },
    { value: 'Merriweather, serif', label: 'Merriweather' },
    { value: 'Georgia, serif', label: 'Georgia' }
  ]
  
  // Calculate current color from HSV
  const getCurrentColor = () => {
    const s = saturation.x;
    const v = 100 - saturation.y;
    const { r, g, b } = hsvToRgb(hue, s, v);
    return rgbToHex(r, g, b);
  }
  
  // Get hue color for saturation background
  const getHueColor = () => {
    const { r, g, b } = hsvToRgb(hue, 100, 100);
    return rgbToHex(r, g, b);
  }
  
  return (
    <Container>
      <Header>Theme Editor</Header>
      
      {successMessage && (
        <SuccessMessage>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          {successMessage}
        </SuccessMessage>
      )}
      
      <ThemeCard>
        <h2>Colors</h2>
        <p>Customize the color scheme of your quiz application. Click on a color preview to open the color picker.</p>
        
        <ColorGrid>
          {Object.entries(theme.colors).map(([key, value]) => (
            <ColorItem key={key}>
              <ColorLabel>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</ColorLabel>
              <ColorPickerContainer>
                <ColorPreview 
                  color={value} 
                  onClick={() => toggleColorPicker(key)}
                  className="color-preview"
                  aria-label={`Select color for ${key}`}
                  type="button"
                />
                <ColorInput 
                  type="text" 
                  value={value} 
                  onChange={(e) => handleColorChange(key, e.target.value)} 
                  aria-label={`Color value for ${key}`}
                />
                
                {activeColorPicker === key && (
                  <PopoverContainer ref={popoverRef}>
                    <CustomColorPicker>
                      <SaturationArea 
                        ref={saturationRef}
                        hue={getHueColor()}
                        onClick={handleSaturationChange}
                        onMouseMove={handleSaturationMouseMove}
                      >
                        <SaturationPointer 
                          x={saturation.x} 
                          y={saturation.y} 
                          color={getCurrentColor()}
                        />
                      </SaturationArea>
                      <HueSlider 
                        value={hue} 
                        onChange={handleHueChange} 
                      />
                    </CustomColorPicker>
                    <SwatchesContainer>
                      {colorPalette.map((color, index) => (
                        <Swatch 
                          key={index} 
                          color={color} 
                          onClick={() => handleColorChange(key, color)}
                          type="button"
                          aria-label={`Select predefined color ${color}`}
                        />
                      ))}
                    </SwatchesContainer>
                  </PopoverContainer>
                )}
              </ColorPickerContainer>
            </ColorItem>
          ))}
        </ColorGrid>
        
        <FontSection>
          <h2>Typography</h2>
          <p>Customize the fonts used throughout your quiz application.</p>
          
          <FontGrid>
            <FontItem>
              <FontLabel>Primary Font</FontLabel>
              <FontSelect 
                value={theme.fonts.primary} 
                onChange={(e) => handleFontChange('primary', e.target.value)}
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>{font.label}</option>
                ))}
              </FontSelect>
            </FontItem>
            
            <FontItem>
              <FontLabel>Secondary Font</FontLabel>
              <FontSelect 
                value={theme.fonts.secondary} 
                onChange={(e) => handleFontChange('secondary', e.target.value)}
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>{font.label}</option>
                ))}
              </FontSelect>
            </FontItem>
            
            <FontItem>
              <FontLabel>Heading Font</FontLabel>
              <FontSelect 
                value={theme.fonts.heading} 
                onChange={(e) => handleFontChange('heading', e.target.value)}
              >
                {fontOptions.map(font => (
                  <option key={font.value} value={font.value}>{font.label}</option>
                ))}
              </FontSelect>
            </FontItem>
            
            <FontItem>
              <FontLabel>Base Font Size</FontLabel>
              <FontSizeInput 
                type="text" 
                value={theme.fonts.baseSize} 
                onChange={(e) => handleFontChange('baseSize', e.target.value)} 
              />
            </FontItem>
            
            <FontItem>
              <FontLabel>Heading Font Size</FontLabel>
              <FontSizeInput 
                type="text" 
                value={theme.fonts.headingSize} 
                onChange={(e) => handleFontChange('headingSize', e.target.value)} 
              />
            </FontItem>
          </FontGrid>
        </FontSection>
        
        <PreviewSection>
          <PreviewTitle>Preview</PreviewTitle>
          <PreviewContainer bgColor={theme.colors.background}>
            <PreviewHeading color={theme.colors.textDark}>This is how your theme will look</PreviewHeading>
            <PreviewText color={theme.colors.textDark}>
              This text shows the primary text color and font. The background color is also applied to this container.
            </PreviewText>
            <PreviewText color={theme.colors.textLight}>
              This text shows the secondary text color that will be used for less important information.
            </PreviewText>
            <PreviewButton bgColor={theme.colors.primary} hoverColor={theme.colors.primaryDark}>
              Primary Button
            </PreviewButton>
            <PreviewButton bgColor={theme.colors.secondary}>
              Secondary Button
            </PreviewButton>
            <PreviewButton bgColor={theme.colors.accent}>
              Accent Button
            </PreviewButton>
          </PreviewContainer>
        </PreviewSection>
        
        <ButtonGroup>
          <ResetButton onClick={handleReset}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path>
              <path d="M3 3v5h5"></path>
            </svg>
            Reset to Defaults
          </ResetButton>
          <SaveButton onClick={handleSave}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
            Save Theme
          </SaveButton>
        </ButtonGroup>
      </ThemeCard>
    </Container>
  )
}

export default ThemeEditor
