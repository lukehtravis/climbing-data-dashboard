import { ReactNode } from 'react'
import styles from './card.module.css'

interface Props {
  width?: string
  height?: string
  children: ReactNode
}

const Card = ({ width = '100%', height = '100%', children }: Props) => {
  return (
    <div className={`${styles.container}`} style={{ width: width, height: height }}>
      {children}
    </div>
  )
}

export default Card
