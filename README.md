# LLM Question Interface

A React-based frontend application for submitting questions to a Large Language Model (LLM) backend and receiving intelligent responses.

## Tech Stack

- **React** - UI library
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **JavaScript** - Programming language

## Project Structure

```
src/
├── components/
│   ├── Navigation.jsx       # Top navigation bar
│   └── Navigation.css
├── pages/
│   ├── Home.jsx            # Main LLM question interface
│   ├── Home.css
│   ├── About.jsx           # About page with app description
│   └── About.css
├── App.jsx                 # Main app with routing setup
├── App.css                 # Global app styles
├── index.css               # Global CSS reset and base styles
└── main.jsx                # App entry point

.env                        # Environment variables (not committed)
.env.example               # Environment variables template
vite.config.js             # Vite configuration with proxy setup
```

## Features Implemented

### 1. LLM Question Interface (Home Page)
- Text area for entering questions
- Submit button with loading states
- Response display section with placeholder text
- Error handling for API failures
- Form validation (prevents empty submissions)
- Loading indicator ("Sending..." state)

### 2. Navigation
- Sticky navigation bar at top of page
- Links to Home and About pages
- Full-width design spanning entire window
- Hover effects on navigation links

### 3. Routing
- `/` - Home page (LLM question interface)
- `/about` - About page with app description

### 4. API Integration Setup
- Vite proxy configuration to avoid CORS issues
- Environment variable support for backend URL
- POST requests to `/api/ask` endpoint
- JSON request/response handling
- Comprehensive error handling and user feedback

## Environment Variables

The app uses environment variables for configuration:

- `VITE_BACKEND_URL` - Backend API URL (default: `http://localhost:3000`)

### Setup

1. Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Update the backend URL if needed:
   ```
   VITE_BACKEND_URL=http://localhost:3000
   ```

## Vite Proxy Configuration

The app uses Vite's proxy feature during development to avoid CORS issues:

- Frontend requests to `/api/*` are proxied to the backend
- Configured in `vite.config.js`
- Uses `VITE_BACKEND_URL` environment variable
- Only active during development (`npm run dev`)

**Production Note:** In production, you'll need to configure CORS on your backend server since the Vite proxy only runs during development.

## Getting Started

### Installation

```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will run at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Builds the app to the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

Serves the production build locally for testing.

## API Integration

### Current State
The frontend is configured to make API calls to `/api/ask` but the backend is not yet implemented. When you click "Submit Question", you'll see an error message since the backend doesn't exist yet.

### Expected Backend API

The frontend expects a POST endpoint at `/api/ask` with:

**Request:**
```json
{
  "question": "What is the meaning of life?"
}
```

**Response:**
```json
{
  "answer": "The LLM's response here..."
}
```

### Future Backend Integration

When the backend is ready:
1. Start your backend server on the port specified in `.env` (default: 3000)
2. Ensure it has an endpoint at `/api/ask` that accepts POST requests
3. The frontend will automatically proxy requests during development
4. For production, configure CORS on your backend to allow requests from your frontend domain

## Styling Highlights

- Dark theme with purple accent color (#646cff)
- Responsive design with max-width containers
- Sticky navigation bar
- Smooth hover transitions
- Loading states and disabled button styling
- No layout shift when response appears

## Development Notes

### Why Vite Proxy?
During development, the frontend runs on `http://localhost:5173` and the backend will run on `http://localhost:3000`. Without the proxy, browsers would block requests due to CORS (Cross-Origin Resource Sharing) restrictions. The Vite proxy makes all `/api/*` requests appear to come from the same origin.

### Environment Variable Prefix
All environment variables exposed to the browser must be prefixed with `VITE_`. This is a security feature to prevent accidentally exposing server-side secrets to the client.

## Next Steps

- [ ] Build backend API to handle LLM questions
- [ ] Implement actual LLM integration (OpenAI, Anthropic, etc.)
- [ ] Add authentication if needed
- [ ] Deploy frontend and backend
- [ ] Configure production CORS settings
- [ ] Add more features (conversation history, etc.)
