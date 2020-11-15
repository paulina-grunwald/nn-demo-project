import React, { Component } from 'react'
import PropTypes from 'prop-types'
import UserContext from '../UserContext'
import { Popover } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import { updateComment, deleteComment } from '../../graphql/mutations'
import { API, graphqlOperation } from 'aws-amplify'
import '../../scss/components/_Comment.scss'
export default class Comment extends Component {
    state = {
        commentBody: '',
        isEditing: false,
    }

    componentDidMount = () => {
        const { comment } = this.props
        this.setState({
            commentBody: comment.content,
        })
    }

    componentDidUpdate(prevProps) {
        const { comment } = this.props
        if (prevProps.comment !== comment) {
            this.setState({
                commentBody: comment.content,
            })
        }
    }

    changeCommentStatus = () => {
        this.setState({ isEditing: true })
    }

    hanldeCancelPostEdit = () => {
        this.setState({ isEditing: false })
    }
    handleCommentContent = (event) => {
        this.setState({
            commentBody: event.target.value,
        })
    }

    handleUpdateComment = async (event, commentId, userId, username) => {
        const { commentBody } = this.state
        const { postId } = this.props
        event.preventDefault()

        const input = {
            id: commentId,
            commentOwnerId: userId,
            commentOwnerUsername: username,
            content: commentBody,
            commentPostId: postId,
        }

        await API.graphql(graphqlOperation(updateComment, { input }))
        this.setState({ isEditing: false })
    }

    handleDeletComment = async (commentId) => {
        const input = {
            id: commentId,
        }

        await API.graphql(graphqlOperation(deleteComment, { input }))
    }

    render() {
        const { comment } = this.props
        const { isEditing } = this.state
        const content = (
            <div>
                <div
                    tabIndex={0}
                    onClick={() => this.changeCommentStatus()}
                    role="button"
                    defaultValue
                    aria-hidden>
                    Edit
                </div>
                <div
                    tabIndex={-1}
                    role="button"
                    defaultValue
                    aria-hidden
                    onClick={() => this.handleDeletComment(comment.id)}>
                    Delete
                </div>
            </div>
        )

        return (
            <UserContext.Consumer>
                {({ userId, username }) => {
                    return (
                        <div className="Comment">
                            <div className="Comment__header">
                                <div className="Comment__header-userinfo">
                                    <div className="Comment__header-avatar"></div>
                                    <div className="Comment__header-info">
                                        <div>{username}</div>
                                        <time> {new Date(comment.createdAt).toDateString()}</time>
                                        {isEditing ? (
                                            <form
                                                className="Comment__editor"
                                                onSubmit={(event) =>
                                                    this.handleUpdateComment(
                                                        event,
                                                        comment.id,
                                                        userId,
                                                        username,
                                                    )
                                                }>
                                                <textarea
                                                    id="commentitle"
                                                    className="Comment__editor-body"
                                                    type="text"
                                                    name="commentTitle"
                                                    required
                                                    value={this.state.commentBody}
                                                    onChange={this.handleCommentContent}></textarea>
                                                <div className="Comment__editor-buttons">
                                                    <button
                                                        className="Comment__editor-save"
                                                        type="submit">
                                                        Save
                                                    </button>
                                                    <button
                                                        className="Comment__editor-cancel"
                                                        onClick={this.hanldeCancelCommentEdit}>
                                                        Cancel
                                                    </button>
                                                </div>
                                            </form>
                                        ) : (
                                            <div className="Comment__body">{comment.content}</div>
                                        )}
                                    </div>
                                </div>
                                {userId === comment.commentOwnerId && (
                                    <Popover content={content}>
                                        <EllipsisOutlined />
                                    </Popover>
                                )}
                            </div>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}

Comment.propTypes = {
    comment: PropTypes.object,
    postId: PropTypes.string,
}
