import { gql } from '@apollo/client'

const ADD_TASK = gql`
  mutation addTask($name: String!) {
    addTask(name: $name) {
      id
      name
    }
  }
`

const UPDATE_TASK = gql`
  mutation updateTask($id: ID!, $name: String!) {
    updateTask(id: $id, name: $name) {
      id
      name
    }
  }
`
const DELETE_TASK = gql`
  mutation deleteTask($id: ID!) {
    deleteTask(id: $id) {
      id
    }
  }
`
export { ADD_TASK, UPDATE_TASK, DELETE_TASK }
