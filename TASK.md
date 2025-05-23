# CLARC 2025 Conference Application - Task Breakdown

This document outlines the actionable tasks required to implement the proposed future enhancements for the CLARC 2025 conference application. The tasks are grouped by feature and broken down into specific development areas.

## 1. Enhanced CLARC AI Assistant

### 1.1. Personalized Schedule Recommendations

*   **UI/UX Development:**
    *   Design and implement UI for users to mark sessions of interest.
    *   Design and implement UI to display AI-recommended sessions.
    *   Create onboarding flow for preference collection (optional).
*   **Backend Development:**
    *   Develop API endpoint to receive and store user session interests.
    *   Develop logic for the AI to analyze user interests and recommend relevant sessions based on topics, speakers, etc.
    *   Implement a recommendation engine algorithm.
*   **AI Model:**
    *   Potentially fine-tune the existing AI model or develop a new component for recommendation logic.
*   **Localization:**
    *   Add new strings for "Mark as Interested," "Recommended Sessions," and any related UI elements in all supported languages (`src/locales/en/translation.json`, `src/locales/hr/translation.json`, etc.).

### 1.2. Speaker Q&A

*   **UI/UX Development:**
    *   Design and implement UI for attendees to submit questions to speakers (per session or per speaker).
    *   Design and implement UI for displaying submitted questions (moderated view for organizers, answered view for attendees).
*   **Backend Development:**
    *   Develop API endpoint for submitting questions.
    *   Develop API endpoint for organizers to moderate questions.
    *   Develop API endpoint for retrieving answered questions.
    *   Implement logic for associating questions with specific sessions or speakers.
*   **AI Model:**
    *   Explore training the AI on speaker materials to potentially answer some questions directly.
*   **Localization:**
    *   Add new strings for "Ask a Question," "Your Questions," "Pending Questions," "Answered Questions," etc.

### 1.3. Networking Facilitation

*   **UI/UX Development:**
    *   Design and implement UI for users to opt-in to networking features.
    *   Design and implement UI for suggesting connections based on shared interests or attended sessions.
*   **Backend Development:**
    *   Develop API endpoints to access user profile data (with privacy controls).
    *   Develop logic for matching users based on interests or session attendance.
*   **Localization:**
    *   Add new strings for "Connect with Attendees," "Suggested Connections," "Shared Interests," etc.

### 1.4. Real-time Updates and Notifications

*   **UI/UX Development:**
    *   Design and implement UI for displaying notifications within the app.
    *   Consider integrating with push notification services (if applicable).
*   **Backend Development:**
    *   Develop API endpoints for sending notifications (triggered by organizers or automated events like schedule changes).
    *   Integrate with push notification service APIs.
*   **Localization:**
    *   Add new strings for notification titles and content templates.

## 2. Interactive Session Engagement

### 2.1. Live Polling and Q&A

*   **UI/UX Development:**
    *   Design and implement UI for displaying live polls within session views.
    *   Design and implement UI for submitting poll votes.
    *   Design and implement UI for submitting questions during live sessions.
*   **Backend Development:**
    *   Develop API endpoints for creating and managing polls (for organizers).
    *   Develop API endpoints for receiving poll votes.
    *   Develop API endpoints for submitting live questions.
    *   Develop API endpoints for displaying real-time poll results and questions.
*   **API Integration:**
    *   Integrate with a third-party polling/Q&A service or build a custom solution.
*   **Localization:**
    *   Add new strings for "Participate in Poll," "Submit Vote," "Live Q&A," etc.

### 2.2. Session Feedback

*   **UI/UX Development:**
    *   Design and implement UI for attendees to provide session and speaker ratings and comments.
*   **Backend Development:**
    *   Develop API endpoint for submitting feedback.
    *   Develop API endpoint for retrieving feedback (for organizers).
*   **Localization:**
    *   Add new strings for "Rate Session," "Leave Feedback," "Your Rating," etc.

### 2.3. Resource Sharing

*   **UI/UX Development:**
    *   Design and implement UI for speakers to upload and manage session resources.
    *   Design and implement UI for attendees to access and download resources from session pages.
*   **Backend Development:**
    *   Develop API endpoints for uploading and storing session resources.
    *   Develop API endpoints for retrieving session resources.
*   **Localization:**
    *   Add new strings for "Session Resources," "Download," etc.

## 3. Community Building and Networking

### 3.1. Attendee Profiles

*   **UI/UX Development:**
    *   Design and implement UI for creating and editing attendee profiles.
    *   Design and implement UI for viewing other attendees' profiles (with privacy settings).
