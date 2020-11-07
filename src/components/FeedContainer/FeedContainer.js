import React, { Component } from 'react'
import {
    onCreatePost,
    onDeletePost,
    onUpdatePost,
    onUpdateComment,
    onCreateComment,
    // onCreateLike,
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
    }

    getPosts = async () => {
        const result = await API.graphql({
            query: queries.listPosts,
        })

        this.setState({ posts: result.data.listPosts.items.reverse() })
    }

    componentWillUnmount() {
        this.createPostListener.unsubscribe()
        this.deletePostListener.unsubscribe()
        this.updatePostListener.unsubscribe()
        this.createPostCommentListener.unsubscribe()
        this.updatePostCommentListener.unsubscribe()
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
