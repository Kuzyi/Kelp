import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'

const Home = ({ user, authenticated }) => {
  let navigate = useNavigate()
  let authenticatedOptions

  if (user) {
    authenticatedOptions = (
      <div className="home-container col">
        <img src="https://imgur.com/yeAWtvH.png" alt="kelp-logo" />
        <div>Hello, {user.username}</div>
        <section className="welcome-signin">
          <button>Check out our locations!</button>
        </section>
      </div>
    )
  }

  const publicOptions = (
    <div className="home-container col">
      <img src="https://imgur.com/yeAWtvH.png" alt="kelp-logo" />
      <SignIn />
    </div>
  )

  return (
    <div>{authenticated && user ? authenticatedOptions : publicOptions}</div>
  )
}

export default Home
