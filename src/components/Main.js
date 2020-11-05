import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'

import FeedContainer from './FeedContainer/FeedContainer'
import Profile from './Profile'

export default class Main extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/">
                    <FeedContainer />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
            </Switch>
        )
    }
}
