import React from 'react'
import SignOut from '../Auth/SignOut'
import './_MainHeader.scss'

class MainHeader extends React.Component {
    render() {
        return (
            <header className="MainHeader">
                <div className="MainHeader__inner">
                    <div className="MainHeader__inner-logo">#WaterCooler</div>
                    <SignOut />
                </div>
            </header>
        )
    }
}

export default MainHeader
