import express from 'express';
import graphqlHTTP from "express-graphql";
import schema from './schema';


const app = express();

app.get('/', (req, res) => {
    res.send('GraphQL & Relay modern is cool!!!');
});

const root = { attorney: (args) => {
    return {
        "id": 123124345,
        "firstName": "Mike",
        "lastName": "Gildersleeve",
        "language": "English",
        "state": "Vermont",
        "IDTyped": args.id
    }
} };

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true, // turn on and off for the server
}));

app.listen(8080, () => console.log('Magic is on localhost:8080/graphql'));