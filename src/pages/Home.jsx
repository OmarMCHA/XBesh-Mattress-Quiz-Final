import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Hero = styled.section`
  display: flex;
  align-items: center;
  gap: 3rem; /* Increased from 2rem */
  margin-bottom: 6rem; /* Increased from 4rem */
  padding: 2rem 0; /* Added padding */
  
  @media (max-width: 992px) {
    flex-direction: column;
    padding: 1rem 0;
  }
`

const HeroContent = styled.div`
  flex: 1;
  padding-right: 1rem; /* Added padding */
`

const HeroTitle = styled.h1`
  font-size: 3.5rem; /* Increased from 3rem */
  margin-bottom: 2rem; /* Increased from 1.5rem */
  
  @media (max-width: 768px) {
    font-size: 2.5rem; /* Increased from 2.25rem */
    margin-bottom: 1.5rem;
  }
`

const HeroSubtitle = styled.p`
  font-size: 1.25rem;
  color: var(--text-light);
  margin-bottom: 2.5rem; /* Increased from 2rem */
  
  @media (max-width: 768px) {
    font-size: 1.125rem;
    margin-bottom: 2rem;
  }
`

const HeroImage = styled.div`
  flex: 1;
  border-radius: var(--radius-lg);
  overflow: hidden;
  box-shadow: var(--shadow-lg);
  
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`

const StartButton = styled(Link)`
  display: inline-block;
  background-color: var(--primary);
  color: white;
  padding: 1rem 2.5rem; /* Increased from 0.75rem 2rem */
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 1.125rem;
  transition: background-color var(--transition);
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`

const Features = styled.section`
  margin-bottom: 6rem; /* Increased from 4rem */
  padding: 2rem 0; /* Added padding */
`

const SectionTitle = styled.h2`
  text-align: center;
  margin-bottom: 4rem; /* Increased from 3rem */
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem; /* Increased from 2rem */
`

const FeatureCard = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  padding: 3rem; /* Increased from 2rem */
  box-shadow: var(--shadow-md);
  transition: transform var(--transition);
  
  &:hover {
    transform: translateY(-5px);
  }
`

const FeatureIcon = styled.div`
  width: 72px; /* Increased from 64px */
  height: 72px; /* Increased from 64px */
  background-color: var(--primary-light);
  border-radius: var(--radius-md);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem; /* Increased from 1.5rem */
  color: var(--primary);
`

const FeatureTitle = styled.h3`
  margin-bottom: 1.25rem; /* Increased from 1rem */
`

const FeatureDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 0; /* Added to ensure no extra margin at bottom */
`

const Process = styled.section`
  margin-bottom: 6rem; /* Increased from 4rem */
  padding: 2rem 0; /* Added padding */
`

const ProcessSteps = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem; /* Increased from 2rem */
`

const ProcessStep = styled.div`
  display: flex;
  gap: 3rem; /* Increased from 2rem */
  align-items: center;
  padding: 1rem 0; /* Added padding */
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
    padding: 0.5rem 0;
  }
