import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import AttorneysList from './AttorneysList';
class Attorneys extends Component {
    render() {
        return (
            <div>
                <div className = "row">
                    <h1>Attorneys</h1>
                    <AttorneysList viewer={this.props.viewer} />
                </div>
            </div>
        )
    }
}

export default createFragmentContainer(Attorneys, {
    viewer: graphql`
        fragment Attorneys_viewer on User {
            id,
            ...AttorneysList_viewer,
        }
    `,
});