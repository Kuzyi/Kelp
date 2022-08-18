import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { useState, useEffect } from 'react'

const LocationDetails = ({ user, authenticated }) => {
  let { id } = useParams()
  const [locationDetails, setLocationDetails] = useState('')
  const [comments, setComments] = useState([])
  let [newComment, setNewComment] = useState({
    content: ''
  })
  let [newUpdate, setNewUpdate] = useState({
    content: ''
  })
  const [updateStatus, toggleUpdateStatus] = useState(false)

  // console.log(user.id)
  console.log('this is passed down user object', user)

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
    console.log('this is teh new comment', newComment)
  }

  const handleChangeUpdate = (e) => {
    setNewUpdate({ ...newUpdate, [e.target.name]: e.target.value })
    console.log('this is teh new update', newComment)
  }

  const handleSubmit = async (e) => {
    console.log(
      'I HIT SUBMIT, here is what is being sent to backend',
      'content:',
      newComment.content,
      'id',
      id,
      'user.id:',
      user.id
    )
    e.preventDefault()
    await Client.post('/api/comments/', {
      content: newComment.content,
      locationId: id,
      userId: user.id
    })
    document.location.reload()
  }

  useEffect(() => {
    const getLocation = async () => {
      const res = await Client.get(`/api/locations/${id}`)
      setLocationDetails(res.data)
    }
    const getComments = async () => {
      const res = await Client.get(`/api/comments/${id}`)
      setComments(res.data)
      // console.log(res.data)
    }

    const handleUpdateComment = async () => {}

    getLocation()
    getComments()
  }, [id])

  return (
    <div>
      <h1>{locationDetails.beachName}</h1>
      <h3>
        {locationDetails.city} {locationDetails.state}
      </h3>
      <img src={locationDetails.image} />
      <form>
        <textarea
          rows="10"
          placeholder="..."
          name="content"
          onChange={handleChange}
        ></textarea>
        <button onClick={handleSubmit}>Post</button>
      </form>
      {comments.map((comment) => (
        <div>
          <h3>{comment.User.username}</h3>

          {updateStatus ? (
            <form>
              <textarea
                rows="10"
                placeholder="..."
                name="newUpdate"
                onChange={handleChangeUpdate}
              ></textarea>
              <button onClick={handleSubmit}>Post</button>
            </form>
          ) : (
            <p>{comment.content}</p>
          )}
          {authenticated &&
          user &&
          parseInt(comment.User.id) === parseInt(user.id) ? (
            <div>
              <button
                onClick={async () => {
                  const commentToDelete = parseInt(comment.id)
                  // console.log(commentToDelete)
                  // console.log(comment)
                  // console.log(user)
                  await Client.delete(`/api/comments/${commentToDelete}`)
                  document.location.reload()
                }}
              >
                Delete Commment
              </button>

              <button onClick={console.log('hehe')}>Update Commment</button>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  )
}
export default LocationDetails

// async () => {
//   const commentToUpdate = parseInt(comment.id)
//   // console.log(commentToDelete)
//   // console.log(comment)
//   // console.log(user)
//   await Client.put(`/api/comments/${commentToUpdate}`)
//   document.location.reload()
// }

// the above was in the onclick for the update comment button, we can use it later for the logic behind the submit update button
