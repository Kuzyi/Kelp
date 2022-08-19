import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Client from '../services/api'


const Nav = ({ authenticated, user, handleLogOut }) => {

  const [username, setUsername] = useState('')

useEffect(() => {
const getUsername = async () => {
  if (user && authenticated) {
  const singleUser = await Client.get(`/api/users/${user.id}`)
  localStorage.setItem('username', singleUser.data.username)
  const getSavedUsername = localStorage.getItem('username')
  setUsername(getSavedUsername)
  }
}
getUsername()
}, [user])


  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav>
        <h3>Welcome {username}!</h3>
        <Link to="/LocationList">Surf Spots</Link>
        <Link onClick={handleLogOut} to="/">
          Sign Out
        </Link>
      </nav>
    )
  }

  const publicOptions = (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/register">Register</Link>
      <Link to="/LocationList">Surf Spots</Link>
    </nav>
  )

  return (
    <header>
      <Link to="/">
        <div className="logo-wrapper" alt="logo">
        <img className='kelp-logo' src="https://i.imgur.com/LWwA2ZI.png" />
        </div>
      </Link>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav
