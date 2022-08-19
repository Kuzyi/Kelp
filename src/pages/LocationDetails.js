import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { useState, useEffect } from 'react'
import SpecificComment from '../components/SpecificComment'
import { useNavigate } from 'react-router-dom'

const LocationDetails = ({ user, authenticated }) => {
  let { id } = useParams()
  const [locationDetails, setLocationDetails] = useState('')
  const [comments, setComments] = useState([])
  let [newComment, setNewComment] = useState({
    content: ''
  })
  let navigate = useNavigate()

  // console.log(user.id)
  console.log('this is passed down user object', user)

  const handleChange = (e) => {
    setNewComment({ ...newComment, [e.target.name]: e.target.value })
    console.log('this is teh new comment', newComment)
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

    getLocation()
    getComments()
  }, [id])

  return (
    <div className="location">
      <button className="back" onClick={() => navigate('/LocationList')}>
        Return to Surf Spots
      </button>
      <h1 className="locationBeach">{locationDetails.beachName}</h1>
      <h3 className="locationName">
        {locationDetails.city} {locationDetails.state}
      </h3>
      <img
        className="location-img"
        alt="{locationDetails.beachName}"
        src={locationDetails.image}
      />
      <form className="comment-form">
        <textarea
          className="commentBox"
          rows="10"
          placeholder="..."
          name="content"
          onChange={handleChange}
        ></textarea>
        <button onClick={handleSubmit} className="postButton">
          Post
        </button>
      </form>
      {comments.map((comment) => (
        <SpecificComment
          comment={comment}
          handleSubmit={handleSubmit}
          user={user}
          authenticated={authenticated}
          id={id}
        />
      ))}
    </div>
  )
}
export default LocationDetails
