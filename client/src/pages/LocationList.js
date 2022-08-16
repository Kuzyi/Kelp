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

  return (
    <div>
      {locations.map((location) => (
        <h1>{location.beachName}</h1>
      ))}
    </div>
  )
}

export default LocationList
