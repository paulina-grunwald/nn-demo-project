import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createPost } from '../../graphql/mutations'
import './_PostEditor.scss'
class PostEditor extends Component {
    state = {
        postOwnerId: 'a2e2',
        postOwnerUsername: 'alex',
        postTitle: '',
        postBody: '',
    }

    componentDidMount = async () => {}

    handleChangePost = (event) =>
        this.setState({
            [event.target.name]: event.target.value,
        })

    handleAddPost = async () => {
        const { postOwnerId, postOwnerUsername, postTitle, postBody } = this.state
        event.preventDefault()
        const input = {
            postOwnerId,
            postOwnerUsername,
            postTitle,
            postBody,
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
                <input id="submit-button" type="submit" className="PostEditor__button" />
            </form>
        )
    }
}

export default PostEditor
