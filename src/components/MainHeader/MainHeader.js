import React from 'react'
import SignOut from '../Auth/SignOut'
import '../../scss/components/_MainHeader.scss'
import { Link } from 'react-router-dom'

class MainHeader extends React.Component {
    render() {
        return (
            <header className="MainHeader">
                <div className="MainHeader__inner">
                    <Link className="MainHeader__inner-logo" to="/">
                        #WaterCooler
                    </Link>
                    <SignOut />
                </div>
            </header>
        )
    }
}

export default MainHeader
