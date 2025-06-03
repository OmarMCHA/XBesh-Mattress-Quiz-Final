/*
  # Create database schema for mattress quiz

  1. New Tables
    - `mattresses` - Stores mattress data
    - `quiz_questions` - Stores quiz questions
    - `quiz_stats` - Stores quiz statistics
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create mattresses table
CREATE TABLE IF NOT EXISTS mattresses (
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
  image TEXT,
  review_count INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 5.0,
  reviews JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create quiz_questions table
CREATE TABLE IF NOT EXISTS quiz_questions (
  id TEXT PRIMARY KEY,
  question TEXT NOT NULL,
  description TEXT,
  scientific_note TEXT,
  multi_select BOOLEAN DEFAULT false,
  options JSONB NOT NULL DEFAULT '[]'::JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create quiz_stats table
CREATE TABLE IF NOT EXISTS quiz_stats (
  id INTEGER PRIMARY KEY,
  stats JSONB NOT NULL DEFAULT '{}'::JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE mattresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_stats ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Authenticated users can read quiz questions"
  ON quiz_questions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert quiz questions"
  ON quiz_questions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update quiz questions"
  ON quiz_questions
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete quiz questions"
  ON quiz_questions
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can read quiz stats"
  ON quiz_stats
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert quiz stats"
  ON quiz_stats
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update quiz stats"
  ON quiz_stats
  FOR UPDATE
  TO authenticated
  USING (true);

-- Create policies for anonymous users (read-only)
CREATE POLICY "Anonymous users can read mattresses"
  ON mattresses
  FOR SELECT
  TO anon
  USING (true);

CREATE POLICY "Anonymous users can read quiz questions"
  ON quiz_questions
  FOR SELECT
  TO anon
  USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers to update updated_at timestamp
CREATE TRIGGER update_mattresses_updated_at
BEFORE UPDATE ON mattresses
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at
BEFORE UPDATE ON quiz_questions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_stats_updated_at
BEFORE UPDATE ON quiz_stats
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
