// components/ui/card.tsx
import { ReactNode } from "react"

type Props = {
  children: ReactNode
  className?: string
}

export function Card({ children, className = "" }: Props) {
  return <div className={`rounded-2xl border p-6 shadow ${className}`}>{children}</div>
}

export function CardContent({ children, className = "" }: Props) {
  return <div className={`mt-2 ${className}`}>{children}</div>
}
