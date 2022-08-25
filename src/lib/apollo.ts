import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
    uri: 'https://api-sa-east-1.hygraph.com/v2/cl4znxvrq0bs101uke04he0lr/master',
    cache: new InMemoryCache()
})