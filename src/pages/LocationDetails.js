import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { useState, useEffect } from 'react'
import axios from 'axios'

const LocationDetails = ({ user, authenticated }) => {
  let { id } = useParams()
  const [locationDetails, setLocationDetails] = useState('')
  const [comments, setComments] = useState([])

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
    getComments()
    getLocation()
    console.log(user.id)
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
        <textarea rows="10" placeholder="..."></textarea>
        <button>Post</button>
      </form>
    </div>
  )
}

export default LocationDetails
