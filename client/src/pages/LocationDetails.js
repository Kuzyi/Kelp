import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { useState, useEffect } from 'react'
import axios from 'axios'

const LocationDetails = () => {
  let { id } = useParams()
  const [locationDetails, setLocationDetails] = useState('')
  const [comments, setComments] = useState([])

  useEffect(() => {
    const getLocation = async () => {
      const res = await axios.get(`http://localhost:3001/api/locations/${id}`)
      setLocationDetails(res.data)
      console.log(res.data)
    }
    const getComments = async () => {
      const res = await axios.get(`http://localhost:3001/api/comments/${id}/5`)
    }

    getLocation()
  }, [id])

  return (
    <div>
      <h1>{locationDetails.beachName}</h1>
      <h3>
        {locationDetails.city} {locationDetails.state}
      </h3>
      <img src={locationDetails.image} />
      <textarea></textarea>
    </div>
  )
}

export default LocationDetails
