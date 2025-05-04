
# Content Management System - Documentation

## Overview

This is a comprehensive content management system designed to streamline the process of creating, approving, and publishing content across multiple social media platforms. The system follows a structured workflow where topics are first proposed (either by AI or users), then approved by administrators, and finally converted into platform-specific content.

## Table of Contents

1. [Project Architecture](#project-architecture)
2. [Database Structure](#database-structure)
3. [Application Flow & Logic](#application-flow--logic)
4. [Key Components & Files](#key-components--files)
5. [User Roles & Permissions](#user-roles--permissions)
6. [Topic Management Process](#topic-management-process)
7. [Content Management Process](#content-management-process)
8. [Data Connection & Offline Mode](#data-connection--offline-mode)
9. [How to Extend the Application](#how-to-extend-the-application)
10. [Deployment & Environment Setup](#deployment--environment-setup)
11. [API Documentation](#api-documentation)
12. [Troubleshooting Common Issues](#troubleshooting-common-issues)

## Project Architecture

### Frontend Architecture

The frontend is built using:
- **React + TypeScript**: For building UI components with type safety
- **Vite**: As the fast build tool
- **TailwindCSS**: For utility-first styling
- **Shadcn/UI**: For consistent, accessible UI components
- **React Query**: For efficient data fetching and state management

#### Key Frontend Features:
- **Component-Based Structure**: Modular components for maximum reusability
- **Custom Hooks**: For encapsulating and reusing stateful logic
- **Responsive Design**: Works on both desktop and mobile devices
- **Type Safety**: TypeScript throughout the codebase for better developer experience and fewer bugs

### Backend Architecture

The backend is powered by Supabase, which provides:
- **PostgreSQL Database**: For data storage
- **Authentication**: For user management
- **Storage**: For media file management
- **Row Level Security**: For data access control
- **Edge Functions**: For serverless operations

#### Backend Integration:
- **Direct Database Access**: Frontend components interact directly with the Supabase database
- **Real-time Updates**: Using Supabase's real-time capabilities for live updates
- **Serverless Functions**: For complex operations that require backend processing

## Database Structure

### Entity Relationship Diagram

The database follows this simplified structure:
```
content_topics (1) —→ (many) content
```

Each approved topic generates multiple content items for different platforms.

### Key Tables

1. **Content Topics (`content_topics`)**

   Stores topic ideas that may later be developed into content.

   ```sql
   CREATE TABLE content_topics (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       brand_id TEXT NOT NULL,
       theme_type_id TEXT NOT NULL,
       product_type_id TEXT,
       title TEXT NOT NULL,
       description TEXT,
       status content_topic_status NOT NULL DEFAULT 'draft',
       created_by TEXT NOT NULL,
       created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
       updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
   );
   ```

   - `id`: Unique identifier for the topic
   - `brand_id`: Reference to the brand this topic belongs to
   - `theme_type_id`: Type of theme (product_highlight, seasonal_promotion, user_testimonial, brand_story)
   - `product_type_id`: Optional reference to a specific product
   - `title`: Topic title
   - `description`: Detailed description of the topic
   - `status`: Current status of the topic (draft, approved, rejected)
   - `created_by`: Indicates whether created by user or AI
   - `created_at`: Timestamp when the topic was created
   - `updated_at`: Timestamp when the topic was last updated

2. **Content (`content`)**

   Stores the actual content items created for different platforms based on approved topics.

   ```sql
   CREATE TABLE content (
       id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
       topic_id UUID REFERENCES content_topics(id),
       topic_title TEXT,
       platform TEXT NOT NULL,
       text TEXT NOT NULL,
       image_url TEXT,
       video_url TEXT,
       video_thumbnail TEXT,
       status content_status NOT NULL DEFAULT 'draft',
       scheduled_at TIMESTAMPTZ,
       published_at TIMESTAMPTZ,
       approved_at TIMESTAMPTZ,
       engagement_likes INTEGER DEFAULT 0,
       engagement_comments INTEGER DEFAULT 0,
       engagement_shares INTEGER DEFAULT 0,
       created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
       updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
   );
   ```

   - `id`: Unique identifier for the content
   - `topic_id`: Reference to the topic this content is based on
   - `topic_title`: Cached title of the topic for faster access
   - `platform`: Target platform (facebook, instagram, linkedin, etc.)
   - `text`: The content text
   - `image_url`: Optional URL to an image
   - `video_url`: Optional URL to a video
   - `video_thumbnail`: Optional URL to a video thumbnail
   - `status`: Current status (draft, approved, rejected, scheduled, published, generating, completed)
   - `scheduled_at`: When the content is scheduled to be published
   - `published_at`: When the content was actually published
   - `approved_at`: When the content was approved
   - `engagement_*`: Metrics for content performance
   - `created_at` & `updated_at`: Timestamps for creation and updates

### Database Triggers

The system uses triggers to automate content creation when topics are approved:

```sql
CREATE OR REPLACE FUNCTION create_content_from_approved_topic()
RETURNS TRIGGER AS $$
BEGIN
  -- Only create content when topic is changed to approved
  IF NEW.status = 'approved' AND (OLD.status IS NULL OR OLD.status <> 'approved') THEN
    -- Create content for Facebook, Instagram, and LinkedIn
    INSERT INTO content (topic_id, topic_title, platform, text, status)
    VALUES (NEW.id, NEW.title, 'facebook', 
           'Nội dung tự động tạo cho Facebook từ chủ đề: ' || NEW.title, 
           'draft');
           
    INSERT INTO content (topic_id, topic_title, platform, text, status)
    VALUES (NEW.id, NEW.title, 'instagram', 
           'Nội dung tự động tạo cho Instagram từ chủ đề: ' || NEW.title, 
           'draft');
           
    INSERT INTO content (topic_id, topic_title, platform, text, status)
    VALUES (NEW.id, NEW.title, 'linkedin', 
           'Nội dung tự động tạo cho LinkedIn từ chủ đề: ' || NEW.title, 
           'draft');
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_create_content_on_topic_approval
AFTER UPDATE ON content_topics
FOR EACH ROW
EXECUTE FUNCTION create_content_from_approved_topic();
```

#### Trigger Function Explanation:

1. The trigger activates after any update to the `content_topics` table
2. It checks if the status has changed to "approved"
3. If so, it automatically creates draft content for:
   - Facebook
   - Instagram
   - LinkedIn
4. Each content record is linked to the approved topic and starts in "draft" status

## Application Flow & Logic

### 1. Topic Management

The workflow starts in the Topics page (`/topics`):

1. **Topic Creation**:
   - Topics can be created manually by users or generated by AI
   - Topics include a title, description, theme type, and optional product reference
   - New topics are initially in `draft` status and require approval

2. **Topic Approval Process**:
   - Administrators review topics in the Topics page
   - They can approve topics (changing status to `approved`)
   - They can reject topics (changing status to `rejected`)
   - When a topic is approved, content is automatically generated via database trigger

3. **Topic filtering and management**:
   - Topics can be filtered by status (draft, approved, rejected)
   - Topics can be filtered by product type
   - Topics can be searched by title
   - Bulk actions can be performed on selected topics
   - Pagination controls are available for browsing many topics

### 2. Content Management

After topics are approved, content is managed in the Content page (`/content`):

1. **Content Generation**:
   - When a topic is approved, draft content is automatically generated for multiple platforms
   - Each platform gets content tailored to its format requirements
   - Content includes text and optional media (images, videos)

2. **Content Editing & Approval**:
   - Content editors can modify the generated content:
     - Edit text
     - Add/change images
     - Add/change videos
   - They can approve content for publishing
   - They can schedule content for later publication
   - They can reject content that doesn't meet standards

3. **Content Publishing**:
   - Approved content can be published immediately
   - Content can be scheduled for future publishing
   - Published content engagement metrics are tracked when available

4. **Content Filtering and Views**:
   - Content can be filtered by platform (Facebook, Instagram, LinkedIn)
   - Content can be filtered by status (draft, approved, scheduled, published)
   - Multiple view options available:
     - Table view for compact list of content
     - Grid view for visual representation
     - Accordion view for detailed review

### 3. Data Connection

The system handles both online and offline modes:

- **Supabase Connection**: 
  - When connected to Supabase, data is stored in the database
  - Full functionality for creating, updating, deleting, and retrieving data
  - Real-time updates when data changes

- **Local Data Mode**: 
  - When offline or Supabase is not configured
  - Uses mock data from the `src/data/mock` directory
  - A warning banner appears to inform users they're working with local data
  - Changes won't persist when refreshing the page

#### Connection Status Detection:

The application checks the Supabase connection status on startup:
1. Attempts to connect to Supabase
2. If successful, uses Supabase for data operations
3. If unsuccessful, falls back to mock data
4. Users are informed about the current data source

## Key Components & Files

### Topic Management

- `src/pages/Topics.tsx`: Main topics page component
  - Renders the topic management interface
  - Integrates with topic management hooks
  
- `src/hooks/useTopicsPage.tsx`: Hook for topics page logic
  - Manages pagination, filtering, and bulk operations
  - Handles topic action (approval, rejection)
  
- `src/hooks/useTopicsData.tsx`: Hook for fetching and filtering topics
  - Fetches topics from Supabase or mock data
  - Provides filtering functionality
  
- `src/hooks/useTopicStatusUpdate.tsx`: Hook for updating topic status
  - Provides functions for approving and rejecting topics
  - Updates database accordingly

- `src/components/topic/TopicsTable.tsx`: Component for displaying topics
  - Renders topics in a table format
  - Provides action buttons for each topic

### Content Management

- `src/pages/Content.tsx`: Main content page component
  - Entry point for the content management interface
  
- `src/components/content/ContentPageView.tsx`: Main content view component
  - Renders the content management interface
  - Manages view modes (table, grid, accordion)

- `src/hooks/useContentData.tsx`: Hook for content data handling
  - Combines data fetching, filtering, pagination, and actions
  - Manages content selection for batch operations

- `src/hooks/useContentFetch.tsx`: Hook for fetching content
  - Retrieves content from Supabase or mock data
  - Handles error states and loading indicators

- `src/hooks/useContentPagination.tsx`: Hook for content pagination
  - Manages page navigation and items per page
  - Handles platform filtering and view mode changes

### Data Connection

- `src/hooks/useSupabaseConnection.tsx`: Hook to check Supabase connection
  - Verifies if Supabase is accessible
  - Determines whether to use real or mock data

- `src/components/content/LocalDataWarning.tsx`: Warning component
  - Displays a banner when using local data
  - Informs users that changes won't persist

### Utility Files

- `src/components/topic/table/TopicTableUtils.ts`: Utilities for topic tables
  - Functions for generating platform-specific content
  - Functions for rendering platform icons and product badges

## User Roles & Permissions

The system supports multiple user roles with different permissions:

1. **Administrators**:
   - Can create, edit, approve, and reject topics
   - Can manage all content
   - Have access to system settings

2. **Content Creators**:
   - Can propose new topics
   - Can create and edit content for approved topics
   - Cannot approve or reject topics

3. **Content Publishers**:
   - Can approve and schedule content for publishing
   - Can view content performance metrics
   - Cannot create new topics or content

Role-based access control ensures users only have access to functionality relevant to their responsibilities.

## Topic Management Process

### Detailed Flow for Topic Creation and Approval:

1. **Topic Creation**:
   - User navigates to Topics page
   - User clicks "Create New Topic" button
   - User fills the topic form with:
     - Title
     - Description
     - Theme type
     - Optional product reference
   - User submits the form
   - System saves the topic with "draft" status

2. **Topic Review**:
   - Administrator navigates to Topics page
   - Administrator filters for "draft" topics
   - Administrator reviews topics one by one
   - For each topic, administrator decides to:
     - Approve the topic (triggers content generation)
     - Reject the topic (requires reason)
     - Edit the topic for clarity

3. **Bulk Operations**:
   - Administrator can select multiple topics
   - Administrator can perform bulk actions:
     - Approve selected topics
     - Reject selected topics
     - Delete selected topics

4. **Topic Tracking**:
   - System maintains history of all topic approvals and rejections
   - System displays statistics on topic creation and approval rates

## Content Management Process

### Detailed Flow for Content Creation and Publishing:

1. **Content Generation**:
   - System automatically creates draft content when topics are approved
   - Content is generated according to platform-specific templates
   - Generated content includes:
     - Platform-appropriate text
     - Placeholder images if applicable
     - Links to related content

2. **Content Editing**:
   - Content editor navigates to Content page
   - Editor filters content by platform or status
   - Editor selects content to edit
   - Editor modifies:
     - Text to match platform style
     - Images for visual appeal
     - Hashtags for better discoverability

3. **Content Approval**:
   - Publisher reviews edited content
   - Publisher approves content for publishing
   - Publisher can also:
     - Request additional edits
     - Reject unsuitable content
     - Schedule content for optimal posting time

4. **Content Publishing**:
   - Scheduled content is automatically published at specified time
   - Manually approved content can be published immediately
   - System records publishing time and initial metrics

5. **Performance Tracking**:
   - System captures engagement metrics:
     - Likes
     - Comments
     - Shares
   - Metrics are displayed for analysis
   - Top-performing content is highlighted

## Data Connection & Offline Mode

### Detailed Explanation of Data Handling:

1. **Connection Detection**:
   - On application startup, system attempts to connect to Supabase
   - Connection status is stored in application state
   - UI components adapt based on connection status

2. **Online Mode Operations**:
   - Data is read from and written to Supabase database
   - All changes are persistent
   - Real-time updates are enabled

3. **Offline Mode Operations**:
   - Mock data is loaded from local files
   - Changes are stored in memory only
   - Warning banner informs users of temporary nature of changes

4. **Transition Between Modes**:
   - If connection is established, system switches to online mode
   - If connection is lost, system switches to offline mode
   - Data synchronization occurs when transitioning to online mode

## How to Extend the Application

### For Non-Technical Users

1. **Adding New Topics**:
   - Navigate to the Topics page
   - Use the Topic Request Form to create a new topic
   - Fill in the title, description, and related fields
   - Submit for approval

2. **Approving Topics**:
   - Review the topics list in Topics page
   - Click the "Approve" action button on topics you want to approve
   - Content will be automatically generated for approved topics

3. **Managing Content**:
   - Navigate to the Content page
   - Filter and search for content you want to manage
   - Use the action buttons to view, approve, edit, or delete content

4. **Customizing Content Templates**:
   - Navigate to the Settings page
   - Select "Content Templates" section
   - Modify templates for different platforms
   - Save changes to apply to future content generation

### For Technical Users

1. **Adding New Platforms**:
   - Update the trigger function in the database to include the new platform
   - Add platform handling in `TopicTableUtils.ts` and related components
   - Extend content generation logic for the new platform
   - Add platform icons and styles in `PlatformIcon.tsx`

2. **Modifying Content Generation Logic**:
   - Update the `create_content_from_approved_topic()` function in the database
   - Modify the `generateDraftContent` function in `src/components/topic/table/TopicTableUtils.ts` 
   - Test generation with various topic types

3. **Adding New Data Fields**:
   - Add columns to the relevant database tables
   - Update TypeScript types in `src/types/content.ts`
   - Update the UI components to display and interact with new fields
   - Update form validation rules if applicable

4. **Implementing New Views**:
   - Create a new component in `src/components/content/`
   - Update `ContentViewRenderer.tsx` to include the new view
   - Add the view option to `ViewModeSwitcher.tsx`
   - Implement responsive design for the new view

5. **Adding Authentication Logic**:
   - Integrate with Supabase Authentication
   - Implement login/logout functionality
   - Add role-based access control
   - Update Row Level Security policies in the database

## Deployment & Environment Setup

This project is designed to work with Supabase for the backend. To set up your environment:

1. **Create a Supabase Project**:
   - Sign up for Supabase (https://supabase.com)
   - Create a new project
   - Note your project URL and API keys

2. **Database Setup**:
   - Execute the SQL scripts to create necessary tables:
     - content_topics
     - content
   - Configure the trigger function for content generation
   - Set up Row Level Security policies if needed

3. **Frontend Environment Variables**:
   - Create a `.env` file with:
     ```
     VITE_SUPABASE_URL=your_supabase_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Local Development**:
   - Clone the repository
   - Run `npm install` to install dependencies
   - Run `npm run dev` to start the development server
   - Access the application at `http://localhost:5173`

5. **Production Deployment**:
   - Build the application: `npm run build`
   - Deploy the `dist` folder to your hosting provider
   - Configure environment variables in your hosting platform

## API Documentation

### Supabase API Endpoints

The application uses the Supabase JavaScript client to interact with the database. Key operations include:

1. **Topic Operations**:
   - Fetch topics: `supabase.from('content_topics').select('*')`
   - Create topic: `supabase.from('content_topics').insert([...])`
   - Update topic: `supabase.from('content_topics').update({...}).eq('id', topicId)`
   - Delete topic: `supabase.from('content_topics').delete().eq('id', topicId)`

2. **Content Operations**:
   - Fetch content: `supabase.from('content').select('*')`
   - Update content: `supabase.from('content').update({...}).eq('id', contentId)`
   - Schedule content: `supabase.from('content').update({status: 'scheduled', scheduled_at: date}).eq('id', contentId)`

3. **Filter Examples**:
   - Filter by status: `supabase.from('content').select('*').eq('status', 'draft')`
   - Filter by platform: `supabase.from('content').select('*').eq('platform', 'facebook')`
   - Combine filters: `supabase.from('content').select('*').eq('status', 'draft').eq('platform', 'facebook')`

4. **Advanced Queries**:
   - Join with topics: `supabase.from('content').select('*, content_topics(title)').eq('status', 'draft')`
   - Order results: `supabase.from('content').select('*').order('created_at', {ascending: false})`
   - Pagination: `supabase.from('content').select('*').range(0, 9)`

## Troubleshooting Common Issues

### Connection Problems

1. **Supabase Connection Fails**:
   - Check if Supabase URL and API key are correct
   - Verify network connectivity
   - Check Supabase service status
   - Solution: The application will fall back to mock data mode

2. **Data Not Updating**:
   - Check if you're in mock data mode (warning banner visible)
   - Verify Supabase connection status
   - Check browser console for errors
   - Solution: Reconnect to Supabase or refresh the page

### Topic Management Issues

1. **Topics Not Appearing**:
   - Check if filter settings are hiding the topics
   - Verify that topics were saved successfully
   - Check network requests for errors
   - Solution: Clear filters or check data in Supabase dashboard

2. **Content Not Generated on Approval**:
   - Verify that the database trigger is properly installed
   - Check if topic status was successfully changed to "approved"
   - Check database logs for trigger execution
   - Solution: Manually run content generation or recreate the trigger

### Content Management Issues

1. **Content Editing Not Saving**:
   - Check if you're in mock data mode
   - Verify network requests for errors
   - Check permissions in Supabase
   - Solution: Try again after confirming connection status

2. **Images Not Displaying**:
   - Verify image URLs are correct and accessible
   - Check if images are properly uploaded to storage
   - Check for CORS issues if using external images
   - Solution: Replace broken image URLs or use local placeholders

### Performance Optimization

1. **Slow Loading Times**:
   - Implement query pagination for large datasets
   - Use query caching with React Query
   - Optimize database indexes
   - Consider implementing infinite scrolling for large lists

2. **Reducing Database Load**:
   - Implement debounced searches
   - Use batched updates for bulk operations
   - Cache frequently accessed data
   - Optimize SQL queries

## Conclusion

This content management system provides a streamlined workflow for creating, approving, and publishing content across multiple platforms. By following the topic approval process, content can be systematically created and managed for maximum effectiveness.

The system's flexibility allows it to work in both online and offline modes, ensuring productivity can continue even without a database connection. The component-based architecture makes it easy to extend and maintain, while the detailed documentation provides guidance for users of all technical levels.
