import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
class Attorney extends Component {
    render() {
        return (
            <li>
                {this.props.attorney.firstName}
                {this.props.attorney.lastName}
            </li>
        )
    }
}

export default createFragmentContainer(Attorney, {
    attorney: graphql`
        fragment Attorney_attorney on Attorney {
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
        fragment Attorney_viewer on User {
            id,
        }
    `,
});