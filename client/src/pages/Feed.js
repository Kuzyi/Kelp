import { useEffect, useState } from 'react'
import { GetPosts } from '../services/PostServices'
import { useNavigate } from 'react-router-dom'

const Feed = ({ user, authenticated }) => {
  const [posts, setPosts] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    const handlePosts = async () => {
      const data = await GetPosts()
      setPosts(data)
    }
    handlePosts()
  }, [])

  return user && authenticated ? (
    <div className="grid col-4">
      {posts.map((post) => (
        <div className="card" key={post.id}>
          <h3>{post.title}</h3>
          <div>
            <img src={post.image} alt="post" />
          </div>
          <p>{post.body.substring(0, 80)}...</p>
        </div>
      ))}
    </div>
  ) : (
    <div className="protected">
      <h3>Oops! You must be signed in to do that!</h3>
      <button onClick={() => navigate('/signin')}>Sign In</button>
    </div>
  )
}

export default Feed