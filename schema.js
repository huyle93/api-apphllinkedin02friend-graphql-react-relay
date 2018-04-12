import { buildSchema } from "graphql";

const schema = buildSchema(`
    input AttorneyInput {
        id: ID
        firstName: String
        lastName: String
        gender: String
        language: String
        email: String
    }

    type Attorney {
        id: ID
        firstName: String
        lastName: String
        gender: String
        language: String
        email: String
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