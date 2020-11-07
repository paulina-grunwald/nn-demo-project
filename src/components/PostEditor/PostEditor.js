import React, { Component } from 'react'
import { API } from 'aws-amplify'
import PropTypes from 'prop-types'
import { createPost } from '../../graphql/mutations'
import '../../scss/components/_PostEditor.scss'

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

        const postDetails = {
            postOwnerId: this.state.postOwnerId,
            postOwnerUsername: this.state.postOwnerUsername,
            postTitle: this.state.postTitle,
            postBody: this.state.postBody,
        }

        await API.graphql({
            query: createPost,
            variables: { input: postDetails },
        })

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
