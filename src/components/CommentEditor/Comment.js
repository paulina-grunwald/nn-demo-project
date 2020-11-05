import React, { Component } from 'react'
import '../../scss/components/_Comment.scss'
import { Popover } from 'antd'
import PropTypes from 'prop-types'
import { EllipsisOutlined } from '@ant-design/icons'
import UserContext from '../UserContext'
export default class Comments extends Component {
    render() {
        const content = (
            <div>
                <div
                    tabIndex={0}
                    onClick={() => this.changePostStatus()}
                    role="button"
                    defaultValue
                    aria-hidden>
                    Edit
                </div>
                <div
                    tabIndex={-1}
                    // onClick={() => this.handleDeletePost(post.id)}
                    role="button"
                    defaultValue>
                    Delete
                </div>
            </div>
        )
        const { comments } = this.props
        return comments.map((comment, index) => {
            return (
                <UserContext.Consumer key={index}>
                    {({ userId, username }) => {
                        return (
                            <div className="Comment">
                                <div className="Comment__header">
                                    <div className="Comment__header-avatar-container">
                                        <div className="Comment__header-avatar" />
                                    </div>
                                    <div className="Comment__header-userinfo">
                                        <div className="Comment__header-info">
                                            {username}
                                            <time>
                                                {' '}
                                                {new Date(comment.createdAt).toDateString()}
                                            </time>
                                            {userId === comment.commentOwnerId && (
                                                <Popover content={content}>
                                                    <EllipsisOutlined />
                                                </Popover>
                                            )}
                                            <div className="Comment__body">{comment.content}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </UserContext.Consumer>
            )
        })
    }
}

Comments.propTypes = {
    comments: PropTypes.array,
}
