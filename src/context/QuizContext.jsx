import React, { createContext, useContext, useState, useEffect } from 'react'
import { getQuizQuestions } from '../services/quizService'
import { getMattresses } from '../services/mattressService'
import { saveQuizStats, getQuizStats } from '../services/quizService'
import { quizQuestions } from '../data/quizQuestions' // Import local data as fallback

const QuizContext = createContext()

export function useQuiz() {
  return useContext(QuizContext)
}

export function QuizProvider({ children }) {
  const [quizQuestions, setQuizQuestions] = useState([])
  const [mattressData, setMattressData] = useState([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  const [quizCompleted, setQuizCompleted] = useState(false)
  const [quizStartTime, setQuizStartTime] = useState(null)
  const [quizStats, setQuizStats] = useState({
    totalQuizzes: 0,
    completedQuizzes: 0,
    buyButtonClicks: 0,
    dropOffs: {},
    recommendedMattresses: {},
    firmnessPref: {},
    answerStats: {}
  })
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  // Load data and stats on initial render
  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true)
      try {
        // Load quiz questions
        const questions = await getQuizQuestions()
        
        if (questions && questions.length > 0) {
          setQuizQuestions(questions)
        } else {
          // If no questions from API, use local fallback data
          console.log('Using local quiz data as fallback')
          setQuizQuestions(quizQuestions)
        }
        
        // Load mattress data
        const mattresses = await getMattresses()
        if (mattresses) {
          setMattressData(mattresses)
        }
        
        // Load quiz stats
        const stats = await getQuizStats()
        if (stats) {
          setQuizStats(stats)
        } else {
          // If no stats in database, try localStorage
          const savedStats = localStorage.getItem('quizStats')
          if (savedStats) {
            const parsedStats = JSON.parse(savedStats)
            setQuizStats(parsedStats)
            // Save to database for future use
            await saveQuizStats(parsedStats)
          }
        }
      } catch (error) {
        console.error('Error loading quiz data:', error)
        // Use local fallback data if API fails
        console.log('Using local quiz data as fallback due to error')
        setQuizQuestions(quizQuestions)
      } finally {
        setIsLoading(false)
      }
      
      // Check admin status
      checkAdminStatus()
    }
    
    loadData()
  }, [])

  // Save stats to database and localStorage whenever they change
  useEffect(() => {
    const saveStats = async () => {
      try {
        await saveQuizStats(quizStats)
      } catch (error) {
        console.error('Error saving quiz stats to database:', error)
      }
      // Always save to localStorage as backup
      localStorage.setItem('quizStats', JSON.stringify(quizStats))
    }
    
    // Only save if stats have been initialized (not on first render)
    if (quizStats.totalQuizzes > 0) {
      saveStats()
    }
  }, [quizStats])

  // Set quiz start time when component mounts
  useEffect(() => {
    setQuizStartTime(new Date())
    
    // Increment total quizzes
    setQuizStats(prev => ({
      ...prev,
      totalQuizzes: prev.totalQuizzes + 1
    }))
  }, [])

  const currentQuestion = quizQuestions.length > 0 ? quizQuestions[currentQuestionIndex] : null
  const totalQuestions = quizQuestions.length
  const progress = totalQuestions > 0 ? (currentQuestionIndex / totalQuestions) * 100 : 0

  function handleAnswer(questionId, answer) {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }))
    
    // Track answer statistics
    setQuizStats(prev => {
      const answerStats = {...prev.answerStats}
      
      // Handle different answer types (single select vs multi-select)
      if (Array.isArray(answer)) {
        answer.forEach(ans => {
          const key = `${questionId}_${ans}`
          answerStats[key] = (answerStats[key] || 0) + 1
        })
      } else {
        const key = `${questionId}_${answer}`
        answerStats[key] = (answerStats[key] || 0) + 1
      }
      
      return {
        ...prev,
        answerStats
      }
    })
  }

  function nextQuestion() {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
    } else {
      calculateResults()
    }
  }

  function prevQuestion() {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    }
  }

  function resetQuiz() {
    setCurrentQuestionIndex(0)
    setAnswers({})
    setResults(null)
    setQuizCompleted(false)
    setQuizStartTime(new Date())
    
    // Increment total quizzes
    setQuizStats(prev => ({
      ...prev,
      totalQuizzes: prev.totalQuizzes + 1
    }))
  }

  function resetStatistics() {
    // Reset all statistics to zero
    const resetStats = {
      totalQuizzes: 0,
      completedQuizzes: 0,
      buyButtonClicks: 0,
      dropOffs: {},
      recommendedMattresses: {},
      firmnessPref: {},
      answerStats: {}
    }
    
    setQuizStats(resetStats)
    
    // Save to database and localStorage
    saveQuizStats(resetStats)
  }

  function trackDropOff() {
    // Track which question users drop off at
    setQuizStats(prev => {
      const dropOffs = {...prev.dropOffs}
      const questionId = currentQuestion?.id
      if (questionId) {
        dropOffs[questionId] = (dropOffs[questionId] || 0) + 1
      }
      return {
        ...prev,
        dropOffs
      }
    })
  }

  function trackBuyButtonClick(mattressId) {
    // Track buy button clicks
    setQuizStats(prev => ({
      ...prev,
      buyButtonClicks: prev.buyButtonClicks + 1
    }))
  }

  function calculateResults() {
    // Initialize scores for different mattress types and firmness levels
    const scores = {
      firmness: {
        soft: 0,
        mediumSoft: 0,
        medium: 0,
        mediumFirm: 0,
        firm: 0
      },
      type: {
        memory: 0,
        latex: 0,
        innerspring: 0,
        hybrid: 0,
        airbed: 0,
        organic: 0
      },
      features: {
        cooling: 0,
        pressureRelief: 0,
        edgeSupport: 0,
        motionIsolation: 0,
        backSupport: 0,
        durability: 0,
        hypoallergenic: 0,
        ecoFriendly: 0,
        adjustable: 0
      }
    }

    // Calculate scores based on answers
    if (answers.sleepPosition) {
      switch (answers.sleepPosition) {
        case 'side':
          scores.firmness.soft += 2;
          scores.firmness.mediumSoft += 3;
          scores.firmness.medium += 2;
          scores.type.memory += 2;
          scores.features.pressureRelief += 3;
          break;
        case 'back':
          scores.firmness.medium += 3;
          scores.firmness.mediumFirm += 3;
          scores.type.latex += 2;
          scores.type.hybrid += 2;
          scores.features.backSupport += 3;
          break;
        case 'stomach':
          scores.firmness.mediumFirm += 3;
          scores.firmness.firm += 3;
          scores.type.innerspring += 2;
          scores.features.backSupport += 3;
          break;
        case 'combination':
          scores.firmness.medium += 3;
          scores.type.hybrid += 3;
          scores.features.pressureRelief += 2;
          scores.features.backSupport += 2;
          break;
      }
    }

    if (answers.weight) {
      switch (answers.weight) {
        case 'light':
          scores.firmness.soft += 2;
          scores.firmness.mediumSoft += 2;
          break;
        case 'average':
          scores.firmness.medium += 3;
          break;
        case 'heavy':
          scores.firmness.mediumFirm += 2;
          scores.firmness.firm += 3;
          scores.type.hybrid += 2;
          scores.type.innerspring += 1;
          scores.features.edgeSupport += 2;
          break;
      }
    }

    if (answers.bodyType) {
      switch (answers.bodyType) {
        case 'broadShoulders':
          scores.firmness.mediumSoft += 1;
          scores.type.memory += 2;
          scores.features.pressureRelief += 2;
          break;
        case 'wideHips':
          scores.firmness.mediumSoft += 1;
          scores.type.memory += 2;
          scores.features.pressureRelief += 2;
          break;
        case 'average':
        case 'evenlyDistributed':
          scores.firmness.medium += 1;
          break;
      }
    }

    if (answers.painPoints) {
      if (answers.painPoints.includes('lowerBack')) {
        scores.firmness.mediumFirm += 2;
        scores.type.latex += 2;
        scores.features.backSupport += 3;
      }
      if (answers.painPoints.includes('shoulderHip')) {
        scores.firmness.soft += 1;
        scores.firmness.mediumSoft += 2;
        scores.type.memory += 3;
        scores.features.pressureRelief += 3;
      }
      if (answers.painPoints.includes('neck')) {
        scores.firmness.mediumFirm += 1;
        scores.type.latex += 1;
        scores.features.backSupport += 2;
      }
      if (answers.painPoints.includes('none')) {
        scores.firmness.medium += 1;
      }
    }

    if (answers.medicalConditions) {
      if (answers.medicalConditions.includes('chronicPain')) {
        scores.firmness.mediumSoft += 2;
        scores.type.memory += 3;
        scores.features.pressureRelief += 3;
      }
      if (answers.medicalConditions.includes('arthritis')) {
        scores.firmness.mediumSoft += 2;
        scores.type.memory += 2;
        scores.features.pressureRelief += 3;
      }
      if (answers.medicalConditions.includes('scoliosis')) {
        scores.firmness.mediumFirm += 2;
        scores.type.latex += 2;
        scores.features.backSupport += 3;
      }
      if (answers.medicalConditions.includes('sleepApnea')) {
        scores.type.airbed += 2;
        scores.features.adjustable += 3;
      }
    }

    if (answers.temperature) {
      switch (answers.temperature) {
        case 'hot':
          scores.type.innerspring += 2;
          scores.type.hybrid += 2;
          scores.type.latex += 1;
          scores.features.cooling += 3;
          break;
        case 'cold':
          scores.type.memory += 2;
          break;
        case 'neutral':
          // No specific adjustment needed
          break;
      }
    }

    if (answers.bedSharing) {
      switch (answers.bedSharing) {
        case 'yes':
          scores.features.motionIsolation += 2;
          scores.features.edgeSupport += 1;
          break;
        case 'yesDifferent':
          scores.type.airbed += 2;
          scores.features.adjustable += 2;
          scores.features.motionIsolation += 2;
          break;
      }
    }

    if (answers.partnerMovement) {
      switch (answers.partnerMovement) {
        case 'very':
          scores.type.memory += 3;
          scores.features.motionIsolation += 3;
          break;
        case 'somewhat':
          scores.type.memory += 1;
          scores.type.hybrid += 1;
          scores.features.motionIsolation += 2;
          break;
        case 'not':
          scores.type.innerspring += 1;
          break;
      }
    }

    if (answers.budget) {
      // Adjust recommendations based on budget constraints
      switch (answers.budget) {
        case 'under500':
          scores.type.memory += 1; // Budget memory foam options
          scores.type.innerspring += 1; // Budget innerspring options
          break;
        case '500to1000':
          scores.type.memory += 1;
          scores.type.hybrid += 1;
          break;
        case '1000to1500':
          scores.type.hybrid += 1;
          scores.type.latex += 1;
          break;
        case '1500to2000':
          scores.type.latex += 1;
          scores.type.hybrid += 1;
          scores.type.airbed += 1;
          break;
        case 'over2000':
          scores.type.organic += 2;
          scores.type.airbed += 2;
          scores.features.durability += 2;
          break;
      }
    }

    if (answers.durability) {
      switch (answers.durability) {
        case '5to7':
          // Standard durability, no adjustments needed
          break;
        case '7to10':
          scores.type.latex += 1;
          scores.type.hybrid += 1;
          scores.features.durability += 1;
          break;
        case '10plus':
          scores.type.latex += 2;
          scores.type.organic += 1;
          scores.features.durability += 3;
          break;
      }
    }

    if (answers.mattressFeel) {
      switch (answers.mattressFeel) {
        case 'bouncy':
          scores.type.innerspring += 3;
          scores.type.latex += 2;
          break;
        case 'sinking':
          scores.type.memory += 3;
          scores.firmness.soft += 1;
          scores.firmness.mediumSoft += 1;
          break;
        case 'responsive':
          scores.type.latex += 3;
          scores.type.hybrid += 2;
          break;
        case 'balanced':
          scores.type.hybrid += 3;
          scores.firmness.medium += 2;
          break;
      }
    }

    if (answers.preferredFirmness) {
      switch (answers.preferredFirmness) {
        case 'soft':
          scores.firmness.soft += 3;
          scores.firmness.mediumSoft += 2;
          break;
        case 'medium':
          scores.firmness.medium += 3;
          break;
        case 'firm':
          scores.firmness.mediumFirm += 2;
          scores.firmness.firm += 3;
          break;
      }
    }

    if (answers.allergies) {
      if (answers.allergies.includes('dustMites')) {
        scores.type.latex += 2;
        scores.type.memory += 1;
        scores.features.hypoallergenic += 2;
      }
      if (answers.allergies.includes('latex')) {
        scores.type.latex -= 5; // Strong negative for latex allergy
        scores.type.memory += 2;
        scores.type.innerspring += 1;
      }
      if (answers.allergies.includes('chemicals')) {
        scores.type.organic += 3;
        scores.features.hypoallergenic += 2;
        scores.type.memory -= 2; // Potential off-gassing
      }
      if (answers.allergies.includes('multiple')) {
        scores.type.organic += 3;
        scores.features.hypoallergenic += 3;
      }
    }

    if (answers.motionTransfer) {
      switch (answers.motionTransfer) {
        case 'notImportant':
          // No adjustment needed
          break;
        case 'somewhatImportant':
          scores.features.motionIsolation += 2;
          scores.type.memory += 1;
          scores.type.hybrid += 1;
          break;
        case 'veryImportant':
          scores.features.motionIsolation += 3;
          scores.type.memory += 3;
          scores.type.innerspring -= 1; // Innerspring typically has more motion transfer
          break;
      }
    }

    if (answers.mattressType) {
      // Direct preference for mattress type
      switch (answers.mattressType) {
        case 'memoryFoam':
          scores.type.memory += 5;
          break;
        case 'innerspring':
          scores.type.innerspring += 5;
          break;
        case 'latex':
          scores.type.latex += 5;
          break;
        case 'hybrid':
          scores.type.hybrid += 5;
          break;
        case 'airbed':
          scores.type.airbed += 5;
          break;
        case 'organic':
          scores.type.organic += 5;
          break;
      }
    }

    if (answers.ecoFriendly) {
      switch (answers.ecoFriendly) {
        case 'notImportant':
          // No adjustment needed
          break;
        case 'somewhatImportant':
          scores.type.organic += 2;
          scores.type.latex += 1;
          scores.features.ecoFriendly += 2;
          break;
        case 'veryImportant':
          scores.type.organic += 4;
          scores.type.latex += 2;
          scores.features.ecoFriendly += 4;
          break;
      }
    }

    // Determine recommended firmness
    let recommendedFirmness = Object.keys(scores.firmness).reduce((a, b) => 
      scores.firmness[a] > scores.firmness[b] ? a : b
    );

    // Determine recommended type
    let recommendedType = Object.keys(scores.type).reduce((a, b) => 
      scores.type[a] > scores.type[b] ? a : b
    );

    // Get top features
    let topFeatures = Object.keys(scores.features)
      .sort((a, b) => scores.features[b] - scores.features[a])
      .slice(0, 3);

    // Map firmness to numeric scale
    const firmnessScale = {
      soft: 3,
      mediumSoft: 4.5,
      medium: 6,
      mediumFirm: 7.5,
      firm: 9
    };

    // Find matching mattresses
    const recommendedMattresses = mattressData.filter(mattress => {
      // Check if mattress type matches or is hybrid (which can accommodate multiple needs)
      const typeMatch = mattress.type.toLowerCase().includes(recommendedType) || 
                        (recommendedType !== 'hybrid' && mattress.type.toLowerCase().includes('hybrid'));
      
      // Check if firmness is within 1.5 points of recommended firmness
      const firmnessMatch = Math.abs(mattress.firmness - firmnessScale[recommendedFirmness]) <= 1.5;
      
      // Check if mattress has at least one of the top features
      const featureMatch = topFeatures.some(feature => 
        mattress.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
      );
      
      return (typeMatch && firmnessMatch) || (firmnessMatch && featureMatch);
    });

    // Sort by best match
    recommendedMattresses.sort((a, b) => {
      // Calculate match score based on how closely it matches recommendations
      const aTypeScore = a.type.toLowerCase().includes(recommendedType) ? 3 : 0;
      const bTypeScore = b.type.toLowerCase().includes(recommendedType) ? 3 : 0;
      
      const aFirmnessScore = 3 - Math.abs(a.firmness - firmnessScale[recommendedFirmness]);
      const bFirmnessScore = 3 - Math.abs(b.firmness - firmnessScale[recommendedFirmness]);
      
      const aFeatureScore = topFeatures.filter(feature => 
        a.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
      ).length;
      
      const bFeatureScore = topFeatures.filter(feature => 
        b.features.some(f => f.toLowerCase().includes(feature.toLowerCase()))
      ).length;
      
      const aTotal = aTypeScore + aFirmnessScore + aFeatureScore;
      const bTotal = bTypeScore + bFirmnessScore + bFeatureScore;
      
      return bTotal - aTotal;
    });

    // Limit to top 5 recommendations
    const topRecommendations = recommendedMattresses.slice(0, 5);

    // Calculate quiz completion time
    const completionTime = quizStartTime ? (new Date() - quizStartTime) / 1000 : 0

    // Update statistics
    setQuizStats(prev => {
      // Update completed quizzes count
      const completedQuizzes = prev.completedQuizzes + 1
      
      // Update recommended mattresses stats
      const recommendedMattresses = {...prev.recommendedMattresses}
      topRecommendations.forEach(mattress => {
        recommendedMattresses[mattress.name] = (recommendedMattresses[mattress.name] || 0) + 1
      })
      
      // Update firmness preference stats
      const firmnessPref = {...prev.firmnessPref}
      firmnessPref[recommendedFirmness] = (firmnessPref[recommendedFirmness] || 0) + 1
      
      return {
        ...prev,
        completedQuizzes,
        recommendedMattresses,
        firmnessPref
      }
    })

    setResults({
      recommendedFirmness,
      recommendedType,
      topFeatures,
      mattresses: topRecommendations,
      completionTime,
      userProfile: {
        sleepPosition: answers.sleepPosition,
        weight: answers.weight,
        bodyType: answers.bodyType,
        painPoints: answers.painPoints,
        medicalConditions: answers.medicalConditions,
        temperature: answers.temperature,
        bedSharing: answers.bedSharing,
        partnerMovement: answers.partnerMovement,
        budget: answers.budget,
        durability: answers.durability,
        mattressFeel: answers.mattressFeel,
        preferredFirmness: answers.preferredFirmness,
        allergies: answers.allergies,
        motionTransfer: answers.motionTransfer,
        mattressType: answers.mattressType,
        ecoFriendly: answers.ecoFriendly
      }
    });
    
    setQuizCompleted(true);
  }

  function checkAdminStatus() {
    const isAuthenticated = localStorage.getItem('adminAuthenticated') === 'true'
    setIsAdmin(isAuthenticated)
    return isAuthenticated
  }

  const value = {
    currentQuestion,
    currentQuestionIndex,
    totalQuestions,
    progress,
    answers,
    results,
    quizCompleted,
    isAdmin,
    isLoading,
    handleAnswer,
    nextQuestion,
    prevQuestion,
    resetQuiz,
    resetStatistics,
    trackDropOff,
    trackBuyButtonClick,
    checkAdminStatus
  }

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  )
}
