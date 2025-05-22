# CLARC 2025 Conference Application Planning

This document outlines the current state of the CLARC 2025 conference application and describes potential future features for development, referencing the existing project structure and localization efforts.

## Current State

The CLARC 2025 conference application currently provides core functionalities essential for attendees and organizers, as outlined in the `docs/blueprint.md` and reflected in the project structure. Key features include:

*   **Clarity Schedule:** Displaying the conference schedule, likely managed through components in `src/components/conference/schedule.tsx`.
*   **Speaker Showcase:** Highlighting conference speakers, potentially handled by components in `src/components/conference/speakers.tsx`.
*   **CLARC AI Assistant:** An AI assistant for conference information, with core logic potentially in `src/ai/genkit.ts` and flows in `src/ai/flows/answer-conference-questions.ts`. The UI would be in a component like `src/components/conference/ai-assistant.tsx`.
*   **Streamlined Registration:** A process for attendees to register, likely involving components like `src/components/conference/registration.tsx` and potentially an API endpoint like `src/app/api/send-registration-email/route.ts`. Authentication is handled via `src/app/auth/page.tsx` and context in `src/contexts/auth-context.tsx`.
*   **Sponsor Highlights:** Showcasing conference sponsors, potentially through a component like `src/components/conference/sponsors.tsx`.
*   **Localization:** Basic internationalization is set up using `i18n.ts`, `src/i18n.ts`, and language files in `src/locales/en/translation.json` and `src/locales/hr/translation.json`. The `I18nProvider` in `src/app/i18n/I18nProvider.tsx` manages this.
*   **UI Components:** A suite of reusable UI components are available in `src/components/ui/`, providing a consistent look and feel.
*   **Utility Functions:** Common utility functions are likely located in `src/lib/utils.ts`.

### AI Embedding Configuration

* LightRAG is currently configured to use OpenAI's `text-embedding-3-small` model, which returns 1 536-dimensional vectors.
* We set `EMBEDDING_DIM=1536` in `scripts/start_lightrag.sh` so LightRAG's vector store (default `NanoVectorDBStorage`) initialises with the correct dimension.
* Supabase/pgvector is **not** yet used for embeddings. If we migrate to `PGVectorStorage`, the table schema must declare `vector(1536)` to match the model.
* Any historic data produced with a 1 024-dimension setting must be dropped or migrated before switching to pgvector.

The application utilizes Next.js for the frontend and backend API routes, as indicated by `next.config.ts`, `src/app/`, and other related files.

## Future Enhancements

These are potential features to expand the functionality and engagement of the CLARC 2025 conference application.

### Enhanced CLARC AI Assistant

*   **Personalized Schedule Recommendations:** The AI could analyze user interaction with the schedule (e.g., marking sessions) and suggest relevant sessions. This would require tracking user preferences and expanding the AI's capabilities to include recommendation logic.
*   **Speaker Q&A:** Implement a system for attendees to submit questions to speakers via the AI. This would involve storing questions, potentially routing them for moderation, and developing an interface for speakers or the AI to provide answers.
*   **Networking Facilitation:** Develop logic within the AI to connect attendees based on shared interests or sessions attended. This would necessitate implementing user profiles with interest fields.
*   **Real-time Updates and Notifications:** Integrate a notification system to push real-time updates about schedule changes, session start times, or important announcements via the AI interface.
*   **Multilingual Support:** Ensure all new AI interactions and responses are fully localized, leveraging the existing `src/locales/` structure.

### Interactive Session Engagement

*   **Live Polling and Q&A:** Integrate a third-party polling or Q&A tool, or build a custom solution, to allow real-time interaction during sessions. This would require frontend components to display polls/questions and potentially backend APIs to manage the data.
*   **Session Feedback:** Create a system for attendees to rate sessions and speakers and provide written feedback. This would involve new UI components and backend storage for feedback data.
*   **Resource Sharing:** Provide a mechanism for speakers to upload and share presentation slides or other materials, accessible through the session details view.

### Community Building and Networking

*   **Attendee Profiles:** Develop a feature for attendees to create and manage profiles, including their professional interests, expertise, and social links. This requires new data models and UI components.
*   **Direct Messaging:** Implement a direct messaging system to allow attendees to communicate privately within the application. This would involve backend infrastructure for message storage and real-time delivery.
*   **Topic-Based Forums or Groups:** Create a forum or group feature allowing attendees to discuss specific topics related to the conference. This would require a forum structure and moderation capabilities.
*   **Virtual Networking Spaces:** For virtual components, integrate or build virtual rooms or spaces for attendees to gather and network.

### Gamification and Engagement

*   **Points and Badges:** Implement a system to award points and badges for user actions (attending sessions, engaging with content, networking). This requires tracking user activity and a system for managing and displaying achievements.
*   **Leaderboards:** Display leaderboards based on accumulated points to foster friendly competition.

### Enhanced Sponsor Engagement

*   **Virtual Booths:** For virtual aspects, create interactive virtual booth pages for sponsors to showcase content, host live chats, or provide demos.
*   **Sponsor Sessions or Workshops:** Allow sponsors to schedule and host their own sessions or workshops within the conference schedule.
*   **Lead Retrieval:** Develop a tool or integrate with a service for sponsors to capture lead information from attendees who interact with their content.

### Post-Conference Features

*   **On-Demand Session Recordings:** Integrate video hosting and playback to provide access to session recordings after the conference concludes.
*   **Continued Networking:** Maintain the networking features and attendee profiles to allow connections to persist beyond the event dates.

Implementing these features will require significant development effort, including frontend development, backend API creation, database design, and potential integration with third-party services. Localization efforts will need to be extended to cover all new features and content.

## Production Deployment Architecture

The CLARC 2025 application is deployed with the following architecture:

1. **Next.js Application (Port 9003):**
   - The main conference application running on port 9003
   - Managed as a systemd service (`app-9003.service`)
   - Served at https://clarc2025.cji.uniri.hr/ via Nginx reverse proxy
   - Started with `npm run dev` command

2. **LightRAG Service (Port 9000):**
   - Retrieval-Augmented Generation service for the AI assistant
   - Managed as a systemd service (`lightrag-9000.service`)
   - Started with `./scripts/start_lightrag.sh 9000` command
   - Used internally by the Next.js app for AI question answering

3. **Nginx Reverse Proxy:**
   - Handles SSL termination and domain routing
   - Configuration at `/etc/nginx/sites-available/clarc2025.conf`
   - Routes https://clarc2025.cji.uniri.hr/ to the Next.js app (port 9003)
   - Managed by Certbot for SSL certificate renewal

This setup ensures the application continues running even after disconnection and automatically restarts on server reboot.