import Axios from 'axios'

export const BASE_URL = 'https://kelp-db.herokuapp.com'
// export const BASE_URL = 'http://localhost:3001'

const Client = Axios.create({ baseURL: BASE_URL })

Client.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('id')
    const email = localStorage.getItem('email')
    if (token) {
      config.headers['authorization'] = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

export default Client
