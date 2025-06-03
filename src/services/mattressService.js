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
    if (!data || data.length === 0) {
      console.log('No mattress data found in database, initializing with local data');
      
      // Convert string IDs to UUIDs if needed
      const formattedData = mattressData.map(mattress => {
        // If id is a number, convert it to a UUID string
        if (typeof mattress.id === 'number') {
          return {
            ...mattress,
            // Use the existing id as a UUID
            id: mattress.id.toString()
          };
        }
        return mattress;
      });
      
      const { error: insertError } = await supabase
        .from('mattresses')
        .insert(formattedData);
      
      if (insertError) {
        console.error('Error inserting mattress data:', insertError);
        throw insertError;
      }
      
      console.log('Successfully initialized mattress data in database');
    } else {
      console.log('Mattress data already exists in database');
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
    
    if (data && data.length > 0) {
      console.log(`Retrieved ${data.length} mattresses from database`);
      return data;
    } else {
      console.log('No mattresses found in database, using local data');
      // Try to initialize the database with local data
      await initializeMattressData();
      
      // Try fetching again
      const { data: retryData, error: retryError } = await supabase
        .from('mattresses')
        .select('*')
        .order('id');
      
      if (retryError) throw retryError;
      
      if (retryData && retryData.length > 0) {
        console.log(`Retrieved ${retryData.length} mattresses after initialization`);
        return retryData;
      } else {
        console.log('Still no mattresses found, using local data as fallback');
        return mattressData;
      }
    }
  } catch (error) {
    console.error('Error fetching mattresses:', error);
    // Fallback to local data if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local mattress data as fallback due to error');
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
    
    if (data) {
      console.log(`Retrieved mattress with ID ${id} from database`);
      return data;
    } else {
      console.log(`No mattress with ID ${id} found in database`);
      return null;
    }
  } catch (error) {
    console.error(`Error fetching mattress with ID ${id}:`, error);
    // Fallback to local data if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local mattress data as fallback');
      const localMattress = mattressData.find(m => m.id.toString() === id.toString());
      if (localMattress) {
        return localMattress;
      }
    }
    return null;
  }
};

// Update a mattress
export const updateMattress = async (mattress) => {
  console.log('Updating mattress:', mattress);
  
  try {
    // Ensure the data is properly formatted for Supabase
    const formattedMattress = {
      ...mattress,
      // Convert arrays to JSONB if they're not already
      features: Array.isArray(mattress.features) ? mattress.features : [],
      pros: Array.isArray(mattress.pros) ? mattress.pros : [],
      cons: Array.isArray(mattress.cons) ? mattress.cons : [],
      ideal_for: Array.isArray(mattress.idealFor) ? mattress.idealFor : [],
      reviews: Array.isArray(mattress.reviews) ? mattress.reviews : []
    };
    
    // Update the mattress in Supabase
    const { data, error } = await supabase
      .from('mattresses')
      .update({
        name: formattedMattress.name,
        brand: formattedMattress.brand,
        type: formattedMattress.type,
        firmness: formattedMattress.firmness,
        price: formattedMattress.price,
        url: formattedMattress.url,
        features: formattedMattress.features,
        pros: formattedMattress.pros,
        cons: formattedMattress.cons,
        warranty: formattedMattress.warranty,
        trial_period: formattedMattress.trialPeriod,
        shipping: formattedMattress.shipping,
        returns: formattedMattress.returns,
        ideal_for: formattedMattress.idealFor,
        description: formattedMattress.description,
        expert_opinion: formattedMattress.expertOpinion,
        image: formattedMattress.image,
        review_count: formattedMattress.reviewCount,
        rating: formattedMattress.rating,
        reviews: formattedMattress.reviews,
        updated_at: new Date()
      })
      .eq('id', mattress.id)
      .select();
    
    if (error) {
      console.error('Error updating mattress in Supabase:', error);
      throw error;
    }
    
    if (data && data.length > 0) {
      console.log('Mattress updated successfully in database:', data[0]);
      
      // Also update in local storage as backup
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      const updatedMattresses = savedMattresses.map(m => 
        m.id.toString() === mattress.id.toString() ? mattress : m
      );
      localStorage.setItem('mattressData', JSON.stringify(updatedMattresses));
      
      return data[0];
    } else {
      console.error('No data returned after update');
      throw new Error('No data returned after update');
    }
  } catch (error) {
    console.error(`Error updating mattress with ID ${mattress.id}:`, error);
    
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for update');
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      const updatedMattresses = savedMattresses.map(m => 
        m.id.toString() === mattress.id.toString() ? mattress : m
      );
      localStorage.setItem('mattressData', JSON.stringify(updatedMattresses));
      return mattress;
    }
    return null;
  }
};

