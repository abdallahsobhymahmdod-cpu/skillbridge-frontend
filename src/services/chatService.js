import request from './api'
import { conversations, messages } from '@/data/dummyData'
import { USE_DUMMY_DATA, delay } from '@/utils/helpers'
export const getConversations = async () => USE_DUMMY_DATA ? delay({ conversations }) : request('/chat/conversations')
export const getMessages = async (conversationId) => USE_DUMMY_DATA ? delay({ messages: messages.filter(m => m.conversationId === Number(conversationId || 1)) }) : request(`/chat/${conversationId}/messages`)
export const sendMessage = async (data) => USE_DUMMY_DATA ? delay({ message: { id: Date.now(), createdAt: 'Now', ...data } }) : request('/chat/messages', { method: 'POST', body: JSON.stringify(data) })
export default { getConversations, getMessages, sendMessage }
