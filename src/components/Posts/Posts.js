import React, { Component } from 'react'
import Post from '../Post/Post'
import PropTypes from 'prop-types'
import UserContext from '../UserContext'
export default class Posts extends Component {
    render() {
        return (
            <UserContext.Consumer>
                {({ username, posts }) => {
                    return posts.map((post, index) => {
                        return <Post post={post} key={index} username={username} />
                    })
                }}
            </UserContext.Consumer>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array,
}
