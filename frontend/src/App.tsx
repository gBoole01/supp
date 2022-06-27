import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client'
import './App.css'
import Header from './components/Header'
import Home from './components/Home'

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
      <Header />
      <div className="container">
        <Home />
      </div>
    </ApolloProvider>
  </>
)

export default App
