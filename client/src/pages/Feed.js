import { useEffect, useState } from 'react'
import { GetPosts } from '../services/PostServices'
import { useNavigate } from 'react-router-dom'

const Feed = ({ user, authenticated }) => {
  const [posts, setPosts] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const handlePosts = async () => {
      setPosts([]) // const data = await GetPosts()
    }
    handlePosts()
  }, [])

  return user && authenticated ? ( //very important - use later
    <div className="grid col-4">
      <h1>Hey you are authentic!</h1>
    </div>
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}

export default Feed
