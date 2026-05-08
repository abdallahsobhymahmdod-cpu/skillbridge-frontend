import request from './api'
import { sessions } from '@/data/dummyData'
import { USE_DUMMY_DATA, delay } from '@/utils/helpers'
export const getSessions = async () => USE_DUMMY_DATA ? delay({ sessions }) : request('/sessions')
export const createSession = async (data) => USE_DUMMY_DATA ? delay({ session: { id: Date.now(), ...data } }) : request('/sessions', { method: 'POST', body: JSON.stringify(data) })
export const updateSession = async (id, data) => USE_DUMMY_DATA ? delay({ session: { id, ...data } }) : request(`/sessions/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteSession = async (id) => USE_DUMMY_DATA ? delay({ success: true, id }) : request(`/sessions/${id}`, { method: 'DELETE' })
export default { getSessions, createSession, updateSession, deleteSession }
