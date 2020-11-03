import React, { Component } from 'react'
import { Auth, API, graphqlOperation } from 'aws-amplify'
import { createComment } from '../../graphql/mutations'
import '../../scss/components/_CommentEditor.scss'

import PropTypes from 'prop-types'
export default class CommentEditor extends Component {
    state = {
        commentOwnerId: '',
        commentOwnerUsername: '',
        content: '',
    }

    componentDidMount = async () => {
        await Auth.currentUserInfo().then((user) => {
            this.setState({
                commentOwnerId: user.attributes.sub,
                commentOwnerUsername: user.username,
            })
        })
    }

    handleChangeContent = (event) => this.setState({ content: event.target.value })
    handleAddComment = async (event) => {
        event.preventDefault()
        const { postId } = this.props
        const { commentOwnerId, commentOwnerUsername, content } = this.state
        const input = {
            commentPostId: postId,
            commentOwnerId: commentOwnerId,
            commentOwnerUsername: commentOwnerUsername,
            content: content,
            createdAt: new Date().toISOString(),
        }
        await API.graphql(graphqlOperation(createComment, { input }))

        this.setState({ content: '' })
    }

    render() {
        return (
            <div className="CommentEditor">
                <form className="CommentEditor__form" onSubmit={this.handleAddComment}>
                    <textarea
                        type="text"
                        name="content"
                        rows="3"
                        cols="40"
                        required
                        placeholder="Add Your Comment..."
                        value={this.state.content}
                        onChange={this.handleChangeContent}
                    />

                    <button className="CommentEditor__buton" type="submit">
                        Add Comment
                    </button>
                </form>
            </div>
        )
    }
}

CommentEditor.propTypes = {
    postId: PropTypes.string,
    username: PropTypes.string,
}
