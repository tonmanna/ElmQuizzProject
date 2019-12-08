import ApolloClient from "apollo-client";
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from "apollo-cache-inmemory";

import gql from 'graphql-tag'

// Replace it with your graphql url
const GRAPHQL_URI = 'localhost:4000/graphql';

const getClient = (token) => {
    // Create an http link:
    const httpLink = new HttpLink({
        uri: `https://${GRAPHQL_URI}`
    });

    // Create a WebSocket link:
    const wsLink = new WebSocketLink({
        uri: `wss://${GRAPHQL_URI}`,
        options: {
            reconnect: true
            , connectionParams: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    });

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const link = split(
        // split based on operation type
        ({ query }) => {
            const definition = getMainDefinition(query);
            return (
                definition.kind === 'OperationDefinition' &&
                definition.operation === 'subscription'
            );
        },
        wsLink,
        httpLink,
    );
    const client = new ApolloClient({
        link: link,
        cache: new InMemoryCache({
            addTypename: true
        })
    });
    return client;
};