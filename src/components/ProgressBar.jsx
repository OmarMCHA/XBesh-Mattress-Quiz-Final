import React from 'react'
import styled from 'styled-components'

const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem; /* Kept at 3rem */
`

const ProgressTrack = styled.div`
  width: 100%;
  height: 0.75rem; /* Increased from 0.625rem to 0.75rem */
  background-color: var(--primary-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
`

const ProgressFill = styled.div`
  height: 100%;
  background-color: var(--primary);
  border-radius: var(--radius-lg);
  transition: width 0.3s ease;
  width: ${props => props.progress}%;
`

const ProgressInfo = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 0.875rem; /* Increased from 0.75rem */
  font-size: 1.05rem; /* Increased from 0.9rem */
  color: var(--text-light);
`

function ProgressBar({ current, total, progress }) {
  return (
    <ProgressContainer>
      <ProgressTrack>
        <ProgressFill progress={progress} />
      </ProgressTrack>
      <ProgressInfo>
        <span>Question {current + 1} of {total}</span>
        <span>{Math.round(progress)}% Complete</span>
      </ProgressInfo>
    </ProgressContainer>
  )
}

export default ProgressBar
