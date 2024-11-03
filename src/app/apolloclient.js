import { ApolloClient, InMemoryCache, HttpLink, ApolloLink } from "@apollo/client";
import { onError } from "@apollo/client/link/error";

// Hata yönetimi için errorLink
const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    );
  }
  if (networkError) console.error(`[Network error]: ${networkError}`);
});

// HTTP bağlantısı için httpLink
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_URI,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_GRAPHQL_TOKEN}`
  }
});

// Apollo Client yapılandırması
const client = new ApolloClient({
  link: ApolloLink.from([errorLink, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chatbotResponses: {
            merge(existing = [], incoming) {
              return [...existing, ...incoming];
            }
          }
        }
      }
    }
  })
});

export { client };
