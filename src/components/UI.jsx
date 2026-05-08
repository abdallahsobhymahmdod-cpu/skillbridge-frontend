import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

export function Button({ children, variant = 'primary', size = 'md', className = '', as: Comp = 'button', ...props }) {
  return <Comp className={`btn btn-${variant} btn-${size} ${className}`} {...props}>{children}</Comp>
}
export function LinkButton({ to, children, variant='primary', size='md', className='' }) {
  return <Link to={to} className={`btn btn-${variant} btn-${size} ${className}`}>{children}</Link>
}
export function Card({ children, className = '' }) { return <div className={`card ${className}`}>{children}</div> }
export function Badge({ children, variant = 'primary', className = '' }) { return <span className={`badge badge-${variant} ${className}`}>{children}</span> }
export function Avatar({ name, src, className='' }) {
  const initials = (name || 'User').split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()
  return <div className={`avatar ${className}`}>{src ? <img src={src} alt={name} /> : initials}</div>
}
export function StatCard({ label, value, icon: Icon, trend, gradient }) {
  return <Card className="stat-card"><div className="stat-icon" style={{background: gradient}}>{Icon && <Icon size={22}/>}</div><div><strong>{value}</strong><span>{label}</span>{trend && <small>{trend}</small>}</div></Card>
}
export function EmptyState({ title, description }) { return <div className="empty"><h3>{title}</h3><p>{description}</p></div> }
export function Rating({ value = 5 }) {
  return <span className="rating">{Array.from({length:5}).map((_,i)=><Star key={i} size={14} className={i < Math.round(value) ? 'star-filled' : ''}/>)}</span>
}
export function PageHeader({ title, subtitle, action }) { return <div className="page-header"><div><h1>{title}</h1>{subtitle && <p>{subtitle}</p>}</div>{action}</div> }
