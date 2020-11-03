import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost } from '../../graphql/mutations'
import './_PostEditor.scss'
import PropTypes from 'prop-types'

class PostEditor extends Component {
    state = {
        postOwnerId: '',
        postOwnerUsername: '',
        postTitle: '',
        postBody: '',
        photo: '',
    }

    componentDidMount = async () => {
        const { username, userId } = this.props
        this.setState({
            postOwnerId: userId,
            postOwnerUsername: username,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.username !== this.props.username || prevProps.userId !== this.props.userId) {
            const { userId, username } = this.props
            this.setState({
                postOwnerId: userId,
                postOwnerUsername: username,
            })
        }
    }
    handleChangePost = (event) =>
        this.setState({
            [event.target.name]: event.target.value,
        })

    handleAddPost = async (event) => {
        event.preventDefault()

        const input = {
            postOwnerId: this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postTitle,
            postBody: this.state.postBody,
            createdAt: new Date().toISOString(),
        }

        await API.graphql(graphqlOperation(createPost, { input }))

        this.setState({ postTitle: '', postBody: '' })
    }
    render() {
        const { postTitle, postBody } = this.state
        return (
            <form className="PostEditor" onSubmit={this.handleAddPost}>
                <input
                    id="postitle"
                    className="PostEditor__title"
                    type="text"
                    placeholder="Title"
                    name="postTitle"
                    required
                    value={postTitle}
                    onChange={this.handleChangePost}
                />
                <textarea
                    className="PostEditor__body"
                    type="text"
                    name="postBody"
                    rows="3"
                    cols="40"
                    placeholder="What would you like to share?"
                    value={postBody}
                    onChange={this.handleChangePost}
                />
                <button id="submit-button" type="submit" className="PostEditor__button">
                    Post
                </button>
            </form>
        )
    }
}

export default PostEditor
PostEditor.propTypes = {
    userId: PropTypes.string,
    username: PropTypes.string,
}
