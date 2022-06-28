import { useMutation } from '@apollo/client'
import { SyntheticEvent, useState } from 'react'
import { FaStickyNote } from 'react-icons/fa'
import { ADD_TASK } from '../mutations/taskMutations'
import { GET_TASKS } from '../queries/taskQueries'
import Task from '../types/Task'

const AddTaskModal = () => {
  const [name, setName] = useState('')

  const [addTask] = useMutation<{ addTask: Task }, { name: string }>(ADD_TASK, {
    variables: { name },
    update(cache, { data }) {
      if (!data || !data.addTask) return
      const cacheData = cache.readQuery<{ tasks: Task[] }>({
        query: GET_TASKS,
      })
      if (!cacheData || !cacheData.tasks) return

      const { tasks } = cacheData
      cache.writeQuery({
        query: GET_TASKS,
        data: { tasks: [...tasks, data.addTask] },
      })
    },
  })

  const onSubmit = (event: SyntheticEvent): void => {
    event.preventDefault()
    if (name === '') {
      // eslint-disable-next-line no-console
      console.error('Something went wrong')
    }
    addTask(name)

    setName('')
  }

  return (
    <>
      <button
        type="button"
        className="btn btn-secondary"
        data-bs-toggle="modal"
        data-bs-target="#addTaskModal"
      >
        <div className="d-flex align-items-center">
          <FaStickyNote />
          <div>Add Task</div>
        </div>
      </button>

      <div
        className="modal fade"
        id="addTaskModal"
        aria-labelledby="addTaskModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="addTaskModalLabel">
                Add Client
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmit}>
                <div className="form-group">
                  <label className="form-label" htmlFor="name">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  data-bs-dismiss="modal"
                  className="btn btn-secondary"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AddTaskModal
