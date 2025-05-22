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
- **Secure Access**: HTTPS configuration for secure access via clarc2025.cji.uniri.hr

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
- A `.nvmrc` file is included; run `nvm use` (or install Node 18 manually) to match the required runtime.
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

### 🔍 Adding Content to the RAG Store

You can ingest any public webpage (or a list of them) into LightRAG so that the
assistant can answer questions based on that content.

```bash
python scripts/ingest_site_to_rag.py \
  --urls https://clarc2025.example.com https://clarc2025.example.com/speakers
```

The script will:

1. Download each page.
2. Extract visible text with BeautifulSoup.
3. `POST` the cleaned text to LightRAG's `/documents/text` endpoint.

Environment variables used by the script:

| Variable | Default | Purpose |
|----------|---------|---------|
| `LIGHTRAG_API_URL` | `http://localhost:9000` | Base URL of the LightRAG instance. |
| `LIGHTRAG_API_KEY` | *(none)* | Optional API key if LightRAG auth is enabled. |

Make sure you have `requests` and `beautifulsoup4` installed (listed in
`requirements.txt`). Activate the project's Python virtual environment (the one
LightRAG uses) before running the script.

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

## 🔒 HTTPS Configuration

For setting up secure HTTPS access to the application via clarc2025.cji.uniri.hr, see the [HTTPS Setup Guide](docs/https_setup.md).

### Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_LIGHTRAG_API_URL` | Base URL of the running LightRAG server (e.g. `http://localhost:8000`). The CLARC AI assistant will POST to `<url>/query` with `{ question: string }` and expects `{ answer: string }`. |
| `EMBEDDING_DIM` | Embedding vector dimension that LightRAG should expect. Must match the dimensions returned by the embedding model. For OpenAI `text-embedding-3-small` this is `1536`. |
| `INPUT_DIR` | Path passed to `lightrag-server --input-dir`. Defaults to `./inputs`. Point this at whatever folder holds your site's markdown/HTML source so LightRAG auto-indexes it on startup. |

## Production Services Setup

To run the application and LightRAG as persistent services that continue running even after disconnecting:

1. Check that you have the service files and install script:
   - `app-9003.service` - For the CLARC 2025 Next.js application on port 9003
   - `lightrag-9000.service` - For the LightRAG instance on port 9000
   - `install-services.sh` - Installation script

2. Make the installation script executable if needed:
   ```bash
   chmod +x install-services.sh
   ```

3. Run the installation script with sudo:
   ```bash
   sudo ./install-services.sh
   ```

This will:
- Copy the service files to `/etc/systemd/system/`
- Enable both services to start automatically on boot
- Start both services immediately
- Show you the status of each service

### Managing Services

Use these commands to manage the services:

- Check status:
  ```bash
  sudo systemctl status app-9003.service
  sudo systemctl status lightrag-9000.service
  ```

- Stop services:
  ```bash
  sudo systemctl stop app-9003.service
  sudo systemctl stop lightrag-9000.service
  ```

- Start services:
  ```bash
  sudo systemctl start app-9003.service
  sudo systemctl start lightrag-9000.service
  ```

- Restart services:
  ```bash
  sudo systemctl restart app-9003.service
  sudo systemctl restart lightrag-9000.service
  ```

- View logs:
  ```bash
  sudo journalctl -u app-9003.service
  sudo journalctl -u lightrag-9000.service
  ```

The services will continue running even after disconnecting from the server and will automatically restart on reboot.

### Troubleshooting Services

If you encounter issues with the services:

1. **Check which services are actually running:**
   ```bash
   ps aux | grep -E '(lightrag|node)'
   ```

2. **Verify port usage:**
   ```bash
   sudo lsof -i :9000
   sudo lsof -i :9003
   ```

3. **View detailed service logs:**
   ```bash
   sudo journalctl -u app-9003.service -n 100
   sudo journalctl -u lightrag-9000.service -n 100
   ```

4. **Check Nginx configuration:**
   ```bash
   sudo nginx -t
   cat /etc/nginx/sites-available/clarc2025.conf
   ```

5. **Common issues:**
   - If LightRAG is showing on the domain instead of the Next.js app, ensure:
     - LightRAG is only running on port 9000
     - Next.js is running on port 9003
     - Nginx is forwarding the domain to port 9003
   - If services crash repeatedly, check for port conflicts or memory issues
