import express from 'express';
import graphqlHTTP from "express-graphql";
import schema from './schema';


const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL & Relay modern is cool!!!');
});

// attorney class
class Attorney {
    constructor(id, {firstName, lastName, language, state}) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.language = language;
        this.state = state;
    }
}

// in memmory database, lost if refreshing
const attorneyDatabase = {};

// mutation methods - resolver 
// function that returns what the query is asking for
const global = { 
    getAttorney: ({id}) => {
        return new Attorney(id, attorneyDatabase[id])
    },
    createAttorney: ({input}) => {
        let id = require('crypto').randomBytes(10).toString('hex')
        attorneyDatabase[id] = input
        return new Attorney(id, input)
    },
    updateAttorney: ({id, input}) => {
        attorneyDatabase[id] = input
        return new Attorney(id, input)
    }
 };

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true, // turn on and off for the server
}));

app.listen(8080, () => console.log('Magic is on localhost:8080/graphql'));