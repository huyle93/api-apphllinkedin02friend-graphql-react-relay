import { buildSchema } from "graphql";

const schema = buildSchema(`
    type Attorney {
        id: ID
        firstName: String
        lastName: String
        language: String
        state: String
        IDTyped: String
    }
    type Query {
        attorney(id: ID!): Attorney
    }
`)

export default schema;