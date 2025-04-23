"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import SignInModal from '@/components/auth/SignInModal'

export default function Home() {
  const [isSignInModalOpen, setIsSignInModalOpen] = useState(false)

  const openSignInModal = () => setIsSignInModalOpen(true)
  const closeSignInModal = () => setIsSignInModalOpen(false)

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-white to-gray-100">
      <div className="max-w-xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to Our Platform</h1>
        <p className="text-lg text-gray-600 mb-8">
          Sign in to access your account and manage your content
        </p>
        
        <Button 
          onClick={openSignInModal}
          className="bg-[#2B84C4] hover:bg-[#236da1] text-white px-8 py-6 rounded-md text-lg font-medium transition-colors duration-300"
        >
          Sign In
        </Button>
        
        <SignInModal isOpen={isSignInModalOpen} onClose={closeSignInModal} />
      </div>
    </main>
  )
}