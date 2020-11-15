import React, { Component } from 'react'
import '../../scss/components/_Comments.scss'
import PropTypes from 'prop-types'
import Comment from './Comment'
export default class Comments extends Component {
    state = {
        comment: '',
    }

    render() {
        const { comments, postId } = this.props
        return (
            <div className="Comments">
                {comments.reverse().map((comment, index) => {
                    return <Comment comment={comment} key={index} postId={postId} />
                })}
            </div>
        )
    }
}

Comments.propTypes = {
    comments: PropTypes.array,
    postId: PropTypes.string,
}
