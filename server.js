import express from 'express';
import graphqlHTTP from "express-graphql";
import schema from './schema';
import path from 'path';
import webpack from 'webpack';
import WebPackDevServer from 'webpack-dev-server';
import { schema } from './data/database'; // keep there for now

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

// GraphQL server
const graphQLServer = express();
graphQLServer.use('/', graphqlHTTP({
    schema: schema,
    pretty: true, // Prettify the query
    graphiql: true, // turn on and off for the server
}));

graphQLServer.listen(GRAPHQL_PORT, () => console.log(`GraphQL server is on localhost:${GRAPHQL_PORT}`));

// Relay App
const compiler = webpack({
    entry:['whatwg-fetch', path.resolve(__dirname, 'src', 'App.js')],
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel-loader',
                test: /\.js$/,
            },
        ],
    },
    output: {filename: 'App.js', path: '/'}
});

const app = new WebPackDevServer(compiler, {
    contentBase: '/public/',
    proxy: {'/graphql': `http://localhost:${APP_PORT}`},
    publicPath: '/src/',
    stats: {colors: true},
})

app.use('/', express.static(path.resolve(__dirname, 'public')));
app.listen(APP_PORT, () => {
    console.log(`App is on running on localhost:${APP_PORT}`)
});