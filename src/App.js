import React from 'react'
import MainHeader from './components/MainHeader/MainHeader'
import FeedContainer from './components/FeedContainer/FeedContainer'
import './App.scss'

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

export default App
