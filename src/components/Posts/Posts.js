import React, { Component } from 'react'
import Post from '../Post/Post'
import PropTypes from 'prop-types'
import UserContext from '../UserContext'
export default class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidUpdate(prevProps) {
        const { posts } = this.props
        if (prevProps.posts !== posts) {
            this.setState({
                posts: posts,
            })
        }
    }

    render() {
        return (
            <UserContext.Consumer>
                {({ username, posts }) => {
                    return posts.map((post, index) => {
                        return (
                            <Post
                                post={post}
                                key={index}
                                // userId={userId}
                                username={username}
                            />
                        )
                    })
                }}
            </UserContext.Consumer>
        )
    }
}

Posts.propTypes = {
    posts: PropTypes.array,
}
