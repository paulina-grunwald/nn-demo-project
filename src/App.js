import React from 'react'
import { withAuthenticator } from 'aws-amplify-react'
import '@aws-amplify/ui/dist/style.css'
import MainHeader from './components/MainHeader/MainHeader'
// import FeedContainer from './components/FeedContainer/FeedContainer'
import './scss/components/App.scss'
import { Layout } from 'antd'
import Main from './components/Main'

function App() {
    const { Footer } = Layout
    return (
        <div className="App">
            <MainHeader />
            <Main />
            {/* <FeedContainer /> */}
            <Footer style={{ textAlign: 'center', marginTop: '200px' }}>
                ©2020 Created by #WaterCooler
            </Footer>
        </div>
    )
}

export default withAuthenticator(App)
