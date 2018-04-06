import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
class Friend extends Component {
    render() {
        return (
            <li>
                {this.props.friend.firstName}
                {this.props.friend.lastName}
            </li>
        )
    }
}

export default createFragmentContainer(Friend, {
    friend: graphql`
        fragment Friend_friend on Friend {
            id,
            firstName,
            lastName,
            gender,
            language,
            email,
            image,
        }
    `,
    viewer: graphql`
        fragment Friend_viewer on User {
            id,
        }
    `,
});