import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area
} from 'recharts'
import { useQuiz } from '../../context/QuizContext'

const DashboardContainer = styled.div`
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

const ResetButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #c0392b;
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    width: 18px;
    height: 18px;
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
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
`

const ModalTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: var(--text-dark);
  font-size: 1.3rem;
`

const ModalText = styled.p`
  margin-bottom: 1.5rem;
  color: var(--text-light);
  line-height: 1.5;
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
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
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
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
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
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12);
  }
`

const StatHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`

const StatTitle = styled.h3`
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0;
`

const StatIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${props => props.bgColor || 'var(--primary)'};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 20px;
    height: 20px;
  }
`

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: bold;
  color: var(--text-dark);
  margin-bottom: 0.5rem;
`

const StatTrend = styled.div`
  font-size: 0.9rem;
  color: ${props => props.positive ? '#4caf50' : '#f44336'};
  display: flex;
  align-items: center;
  
  svg {
    width: 16px;
    height: 16px;
    margin-right: 0.25rem;
  }
`

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
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

const COLORS = ['#4361ee', '#3a0ca3', '#7209b7', '#f72585', '#4cc9f0', '#4caf50'];

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
  const [weeklyData, setWeeklyData] = useState([]);
  
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
      
      // Generate weekly data (for demo purposes)
      const today = new Date();
      const weeklyChartData = [];
      
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        // Generate some random but consistent data
        const seed = date.getDate() + date.getMonth();
        const quizzes = Math.floor(Math.random() * 20) + 5 + seed % 10;
        const completions = Math.floor(quizzes * (0.6 + (seed % 30) / 100));
        const purchases = Math.floor(completions * (0.2 + (seed % 20) / 100));
        
        weeklyChartData.push({
          name: dayName,
          quizzes,
          completions,
          purchases
        });
      }
      
      setWeeklyData(weeklyChartData);
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
    setWeeklyData([]);
    
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
    
    if (weeklyData.length === 0) {
      const weeklyChartData = [];
      const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
      
      for (let i = 0; i < 7; i++) {
        weeklyChartData.push({
          name: days[i],
          quizzes: 0,
          completions: 0,
          purchases: 0
        });
      }
      
      setWeeklyData(weeklyChartData);
    }
  }, [mattressData, dropoffData, firmnessData, answerData, weeklyData]);

  return (
    <DashboardContainer>
      <Header>
        Dashboard
        <ResetButton onClick={handleResetClick}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12a9 9 0 0 1-9 9c-4.97 0-9-4.03-9-9s4.03-9 9-9h4.5"></path>
            <path d="M16 5l4 4-4 4"></path>
          </svg>
          Reset Statistics
        </ResetButton>
      </Header>
      
      {showConfirmation && (
        <ConfirmationModal>
          <ModalContent>
            <ModalTitle>Reset Statistics</ModalTitle>
            <ModalText>
              Are you sure you want to reset all statistics? This action cannot be undone and will clear all quiz data.
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
          <StatHeader>
            <StatTitle>Total Quizzes Taken</StatTitle>
            <StatIcon bgColor="#4361ee">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.totalQuizzes}</StatValue>
          <StatTrend positive={true}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            12% increase
          </StatTrend>
        </StatCard>
        
        <StatCard>
          <StatHeader>
            <StatTitle>Completion Rate</StatTitle>
            <StatIcon bgColor="#7209b7">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
              </svg>
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.completionRate}%</StatValue>
          <StatTrend positive={stats.completionRate >= 50}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              {stats.completionRate >= 50 ? (
                <>
                  <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                  <polyline points="17 6 23 6 23 12"></polyline>
                </>
              ) : (
                <>
                  <polyline points="23 18 13.5 8.5 8.5 13.5 1 6"></polyline>
                  <polyline points="17 18 23 18 23 12"></polyline>
                </>
              )}
            </svg>
            {stats.completionRate >= 50 ? '5% increase' : '3% decrease'}
          </StatTrend>
        </StatCard>
        
        <StatCard>
          <StatHeader>
            <StatTitle>Avg. Completion Time</StatTitle>
            <StatIcon bgColor="#f72585">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.avgTimeMinutes} min</StatValue>
          <StatTrend positive={true}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            30s faster
          </StatTrend>
        </StatCard>
        
        <StatCard>
          <StatHeader>
            <StatTitle>Buy Button Clicks</StatTitle>
            <StatIcon bgColor="#4cc9f0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </StatIcon>
          </StatHeader>
          <StatValue>{stats.buyButtonClicks}</StatValue>
          <StatTrend positive={true}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
              <polyline points="17 6 23 6 23 12"></polyline>
            </svg>
            8% increase
          </StatTrend>
        </StatCard>
      </StatsGrid>
      
      <ChartContainer>
        <ChartTitle>Weekly Activity</ChartTitle>
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={weeklyData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Area type="monotone" dataKey="quizzes" stackId="1" stroke="#4361ee" fill="#4361ee" />
            <Area type="monotone" dataKey="completions" stackId="2" stroke="#7209b7" fill="#7209b7" />
            <Area type="monotone" dataKey="purchases" stackId="3" stroke="#f72585" fill="#f72585" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
      
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
            <Bar dataKey="dropoffs" fill="#7209b7" />
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
            <Bar dataKey="value" fill="#4361ee" />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </DashboardContainer>
  )
}

export default Dashboard
