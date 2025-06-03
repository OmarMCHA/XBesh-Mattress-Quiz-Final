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
      
      // Transform data to match the expected format in the UI
      const transformedData = data.map(item => ({
        id: item.id,
        name: item.name,
        brand: item.brand,
        type: item.type,
        firmness: item.firmness,
        price: item.price,
        url: item.url,
        features: Array.isArray(item.features) ? item.features : [],
        pros: Array.isArray(item.pros) ? item.pros : [],
        cons: Array.isArray(item.cons) ? item.cons : [],
        warranty: item.warranty,
        trialPeriod: item.trial_period,
        shipping: item.shipping,
        returns: item.returns,
        idealFor: Array.isArray(item.ideal_for) ? item.ideal_for : [],
        description: item.description,
        expertOpinion: item.expert_opinion,
        image: item.image,
        reviewCount: item.review_count,
        rating: item.rating,
        reviews: Array.isArray(item.reviews) ? item.reviews : []
      }));
      
      return transformedData;
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
        
        // Transform data to match the expected format in the UI
        const transformedData = retryData.map(item => ({
          id: item.id,
          name: item.name,
          brand: item.brand,
          type: item.type,
          firmness: item.firmness,
          price: item.price,
          url: item.url,
          features: Array.isArray(item.features) ? item.features : [],
          pros: Array.isArray(item.pros) ? item.pros : [],
          cons: Array.isArray(item.cons) ? item.cons : [],
          warranty: item.warranty,
          trialPeriod: item.trial_period,
          shipping: item.shipping,
          returns: item.returns,
          idealFor: Array.isArray(item.ideal_for) ? item.ideal_for : [],
          description: item.description,
          expertOpinion: item.expert_opinion,
          image: item.image,
          reviewCount: item.review_count,
          rating: item.rating,
          reviews: Array.isArray(item.reviews) ? item.reviews : []
        }));
        
        return transformedData;
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
      
      // Transform data to match the expected format in the UI
      const transformedData = {
        id: data.id,
        name: data.name,
        brand: data.brand,
        type: data.type,
        firmness: data.firmness,
        price: data.price,
        url: data.url,
        features: Array.isArray(data.features) ? data.features : [],
        pros: Array.isArray(data.pros) ? data.pros : [],
        cons: Array.isArray(data.cons) ? data.cons : [],
        warranty: data.warranty,
        trialPeriod: data.trial_period,
        shipping: data.shipping,
        returns: data.returns,
        idealFor: Array.isArray(data.ideal_for) ? data.ideal_for : [],
        description: data.description,
        expertOpinion: data.expert_opinion,
        image: data.image,
        reviewCount: data.review_count,
        rating: data.rating,
        reviews: Array.isArray(data.reviews) ? data.reviews : []
      };
      
      return transformedData;
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
  console.log('Image URL being updated to:', mattress.image);
  
  try {
    // Log the mattress object to see what we're working with
    console.log('Full mattress object to update:', JSON.stringify(mattress, null, 2));
    
    // Ensure the data is properly formatted for Supabase
    const formattedMattress = {
      id: mattress.id,
      name: mattress.name,
      brand: mattress.brand,
      type: mattress.type,
      firmness: mattress.firmness,
      price: mattress.price,
      url: mattress.url,
      features: Array.isArray(mattress.features) ? mattress.features : [],
      pros: Array.isArray(mattress.pros) ? mattress.pros : [],
      cons: Array.isArray(mattress.cons) ? mattress.cons : [],
      warranty: mattress.warranty,
      trial_period: mattress.trialPeriod,
      shipping: mattress.shipping,
      returns: mattress.returns,
      ideal_for: Array.isArray(mattress.idealFor) ? mattress.idealFor : [],
      description: mattress.description,
      expert_opinion: mattress.expertOpinion,
      image: mattress.image, // Ensure this is included
      review_count: mattress.reviewCount,
      rating: mattress.rating,
      reviews: Array.isArray(mattress.reviews) ? mattress.reviews : [],
      updated_at: new Date()
    };
    
    console.log('Formatted mattress for Supabase update:', JSON.stringify(formattedMattress, null, 2));
    
    // First, check if the mattress exists
    const { data: existingData, error: checkError } = await supabase
      .from('mattresses')
      .select('id, image')
      .eq('id', mattress.id)
      .single();
    
    if (checkError) {
      console.error('Error checking if mattress exists:', checkError);
      throw checkError;
    }
    
    console.log('Existing mattress data:', existingData);
    
    // Update the mattress in Supabase
    const { data, error } = await supabase
      .from('mattresses')
      .update(formattedMattress)
      .eq('id', mattress.id)
      .select();
    
    if (error) {
      console.error('Error updating mattress in Supabase:', error);
      throw error;
    }
    
    if (data && data.length > 0) {
      console.log('Mattress updated successfully in database:', data[0]);
      console.log('Updated image URL in database:', data[0].image);
      
      // Also update in local storage as backup
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      const updatedMattresses = savedMattresses.map(m => 
        m.id.toString() === mattress.id.toString() ? mattress : m
      );
      localStorage.setItem('mattressData', JSON.stringify(updatedMattresses));
      
      // Transform data to match the expected format in the UI
      const transformedData = {
        id: data[0].id,
        name: data[0].name,
        brand: data[0].brand,
        type: data[0].type,
        firmness: data[0].firmness,
        price: data[0].price,
        url: data[0].url,
        features: Array.isArray(data[0].features) ? data[0].features : [],
        pros: Array.isArray(data[0].pros) ? data[0].pros : [],
        cons: Array.isArray(data[0].cons) ? data[0].cons : [],
        warranty: data[0].warranty,
        trialPeriod: data[0].trial_period,
        shipping: data[0].shipping,
        returns: data[0].returns,
        idealFor: Array.isArray(data[0].ideal_for) ? data[0].ideal_for : [],
        description: data[0].description,
        expertOpinion: data[0].expert_opinion,
        image: data[0].image,
        reviewCount: data[0].review_count,
        rating: data[0].rating,
        reviews: Array.isArray(data[0].reviews) ? data[0].reviews : []
      };
      
      return transformedData;
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
  console.log('Image URL for new mattress:', mattress.image);
  
  try {
    // Ensure the data is properly formatted for Supabase
    const formattedMattress = {
      id: mattress.id,
      name: mattress.name,
      brand: mattress.brand,
      type: mattress.type,
      firmness: mattress.firmness,
      price: mattress.price,
      url: mattress.url,
      features: Array.isArray(mattress.features) ? mattress.features : [],
      pros: Array.isArray(mattress.pros) ? mattress.pros : [],
      cons: Array.isArray(mattress.cons) ? mattress.cons : [],
      warranty: mattress.warranty,
      trial_period: mattress.trialPeriod,
      shipping: mattress.shipping,
      returns: mattress.returns,
      ideal_for: Array.isArray(mattress.idealFor) ? mattress.idealFor : [],
      description: mattress.description,
      expert_opinion: mattress.expertOpinion,
      image: mattress.image, // Ensure this is included
      review_count: mattress.reviewCount,
      rating: mattress.rating,
      reviews: Array.isArray(mattress.reviews) ? mattress.reviews : [],
      created_at: new Date(),
      updated_at: new Date()
    };
    
    console.log('Formatted mattress for Supabase insert:', JSON.stringify(formattedMattress, null, 2));
    
    // Insert the new mattress into Supabase
    const { data, error } = await supabase
      .from('mattresses')
      .insert([formattedMattress])
      .select();
    
    if (error) {
      console.error('Error creating mattress in Supabase:', error);
      throw error;
    }
    
    if (data && data.length > 0) {
      console.log('Mattress created successfully in database:', data[0]);
      console.log('Image URL in created mattress:', data[0].image);
      
      // Also update in local storage as backup
      const savedMattresses = JSON.parse(localStorage.getItem('mattressData') || JSON.stringify(mattressData));
      savedMattresses.push(mattress);
      localStorage.setItem('mattressData', JSON.stringify(savedMattresses));
      
      // Transform data to match the expected format in the UI
      const transformedData = {
        id: data[0].id,
        name: data[0].name,
        brand: data[0].brand,
        type: data[0].type,
        firmness: data[0].firmness,
        price: data[0].price,
        url: data[0].url,
        features: Array.isArray(data[0].features) ? data[0].features : [],
        pros: Array.isArray(data[0].pros) ? data[0].pros : [],
        cons: Array.isArray(data[0].cons) ? data[0].cons : [],
        warranty: data[0].warranty,
        trialPeriod: data[0].trial_period,
        shipping: data[0].shipping,
        returns: data[0].returns,
        idealFor: Array.isArray(data[0].ideal_for) ? data[0].ideal_for : [],
        description: data[0].description,
        expertOpinion: data[0].expert_opinion,
        image: data[0].image,
        reviewCount: data[0].review_count,
        rating: data[0].rating,
        reviews: Array.isArray(data[0].reviews) ? data[0].reviews : []
      };
      
      return transformedData;
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
