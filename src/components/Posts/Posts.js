import React, { Component } from 'react'
import Post from '../Post/Post'
import PropTypes from 'prop-types'
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
        const { posts } = this.props
        return posts.map((post) => {
            return <Post post={post} key={post.postId} />
        })
    }
}

Posts.propTypes = {
    posts: PropTypes.array,
}
