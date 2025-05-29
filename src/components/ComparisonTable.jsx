import React from 'react'
import styled from 'styled-components'

const TableContainer = styled.div`
  overflow-x: auto;
  margin: 1.75rem 0; /* Increased from 1.5rem */
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: white;
  table-layout: fixed;
`

const TableHead = styled.thead`
  background-color: var(--primary-light);
  
  th {
    position: sticky;
    top: 0;
    background-color: var(--primary-light);
    z-index: 10;
  }
`

const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: var(--background-alt);
  }
`

const TableRow = styled.tr`
  &:hover {
    background-color: var(--primary-light);
  }
`

const TableHeader = styled.th`
  padding: 1rem; /* Increased from 0.75rem */
  text-align: left;
  font-weight: 600;
  color: var(--primary-dark);
  border-bottom: 2px solid var(--primary);
  white-space: nowrap;
  font-size: 1.1rem; /* Added explicit font size */
  
  &:first-child {
    position: sticky;
    left: 0;
    background-color: var(--primary-light);
    z-index: 20;
    width: 140px; /* Increased from 120px */
  }
  
  &:not(:first-child) {
    width: 180px; /* Increased from 150px */
  }
`

const TableCell = styled.td`
  padding: 1rem; /* Increased from 0.75rem */
  border-bottom: 1px solid var(--border);
  font-size: 1.05rem; /* Added explicit font size */
  
  &:first-child {
    font-weight: 600;
    position: sticky;
    left: 0;
    background-color: inherit;
    z-index: 5;
    width: 140px; /* Increased from 120px */
  }
  
  ${TableRow}:hover &:first-child {
    background-color: var(--primary-light);
  }
`

const FirmnessMeter = styled.div`
  width: 100%;
  height: 10px; /* Increased from 8px */
  background-color: var(--background-alt);
  border-radius: var(--radius-lg);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    height: 18px; /* Increased from 16px */
    width: 10px; /* Increased from 8px */
    background-color: var(--primary);
    border-radius: 4px;
    top: 50%;
    left: ${props => (props.value / 10) * 100}%;
    transform: translate(-50%, -50%);
  }
`

const FeaturesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

const FeatureItem = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0.375rem; /* Increased from 0.25rem */
  font-size: 1rem; /* Increased from 0.875rem */
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px; /* Increased from 6px */
    height: 8px; /* Increased from 6px */
    border-radius: 50%;
    background-color: var(--primary);
    margin-right: 0.625rem; /* Increased from 0.5rem */
  }
`

const ViewButton = styled.a`
  background-color: var(--primary);
  color: white;
  padding: 0.625rem 1.25rem; /* Increased from 0.5rem 1rem */
  border-radius: var(--radius-md);
  font-weight: 500;
  text-decoration: none;
  transition: background-color var(--transition);
  display: inline-block;
  white-space: nowrap;
  font-size: 1.05rem; /* Added explicit font size */
  
  &:hover {
    background-color: var(--primary-dark);
    color: white;
  }
`

const Stars = styled.div`
  display: flex;
  color: #FFB900;
  margin-right: 0.5rem;
`

const ReviewCount = styled.div`
  color: var(--text-light);
  font-size: 0.9rem;
  margin-top: 0.25rem;
`

function ComparisonTable({ mattresses }) {
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
    <TableContainer>
      <Table>
        <TableHead>
          <tr>
            <TableHeader>Comparison</TableHeader>
            {mattresses.map(mattress => (
              <TableHeader key={mattress.id}>{mattress.name}</TableHeader>
            ))}
          </tr>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Brand</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>{mattress.brand}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Type</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>{mattress.type}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Rating</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <Stars>{renderStars(mattress.rating)}</Stars>
                <ReviewCount>{mattress.rating.toFixed(1)} ({formatReviewCount(mattress.reviewCount)})</ReviewCount>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Firmness</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                {mattress.firmness < 4 ? 'Soft' : 
                 mattress.firmness < 6 ? 'Medium Soft' :
                 mattress.firmness < 7 ? 'Medium' :
                 mattress.firmness < 8 ? 'Medium Firm' : 'Firm'} 
                ({mattress.firmness}/10)
                <FirmnessMeter value={mattress.firmness} />
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Price (Queen)</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                {new Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0
                }).format(mattress.price)}
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Trial Period</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>{mattress.trialPeriod}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Warranty</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>{mattress.warranty}</TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Key Features</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <FeaturesList>
                  {mattress.features.map((feature, index) => (
                    <FeatureItem key={index}>{feature}</FeatureItem>
                  ))}
                </FeaturesList>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Ideal For</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <FeaturesList>
                  {mattress.idealFor.map((ideal, index) => (
                    <FeatureItem key={index}>{ideal}</FeatureItem>
                  ))}
                </FeaturesList>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Pros</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <FeaturesList>
                  {mattress.pros.slice(0, 3).map((pro, index) => (
                    <FeatureItem key={index}>{pro}</FeatureItem>
                  ))}
                </FeaturesList>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Cons</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <FeaturesList>
                  {mattress.cons.slice(0, 2).map((con, index) => (
                    <FeatureItem key={index}>{con}</FeatureItem>
                  ))}
                </FeaturesList>
              </TableCell>
            ))}
          </TableRow>
          <TableRow>
            <TableCell>Link</TableCell>
            {mattresses.map(mattress => (
              <TableCell key={mattress.id}>
                <ViewButton href={mattress.url} target="_blank" rel="noopener noreferrer">
                  View Details
                </ViewButton>
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ComparisonTable
