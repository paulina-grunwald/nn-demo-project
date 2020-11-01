import React from 'react'
import DeletePost from '../DeletePost/DeletePost'
import PropTypes from 'prop-types'
import './_Post.scss'
import EditPost from '../EditPost/EditPost'

export default function Post({ post }) {
    return (
        <div className="Post" key={post.id}>
            <div className="Post__title">{post.postTitle}</div>
            <span className="Post__author">
                {'Posted by: '}
                {post.postOwnerUsername} {'at'}
                <time> {new Date(post.createdAt).toDateString()}</time>
            </span>
            <p>{post.postBody}</p>
            <span>
                <DeletePost post={post} />
                <EditPost />
            </span>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object,
}
