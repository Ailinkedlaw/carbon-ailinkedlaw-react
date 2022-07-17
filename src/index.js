import React from 'react'
import ReactDOM from 'react-dom'

import './index.scss'
import App from './App'


function Index () {
  
  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

ReactDOM.render(<Index />, document.getElementById('root'))
