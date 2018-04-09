import React, { Component } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import Attorney from './Attorney';
class AttorneysList extends Component {
    renderAttorneys() {
        return this.props.viewer.attorneys.edges.map(edges => 
        <Attorney
            key={edge.node.id}
            attorney={edge.node}
            viewer={this.props.viewer}
            />
        );
    }
    render() {
        return (
            <div>
                <div className = "row">
                    <ul>
                        {this.renderAttorneys()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default createFragmentContainer(AttorneysList, {
    viewer: graphql`
        fragment AttorneysList_viewer on User {
            attorneys {
                edges {
                    node {
                        id,
                        ...Attorney_attorney,
                    },
                },
            },
            id,
            ...Attorney_viewer,
        }
    `,
});