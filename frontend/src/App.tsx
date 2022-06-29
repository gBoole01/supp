import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Layout from './components/Layout'

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
  uri: import.meta.env.VITE_GRAPHQL_BASE_ROUTE,
  cache,
})

const App = () => (
  <>
    <ApolloProvider client={client}>
      <Router>
        <Layout />
      </Router>
    </ApolloProvider>
  </>
)

export default App
