import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // Enables strict mode so that JSX is more strict with its syntax
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
