import { useQuery } from '@apollo/client'
import { GET_TASKS } from '../queries/taskQueries'
import Task from '../types/Task'
import Spinner from './Spinner'
import TaskRow from './TaskRow'

const Tasks = () => {
  const { loading, error, data } = useQuery(GET_TASKS)

  if (loading) return <Spinner />
  if (error) return <p>Something went wrong</p>

  return (
    <>
      {!loading && !error && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.tasks.map((task: Task) => (
              <TaskRow key={task.id} task={task} />
            ))}
          </tbody>
        </table>
      )}
    </>
  )
}

export default Tasks
