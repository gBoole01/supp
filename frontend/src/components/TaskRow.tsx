import { useMutation } from '@apollo/client'
import { FaTrash } from 'react-icons/fa'
import { DELETE_TASK } from '../mutations/taskMutations'
import { GET_TASKS } from '../queries/taskQueries'
import Task from '../types/Task'

type Props = {
  task: Task
}

const TaskRow = ({ task }: Props) => {
  const [deleteTask] = useMutation<
    { deleteTask: Task },
    { id: string | undefined }
  >(DELETE_TASK, {
    variables: { id: task.id },
    refetchQueries: [{ query: GET_TASKS }],
  })

  return (
    <tr>
      <td>{task.name}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={() => deleteTask()}>
          <FaTrash />
        </button>
      </td>
    </tr>
  )
}

export default TaskRow
