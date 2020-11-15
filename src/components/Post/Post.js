import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CommentEditor from '../CommentEditor/CommentEditor'
import '../../scss/components/_Post.scss'
import { API, graphqlOperation } from 'aws-amplify'
import { deletePost } from '../../graphql/mutations'
import { Popover } from 'antd'
import { EllipsisOutlined, HeartFilled } from '@ant-design/icons'
import Comments from '../CommentEditor/Comments'
import UserContext from '../UserContext'
import { updatePost, createLike, deleteLike } from '../../graphql/mutations'
class Post extends Component {
    static contextType = UserContext
    state = {
        isEditing: false,
        postTitle: '',
        postBody: '',
        isliked: false,
        userLikeId: '',
    }

    componentDidMount = () => {
        const { post } = this.props
        const { userId } = this.context
        const loggedInUserLike = post.likes.items.filter((like) => like.likeOwnerId === userId)
        let isLiked = loggedInUserLike.length >= 1 ? true : false
        let likeId = loggedInUserLike.length >= 1 ? loggedInUserLike[0].id : false

        this.setState({
            postTitle: post.postTitle,
            postBody: post.postBody,
            isliked: isLiked,
            userLikeId: this.getLikeId(post),
            likeId: likeId,
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.post !== this.props.post) {
            const { userId } = this.context
            const { post } = this.props
            const loggedInUserLike = post.likes.items.filter((like) => like.likeOwnerId === userId)
            let isLiked = loggedInUserLike.length >= 1 ? true : false
            this.setState({
                postTitle: post.postTitle,
                postBody: post.postBody,
                isliked: isLiked,
                // likeId: loggedInUserLike[0].id
                userLikeId: this.getLikeId(post),
            })
        }
    }

    getLikeId = (post) => {
        const { userId } = this.context
        const loggedInUserLike = post.likes.items.filter((like) => like.likeOwnerId === userId)
        if (loggedInUserLike.length > 0) {
            const likeId = loggedInUserLike[0].id
            return likeId
        }
    }

    handleDeletePost = async (postId) => {
        const input = {
            id: postId,
        }

        await API.graphql(graphqlOperation(deletePost, { input }))
    }

    handleUpdatePost = async (event, postId, userId, username) => {
        const { postBody, postTitle } = this.state
        event.preventDefault()

        const input = {
            id: postId,
            postOwnerId: userId,
            postOwnerUsername: username,
            postTitle: postTitle,
            postBody: postBody,
        }

        await API.graphql(graphqlOperation(updatePost, { input }))
        this.setState({ isEditing: false })
    }

    hanldeCancelPostEdit = () => {
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

    handleLike = async () => {
        const { post } = this.props
        const { userId, username } = this.context

        if (this.state.isliked) {
            this.handleDeleteLike()
        } else {
            const input = {
                numberLikes: 1,
                likeOwnerId: userId,
                likeOwnerUsername: username,
                likePostId: post.id,
            }

            await API.graphql(graphqlOperation(createLike, { input }))
        }
    }

    likePost = () => {
        this.setState({ isliked: true })
        this.handleLike()
    }

    handleDeleteLike = async () => {
        const { likeId } = this.state
        const input = {
            id: likeId,
        }
        this.setState({
            isliked: false,
        })
        await API.graphql(graphqlOperation(deleteLike, { input }))
    }

    render() {
        const { isEditing, isliked } = this.state
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
                                            <div>{post.postOwnerUsername} shared a post</div>
                                            <time> {new Date(post.createdAt).toDateString()}</time>
                                        </div>
                                    </div>
                                    {userId === post.postOwnerId && (
                                        <Popover content={content}>
                                            <EllipsisOutlined />
                                        </Popover>
                                    )}
                                </div>
                                {isEditing ? (
                                    <div>
                                        <form
                                            className="Post__editor"
                                            onSubmit={(event) =>
                                                this.handleUpdatePost(
                                                    event,
                                                    post.id,
                                                    userId,
                                                    username,
                                                )
                                            }>
                                            <input
                                                id="postitle"
                                                className="Post__editor-title"
                                                type="text"
                                                placeholder="Title"
                                                name="postTitle"
                                                required
                                                value={this.state.postTitle}
                                                onChange={this.handleTitle}
                                            />
                                            <textarea
                                                className="Post__editor-body"
                                                type="text"
                                                name="postBody"
                                                rows="3"
                                                cols="40"
                                                placeholder="What would you like to share?"
                                                value={this.state.postBody}
                                                onChange={this.handleBody}></textarea>
                                            <div className="Post__editor-buttons">
                                                <button className="Post__editor-save" type="submit">
                                                    Save
                                                </button>
                                                <button
                                                    className="Post__editor-cancel"
                                                    onClick={this.hanldeCancelPostEdit}>
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                        <div className="Post__wrapper">
                                            <HeartFilled />
                                            <span>{post.likes.items.length}</span>
                                            {comments.length > 0 && (
                                                <Comments postId={post.id} comments={comments} />
                                            )}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="Post__wrapper">
                                        <div className="Post__title">{post.postTitle}</div>
                                        <div className="Post__body">{post.postBody}</div>
                                        <div>
                                            <HeartFilled
                                                className={
                                                    isliked
                                                        ? 'like-button like-button--liked'
                                                        : 'like-button'
                                                }
                                                onClick={() => this.likePost()}
                                            />
                                            <span>{post.likes.items.length}</span>
                                        </div>
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
