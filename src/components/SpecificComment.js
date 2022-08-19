import Client from '../services/api'
import { useState, useEffect } from 'react'

const SpecificComment = (props) => {
  let [newUpdate, setNewUpdate] = useState({
    content: '',
    id: ''
  })
  const [updateStatus, toggleUpdateStatus] = useState(false)

  const handleChangeUpdate = (e) => {
    setNewUpdate({ ...newUpdate, [e.target.name]: e.target.value })
  }

  const handleSubmitUpdate = async (e) => {
    e.preventDefault()
    await Client.put(`/api/comments/${newUpdate.id}`, {
      content: newUpdate.content
    })
    document.location.reload()
  }

  return (
    <div>
      <div className="comments">
        <h4>{props.comment.User.username}</h4> <hr />
        {updateStatus ? (
          <form>
            <textarea
              rows="10"
              placeholder="..."
              name="content"
              onChange={handleChangeUpdate}
            >
              {newUpdate.content}
            </textarea>
            <button onClick={handleSubmitUpdate}>Submit Update</button>
          </form>
        ) : (
          <p className="overflow-wrap">{props.comment.content}</p>
        )}
        {props.authenticated &&
        props.user &&
        parseInt(props.comment.User.id) === parseInt(props.user.id) ? (
          <div className="comments-button">
            <button
              onClick={async () => {
                const commentToDelete = parseInt(props.comment.id)
                await Client.delete(`/api/comments/${commentToDelete}`)
                document.location.reload()
              }}
            >
              Delete Commment
            </button>

            <button
              onClick={() => {
                toggleUpdateStatus(true)
                setNewUpdate({
                  content: props.comment.content,
                  id: props.comment.id
                })
              }}
            >
              Update Commment
            </button>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default SpecificComment
