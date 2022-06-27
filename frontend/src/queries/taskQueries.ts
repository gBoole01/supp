import { gql } from '@apollo/client'

const GET_TASKS = gql`
  query getTasks {
    tasks {
      id
      name
    }
  }
`

const GET_TASK = gql`
  query getTask($id: ID!) {
    task(id: $id) {
      id
      name
    }
  }
`

export { GET_TASKS, GET_TASK }
