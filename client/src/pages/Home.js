import { useNavigate } from 'react-router-dom'
import SignIn from './SignIn'

const Home = ({ user, authenticated }) => {
  let navigate = useNavigate()

  return user && authenticated ? (
    <div className="home-container col">
      <img src="https://imgur.com/yeAWtvH.png" alt="kelp-logo" />
      <div>Hello, {user.username}</div>
      <section className="welcome-signin">
        <button>Check out our locations!</button>
      </section>
    </div>
  ) : (
    <div className="home-container col">
      <img src="https://imgur.com/yeAWtvH.png" alt="kelp-logo" />
      <SignIn />
    </div>
  )
}

export default Home
