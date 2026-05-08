import request from './api'
import { reviews } from '@/data/dummyData'
import { USE_DUMMY_DATA, delay } from '@/utils/helpers'
export const getReviews = async () => USE_DUMMY_DATA ? delay({ reviews }) : request('/reviews')
export const createReview = async (data) => USE_DUMMY_DATA ? delay({ review: { id: Date.now(), ...data } }) : request('/reviews', { method: 'POST', body: JSON.stringify(data) })
export default { getReviews, createReview }
