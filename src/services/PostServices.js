import Client from './api'

export const GetLocations = async () => {
  try {
    const res = await Client.get('/api/locations/view')
    return res.data
  } catch (error) {
    throw error
  }
}
