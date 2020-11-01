import React, { Component } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { deletePost } from '../../graphql/mutations';
import PropTypes from 'prop-types';

class DeletePost extends Component {
    handleDeletePost = async (postId) => {
        const input = {
            id: postId,
        };

        await API.graphql(graphqlOperation(deletePost, { input }));
    };
    render() {
        const post = this.props.post;
        return <button onClick={() => this.handleDeletePost(post.id)}>Delete</button>;
    }
}

DeletePost.propTypes = {
    post: PropTypes.array,
};

export default DeletePost;
