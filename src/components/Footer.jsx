import React from 'react'
import styled from 'styled-components'

const FooterContainer = styled.footer`
  background-color: var(--background-alt);
  padding: 2rem 0;
  border-top: 1px solid var(--border);
`

const FooterContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`

const FooterTop = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const FooterBottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
`

const FooterColumn = styled.div`
  flex: 1;
  min-width: 200px;
`

const FooterHeading = styled.h4`
  font-size: 1.125rem;
  margin-bottom: 1rem;
`

const FooterLinks = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`

const FooterLink = styled.a`
  color: var(--text-light);
  text-decoration: none;
  transition: color var(--transition);
  
  &:hover {
    color: var(--primary);
  }
`

const Copyright = styled.p`
  color: var(--text-light);
  font-size: 0.875rem;
  margin: 0;
`

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`

const SocialLink = styled.a`
  color: var(--text-light);
  transition: color var(--transition);
  
  &:hover {
    color: var(--primary);
  }
`

function Footer() {
  return (
    <FooterContainer>
      <div className="container">
        <FooterContent>
          <FooterTop>
            <FooterColumn>
              <FooterHeading>SleepPerfect</FooterHeading>
              <p>Finding your perfect mattress match through science and personalization.</p>
            </FooterColumn>
            
            <FooterColumn>
              <FooterHeading>Resources</FooterHeading>
              <FooterLinks>
                <li><FooterLink href="#">Sleep Science</FooterLink></li>
                <li><FooterLink href="#">Mattress Guide</FooterLink></li>
                <li><FooterLink href="#">Sleep Positions</FooterLink></li>
                <li><FooterLink href="#">Pain Relief</FooterLink></li>
              </FooterLinks>
            </FooterColumn>
            
            <FooterColumn>
              <FooterHeading>Company</FooterHeading>
              <FooterLinks>
                <li><FooterLink href="#">About Us</FooterLink></li>
                <li><FooterLink href="#">Our Experts</FooterLink></li>
                <li><FooterLink href="#">Contact</FooterLink></li>
                <li><FooterLink href="#">Privacy Policy</FooterLink></li>
              </FooterLinks>
            </FooterColumn>
            
            <FooterColumn>
              <FooterHeading>Contact</FooterHeading>
              <FooterLinks>
                <li><FooterLink href="mailto:info@sleepperfect.com">info@sleepperfect.com</FooterLink></li>
                <li><FooterLink href="tel:+18005551234">1-800-555-1234</FooterLink></li>
              </FooterLinks>
            </FooterColumn>
          </FooterTop>
          
          <FooterBottom>
            <Copyright>&copy; {new Date().getFullYear()} SleepPerfect. All rights reserved.</Copyright>
            
            <SocialLinks>
              <SocialLink href="#" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialLink>
              
              <SocialLink href="#" aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialLink>
              
              <SocialLink href="#" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17 2H7C4.23858 2 2 4.23858 2 7V17C2 19.7614 4.23858 22 7 22H17C19.7614 22 22 19.7614 22 17V7C22 4.23858 19.7614 2 17 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61991 14.1902 8.22773 13.4229 8.09406 12.5922C7.9604 11.7615 8.09206 10.9099 8.47032 10.1584C8.84858 9.40685 9.45418 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87659 12.63 8C13.4789 8.12588 14.2648 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M17.5 6.5H17.51" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </SocialLink>
            </SocialLinks>
          </FooterBottom>
        </FooterContent>
      </div>
    </FooterContainer>
  )
}

export default Footer
