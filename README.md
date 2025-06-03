# Mattress Quiz Admin Panel

This project provides a fully editable admin panel for a mattress recommendation quiz. The admin panel allows you to manage mattress data and quiz questions with database integration.

## Features

- **Mattress Manager**: Add, edit, and delete mattresses with all their details
  - Basic information (name, brand, type, firmness, price)
  - Features, pros, cons, and ideal users
  - Reviews and ratings
  - Images and URLs

- **Quiz Editor**: Manage quiz questions and options
  - Edit question text, descriptions, and scientific notes
  - Add, edit, and remove answer options
  - Configure multi-select questions

- **Database Integration**: Uses Supabase for persistent storage
  - Automatic fallback to local storage if database operations fail
  - Synchronizes data between database and local storage

## Technical Implementation

- React frontend with styled-components
- Supabase backend for database operations
- Service layer for data operations with fallback mechanisms
- Context API for state management

## Getting Started

1. Clone the repository
2. Install dependencies with `pnpm install`
3. Set up your Supabase project and update the `.env` file with your credentials
4. Run the development server with `pnpm dev`

## Database Schema

The application uses the following tables:

- `mattresses`: Stores all mattress data
- `quiz_questions`: Stores quiz questions and options
- `quiz_stats`: Stores quiz statistics and analytics

## Fallback Mechanism

If database operations fail, the application will:
1. Fall back to local storage data
2. Show appropriate error messages
3. Continue to function with local data
4. Attempt to sync with the database when possible

This ensures that the application remains functional even when offline or if there are database connectivity issues.
