"use client"

import React, { useState } from 'react'
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import GoogleSignInButton from './GoogleSignInButton'
import Divider from './Divider'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign in logic here
    console.log({ username, password })
  }

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="p-0 border-none overflow-hidden max-w-md w-full">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-semibold text-center text-[#2B84C4] mb-8">Sign In</h2>
          
          <form onSubmit={handleSignIn} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-lg text-[#2B84C4] font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-6 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B84C4]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="block text-lg text-[#2B84C4] font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-6 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2B84C4]"
                  required
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-[#2B84C4] hover:underline text-sm">
                  Forgot Password?
                </a>
              </div>
            </div>
            
            <Button
              type="submit"
              className="w-full bg-[#2B84C4] hover:bg-[#236da1] text-white py-6 rounded-md transition-colors duration-300 text-lg font-medium"
            >
              Sign In
            </Button>
          </form>
          
          <Divider text="or" className="my-6" />
          
          <GoogleSignInButton />
          
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{" "}
              <a href="#" className="text-[#2B84C4] hover:underline font-medium">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SignInModal