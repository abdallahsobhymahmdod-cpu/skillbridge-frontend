import request from './api'
import { matches } from '@/data/dummyData'
import { USE_DUMMY_DATA, delay } from '@/utils/helpers'
export const getMatches = async () => USE_DUMMY_DATA ? delay({ matches }) : request('/matches')
export const getSuggestedMatches = async () => USE_DUMMY_DATA ? delay({ matches }) : request('/matches/suggested')
export const createMatch = async (data) => USE_DUMMY_DATA ? delay({ match: { id: Date.now(), ...data } }) : request('/matches', { method: 'POST', body: JSON.stringify(data) })
export default { getMatches, getSuggestedMatches, createMatch }
