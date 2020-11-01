import React, { Component } from 'react';
import { listPosts } from '../../graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';
import Posts from '../Posts/Posts';
import PostScheleton from '../PostScheleton/PostScheleton';
import './_FeedContainer.scss';
import PostEditor from '../PostEditor/PostEditor';

export default class FeedContainer extends Component {
    constructor() {
        super();
        this.state = {
            posts: [],
            isFetching: false,
        };
        this.getPosts = this.getPosts.bind(this);
    }

    componentDidMount = async () => {
        this.setState(() => ({ isFetching: true }));

        console.log(this.getPosts());
        this.getPosts().then(() => {
            this.setState(() => ({ isFetching: false }));
        });
    };

    getPosts = async () => {
        const result = await API.graphql(graphqlOperation(listPosts));
        this.setState({ posts: result.data.listPosts.items });
        console.log('All Posts: ', result.data.listPosts.items);
    };

    render() {
        const { isFetching, posts } = this.state;
        console.log('state', posts);
        return (
            <div className="FeedContainer">
                <PostEditor />
                {isFetching ? (
                    <div>
                        <PostScheleton />
                        <PostScheleton />
                        <PostScheleton />
                        <PostScheleton />
                        <PostScheleton />
                        <PostScheleton />
                        <PostScheleton />
                    </div>
                ) : posts.length === 0 ? (
                    <p className="FeedContainer__noposts">
                        {'There are no posts that fit the current filters.'}
                    </p>
                ) : (
                    <div className="FeedContainer__posts">
                        <Posts />
                    </div>
                )}
            </div>
        );
    }
}
