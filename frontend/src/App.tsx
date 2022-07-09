import { BrowserRouter as Router } from 'react-router-dom'
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import Layout from './components/Layout'
import { UserProvider } from './context/UserContext'

const GRAPHQL_ENDPOINT = `${import.meta.env.VITE_API_URL}/graphql`

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
  uri: GRAPHQL_ENDPOINT,
  cache,
})

const App = () => (
  <>
    <UserProvider>
      <ApolloProvider client={client}>
        <Router>
          <Layout />
        </Router>
      </ApolloProvider>
    </UserProvider>
  </>
)

export default App
