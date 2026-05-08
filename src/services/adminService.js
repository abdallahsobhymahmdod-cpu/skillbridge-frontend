import request from './api'
import { analytics, users, skills, sessions, matches } from '@/data/dummyData'
import { USE_DUMMY_DATA, delay } from '@/utils/helpers'
export const getAdminStats = async () => USE_DUMMY_DATA ? delay({ ...analytics, users, skills, sessions, matches }) : request('/admin/stats')
export const getReports = async () => USE_DUMMY_DATA ? delay({ reports: [] }) : request('/admin/reports')
export const getAnalytics = async () => USE_DUMMY_DATA ? delay(analytics) : request('/admin/analytics')
export default { getAdminStats, getReports, getAnalytics }
