
# Project Architecture

This project uses a modern frontend/backend architecture:

## Frontend

The frontend is a React application built with:

- **React + TypeScript**: For building UI components
- **Vite**: As the build tool
- **TailwindCSS**: For styling
- **Shadcn/UI**: For UI components
- **React Router**: For routing
- **React Query**: For data fetching and state management

## Backend

The backend is powered by Supabase, which provides:

- **PostgreSQL Database**: For storing application data
- **Authentication**: For user login/registration
- **Storage**: For file uploads
- **Row Level Security**: For data access control
- **Edge Functions**: For custom serverless functions

## Project Structure

```
├── src/
│   ├── components/         # Reusable UI components
│   ├── pages/              # Application pages
│   ├── hooks/              # Custom React hooks
│   ├── contexts/           # React context providers
│   ├── types/              # TypeScript type definitions
│   ├── integrations/       # External service integrations
│   │   └── supabase/       # Supabase client and utilities
│   ├── lib/                # Utility functions
│   └── data/               # Mock data and constants
├── supabase/               # Supabase configuration
└── public/                 # Static assets
```

## Data Flow

1. Frontend React components use the Supabase client to make direct API calls to the Supabase backend
2. Authentication is handled through Supabase Auth
3. Data is stored and retrieved from the PostgreSQL database
4. Row Level Security (RLS) policies ensure users only access their own data

## Development

For local development, the frontend runs on Vite's development server while connecting to the Supabase backend.

## Deployment

The application can be deployed as a static site, with the backend already hosted by Supabase.
