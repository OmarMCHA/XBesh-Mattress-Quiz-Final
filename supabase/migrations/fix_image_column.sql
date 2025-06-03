/*
  # Fix image column in mattresses table

  1. Changes
     - Ensures the image column exists and is properly configured
     - Adds explicit update trigger to log image changes
  2. Security
     - No security changes
*/

-- First, check if the image column exists and add it if it doesn't
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'mattresses' AND column_name = 'image'
  ) THEN
    ALTER TABLE mattresses ADD COLUMN image text;
  END IF;
END $$;

-- Create a function to log image updates
CREATE OR REPLACE FUNCTION log_mattress_image_update()
RETURNS TRIGGER AS $$
BEGIN
  RAISE NOTICE 'Mattress image updated: ID % - Old: %, New: %', 
               NEW.id, OLD.image, NEW.image;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create a trigger to log image updates if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'log_mattress_image_changes'
  ) THEN
    CREATE TRIGGER log_mattress_image_changes
    BEFORE UPDATE OF image ON mattresses
    FOR EACH ROW
    EXECUTE FUNCTION log_mattress_image_update();
  END IF;
END $$;