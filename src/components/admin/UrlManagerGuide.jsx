import React from 'react'
import styled from 'styled-components'

const GuideContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
`

const GuideTitle = styled.h2`
  margin-bottom: 1.5rem;
  color: var(--text-dark);
  font-size: 1.5rem;
`

const GuideSection = styled.div`
  margin-bottom: 2rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`

const SectionTitle = styled.h3`
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.75rem;
    width: 20px;
    height: 20px;
    color: var(--primary);
  }
`

const StepList = styled.ol`
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
`

const Step = styled.li`
  margin-bottom: 0.75rem;
  line-height: 1.5;
  color: var(--text-dark);
`

const Tip = styled.div`
  background-color: #e8f4fd;
  border-left: 4px solid #2196f3;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  
  strong {
    color: #0d47a1;
    display: block;
    margin-bottom: 0.5rem;
  }
`

const Warning = styled.div`
  background-color: #fff8e1;
  border-left: 4px solid #ffc107;
  padding: 1rem;
  border-radius: 4px;
  margin-bottom: 1.5rem;
  
  strong {
    color: #ff6f00;
    display: block;
    margin-bottom: 0.5rem;
  }
`

const TabsExplanation = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1.5rem;
`

const TabDescription = styled.div`
  margin-bottom: 1rem;
  
  &:last-child {
    margin-bottom: 0;
  }
  
  h4 {
    margin-bottom: 0.5rem;
    color: var(--text-dark);
    font-weight: 600;
  }
  
  p {
    margin: 0;
    color: var(--text-dark);
  }
`

