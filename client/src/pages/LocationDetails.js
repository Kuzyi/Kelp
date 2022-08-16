import { useParams } from 'react-router-dom'
import Client from '../services/api'
import { useState, useEffect } from 'react'
import axios from 'axios'

const LocationDetails = () => {
  let { id } = useParams()
  const [locationDetails, setLocationDetails] = useState('')

  useEffect(() => {
    const getLocation = async () => {
      const res = await axios.get(`http://localhost:3001/api/locations/${id}`)
      setLocationDetails(res.data)
      console.log(res.data)
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
    </div>
  )
}

export default LocationDetails