// Create a new mattress
export const createMattress = async (mattress) => {
  console.log('Creating new mattress:', mattress);
  
  try {
    // Ensure the data is properly formatted for Supabase
    const formattedMattress = {
      ...mattress,
      // Convert arrays to JSONB if they're not already
      features: Array.isArray(mattress.features) ? mattress.features : [],
      pros: Array.isArray(mattress.pros) ? mattress.pros : [],
      cons: Array.isArray(mattress.cons) ? mattress.cons : [],
      ideal_for: Array.isArray(mattress.idealFor) ? mattress.idealFor : [],
      reviews: Array.isArray(mattress.reviews) ? mattress.reviews : []
    };
    
    // Insert the new mattress into Supabase
    const { data, error } = await supabase
      .from('mattresses')
      .insert([{
        id: formattedMattress.id,
        name: formattedMattress.name,
        brand: formattedMattress.brand,
        type: formattedMattress.type,
        firmness: formattedMattress.firmness,
        price: formattedMattress.price,
        url: formattedMattress.url,
        features: formattedMattress.features,
        pros: formattedMattress.pros,
        cons: formattedMattress.cons,
        warranty: formattedMattress.warranty,
        trial_period: formattedMattress.trialPeriod,
        shipping: formattedMattress.shipping,
        returns: formattedMattress.returns,
        ideal_for: formattedMattress.idealFor,
        description: formattedMattress.description,
        expert_opinion: formattedMattress.expertOpinion,
        image: formattedMattress.image,
        review_count: formattedMattress.reviewCount,
        rating: formattedMattress.rating,
        reviews: formattedMattress.reviews,
        created_at: new Date(),
        updated_at: new Date()
      }])
      .select();
    
    if (error) {
      console.error('Error creating mattress in Supabase:', error);
      throw error;
    }
    
    if (data && data.length > 0) {
      console.log('Mattress created successfully in database:', data[0]);
      
      // Also update in local storage as backup
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      savedMattresses.push(mattress);
      localStorage.setItem('mattressData', JSON.stringify(savedMattresses));
      
      return data[0];
    } else {
      console.error('No data returned after create');
      throw new Error('No data returned after create');
    }
  } catch (error) {
    console.error('Error creating mattress:', error);
    
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for create');
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      const newMattress = { ...mattress };
      savedMattresses.push(newMattress);
      localStorage.setItem('mattressData', JSON.stringify(savedMattresses));
      return newMattress;
    }
    return null;
  }
};

// Delete a mattress
export const deleteMattress = async (id) => {
  console.log(`Deleting mattress with ID ${id}`);
  
  try {
    const { error } = await supabase
      .from('mattresses')
      .delete()
      .eq('id', id);
    
    if (error) {
      console.error('Error deleting mattress from Supabase:', error);
      throw error;
    }
    
    console.log(`Mattress with ID ${id} deleted successfully from database`);
    
    // Also update in local storage as backup
    const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
    const updatedMattresses = savedMattresses.filter(m => m.id.toString() !== id.toString());
    localStorage.setItem('mattressData', JSON.stringify(updatedMattresses));
    
    return true;
  } catch (error) {
    console.error(`Error deleting mattress with ID ${id}:`, error);
    
    // Fallback to local storage if enabled
    if (FALLBACK_ENABLED) {
      console.log('Using local storage as fallback for delete');
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      const updatedMattresses = savedMattresses.filter(m => m.id.toString() !== id.toString());
      localStorage.setItem('mattressData', JSON.stringify(updatedMattresses));
      return true;
    }
    return false;
  }
};
