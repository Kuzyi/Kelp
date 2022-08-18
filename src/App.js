import { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router'
import Nav from './components/Nav'
import Register from './pages/Register'
import SignIn from './pages/SignIn'
import LocationList from './pages/LocationList'
import Home from './pages/Home'
import LocationDetails from './pages/LocationDetails'
import './styles/App.css'
import { CheckSession } from './services/Auth'
import axios from 'axios'

const App = () => {
  // const [location, setLocation] = useState()
  // useEffect(() => {
  //   const getLocation = async () => {
  //     const res = await axios.get(`${BASE_URL}/api/locations/view`)
  //     console.log(res.data)
  //   }
  //   getLocation()
  // }, [])

  const [authenticated, toggleAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    //Reset all auth related state and clear localStorage
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    const id = localStorage.getItem('id')
    const email = localStorage.getItem('email')
    setUser({
      user,
      id,
      email
    })
    toggleAuthenticated(true)
    console.log(authenticated)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')

    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div className="App">
      <Nav
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
      />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setUser={setUser}
                user={user}
                authenticated={authenticated}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route
            path="/signin"
            element={
              <SignIn
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/LocationList"
            element={<LocationList user={user} authenticated={authenticated} />}
          />
          <Route
            path="/locations/:id"
            element={
              <LocationDetails user={user} authenticated={authenticated} />
            }
          />
        </Routes>
      </main>
    </div>
  )
}

export default App
