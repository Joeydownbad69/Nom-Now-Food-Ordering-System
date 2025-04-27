import React from 'react'
import { cn } from '@/lib/utils'

interface DividerProps {
  text: string
  className?: string
}

const Divider: React.FC<DividerProps> = ({ text, className }) => {
  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex-grow h-px bg-gray-300"></div>
      <span className="px-4 text-gray-500 text-sm">{text}</span>
      <div className="flex-grow h-px bg-gray-300"></div>
    </div>
  )
}

export default Divider