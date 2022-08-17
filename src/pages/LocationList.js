import { useEffect, useState } from 'react'
import { GetLocations } from '../services/PostServices'
import { useNavigate } from 'react-router-dom'

const LocationList = ({ user, authenticated }) => {
  const [locations, setLocations] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const handleLocations = async () => {
      const data = await GetLocations()

      setLocations(data)
    }
    handleLocations()
  }, [])

  const showLocationDetails = (locations) => {
    navigate(`/locations/${locations.id}`)
  }

  return (
    <div>
      {locations.map((location) => (
        <div onClick={() => showLocationDetails(location)} key={location.id}>
          <h1>{location.beachName}</h1>
        </div>
      ))}
    </div>
  )
}

export default LocationList
