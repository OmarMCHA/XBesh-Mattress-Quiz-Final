/*
  # Ensure mattresses table exists with image column

  1. Changes
     - Creates mattresses table if it doesn't exist
     - Ensures the image column exists and is properly configured
     - Adds a default value for the image column
  2. Security
     - Enables RLS on mattresses table if it's newly created
     - Adds basic policies for authenticated users
*/

-- First check if the mattresses table exists, and create it if it doesn't
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.tables 
    WHERE table_name = 'mattresses'
  ) THEN
    CREATE TABLE mattresses (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      brand TEXT NOT NULL,
      type TEXT NOT NULL,
      firmness NUMERIC NOT NULL,
      price NUMERIC NOT NULL,
      url TEXT,
      features JSONB NOT NULL DEFAULT '[]'::JSONB,
      pros JSONB NOT NULL DEFAULT '[]'::JSONB,
      cons JSONB NOT NULL DEFAULT '[]'::JSONB,
      warranty TEXT,
      trial_period TEXT,
      shipping TEXT,
      returns TEXT,
      ideal_for JSONB NOT NULL DEFAULT '[]'::JSONB,
      description TEXT,
      expert_opinion TEXT,
      image TEXT DEFAULT 'https://images.pexels.com/photos/6186440/pexels-photo-6186440.jpeg',
      review_count INTEGER DEFAULT 0,
      rating NUMERIC DEFAULT 5.0,
      reviews JSONB NOT NULL DEFAULT '[]'::JSONB,
      created_at TIMESTAMPTZ DEFAULT now(),
      updated_at TIMESTAMPTZ DEFAULT now()
    );

    -- Enable RLS on the newly created table
    ALTER TABLE mattresses ENABLE ROW LEVEL SECURITY;

    -- Create policies for authenticated users
    CREATE POLICY "Authenticated users can read mattresses"
      ON mattresses
      FOR SELECT
      TO authenticated
      USING (true);

    CREATE POLICY "Authenticated users can insert mattresses"
      ON mattresses
      FOR INSERT
      TO authenticated
      WITH CHECK (true);

    CREATE POLICY "Authenticated users can update mattresses"
      ON mattresses
      FOR UPDATE
      TO authenticated
      USING (true);

    CREATE POLICY "Authenticated users can delete mattresses"
      ON mattresses
      FOR DELETE
      TO authenticated
      USING (true);

    -- Create policy for anonymous users (read-only)
    CREATE POLICY "Anonymous users can read mattresses"
      ON mattresses
      FOR SELECT
      TO anon
      USING (true);
  ELSE
    -- If the table exists, check if the image column exists and add it if it doesn't
    IF NOT EXISTS (
      SELECT 1 FROM information_schema.columns 
      WHERE table_name = 'mattresses' AND column_name = 'image'
    ) THEN
      ALTER TABLE mattresses ADD COLUMN image text DEFAULT 'https://images.pexels.com/photos/6186440/pexels-photo-6186440.jpeg';
    END IF;

    -- Update any null image values with a default
    UPDATE mattresses 
    SET image = 'https://images.pexels.com/photos/6186440/pexels-photo-6186440.jpeg'
    WHERE image IS NULL OR image = '';
  END IF;
END $$;