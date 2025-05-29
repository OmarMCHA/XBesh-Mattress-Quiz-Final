import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { useQuiz } from '../../context/QuizContext'

const DashboardContainer = styled.div`
  padding: 1rem;
`

const Header = styled.h1`
  margin-bottom: 2rem;
  font-size: 1.8rem;
  color: var(--text-dark);
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ResetButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c0392b;
  }
`

const ConfirmationModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

const ModalContent = styled.div`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
`

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-dark);
`

const ModalText = styled.p`
  margin-bottom: 1.5rem;
  color: var(--text-light);
`

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
`

const CancelButton = styled.button`
  background-color: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c0c0c0;
  }
`

const ConfirmButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #c0392b;
  }
`

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`

const StatCard = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`

const StatTitle = styled.h3`
  font-size: 0.9rem;
  color: var(--text-light);
  margin-bottom: 0.5rem;
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--primary);
`

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
  height: 400px;
`

const ChartTitle = styled.h2`
  font-size: 1.2rem;
  color: var(--text-dark);
  margin-bottom: 1.5rem;
`

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 1200px) {
    grid-template-columns: 1fr;
  }
`

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

function Dashboard() {
  const { resetStatistics } = useQuiz();
  const [showConfirmation, setShowConfirmation] = useState(false);
  
  // Get actual quiz statistics from localStorage
  const [stats, setStats] = useState({
    totalQuizzes: 0,
    completionRate: 0,
    avgTimeMinutes: 0,
    buyButtonClicks: 0
  });
  
  const [mattressData, setMattressData] = useState([]);
  const [dropoffData, setDropoffData] = useState([]);
  const [firmnessData, setFirmnessData] = useState([]);
  const [answerData, setAnswerData] = useState([]);

  useEffect(() => {
    // Load statistics from localStorage
    const savedStats = localStorage.getItem('quizStats');
    if (savedStats) {
      const parsedStats = JSON.parse(savedStats);
      
      // Calculate completion rate
      const completionRate = parsedStats.totalQuizzes > 0 
        ? Math.round((parsedStats.completedQuizzes / parsedStats.totalQuizzes) * 100) 
        : 0;
      
      // Set basic statistics
      setStats({
        totalQuizzes: parsedStats.totalQuizzes || 0,
        completionRate: completionRate,
        avgTimeMinutes: 4.2, // This would need actual tracking of completion times
        buyButtonClicks: parsedStats.buyButtonClicks || 0
      });
      
      // Process mattress recommendation data
      const mattressRecommendations = parsedStats.recommendedMattresses || {};
      const mattressChartData = Object.entries(mattressRecommendations)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
      
      // If we have more than 5 mattresses, combine the rest into "Others"
      if (mattressChartData.length > 5) {
        const topMattresses = mattressChartData.slice(0, 5);
        const otherMattresses = mattressChartData.slice(5);
        const otherValue = otherMattresses.reduce((sum, item) => sum + item.value, 0);
        
        setMattressData([...topMattresses, { name: 'Others', value: otherValue }]);
      } else {
        setMattressData(mattressChartData);
      }
      
      // Process drop-off data
      const dropOffs = parsedStats.dropOffs || {};
      const dropoffChartData = Object.entries(dropOffs)
        .map(([questionId, dropoffs]) => {
          // Extract question number from ID (assuming format like "sleepPosition", "weight", etc.)
          // This would need to be adjusted based on your actual question IDs
          const questionName = questionId.charAt(0).toUpperCase() + questionId.slice(1);
          return { name: `Q: ${questionName}`, dropoffs };
        })
        .sort((a, b) => b.dropoffs - a.dropoffs);
      
      setDropoffData(dropoffChartData);
      
      // Process firmness preference data
      const firmnessPref = parsedStats.firmnessPref || {};
      const firmnessLabels = {
        soft: 'Soft (3-4)',
        mediumSoft: 'Medium-Soft (4-5)',
        medium: 'Medium (5-6)',
        mediumFirm: 'Medium-Firm (6-7)',
        firm: 'Firm (7-8)'
      };
      
      const firmnessChartData = Object.entries(firmnessPref)
        .map(([firmness, value]) => ({ 
          name: firmnessLabels[firmness] || firmness, 
          value 
        }))
        .sort((a, b) => b.value - a.value);
      
      setFirmnessData(firmnessChartData);
      
      // Process answer statistics to find top preferences
      const answerStats = parsedStats.answerStats || {};
      
      // Group answers by categories
      const categories = {
        'Side Sleepers': answerStats['sleepPosition_side'] || 0,
        'Back Pain': (answerStats['painPoints_back'] || 0) + (answerStats['painPoints_lowerBack'] || 0),
        'Hot Sleepers': answerStats['temperature_hot'] || 0,
        'Motion Isolation': answerStats['motionTransfer_veryImportant'] || 0,
        'Eco-Friendly': answerStats['ecoFriendly_veryImportant'] || 0
      };
      
      const answerChartData = Object.entries(categories)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value);
      
      setAnswerData(answerChartData);
    }
  }, []);

  const handleResetClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmReset = () => {
    // Call the resetStatistics function from context
    resetStatistics();
    
    // Update local state to reflect reset
    setStats({
      totalQuizzes: 0,
      completionRate: 0,
      avgTimeMinutes: 0,
      buyButtonClicks: 0
    });
    
    setMattressData([]);
    setDropoffData([]);
    setFirmnessData([]);
    setAnswerData([]);
    
    setShowConfirmation(false);
  };

  const handleCancelReset = () => {
    setShowConfirmation(false);
  };

  // Ensure we have default data if nothing is loaded
  useEffect(() => {
    if (mattressData.length === 0) {
      setMattressData([
        { name: 'No Data', value: 1 }
      ]);
    }
    
    if (dropoffData.length === 0) {
      setDropoffData([
        { name: 'No Data', dropoffs: 0 }
      ]);
    }
    
    if (firmnessData.length === 0) {
      setFirmnessData([
        { name: 'No Data', value: 1 }
      ]);
    }
    
    if (answerData.length === 0) {
      setAnswerData([
        { name: 'No Data', value: 1 }
      ]);
    }
  }, [mattressData, dropoffData, firmnessData, answerData]);

  return (
    <DashboardContainer>
      <Header>
        Dashboard
        <ResetButton onClick={handleResetClick}>Reset Statistics</ResetButton>
      </Header>
      
      {showConfirmation && (
        <ConfirmationModal>
          <ModalContent>
            <ModalTitle>Reset Statistics</ModalTitle>
            <ModalText>
              Are you sure you want to reset all statistics? This action cannot be undone.
            </ModalText>
            <ModalButtons>
              <CancelButton onClick={handleCancelReset}>Cancel</CancelButton>
              <ConfirmButton onClick={handleConfirmReset}>Reset</ConfirmButton>
            </ModalButtons>
          </ModalContent>
        </ConfirmationModal>
      )}
      
      <StatsGrid>
        <StatCard>
          <StatTitle>Total Quizzes Taken</StatTitle>
          <StatValue>{stats.totalQuizzes}</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Completion Rate</StatTitle>
          <StatValue>{stats.completionRate}%</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Avg. Completion Time</StatTitle>
          <StatValue>{stats.avgTimeMinutes} min</StatValue>
        </StatCard>
        
        <StatCard>
          <StatTitle>Buy Button Clicks</StatTitle>
          <StatValue>{stats.buyButtonClicks}</StatValue>
        </StatCard>
      </StatsGrid>
      
      <ChartGrid>
        <ChartContainer>
          <ChartTitle>Recommended Mattresses</ChartTitle>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={mattressData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {mattressData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        <ChartContainer>
          <ChartTitle>Firmness Preferences</ChartTitle>
          <ResponsiveContainer width="100%" height="90%">
            <PieChart>
              <Pie
                data={firmnessData}
                cx="50%"
                cy="50%"
                labelLine={true}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {firmnessData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </ChartGrid>
      
      <ChartContainer>
        <ChartTitle>Quiz Drop-off by Question</ChartTitle>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={dropoffData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="dropoffs" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
      
      <ChartContainer>
        <ChartTitle>Top User Preferences</ChartTitle>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={answerData}
            layout="vertical"
            margin={{
              top: 5,
              right: 30,
              left: 100,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis dataKey="name" type="category" />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </DashboardContainer>
  )
}

export default Dashboard
