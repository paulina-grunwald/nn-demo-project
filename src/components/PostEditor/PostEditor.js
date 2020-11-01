import React, { Component } from 'react';
import './_PostEditor.scss';
class PostEditor extends Component {
    state = {
        postOwnerId: '',
        postOwnerUsername: '',
        postTitle: '',
        postBody: '',
    };

    componentDidMount = async () => {};

    render() {
        return (
            <form className="PostEditor">
                <input className="PostEditor__title" type="text" placeholder="Title" required />
                <textarea
                    className="PostEditor__body"
                    type="text"
                    name="postBody"
                    rows="3"
                    cols="40"
                    placeholder="What would you like to share?"
                />
                <input type="submit" className="PostEditor__button" />
            </form>
        );
    }
}

export default PostEditor;
