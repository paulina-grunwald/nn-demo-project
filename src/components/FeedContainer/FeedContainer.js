import React, { Component } from 'react'
import { listPosts } from '../../graphql/queries'
import { onCreatePost, onDeletePost, onCreateComment } from '../../graphql/subscriptions'
import { API, graphqlOperation, Auth } from 'aws-amplify'
import '../../scss/components/_FeedContainer.scss'
import Posts from '../Posts/Posts'
import PostEditor from '../PostEditor/PostEditor'
import PostScheleton from '../PostScheleton/PostScheleton'

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
    }

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts))

        const sorted = result.data.listPosts.items.sort(function (a, b) {
            return a.date < b.date ? -1 : a.date > b.date ? 1 : 0
        })

        this.setState({ posts: sorted })
    }

    componentWillUnmount() {
        this.createPostListener.unsubscribe()
        this.deletePostListener.unsubscribe()
        this.createPostCommentListener.unsubscribe()
    }

    render() {
        const { isFetching, posts, username, userId } = this.state
        return (
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
                        <Posts posts={posts} />
                    </div>
                )}
            </div>
        )
    }
}
