import request from './api'
import { users } from '@/data/dummyData'
import { USE_DUMMY_DATA, delay } from '@/utils/helpers'

export async function loginUser(data) {
  if (USE_DUMMY_DATA) {
    const user = users.find((u) => u.email === data.email) || users[0]
    return delay({ user, token: `dummy-${user.role}-token` })
  }
  return request('/auth/login', { method: 'POST', body: JSON.stringify(data) })
}
export async function registerUser(data) {
  if (USE_DUMMY_DATA) return delay({ user: { id: Date.now(), role: 'user', ...data }, token: 'dummy-user-token' })
  return request('/auth/register', { method: 'POST', body: JSON.stringify(data) })
}
export async function getCurrentUser() {
  if (USE_DUMMY_DATA) return delay(JSON.parse(localStorage.getItem('skillbridge_user') || 'null') || users[0])
  return request('/auth/me')
}
export default { loginUser, registerUser, getCurrentUser }
