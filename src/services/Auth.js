import Client from './api'

export const SignInUser = async (data) => {
  try {
    const res = await Client.post('/api/auth/login', data)
    // Set the current signed in users token to localStorage
    localStorage.setItem('token', res.data.token)
    localStorage.setItem('id', res.data.user.id)
    localStorage.setItem('email', res.data.user.email)
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
    const res = await Client.get('/api/auth/session')
    return res.data.token
  } catch (error) {
    throw error
  }
}
