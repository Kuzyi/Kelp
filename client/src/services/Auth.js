import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/api/auth/login', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    console.log(res.data)
    return res.data.user //changed to username from user
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/api/auth/register', data)
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    // Checks if the current token if it exists is valid
    const res = await Client.get('/api/auth/session') //maybe use data???
    console.log('HEY, this is the frontend check session!', res)
    return res.data.token //this was res.data changed to res.data.token
  } catch (error) {
    throw error
  }
}
