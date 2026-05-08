import request from './api'
import { skills } from '@/data/dummyData'
import { USE_DUMMY_DATA, delay } from '@/utils/helpers'
export const getSkills = async () => USE_DUMMY_DATA ? delay({ skills }) : request('/skills')
export const createSkill = async (data) => USE_DUMMY_DATA ? delay({ skill: { id: Date.now(), ...data } }) : request('/skills', { method: 'POST', body: JSON.stringify(data) })
export const updateSkill = async (id, data) => USE_DUMMY_DATA ? delay({ skill: { id, ...data } }) : request(`/skills/${id}`, { method: 'PUT', body: JSON.stringify(data) })
export const deleteSkill = async (id) => USE_DUMMY_DATA ? delay({ success: true, id }) : request(`/skills/${id}`, { method: 'DELETE' })
export default { getSkills, createSkill, updateSkill, deleteSkill }
