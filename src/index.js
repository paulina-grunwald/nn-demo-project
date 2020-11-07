import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './index.scss'
import App from './App'
import reportWebVitals from './reportWebVitals'
import Amplify from 'aws-amplify'
import aws_exports from './aws-exports'
import './scss/global/_reset.scss'

Amplify.configure(aws_exports)

render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root'),
)

reportWebVitals()
