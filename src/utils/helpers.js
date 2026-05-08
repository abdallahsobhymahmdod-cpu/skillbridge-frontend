export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
export const USE_DUMMY_DATA = import.meta.env.VITE_USE_DUMMY_DATA !== 'false'
export const delay = (value, ms = 200) => new Promise((resolve) => setTimeout(() => resolve(value), ms))
export const initials = (name = '') => name.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase()
export const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
export const authHeaders = () => ({ Authorization: `Bearer ${localStorage.getItem('skillbridge_token') || ''}` })
