import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, GraduationCap, MessageSquare, Star, Users2, Zap } from 'lucide-react'
import logo from '@/assets/logo.png'
import { Badge, Card, LinkButton } from '@/components/UI'

const features = [
  [GraduationCap, 'Teach What You Know', 'Share your expertise with people who want to learn your skills.'],
  [BookOpen, 'Learn What You Want', 'Find the right person to teach you exactly what you need.'],
  [Users2, 'Smart Matching', 'Get matched with users whose skills complete your goals.'],
  [MessageSquare, 'Built-in Chat', 'Coordinate sessions and details inside the platform.'],
  [Star, 'Reputation System', 'Ratings and reviews help trusted learners stand out.'],
  [Zap, 'No Cost Exchange', 'Exchange knowledge instead of paying money.']
]
const stats = [['2,400+','Active Users'],['180+','Skills Available'],['5,800+','Sessions Completed'],['4.9★','Average Rating']]
const tags = ['React','Python','English','Graphic Design','Node.js','UI/UX','Photography','Excel','Machine Learning']

export default function Home(){return <>
  <section className="hero"><div className="hero-inner"><div className="fade-up"><Badge variant="secondary">🚀 Skill Exchange Platform</Badge><h1>Trade Skills,<br/><span>Grow Together</span></h1><p>Connect with people who teach what you want to learn — and learn what you already know how to teach. Zero cost, pure exchange.</p><div style={{display:'flex',gap:12,flexWrap:'wrap'}}><LinkButton to="/register" size="lg">Start Exchanging <ArrowRight size={18}/></LinkButton><LinkButton to="/explore" variant="outline" size="lg">Explore Skills</LinkButton></div><div className="tags">{tags.map(t=><Badge key={t} variant="outline">{t}</Badge>)}</div></div><div style={{textAlign:'center'}}><img src={logo} className="hero-img"/><div className="card" style={{maxWidth:360,margin:'-20px auto 0',position:'relative'}}><b>Perfect Match Example</b><p className="muted">You teach React ↔ Sara teaches Python</p></div></div></div></section>
  <section className="stats-strip"><div className="section-inner grid grid-4">{stats.map(([v,l])=><div key={l} style={{textAlign:'center'}}><h2 style={{color:'var(--primary)'}}>{v}</h2><p className="muted">{l}</p></div>)}</div></section>
  <section className="section"><div className="section-inner"><div className="section-title"><Badge variant="secondary">How it works</Badge><h2>Exchange in 3 simple steps</h2></div><div className="grid grid-3">{[['1','Add Your Skills','List what you can teach and want to learn.'],['2','Get Matched','Find people with complementary skills.'],['3','Start Session','Chat, schedule, learn, and review.']].map(([n,t,d])=><Card key={n} className="fade-up" style={{textAlign:'center'}}><div style={{width:64,height:64,borderRadius:18,background:'var(--primary)',color:'#fff',display:'grid',placeItems:'center',fontWeight:900,margin:'0 auto 14px'}}>{n}</div><h3>{t}</h3><p className="muted">{d}</p></Card>)}</div></div></section>
  <section className="section" style={{background:'rgba(255,255,255,.55)',borderBlock:'1px solid var(--border)'}}><div className="section-inner"><div className="section-title"><Badge variant="secondary">Features</Badge><h2>Everything needed for skill exchange</h2></div><div className="grid grid-3">{features.map(([Icon,t,d])=><Card key={t}><div style={{width:46,height:46,borderRadius:14,background:'#eeedff',color:'var(--primary)',display:'grid',placeItems:'center',marginBottom:14}}><Icon size={22}/></div><h3>{t}</h3><p className="muted">{d}</p></Card>)}</div></div></section>
  <section className="section"><div className="section-inner"><div className="card" style={{background:'linear-gradient(135deg,var(--primary),var(--secondary))',textAlign:'center',padding:55}}><h2 style={{color:'#fff'}}>Ready to start your skill journey?</h2><p style={{color:'rgba(255,255,255,.8)',margin:'12px auto 24px',maxWidth:560}}>Join thousands of people trading knowledge and building skills every day.</p><Link to="/register" className="btn btn-secondary btn-lg">Create Free Account</Link></div></div></section>
</>}
