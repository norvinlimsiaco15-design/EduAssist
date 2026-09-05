import api from './api'
import { storage } from './storage'

export const authService = {
  getToken: storage.getToken,
  getUser: storage.getUser,
  saveSession: storage.saveSession,
  clearSession: storage.clearSession,

  async register(fullName, email, password) {
    const { data } = await api.post('/register', {
      full_name: fullName,
      email,
      password,
    })
    storage.saveSession(data.token, data.user)
    return data.user
  },

  async login(email, password) {
    const { data } = await api.post('/login', { email, password })
    storage.saveSession(data.token, data.user)
    return data.user
  },

  async fetchMe() {
    const { data } = await api.get('/me')
    storage.saveSession(storage.getToken(), data.user)
    return data.user
  },

  logout() {
    storage.clearSession()
  },
}