*   **Backend Development:**
    *   Develop API endpoints for creating, updating, and retrieving attendee profiles.
    *   Implement privacy settings logic.
*   **Localization:**
    *   Add new strings for "My Profile," "Edit Profile," "Interests," "Contact Information," etc.

### 3.2. Direct Messaging

*   **UI/UX Development:**
    *   Design and implement UI for direct messaging between attendees.
*   **Backend Development:**
    *   Develop API endpoints for sending, receiving, and managing messages.
    *   Implement real-time messaging functionality (e.g., using WebSockets).
*   **Localization:**
    *   Add new strings for "Messages," "New Message," "Inbox," "Sent Messages," etc.

### 3.3. Topic-Based Forums or Groups

*   **UI/UX Development:**
    *   Design and implement UI for creating and joining forums/groups.
    *   Design and implement UI for posting and replying to messages within forums/groups.
*   **Backend Development:**
    *   Develop API endpoints for creating and managing forums/groups.
    *   Develop API endpoints for posting and retrieving messages within forums/groups.
*   **Localization:**
    *   Add new strings for "Forums," "Groups," "Create Group," "Join Group," "New Post," etc.

## 4. Gamification and Engagement

### 4.1. Points and Badges

*   **UI/UX Development:**
    *   Design and implement UI for displaying points and badges earned by attendees.
*   **Backend Development:**
    *   Develop logic for awarding points and badges based on user actions (attending sessions, participating, etc.).
    *   Develop API endpoints for retrieving user points and badges.
*   **Localization:**
    *   Add new strings for "My Points," "Badges," and descriptions of different badge types.

### 4.2. Leaderboards

*   **UI/UX Development:**
    *   Design and implement UI for displaying leaderboards based on points earned.
*   **Backend Development:**
    *   Develop API endpoint for calculating and retrieving leaderboard data.
*   **Localization:**
    *   Add new strings for "Leaderboard," "Rank," "Points," etc.

## 5. Enhanced Sponsor Engagement

### 5.1. Virtual Booths (for virtual/hybrid events)

*   **UI/UX Development:**
    *   Design and implement interactive virtual booth interfaces.
    *   Integrate multimedia elements (videos, presentations).
    *   Design UI for chat or Q&A with sponsor representatives.
*   **Backend Development:**
    *   Develop API endpoints for managing virtual booth content.
    *   Develop API endpoints for handling chat or Q&A within booths.
*   **Localization:**
    *   Add new strings for "Visit Booth," "Sponsor Information," "Chat with Sponsor," etc.

### 5.2. Sponsor Sessions or Workshops

*   **UI/UX Development:**
    *   Integrate sponsor sessions into the main schedule view.
    *   Design dedicated pages for sponsor sessions with relevant information.
*   **Backend Development:**
    *   Develop API endpoints for managing sponsor session data.
*   **Localization:**
    *   Add new strings to differentiate sponsor sessions in the schedule.

### 5.3. Lead Retrieval

*   **UI/UX Development:**
    *   Design and implement UI for sponsors to collect leads from attendees who visit their booths or attend their sessions (e.g., QR code scanning, contact form).
*   **Backend Development:**
    *   Develop API endpoints for collecting and storing lead data (with attendee consent).
*   **Localization:**
    *   Add new strings for "Share Contact Info," "Scan Badge," etc.

## 6. Post-Conference Features

### 6.1. On-Demand Session Recordings

*   **UI/UX Development:**
    *   Design and implement UI for accessing and viewing session recordings after the event.
*   **Backend Development:**
    *   Develop API endpoints for managing and streaming session recordings.
*   **API Integration:**
    *   Integrate with a video hosting and streaming service.
*   **Localization:**
    *   Add new strings for "Watch Recording," "Past Sessions," etc.

### 6.2. Continued Networking

*   **UI/UX Development:**
    *   Ensure networking features (messaging, profiles) remain accessible after the conference.
*   **Backend Development:**
    *   Maintain backend infrastructure for networking features post-conference.
*   **Localization:**
    *   No new strings likely needed, but ensure existing networking strings are appropriate post-event.

---

**General Tasks across Features:**

*   **Update Localization Files:** Ensure all new UI elements, messages, and content strings are added to `src/locales/en/translation.json`, `src/locales/hr/translation.json`, and any other supported language files.
*   **Database Schema Updates:** Modify the database schema to accommodate new data points (user interests, questions, feedback, messages, points, badges, etc.).
*   **API Documentation:** Document all new API endpoints and their functionality.
*   **Testing:** Implement unit tests, integration tests, and end-to-end tests for all new features.
*   **Deployment:** Plan and execute the deployment of the updated application.
*   **Monitoring and Analytics:** Set up monitoring and analytics to track usage and performance of new features.
*   **Security Review:** Conduct a security review of all new features and APIs.
*   **Performance Optimization:** Ensure that the new features do not negatively impact application performance.
*   **Documentation:** Update user and developer documentation to reflect the new features.

