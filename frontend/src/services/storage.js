const TOKEN_KEY = 'eduassist_token'
const USER_KEY = 'eduassist_user'

export const storage = {
  getToken() {
    return localStorage.getItem(TOKEN_KEY)
  },

  getUser() {
    const raw = localStorage.getItem(USER_KEY)
    return raw ? JSON.parse(raw) : null
  },

  saveSession(token, user) {
    localStorage.setItem(TOKEN_KEY, token)
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
  },
}
