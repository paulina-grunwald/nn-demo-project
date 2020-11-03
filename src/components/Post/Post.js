import React from 'react'
import PropTypes from 'prop-types'
import CommentEditor from '../CommentEditor/CommentEditor'
import DeletePost from '../DeletePost/DeletePost'
import EditPost from '../EditPost/EditPost'
import '../../scss/components/_Post.scss'
import { Popover } from 'antd'
import { EllipsisOutlined } from '@ant-design/icons'
export default function Post({ post }) {
    const content = (
        <div>
            <p>Edit</p>
            <p>Delete</p>
        </div>
    )
    return (
        <div className="Post" key={post.id}>
            <div className="Post__avatar"></div>
            <Popover content={content}>
                <EllipsisOutlined />
            </Popover>
            <div className="Post__title">{post.postTitle}</div>
            <span className="Post__author">
                {'Posted by: '}
                {post.postOwnerUsername} {'at'}
                <time> {new Date(post.createdAt).toDateString()}</time>
            </span>
            <div className="Post__body">{post.postBody}</div>
            <span>
                <DeletePost post={post} />
                <EditPost />
            </span>
            <CommentEditor postId={post.id} />
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.object,
}