function UrlManagerGuide() {
  return (
    <GuideContainer>
      <GuideTitle>URL Manager Guide</GuideTitle>
      
      <GuideSection>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="16" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12.01" y2="8"></line>
          </svg>
          Overview
        </SectionTitle>
        <p>The URL Manager allows you to create, edit, delete, and manage the visibility of URLs throughout your quiz application. These URLs can be used for external links to mattress websites, product pages, or internal pages within your application.</p>
        
        <TabsExplanation>
          <TabDescription>
            <h4>Custom URLs Tab</h4>
            <p>Manage your own custom URLs that can be used throughout the application. You can add, edit, delete, and toggle the visibility of these URLs.</p>
          </TabDescription>
          
          <TabDescription>
            <h4>Mattress URLs Tab</h4>
            <p>Manage the URLs associated with mattresses in your quiz. You can edit, hide, or show these URLs to control which mattress links appear in quiz results.</p>
          </TabDescription>
        </TabsExplanation>
      </GuideSection>
      
      <GuideSection>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Adding a New Custom URL
        </SectionTitle>
        <StepList>
          <Step>Select the <strong>"Custom URLs"</strong> tab.</Step>
          <Step>Click the <strong>"Add URL"</strong> button in the top-right corner of the URL Manager.</Step>
          <Step>Fill in the following fields in the form that appears:
            <ul>
              <li><strong>Name:</strong> A descriptive name for the URL (e.g., "Official Website", "Product Page")</li>
              <li><strong>URL:</strong> The complete URL including http:// or https:// (e.g., "https://example.com")</li>
              <li><strong>Type:</strong> Select "External" for links to other websites or "Internal" for links within your application</li>
              <li><strong>Active:</strong> Check this box to make the URL visible and active in your application</li>
            </ul>
          </Step>
          <Step>Click the <strong>"Add URL"</strong> button to save the new URL.</Step>
        </StepList>
        
        <Tip>
          <strong>Tip:</strong> Use descriptive names for your URLs to make them easier to identify and manage later.
        </Tip>
      </GuideSection>
      
      <GuideSection>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Editing URLs
        </SectionTitle>
        <StepList>
          <Step>Select either the <strong>"Custom URLs"</strong> or <strong>"Mattress URLs"</strong> tab depending on which type of URL you want to edit.</Step>
          <Step>Find the URL you want to edit in the list.</Step>
          <Step>Click the <strong>pencil icon</strong> in the Actions column for that URL.</Step>
          <Step>Update any of the fields in the form that appears.</Step>
          <Step>Click the <strong>"Save Changes"</strong> button to update the URL.</Step>
        </StepList>
        
        <Tip>
          <strong>Tip:</strong> For mattress URLs, you can edit the name and URL, but not the type or active status. Use the visibility toggle instead.
        </Tip>
      </GuideSection>
      
      <GuideSection>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
            <line x1="1" y1="1" x2="23" y2="23"></line>
          </svg>
          Toggling URL Visibility
        </SectionTitle>
        <p>You can quickly toggle whether a URL is active (visible) or inactive (hidden) in your application:</p>
        <StepList>
          <Step>Select either the <strong>"Custom URLs"</strong> or <strong>"Mattress URLs"</strong> tab.</Step>
          <Step>Find the URL you want to toggle in the list.</Step>
          <Step>Click the <strong>eye icon</strong> in the Actions column for that URL.</Step>
          <Step>The URL's active status will immediately toggle between active and inactive.</Step>
        </StepList>
        
        <Tip>
          <strong>Tip:</strong> Active URLs appear with a light blue background in the list, making it easy to identify which URLs are currently visible in your application.
        </Tip>
      </GuideSection>
      
      <GuideSection>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
          Deleting or Hiding URLs
        </SectionTitle>
        <StepList>
          <Step>Select either the <strong>"Custom URLs"</strong> or <strong>"Mattress URLs"</strong> tab.</Step>
          <Step>Find the URL you want to delete or hide in the list.</Step>
          <Step>Click the <strong>trash icon</strong> in the Actions column for that URL.</Step>
          <Step>A confirmation dialog will appear. Click <strong>"Delete"</strong> or <strong>"Hide"</strong> to confirm or <strong>"Cancel"</strong> to abort.</Step>
        </StepList>
        
        <Warning>
          <strong>Warning for Custom URLs:</strong> Deleting a custom URL is permanent and cannot be undone. Make sure you really want to delete the URL before confirming.
        </Warning>
        
        <Tip>
          <strong>Note for Mattress URLs:</strong> Mattress URLs cannot be permanently deleted, only hidden. This prevents them from appearing in quiz results but preserves the data. You can always make them visible again later.
        </Tip>
      </GuideSection>
      
      <GuideSection>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          Searching for URLs
        </SectionTitle>
        <p>You can quickly find specific URLs using the search feature:</p>
        <StepList>
          <Step>Select either the <strong>"Custom URLs"</strong> or <strong>"Mattress URLs"</strong> tab.</Step>
          <Step>Type your search term in the search box at the top of the URL Manager.</Step>
          <Step>The list will automatically filter to show only URLs that match your search term.</Step>
          <Step>For custom URLs, the search looks for matches in both the URL name and the URL itself.</Step>
          <Step>For mattress URLs, the search also includes the brand name.</Step>
          <Step>To clear the search and see all URLs again, delete the text from the search box.</Step>
        </StepList>
      </GuideSection>
      
      <GuideSection>
        <SectionTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
          </svg>
          Managing Mattress URLs
        </SectionTitle>
        <p>The Mattress URLs tab allows you to manage the URLs associated with mattresses in your quiz:</p>
        <ul>
          <li>You can edit the name and URL of any mattress link</li>
          <li>You can hide mattress URLs to prevent them from appearing in quiz results</li>
          <li>You can make hidden mattress URLs visible again</li>
          <li>You can search for mattress URLs by name, brand, or URL</li>
        </ul>
        
        <Tip>
          <strong>Tip:</strong> If you want to temporarily remove a mattress from quiz results without deleting its data, simply hide its URL using the eye icon or the trash icon (which acts as a hide function for mattress URLs).
        </Tip>
      </GuideSection>
    </GuideContainer>
  )
}

export default UrlManagerGuide
