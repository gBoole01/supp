import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        tasks: {
          merge(_existing, incoming) {
            return incoming
          },
        },
      },
    },
  },
})

const client = new ApolloClient({
  uri: import.meta.env.GRAPHQL_BASE_ROUTE,
  cache,
})

const App = () => (
  <>
    <ApolloProvider client={client}>
      <div className="container">
        <h1 className="h1">Hello World !</h1>
      </div>
    </ApolloProvider>
  </>
)

export default App
