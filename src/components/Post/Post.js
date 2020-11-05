import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentEditor from '../CommentEditor/CommentEditor'
import '../../scss/components/_Post.scss'
import { API, graphqlOperation } from 'aws-amplify'
import { deletePost } from '../../graphql/mutations'
import { Popover } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
import Comments from '../CommentEditor/Comment'
import UserContext from '../UserContext'
import { updatePost } from '../../graphql/mutations'
class Post extends Component {
    state = {
        isEditing: false,
        postTitle: '',
        postBody: '',
    }

    componentDidMount = () => {
        const { post } = this.props
        this.setState({
            postTitle: post.postTitle,
            postBody: post.postBody,
        })
    }
    handleDeletePost = async (postId) => {
        const input = {
            id: postId,
        }

        await API.graphql(graphqlOperation(deletePost, { input }))
    }

    handleUpdatePost = async (event, postId, userId, username) => {
        event.preventDefault()

        const input = {
            id: postId,
            postOwnerId: userId,
            postOwnerUsername: username,
            postTitle: this.state.postTitle,
            postBody: this.state.postBody,
        }

        await API.graphql(graphqlOperation(updatePost, { input }))
        this.setState({ isEditing: false })
    }

    changePostStatus = () => {
        this.setState({ isEditing: true })
    }

    handleTitle = (event) => {
        this.setState({
            postTitle: event.target.value,
        })
    }
    handleBody = (event) => {
        this.setState({ postBody: event.target.value })
    }

    render() {
        const { post } = this.props
        const comments = post.comments.items
        const content = (
            <div>
                <div
                    tabIndex={0}
                    onClick={() => this.changePostStatus()}
                    aria-hidden="true"
                    role="button"
                    defaultValue
                    aria-hidden>
                    Edit
                </div>
                <div
                    tabIndex={-1}
                    aria-hidden="true"
                    onClick={() => this.handleDeletePost(post.id)}
                    role="button"
                    defaultValue>
                    Delete
                </div>
            </div>
        )

        return (
            <UserContext.Consumer>
                {({ username, userId }) => {
                    return (
                        <div>
                            <div className="Post" key={post.id}>
                                <div className="Post__header">
                                    <div className="Post__header-userinfo">
                                        <div className="Post__header-avatar"></div>
                                        <div className="Post__header-info">
                                            <div>{username} shared a post</div>
                                            <time> {new Date(post.createdAt).toDateString()}</time>
                                        </div>
                                    </div>
                                    {userId === post.postOwnerId && (
                                        <Popover content={content}>
                                            <EllipsisOutlined />
                                        </Popover>
                                    )}
                                </div>
                                {this.state.isEditing ? (
                                    <form
                                        className="PostEditor"
                                        onSubmit={(event) =>
                                            this.handleUpdatePost(event, post.id, userId, username)
                                        }>
                                        <input
                                            id="postitle"
                                            className="PostEditor__title"
                                            type="text"
                                            placeholder="Title"
                                            name="postTitle"
                                            required
                                            value={this.state.postTitle}
                                            onChange={this.handleTitle}
                                        />
                                        <textarea
                                            className="PostEditor__body"
                                            type="text"
                                            name="postBody"
                                            rows="3"
                                            cols="40"
                                            placeholder="What would you like to share?"
                                            value={this.state.postBody}
                                            onChange={this.handleBody}></textarea>
                                        <button className="CommentEditor__buton" type="submit">
                                            Save
                                        </button>
                                    </form>
                                ) : (
                                    <div className="Post__wrapper">
                                        <div className="Post__title">{post.postTitle}</div>
                                        <div className="Post__body">{post.postBody}</div>
                                        {comments.length > 0 && <Comments comments={comments} />}
                                    </div>
                                )}

                                <CommentEditor postId={post.id} />
                            </div>
                        </div>
                    )
                }}
            </UserContext.Consumer>
        )
    }
}

export default Post

Post.propTypes = {
    post: PropTypes.object,
    username: PropTypes.string,
    context: PropTypes.object,
}
