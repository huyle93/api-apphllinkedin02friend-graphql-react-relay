import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
} from 'graphql';

import {
    connectionArgs,
    connectionDefinitions,
    connectionFromArray,
    fromGlobalId,
    globalIdField,
    nodeDefinitions,
    toGlobalId,
} from 'graphql-relay';

import {
    User,
    Friend,
    getFriend,
    getFriends,
    getViewer,
} from './database';

// routes of asking for stuff from GraphQL
// relay requests data from GraphQL

const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        if (type === 'Friend') {
            return getFriend(id);
        } else if (type === 'User') {
            return getUser(id);
        }
        return null;
    },
    (obj) => {
        if (obj instanceof Friend) {
            return GraphQLFriend;
        } else if (obj instanceof User) {
            return GraphQLUser;
        }
        return null;
    }
);

const GraphQLUser = new GraphQLObjectType({
    name: 'User',
    fields: () => ({
        id: globalIdField('User'),
        friends: {
            type: friendsConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromArray(getFriends(), args),
        },
    }),
    interface: [nodeInterface],
});

const GraphQLFriend = new GraphQLObjectType({
    name: 'Friend',
    fields: () => ({
        id: globalIdField('Friend'),
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        gender: {
            type: GraphQLString,
        },
        language: {
            type: GraphQLString,
        },
        email: {
            type: GraphQLString,
        },
        image: {
            type: GraphQLString,
        },
    }),
    interface: [nodeInterface],
});

// establish friendsConnection
const { connectionType: friendsConnection } = connectionDefinitions({ name: 'Friend', nodeType: GraphQLFriend });

const Query = new GraphQLObjectType({
    name: 'Query',
    fields: () => ({
        node: nodeField,
        viewer: {
            type: GraphQLUser,
            resolve: () => getViewer(),
        },
    }),
});

export const schema = new GraphQLSchema({
    query: Query,
});