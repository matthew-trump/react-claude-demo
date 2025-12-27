import './About.css'

function About() {
  return (
    <div className="about-container">
      <h1>About This App</h1>
      <p>
        This is an LLM Question Interface application built with React and Vite.
        The app allows users to submit questions to a Large Language Model (LLM)
        backend and receive intelligent responses in real-time.
      </p>
      <p>
        The frontend is built using modern React with hooks for state management,
        and communicates with a backend API that processes questions through an LLM.
        The application uses Vite's proxy configuration to handle API requests during
        development, avoiding CORS issues.
      </p>
      <p>
        This project demonstrates a clean, user-friendly interface for interacting
        with AI language models, with proper error handling and loading states for
        a smooth user experience.
      </p>
    </div>
  )
}

export default About
