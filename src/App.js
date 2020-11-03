import React from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import '@aws-amplify/ui/dist/style.css'
import MainHeader from './components/MainHeader/MainHeader'
import FeedContainer from './components/FeedContainer/FeedContainer'
import './scss/components/App.scss'

function App() {
    return (
        <div>
            <MainHeader />
            <div className="App">
                <header className="App-header"></header>
                <FeedContainer />
            </div>
        </div>
    )
}

export default withAuthenticator(App)
