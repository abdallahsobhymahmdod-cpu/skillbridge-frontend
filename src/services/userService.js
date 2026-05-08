import request from './api'
import { users } from '@/data/dummyData'
import { USE_DUMMY_DATA, delay } from '@/utils/helpers'
export const getUsers = async (params = {}) => USE_DUMMY_DATA ? delay({ users: users.filter(u => (!params.role || u.role === params.role) && (!params.search || u.name.toLowerCase().includes(params.search.toLowerCase()) || u.email.toLowerCase().includes(params.search.toLowerCase()))) }) : request('/users')
export const getUserById = async (id) => USE_DUMMY_DATA ? delay(users.find(u => u.id === Number(id))) : request(`/users/${id}`)
export const updateUser = async (id, data) => USE_DUMMY_DATA ? delay({ id, ...data }) : request(`/users/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteUser = async (id) => USE_DUMMY_DATA ? delay({ success: true, id }) : request(`/users/${id}`, { method: 'DELETE' })
export const blockUser = async (id) => USE_DUMMY_DATA ? delay({ success: true, id }) : request(`/users/${id}/block`, { method: 'PUT' })
export default { getUsers, getUserById, updateUser, deleteUser, blockUser }
