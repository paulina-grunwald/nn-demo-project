import React, { Component } from 'react'
import { listPosts } from '../../graphql/queries'
import { API, graphqlOperation } from 'aws-amplify'
import Post from '../Post/Post'
import PropTypes from 'prop-types'
export default class Posts extends Component {
    state = {
        posts: [],
    }

    componentDidMount = async () => {
        this.getPosts()
    }

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts))
        this.setState({ posts: result.data.listPosts.items })
        console.log('All Posts: ', result.data.listPosts.items)
    }
    render() {
        const { posts } = this.state
        return posts.map((post) => {
            return <Post post={post} key={post} />
        })
    }
}

Posts.propTypes = {
    posts: PropTypes.array,
}