`

const StepNumber = styled.div`
  width: 90px; /* Increased from 80px */
  height: 90px; /* Increased from 80px */
  border-radius: 50%;
  background-color: var(--primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.25rem; /* Increased from 2rem */
  font-weight: 700;
  flex-shrink: 0;
`

const StepContent = styled.div`
  flex: 1;
  padding: 0.5rem 0; /* Added padding */
`

const StepTitle = styled.h3`
  margin-bottom: 1rem; /* Increased from 0.5rem */
`

const StepDescription = styled.p`
  color: var(--text-light);
  margin-bottom: 0; /* Added to ensure no extra margin at bottom */
`

const Testimonials = styled.section`
  margin-bottom: 6rem; /* Increased from 4rem */
  padding: 2rem 0; /* Added padding */
`

const TestimonialGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 3rem; /* Increased from 2rem */
`

const TestimonialCard = styled.div`
  background-color: white;
  border-radius: var(--radius-lg);
  padding: 3rem; /* Increased from 2rem */
  box-shadow: var(--shadow-md);
`

const TestimonialText = styled.p`
  font-style: italic;
  margin-bottom: 2rem; /* Increased from 1.5rem */
`

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem; /* Increased from 1rem */
`

const AuthorAvatar = styled.div`
  width: 56px; /* Increased from 48px */
  height: 56px; /* Increased from 48px */
  border-radius: 50%;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const AuthorInfo = styled.div``

const AuthorName = styled.h4`
  margin-bottom: 0.5rem; /* Increased from 0.25rem */
`

const AuthorTitle = styled.p`
  color: var(--text-light);
  font-size: 0.875rem;
  margin: 0;
`

const CTA = styled.section`
  background-color: var(--primary-light);
  border-radius: var(--radius-lg);
  padding: 4rem; /* Increased from 3rem */
  text-align: center;
  margin-bottom: 2rem; /* Added margin at bottom */
  
  @media (max-width: 768px) {
    padding: 3rem; /* Increased from 2rem */
  }
`

const CTATitle = styled.h2`
  margin-bottom: 2rem; /* Increased from 1.5rem */
`

const CTADescription = styled.p`
  max-width: 600px;
  margin: 0 auto 3rem; /* Increased bottom margin from 2rem */
  color: var(--text-light);
`

function Home() {
  return (
    <>
      <Hero>
        <HeroContent>
          <HeroTitle>Find Your Perfect Mattress Match</HeroTitle>
          <HeroSubtitle>
            Take our scientifically-backed quiz to discover the ideal mattress for your unique sleep needs, body type, and preferences.
          </HeroSubtitle>
          <StartButton to="/quiz">Take the Quiz</StartButton>
        </HeroContent>
        <HeroImage>
          <img src="https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg" alt="Comfortable mattress" />
        </HeroImage>
      </Hero>
      
      <Features>
        <SectionTitle>Why Our Mattress Quiz Works</SectionTitle>
        <FeatureGrid>
          <FeatureCard>
            <FeatureIcon>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16.5 7.58008V8.58008C16.5 9.40008 15.83 10.0801 15 10.0801H9C8.18 10.0801 7.5 9.41008 7.5 8.58008V7.58008C7.5 6.76008 8.17 6.08008 9 6.08008H15C15.83 6.08008 16.5 6.76008 16.5 7.58008Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.13599 14H8.14799" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14H12.012" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.864 14H15.876" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8.13599 17.5H8.14799" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 17.5H12.012" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15.864 17.5H15.876" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Science-Backed Questions</FeatureTitle>
            <FeatureDescription>
              Our quiz is designed by sleep experts and based on scientific research to accurately assess your unique sleep needs.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.75 12L10.58 14.83L16.25 9.17004" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Personalized Recommendations</FeatureTitle>
            <FeatureDescription>
              Get mattress suggestions tailored specifically to your sleep position, body type, pain points, and personal preferences.
            </FeatureDescription>
          </FeatureCard>
          
          <FeatureCard>
            <FeatureIcon>
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 8.5C22 12.09 19.09 15 15.5 15C15.33 15 15.15 14.99 14.98 14.98C14.73 11.81 12.19 9.26999 9.01999 9.01999C9.00999 8.84999 9 8.67 9 8.5C9 4.91 11.91 2 15.5 2C19.09 2 22 4.91 22 8.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M15 15.5C15 19.09 12.09 22 8.5 22C4.91 22 2 19.09 2 15.5C2 11.91 4.91 9 8.5 9C8.67 9 8.84999 9.00999 9.01999 9.01999C12.19 9.26999 14.73 11.81 14.98 14.98C14.99 15.15 15 15.33 15 15.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.62 14.62L8.5 13L9.38 14.62L11 15.5L9.38 16.38L8.5 18L7.62 16.38L6 15.5L7.62 14.62Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </FeatureIcon>
            <FeatureTitle>Comprehensive Comparison</FeatureTitle>
            <FeatureDescription>
              Compare top-rated mattresses side by side with detailed information on firmness, materials, price, and more.
            </FeatureDescription>
          </FeatureCard>
        </FeatureGrid>
      </Features>
      
      <Process>
        <SectionTitle>How It Works</SectionTitle>
        <ProcessSteps>
          <ProcessStep>
            <StepNumber>1</StepNumber>
            <StepContent>
              <StepTitle>Take the Quiz</StepTitle>
              <StepDescription>
                Answer a series of questions about your sleep habits, preferences, and any pain points you experience during sleep.
              </StepDescription>
            </StepContent>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>2</StepNumber>
            <StepContent>
              <StepTitle>Get Personalized Results</StepTitle>
              <StepDescription>
                Our algorithm analyzes your responses to determine your ideal mattress firmness, type, and features based on scientific research.
              </StepDescription>
            </StepContent>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>3</StepNumber>
            <StepContent>
              <StepTitle>Compare Recommended Mattresses</StepTitle>
              <StepDescription>
                Review a curated list of mattresses that match your needs, with detailed information and side-by-side comparisons.
              </StepDescription>
            </StepContent>
          </ProcessStep>
          
          <ProcessStep>
            <StepNumber>4</StepNumber>
            <StepContent>
              <StepTitle>Make an Informed Decision</StepTitle>
              <StepDescription>
                Choose the perfect mattress with confidence, knowing it's backed by science and tailored to your specific sleep needs.
              </StepDescription>
            </StepContent>
          </ProcessStep>
        </ProcessSteps>
      </Process>
      
      <Testimonials>
        <SectionTitle>What Our Users Say</SectionTitle>
        <TestimonialGrid>
          <TestimonialCard>
            <TestimonialText>
              "After years of waking up with back pain, the quiz recommended a medium-firm hybrid mattress that completely changed my sleep quality. I'm finally waking up pain-free!"
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>
                <img src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg" alt="Michael T." />
              </AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Michael T.</AuthorName>
                <AuthorTitle>Back Pain Sufferer</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              "As a side sleeper with shoulder pain, I was skeptical about finding the right mattress. The quiz recommended a memory foam option that perfectly cradles my pressure points."
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>
                <img src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" alt="Sarah L." />
              </AuthorAvatar>
              <AuthorInfo>
                <AuthorName>Sarah L.</AuthorName>
                <AuthorTitle>Side Sleeper</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
          
          <TestimonialCard>
            <TestimonialText>
              "My partner and I have completely different sleep preferences. This quiz helped us find a mattress that works for both of us, with the right balance of support and comfort."
            </TestimonialText>
            <TestimonialAuthor>
              <AuthorAvatar>
                <img src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg" alt="James & Emma K." />
              </AuthorAvatar>
              <AuthorInfo>
                <AuthorName>James & Emma K.</AuthorName>
                <AuthorTitle>Couple with Different Needs</AuthorTitle>
              </AuthorInfo>
            </TestimonialAuthor>
          </TestimonialCard>
        </TestimonialGrid>
      </Testimonials>
      
      <CTA>
        <CTATitle>Ready to Find Your Perfect Mattress?</CTATitle>
        <CTADescription>
          Take our quick quiz and get personalized recommendations based on your unique sleep profile. It only takes a few minutes!
        </CTADescription>
        <StartButton to="/quiz">Start the Quiz</StartButton>
      </CTA>
    </>
  )
}

export default Home
