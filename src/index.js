import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

const Application = () => {
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

ReactDOM.render(<Application />, document.getElementById('root'))

reportWebVitals()
