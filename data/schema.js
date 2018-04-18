import {
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString,
    GraphQLFloat,
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
    Attorney,
    getAttorney,
    getAttorneys,
    getUser,
    getViewer,
} from './database';

// routes of asking for stuff from GraphQL
// relay requests data from GraphQL

const {nodeInterface, nodeField} = nodeDefinitions(
    (globalId) => {
        const {type, id} = fromGlobalId(globalId);
        if (type === 'Attorney') {
            return getAttorney(id);
        } else if (type === 'User') {
            return getUser(id);
        }
        return null;
    },
    (obj) => {
        if (obj instanceof Attorney) {
            return GraphQLAttorney;
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
        attorneys: {
            type: attorneysConnection,
            args: connectionArgs,
            resolve: (_, args) => connectionFromArray(getAttorneys(), args),
        },
    }),
    interface: [nodeInterface],
});

const GraphQLAttorney = new GraphQLObjectType({
    name: 'Attorney',
    fields: () => ({
        id: globalIdField('Attorney'),
        firstName: {
            type: GraphQLString,
        },
        lastName: {
            type: GraphQLString,
        },
        gender: {
            type: GraphQLString,
        },
        avgWinRatio: {
            type: GraphQLFloat,
        },
        totalWinCase: {
            type: GraphQLFloat,
        },
        avgWin_ThomasDurkin: {
            type: GraphQLFloat,
        },
        avgWin_JohnZaikowski: {
            type: GraphQLFloat,
        },
        avgWin_TonyAdam: {
            type: GraphQLFloat,
        }
    }),
    interface: [nodeInterface],
});

// establish attorneysConnection
const { connectionType: attorneysConnection } = connectionDefinitions({ name: 'Attorney', nodeType: GraphQLAttorney });

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