import React, { Component } from 'react'
import { API, graphqlOperation } from 'aws-amplify'
import { createComment } from '../../graphql/mutations'
import '../../scss/components/_CommentEditor.scss'
import UserContext from '../UserContext'
import PropTypes from 'prop-types'
export default class CommentEditor extends Component {
    state = {
        content: '',
    }

    handleChangeContent = (event) => this.setState({ content: event.target.value })

    handleAddComment = async (event) => {
        event.preventDefault()
        const { postId } = this.props
        const { userId, username } = this.context
        const { content } = this.state
        const input = {
            commentPostId: postId,
            commentOwnerId: userId,
            commentOwnerUsername: username,
            content: content,
        }

        await API.graphql(graphqlOperation(createComment, { input }))
        this.setState({ content: '' })
    }

    render() {
        return (
            <div className="CommentEditor">
                <form
                    className="CommentEditor__form"
                    aria-hidden="true"
                    onSubmit={this.handleAddComment}>
                    <input
                        type="text"
                        name="content"
                        required
                        placeholder="Add Your Comment..."
                        value={this.state.content}
                        onChange={this.handleChangeContent}
                    />
                </form>
            </div>
        )
    }
}

CommentEditor.propTypes = {
    context: PropTypes.object,
    postId: PropTypes.string,
    username: PropTypes.string,
}

CommentEditor.contextType = UserContext
