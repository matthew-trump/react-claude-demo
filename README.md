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
│   ├── Navigation.jsx       # Top navigation bar with auth UI
│   └── Navigation.css
├── context/
│   └── AuthContext.jsx      # Authentication state management
├── pages/
│   ├── Home.jsx            # Main LLM question interface
│   ├── Home.css
│   ├── About.jsx           # About page with app description
│   ├── About.css
│   ├── Login.jsx           # Login form page
│   └── Login.css
├── utils/
│   └── api.js              # API utility (dev/prod URL handling)
├── App.jsx                 # Main app with routing and auth provider
├── App.css                 # Global app styles
├── index.css               # Global CSS reset and base styles
└── main.jsx                # App entry point

.env                        # Environment variables (not committed)
vite.config.js             # Vite configuration with proxy setup
```

## Features Implemented

### 1. Authentication System
- **Login Page** - Username/password login form
- **Auth State Management** - React Context with localStorage persistence
- **Session Persistence** - Login state survives page refresh
- **Login Flow** - Sets auth state on 200 response from `/api/login`
- **Logout Functionality** - Clears auth state and localStorage
- **Protected UI** - Navigation shows username when logged in

### 2. Navigation
- **Sticky Full-Width Bar** - Always visible at top of page
- **Dynamic Auth Button** - Shows "Login" when logged out, "Logout" when logged in
- **Username Display** - Shows "Anonymous" or actual username in top right
- **Page Links** - Home and About pages
- **Responsive Design** - Flexbox layout with proper spacing

### 3. LLM Question Interface (Home Page)
- Text area for entering questions
- Submit button with loading states
- Response display section with placeholder text
- Error handling for API failures
- Form validation (prevents empty submissions)
- Loading indicator ("Sending..." state)
- API integration with `/api/ask` endpoint

### 4. Routing
- `/` - Home page (LLM question interface)
- `/about` - About page with app description
- `/login` - Login form page

### 5. API Integration
- **Smart URL Handling** - Works with or without Vite proxy
- **Development Mode** - Uses relative URLs with proxy (`/api/*`)
- **Production Mode** - Uses full backend URL from environment variable
- **Vite Proxy** - Configured to forward `/api/*` to backend with path preservation
- **Environment Variables** - Backend URL configurable via `VITE_BACKEND_URL`
- **Error Handling** - Comprehensive error catching and user feedback
- **JSON/Text Support** - Handles both JSON and plain text responses

## Environment Variables

The app uses environment variables for configuration:

- `VITE_BACKEND_URL` - Backend API URL (default: `http://0.0.0.0:3003`)

### Setup

1. Create a `.env` file in the project root:
   ```bash
   touch .env
   ```

2. Add the backend URL:
   ```
   VITE_BACKEND_URL=http://0.0.0.0:3003
   ```

**Note:** The `.env` file is git-ignored to protect sensitive configuration.

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
The frontend is configured to make API calls to the backend. Until the backend is running, you'll see error messages.

### Expected Backend API Endpoints

The frontend expects these endpoints on the backend (e.g., `http://0.0.0.0:3003`):

#### 1. Login Endpoint
**POST** `/api/login`

**Request:**
```json
{
  "username": "user123",
  "password": "password"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful"
}
```

#### 2. LLM Question Endpoint
**POST** `/api/ask`

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

### Backend Integration

When the backend is ready:
1. Start your backend server on `http://0.0.0.0:3003`
2. Ensure it has endpoints at `/api/login` and `/api/ask` that accept POST requests
3. In development: Frontend automatically proxies requests via Vite
4. In production: Configure CORS on your backend to allow requests from your frontend domain

## Styling Highlights

- Dark theme with purple accent color (#646cff)
- Responsive design with max-width containers
- Sticky navigation bar
- Smooth hover transitions
- Loading states and disabled button styling
- No layout shift when response appears

## Development Notes

### Why Vite Proxy?
During development, the frontend runs on `http://localhost:5173` and the backend runs on `http://0.0.0.0:3003`. Without the proxy, browsers would block requests due to CORS (Cross-Origin Resource Sharing) restrictions. The Vite proxy makes all `/api/*` requests appear to come from the same origin.

### Environment Variable Prefix
All environment variables exposed to the browser must be prefixed with `VITE_`. This is a security feature to prevent accidentally exposing server-side secrets to the client.

### Smart API URL Handling
The `src/utils/api.js` utility automatically determines whether to use:
- **Development**: Relative URLs (e.g., `/api/login`) - handled by Vite proxy
- **Production**: Full URLs (e.g., `http://backend.com/api/login`) - direct calls

This allows the same code to work in both environments without changes.

### Authentication State
- Stored in React Context (`src/context/AuthContext.jsx`)
- Persisted in localStorage for session persistence
- Automatically restored on page load
- Login triggered by 200 response from `/api/login`
- Logout clears both context and localStorage

## Next Steps

- [ ] Build backend API with `/api/login` and `/api/ask` endpoints
- [ ] Implement actual LLM integration (OpenAI, Anthropic, etc.)
- [ ] Add backend authentication/session management
- [ ] Deploy frontend and backend
- [ ] Configure production CORS settings
- [ ] Add more features:
  - [ ] Conversation history
  - [ ] User registration
  - [ ] Password reset
  - [ ] Rate limiting
  - [ ] Response streaming
