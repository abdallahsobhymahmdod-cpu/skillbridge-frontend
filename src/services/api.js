import { API_BASE_URL, authHeaders } from '@/utils/helpers'

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...authHeaders(), ...(options.headers || {}) },
    ...options,
  })
  if (!response.ok) throw new Error(`API error: ${response.status}`)
  return response.json()
}

export default request
