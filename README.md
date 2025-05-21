# CLARC 2025 Conference Application

CLARC 2025 is a comprehensive conference management application built with Next.js and Supabase, designed to provide attendees and organizers with a seamless conference experience.

## 🚀 Features

- **Conference Schedule**: View detailed schedule of all sessions and events
- **Speaker Showcase**: Explore profiles of conference speakers and presenters
- **CLARC AI Assistant**: AI-powered assistant for conference information
- **Streamlined Registration**: Simple process for attendee registration
- **Sponsor Highlights**: Showcase of conference sponsors
- **Call for Papers**: Submit and manage paper submissions
- **Venue Information**: Details about the conference venue
- **Accommodations**: Information about nearby accommodations
- **About Opatija**: Learn about the conference location

## 🛠️ Technologies Used

- **Frontend**: Next.js 15, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Authentication**: Supabase Auth
- **Database**: Supabase
- **AI Integration**: Genkit AI
- **Internationalization**: i18next (English and Croatian support)
- **Form Handling**: React Hook Form, Zod
- **UI Components**: Radix UI

## 📋 Prerequisites

- Node.js 18+ and npm
- Supabase account for authentication and database
- API keys for Genkit AI (if using AI assistant features)

## 🔧 Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/clarc2025.git
cd clarc2025
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server
```bash
npm run dev
```

The application will be available at http://localhost:9003

## 🧪 Testing

Run the test suite with:
```bash
npm run test
```

## 📦 Building for Production

Build the application with:
```bash
npm run build
```

Start the production server:
```bash
npm run start
```

## 🌐 Internationalization

The application supports multiple languages:
- English
- Croatian

Language files are located in `src/locales/`.

## 🧠 AI Assistant Development

For developing the AI assistant features:

```bash
npm run genkit:dev
```

For development with hot-reloading:

```bash
npm run genkit:watch
```

## 🔄 Project Structure

- `/src` - Application source code
  - `/app` - Next.js application routes and pages
  - `/components` - React components
  - `/contexts` - React context providers
  - `/hooks` - Custom React hooks
  - `/lib` - Utility functions and shared code
  - `/locales` - i18n translation files
  - `/ai` - AI assistant functionality

## 📝 License

[MIT](LICENSE)

## 👥 Contributing

Please refer to the [PLANNING.md](PLANNING.md) document for details on the project architecture and future development plans.
