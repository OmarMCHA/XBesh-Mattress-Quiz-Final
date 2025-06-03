/*
  # Ensure image column exists in mattresses table

  1. Changes
     - Ensures the image column exists and is properly configured
     - Adds a default value for the image column
  2. Security
     - No security changes
*/

-- Check if the image column exists and add it if it doesn't
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mattresses' AND column_name = 'image'
  ) THEN
    ALTER TABLE mattresses ADD COLUMN image text DEFAULT 'https://images.pexels.com/photos/6186440/pexels-photo-6186440.jpeg';
  END IF;
END $$;

-- Update any null image values with a default
UPDATE mattresses 
SET image = 'https://images.pexels.com/photos/6186440/pexels-photo-6186440.jpeg'
WHERE image IS NULL OR image = '';