## Discovered During Work

- **2025-05-19**: Migrate authentication & storage from Firebase to Supabase, including:
  - Remove Firebase packages and config files
  - Install `@supabase/supabase-js`
  - Create `src/lib/supabase/client.ts`
  - Refactor `AuthContext` and auth forms to use Supabase email & Google auth.
  - Update `.env.example` and `README.md` with Supabase variables.
  - Write unit tests for new Supabase auth logic.
- **2025-05-25**: Set up HTTPS access via custom domain:
  - Created Nginx configuration for reverse proxy with SSL
  - Added documentation for HTTPS setup in docs/https_setup.md
  - Created automated setup script scripts/setup_https.sh
  - Updated README.md to include HTTPS information
- **2025-05-19**: Refactor CLARC AI assistant to avoid bundling server-only Genkit dependencies:
  - Added API route `src/app/api/ai/answer/route.ts` wrapping Genkit flow.
  - Updated `ai-assistant.tsx` to call API via fetch.
  - Added webpack alias to ignore handlebars in client build.
  - Added Jest, ts-jest testing infrastructure and tests `tests/api/ai/answer.test.ts`.
- **2025-05-21**: Added Jest unit tests for Supabase authentication logic
  - Added `@testing-library/react` and `@testing-library/jest-dom` dev dependencies.
  - Updated `jest.config.ts` to jsdom environment and include tsx tests.
  - Created test file `tests/contexts/auth-context.test.tsx` covering `signUpWithEmail` and `signInWithEmail` success and error cases, mocking Supabase client.
  - Added Jest setup file `jest.setup.ts` to include jest-dom matchers.
- **2025-05-21**: Integrate LightRAG (Option 1 RAG flow)
  * Added LightRAG client (`src/lib/lightRagClient.ts`) to call external LightRAG REST API.
  * Created Genkit flow `answerConferenceQuestionsRAG` (`src/ai/flows/answer-conference-questions-rag.ts`).
  * Added Next.js API route `src/app/api/ai/answer-rag/route.ts`.
  * Updated AI assistant UI to hit the new RAG endpoint.
  * Environment variable `NEXT_PUBLIC_LIGHTRAG_API_URL` documented in README.
  * Pending: ingestion script and unit tests for RAG client.
- **2025-05-21**: LightRAG embedding dimension updated
  * Set `EMBEDDING_DIM=1536` in `scripts/start_lightrag.sh` to match OpenAI `text-embedding-3-small` model.
  * Updated README env table and PLANNING.md with AI Embedding Configuration notes.
  * Note: If we switch to Supabase pgvector in the future, ensure vector columns use `vector(1536)` and migrate any legacy 1 024-D data.
- **2025-05-22**: Add ingestion script for website content into LightRAG
  * Created `scripts/ingest_site_to_rag.py` CLI to fetch webpages, extract text with BeautifulSoup, and POST to LightRAG `/documents/text` endpoint.
  * Added dependencies `requests` and `beautifulsoup4` in new `requirements.txt`.
  * Added unit tests `tests/scripts/test_ingest_site_to_rag.py`.
  * Updated README with usage instructions (pending separate commit).
- **2025-05-21**: Node.js version upgrade needed
  * Current environment reports `node -v` → `v12.22.12` which is incompatible with Jest 29 and Next.js 15 expectations.
  * Add `.nvmrc` with `18` and update documentation to require Node 18+.
  * Action: Developers should install Node 18 via nvm/asdf or system package manager and reinstall node_modules.
- **2025-05-24**: Enhanced CLARC AI Assistant with markdown support and streaming
  * Added markdown rendering with react-markdown to display formatted responses
  * Implemented streaming functionality to show responses as they are generated
  * Updated LightRagClient with a simulated streaming function (lightRagStreamingQuery)
  * Added @tailwindcss/typography plugin for better markdown styling
  * Enhanced API route to support streaming response mode
  * Modified AI flows to accommodate streaming functionality with callback support
- **2025-05-25**: Set up persistent systemd services for production
  * Created systemd service files for both application components:
    - `app-9003.service` for the Next.js application (port 9003)
    - `lightrag-9000.service` for the LightRAG service (port 9000)
  * Added an installation script `install-services.sh` to automate service setup
  * Updated README.md with service management instructions
  * Fixed port allocation and service configuration for proper domain routing
  * Ensured services restart automatically on failure and after system reboot