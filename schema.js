import { buildSchema } from "graphql";

const schema = buildSchema(`
    input AttorneyInput {
        id: ID
        firstName: String
        lastName: String
        language: String
        state: String
    }

    type Attorney {
        id: ID
        firstName: String
        lastName: String
        language: String
        state: String
    }

    type Query {
        getAttorney(id: ID!): Attorney
    }

    type Mutation {
        createAttorney(input: AttorneyInput): Attorney
        updateAttorney(id: ID!, input: AttorneyInput): Attorney
    }
`)

export default schema;