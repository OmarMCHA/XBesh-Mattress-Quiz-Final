import { supabase } from '../lib/supabase';
import { mattressData } from '../data/mattressData';

// Fallback to local data if database operations fail
const FALLBACK_ENABLED = true;

// Initialize the database with local data if needed
export const initializeMattressData = async () => {
  try {
    // Check if data already exists in the database
    const { data, error } = await supabase
      .from('mattresses')
      .select('id')
      .limit(1);
    
    if (error) throw error;
    
    // If no data exists, insert the local data
    if (data.length === 0) {
      const { error: insertError } = await supabase
        .from('mattresses')
        .insert(mattressData);
      
      if (insertError) throw insertError;
      console.log('Initialized mattress data in database');
    }
    
    return true;
  } catch (error) {
    console.error('Error initializing mattress data:', error);
    return false;
  }
};

// Get all mattresses
export const getMattresses = async () => {
  try {
    const { data, error } = await supabase
      .from('mattresses')
      .select('*')
      .order('id');
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching mattresses:', error);
    // Fallback to local data if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local mattress data as fallback');
      return mattressData;
    }
    return [];
  }
};

// Get a single mattress by ID
export const getMattressById = async (id) => {
  try {
    const { data, error } = await supabase
      .from('mattresses')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  } catch (error) {
    console.error(`Error fetching mattress with ID ${id}:`, error);
    // Fallback to local data if enabled
    if (FALLBACK_ENABLED) {
      const localMattress = mattressData.find(m => m.id === id);
      if (localMattress) {
        console.log('Using local mattress data as fallback');
        return localMattress;
      }
    }
    return null;
  }
};

// Update a mattress
export const updateMattress = async (mattress) => {
  try {
    const { data, error } = await supabase
      .from('mattresses')
      .update(mattress)
      .eq('id', mattress.id)
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error(`Error updating mattress with ID ${mattress.id}:`, error);
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for update');
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      const updatedMattresses = savedMattresses.map(m => 
        m.id === mattress.id ? mattress : m
      );
      localStorage.setItem('mattressData', JSON.stringify(updatedMattresses));
      return mattress;
    }
    return null;
  }
};

// Create a new mattress
export const createMattress = async (mattress) => {
  try {
    const { data, error } = await supabase
      .from('mattresses')
      .insert([mattress])
      .select();
    
    if (error) throw error;
    return data[0];
  } catch (error) {
    console.error('Error creating mattress:', error);
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for create');
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      const newMattress = { ...mattress };
      if (!newMattress.id) {
        newMattress.id = Math.max(...savedMattresses.map(m => m.id)) + 1;
      }
      savedMattresses.push(newMattress);
      localStorage.setItem('mattressData', JSON.stringify(savedMattresses));
      return newMattress;
    }
    return null;
  }
};

// Delete a mattress
export const deleteMattress = async (id) => {
  try {
    const { error } = await supabase
      .from('mattresses')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return true;
  } catch (error) {
    console.error(`Error deleting mattress with ID ${id}:`, error);
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for delete');
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      const updatedMattresses = savedMattresses.filter(m => m.id !== id);
      localStorage.setItem('mattressData', JSON.stringify(updatedMattresses));
      return true;
    }
    return false;
  }
};
