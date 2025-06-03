import { supabase } from '../lib/supabase';
import { quizQuestions as localQuizQuestions } from '../data/quizQuestions';

// Fallback to local data if database operations fail
const FALLBACK_ENABLED = true;

// Initialize the database with local data if needed
export const initializeQuizData = async () => {
  try {
    // Check if data already exists in the database
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    
    // If no data exists, insert the local data
    if (data.length === 0) {
      const { error: insertError } = await supabase
        .from('quiz_questions')
        .insert(localQuizQuestions);
      
      if (insertError) throw insertError;
      console.log('Initialized quiz data in database');
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing quiz data:', error);
    return false;
  }
};

// Get all quiz questions
export const getQuizQuestions = async () => {
  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .order('id');
    
    if (error) throw error;
    
    if (data && data.length > 0) {
      return data;
    } else {
      console.log('No quiz questions found in database, using local data');
      return localQuizQuestions;
    }
  } catch (error) {
    console.error('Error fetching quiz questions:', error);
    // Fallback to local data if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local quiz data as fallback');
      return localQuizQuestions;
    }
    return [];
  }
};

// Get a single quiz question by ID
export const getQuizQuestionById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching quiz question with ID ${id}:`, error);
    // Fallback to local data if enabled
    if (FALLBACK_ENABLED) {
      const localQuestion = localQuizQuestions.find(q => q.id === id);
      if (localQuestion) {
        console.log('Using local quiz data as fallback');
        return localQuestion;
      }
    }
    return null;
  }
};

// Update a quiz question
export const updateQuizQuestion = async (question) => {
  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .update(question)
      .eq('id', question.id)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error(`Error updating quiz question with ID ${question.id}:`, error);
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for update');
      const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions') || JSON.stringify(localQuizQuestions));
      const updatedQuestions = savedQuestions.map(q => 
        q.id === question.id ? question : q
      );
      localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
      return question;
    }
    return null;
  }
};

// Create a new quiz question
export const createQuizQuestion = async (question) => {
  try {
    const { data, error } = await supabase
      .from('quiz_questions')
      .insert([question])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating quiz question:', error);
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for create');
      const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions') || JSON.stringify(localQuizQuestions));
      savedQuestions.push(question);
      localStorage.setItem('quizQuestions', JSON.stringify(savedQuestions));
      return question;
    }
    return null;
  }
};

// Delete a quiz question
export const deleteQuizQuestion = async (id) => {
  try {
    const { error } = await supabase
      .from('quiz_questions')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting quiz question with ID ${id}:`, error);
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for delete');
      const savedQuestions = JSON.parse(localStorage.getItem('quizQuestions') || JSON.stringify(localQuizQuestions));
      const updatedQuestions = savedQuestions.filter(q => q.id !== id);
      localStorage.setItem('quizQuestions', JSON.stringify(updatedQuestions));
      return true;
    }
    return false;
  }
};

// Save quiz statistics
export const saveQuizStats = async (stats) => {
  try {
    const { error } = await supabase
      .from('quiz_stats')
      .upsert({ id: 1, stats: stats });
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error saving quiz statistics:', error);
    // Fallback to local storage
    localStorage.setItem('quizStats', JSON.stringify(stats));
    return false;
  }
};

// Get quiz statistics
export const getQuizStats = async () => {
  try {
    const { data, error } = await supabase
      .from('quiz_stats')
      .select('stats')
      .eq('id', 1)
      .single();
    
    if (error) throw error;
    return data.stats;
  } catch (error) {
    console.error('Error fetching quiz statistics:', error);
    // Fallback to local storage
    const localStats = localStorage.getItem('quizStats');
    return localStats ? JSON.parse(localStats) : null;
  }
};
