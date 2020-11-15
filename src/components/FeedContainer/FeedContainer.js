import React, { Component } from 'react'
import {
    onCreatePost,
    onDeletePost,
    onUpdatePost,
    onUpdateComment,
    onCreateComment,
    onDeleteComment,
    onCreateLike,
    onDeleteLike,
} from '../../graphql/subscriptions'
import * as queries from '../../graphql/queries'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import '../../scss/components/_FeedContainer.scss'
import Posts from '../Posts/Posts'
import PostEditor from '../PostEditor/PostEditor'
import PostScheleton from '../Scheletons/PostScheleton'
import UserContext from '../UserContext'
export default class FeedContainer extends Component {
    constructor() {
        super()
        this.state = {
            posts: [],
            isFetching: false,
            userId: '',
            username: '',
        }
        this.getPosts = this.getPosts.bind(this)
    }

    componentDidMount = async () => {
        await Auth.currentAuthenticatedUser().then((user) => {
            this.setState({
                userId: user.attributes.sub,
                username: user.username,
            })
        })

        this.setState(() => ({ isFetching: true }))
        this.getPosts().then(() => {
            this.setState(() => ({ isFetching: false }))
        })

        this.createPostListener = API.graphql(graphqlOperation(onCreatePost)).subscribe({
            next: (postData) => {
                const newPost = postData.value.data.onCreatePost
                const prevPosts = this.state.posts.filter((post) => post.id !== newPost.id)
                const updatedPosts = [newPost, ...prevPosts]
                this.setState({ posts: updatedPosts })
            },
        })
        this.deletePostListener = API.graphql(graphqlOperation(onDeletePost)).subscribe({
            next: (postData) => {
                const deletedPost = postData.value.data.onDeletePost
                const updatedPosts = this.state.posts.filter((post) => post.id !== deletedPost.id)
                this.setState({ posts: updatedPosts })
            },
        })

        this.updatePostListener = API.graphql(graphqlOperation(onUpdatePost)).subscribe({
            next: (postData) => {
                const { posts } = this.state
                const updatePost = postData.value.data.onUpdatePost
                const index = posts.findIndex((post) => post.id === updatePost.id)
                const updatePosts = [
                    ...posts.slice(0, index),
                    updatePost,
                    ...posts.slice(index + 1),
                ]

                this.setState({ posts: updatePosts })
            },
        })

        this.createPostCommentListener = API.graphql(graphqlOperation(onCreateComment)).subscribe({
            next: (commentData) => {
                const createdComment = commentData.value.data.onCreateComment
                let posts = [...this.state.posts]

                for (let post of posts) {
                    if (createdComment.post.id === post.id) {
                        post.comments.items.push(createdComment)
                    }
                }
                this.setState({ posts })
            },
        })

        this.updatePostCommentListener = API.graphql(graphqlOperation(onUpdateComment)).subscribe({
            next: (commentData) => {
                const updatedComment = commentData.value.data.onUpdateComment
                const updatedCommentPostId = updatedComment.post.id
                let posts = [...this.state.posts]
                for (let post of posts) {
                    if (updatedCommentPostId === post.id) {
                        post.comments.items.map((comment) => {
                            if (comment.id === updatedComment.id) {
                                comment.content = updatedComment.content
                            } else {
                                return comment
                            }
                        })
                    }
                }
                this.setState({ posts })
            },
        })

        this.deletePostCommentListener = API.graphql(graphqlOperation(onDeleteComment)).subscribe({
            next: (postData) => {
                const deletedComment = postData.value.data.onDeleteComment
                const posts = [...this.state.posts]
                const updatedPosts = posts.map((post) => {
                    const comments = post.comments.items
                    const updatedComments = comments.filter((comment) => {
                        comment.id !== deletedComment.id
                    })
                    post.comments.items = updatedComments
                    return post
                })
                this.setState({ posts: updatedPosts })
            },
        })

        this.createPostLikeListener = API.graphql(graphqlOperation(onCreateLike)).subscribe({
            next: (postData) => {
                const createdLike = postData.value.data.onCreateLike
                let posts = [...this.state.posts]
                for (let post of posts) {
                    if (createdLike.post.id === post.id) {
                        post.likes.items.push(createdLike)
                    }
                }
                this.setState({ posts })
            },
        })

        this.deletePostLikeListener = API.graphql(graphqlOperation(onDeleteLike)).subscribe({
            next: (postData) => {
                console.log(postData)
            },
        })
    }

    getPosts = async () => {
        const results = await API.graphql({
            query: queries.listPosts,
        })
        const sortedReslts = results.data.listPosts.items
        this.setState({ posts: sortedReslts })
    }

    componentWillUnmount() {
        this.createPostListener.unsubscribe()
        this.deletePostListener.unsubscribe()
        this.updatePostListener.unsubscribe()
        this.createPostCommentListener.unsubscribe()
        this.updatePostCommentListener.unsubscribe()
        this.deletePostCommentListener.unsubscribe()
        this.createPostLikeListener.unsubscribe()
        this.deletePostLikeListener.unsubscribe()
    }

    render() {
        const { isFetching, posts, username, userId } = this.state
        return (
            <UserContext.Provider value={this.state}>
                <div className="FeedContainer">
                    <PostEditor username={username} userId={userId} />
                    {isFetching ? (
                        <div>
                            <PostScheleton key="1" />
                            <PostScheleton key="2" />
                            <PostScheleton key="3" />
                            <PostScheleton key="4" />
                            <PostScheleton key="5" />
                            <PostScheleton key="6" />
                            <PostScheleton key="7" />
                        </div>
                    ) : posts.length === 0 && !isFetching ? (
                        <p className="FeedContainer__noposts">
                            {'There are no posts that fit the current filters.'}
                        </p>
                    ) : (
                        <div className="FeedContainer__posts">
                            <Posts />
                        </div>
                    )}
                </div>
            </UserContext.Provider>
        )
    }
}
