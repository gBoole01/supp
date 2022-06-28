import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from 'graphql'
import Task from '../models/Task'

const TaskType = new GraphQLObjectType({
  name: 'Task',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
  }),
})

const query = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    tasks: {
      type: new GraphQLList(TaskType),
      resolve() {
        return Task.find()
      },
    },
    task: {
      type: TaskType,
      args: { id: { type: GraphQLID } },
    },
  },
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addTask: {
      type: TaskType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_parent, args) {
        const task = new Task({
          name: args.name,
        })

        return task.save()
      },
    },
    editTask: {
      type: TaskType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        name: { type: GraphQLNonNull(GraphQLString) },
      },
      resolve(_parent, args) {
        return Task.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name } },
          { new: true },
        )
      },
    },
    deleteTask: {
      type: TaskType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      resolve(_parent, args) {
        return Task.findByIdAndRemove(args.id)
      },
    },
  },
})

const Schema = new GraphQLSchema({ query, mutation })

export default Schema
