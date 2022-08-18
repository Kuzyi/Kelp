import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { useState, useEffect } from 'react'
import axios from 'axios'

const LocationDetails = ({ user, authenticated }) => {
  let { id } = useParams()
  const [locationDetails, setLocationDetails] = useState('')
  const [comments, setComments] = useState([])
  let [newComment, setNewComment] = useState({
    content: '',
    locationId: id,
    userId: user.id
  })

  // console.log(user.id)
  console.log(user)

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(newComment)
    await Client.post('/api/comments/', {
      content: newComment.content,
      locationId: newComment.locationId,
      userId: newComment.userId
    })
  }

  useEffect(() => {
    const getLocation = async () => {
      const res = await Client.get(`/api/locations/${id}`)
      setLocationDetails(res.data)
    }
    const getComments = async () => {
      const res = await Client.get(`/api/comments/${id}`)
      setComments(res.data)
      console.log(res.data)
    }

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
      {comments.map((comment) => (
        <div>
          <h3>{comment.User.username}</h3>
          <p>{comment.content}</p>
          {authenticated &&
          user &&
          parseInt(comment.User.id) === parseInt(user.id) ? (
            <button
              onClick={async () => {
                const commentToDelete = parseInt(comment.id)
                console.log(commentToDelete)
                console.log(comment)
                console.log(user)
                await Client.delete(`/api/comments/${commentToDelete}`)
                document.location.reload()
              }}
            >
              X
            </button>
          ) : null}
        </div>
      ))}
      <form>
        <textarea
          rows="10"
          placeholder="..."
          name="content"
          onChange={handleChange}
        ></textarea>
        <button onSubmit={handleSubmit}>Post</button>
      </form>
    </div>
  )
}
export default LocationDetails
