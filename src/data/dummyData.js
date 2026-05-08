export const users = [
  { id: 1, name: 'Nagham Ahmed', email: 'user@skillbridge.com', role: 'user', initials: 'NA', skillsOffered: ['React','UI/UX'], skillsWanted: ['English','Python'], level: 'Advanced', availability: 'Weekends', rating: 4.8, reviewsCount: 8, isBlocked: false, createdAt: '2026-04-01' },
  { id: 2, name: 'Admin User', email: 'admin@skillbridge.com', role: 'admin', initials: 'AD', skillsOffered: ['Management'], skillsWanted: [], level: 'Advanced', availability: 'Anytime', rating: 5, reviewsCount: 3, isBlocked: false, createdAt: '2026-03-20' },
  { id: 3, name: 'Sara Mohamed', email: 'sara@example.com', role: 'user', initials: 'SM', skillsOffered: ['Python'], skillsWanted: ['React'], level: 'Advanced', availability: 'Mon/Wed 3PM', rating: 4.9, reviewsCount: 12, isBlocked: false, createdAt: '2026-03-15' },
  { id: 4, name: 'Ali Karim', email: 'ali@example.com', role: 'user', initials: 'AK', skillsOffered: ['English'], skillsWanted: ['Node.js'], level: 'Intermediate', availability: 'Evenings', rating: 4.7, reviewsCount: 8, isBlocked: false, createdAt: '2026-03-22' },
  { id: 5, name: 'Lina Rashid', email: 'lina@example.com', role: 'user', initials: 'LR', skillsOffered: ['Graphic Design'], skillsWanted: ['Python'], level: 'Advanced', availability: 'Fri 10AM', rating: 5.0, reviewsCount: 20, isBlocked: false, createdAt: '2026-02-11' }
]

export const skills = [
  { id: 1, name: 'React', category: 'Programming', level: 'Advanced', demandCount: 42, offeredCount: 18 },
  { id: 2, name: 'Python', category: 'Programming', level: 'Intermediate', demandCount: 38, offeredCount: 22 },
  { id: 3, name: 'English', category: 'Languages', level: 'Beginner', demandCount: 35, offeredCount: 27 },
  { id: 4, name: 'Graphic Design', category: 'Design', level: 'Intermediate', demandCount: 28, offeredCount: 16 },
  { id: 5, name: 'Node.js', category: 'Programming', level: 'Advanced', demandCount: 25, offeredCount: 14 },
  { id: 6, name: 'Photography', category: 'Creative', level: 'Beginner', demandCount: 18, offeredCount: 12 }
]

export const matches = [
  { id: 1, userId: 1, matchedUserId: 3, matchedUser: users[2], teaches: 'Python', wants: 'React', matchScore: 96, status: 'suggested', location: 'Cairo' },
  { id: 2, userId: 1, matchedUserId: 4, matchedUser: users[3], teaches: 'English', wants: 'Node.js', matchScore: 89, status: 'suggested', location: 'Alexandria' },
  { id: 3, userId: 1, matchedUserId: 5, matchedUser: users[4], teaches: 'Graphic Design', wants: 'Python', matchScore: 92, status: 'suggested', location: 'Giza' }
]

export const sessions = [
  { id: 1, requester: users[0], receiver: users[2], skillOffered: 'React', skillWanted: 'Python', date: '2026-04-11', time: '3:00 PM', method: 'Google Meet', status: 'pending', duration: '60 min' },
  { id: 2, requester: users[3], receiver: users[0], skillOffered: 'English', skillWanted: 'React', date: '2026-04-12', time: '5:00 PM', method: 'Zoom', status: 'confirmed', duration: '45 min' },
  { id: 3, requester: users[0], receiver: users[4], skillOffered: 'Python', skillWanted: 'Design', date: '2026-04-03', time: '11:00 AM', method: 'In Person', status: 'completed', duration: '90 min' }
]

export const conversations = [
  { id: 1, user: users[2], lastMessage: 'Ready for our React session?', unread: 2 },
  { id: 2, user: users[3], lastMessage: 'I can help with English practice.', unread: 0 },
  { id: 3, user: users[4], lastMessage: 'Let us schedule a design review.', unread: 1 }
]

export const messages = [
  { id: 1, conversationId: 1, senderId: 3, receiverId: 1, text: 'Hi! I saw we matched for React and Python.', createdAt: '10:00 AM' },
  { id: 2, conversationId: 1, senderId: 1, receiverId: 3, text: 'Great! I can teach React basics this week.', createdAt: '10:02 AM' },
  { id: 3, conversationId: 1, senderId: 3, receiverId: 1, text: 'Perfect. I will prepare a Python intro for you.', createdAt: '10:04 AM' }
]

export const reviews = [
  { id: 1, reviewerId: 3, reviewedUserId: 1, reviewer: users[2], rating: 5, teachingQuality: 5, communication: 5, commitment: 5, comment: 'Very clear explanation and great examples.', createdAt: '2026-04-04' },
  { id: 2, reviewerId: 4, reviewedUserId: 1, reviewer: users[3], rating: 4.7, teachingQuality: 5, communication: 4, commitment: 5, comment: 'Helpful and patient throughout the session.', createdAt: '2026-04-02' }
]

export const analytics = {
  totalUsers: 2400,
  activeSessions: 138,
  totalSkills: 180,
  newMatchesToday: 42,
  mostRequested: skills.slice(0, 5),
  mostOffered: [...skills].reverse().slice(0, 5)
}
