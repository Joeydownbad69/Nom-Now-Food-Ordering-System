"use client"

import React from 'react'
import { Button } from "@/components/ui/button"

const GoogleSignInButton = () => {
  const handleGoogleSignIn = () => {
    // Handle Google sign in logic
    console.log('Google sign in clicked')
  }

  return (
    <Button
      type="button"
      variant="outline"
      onClick={handleGoogleSignIn}
      className="w-full py-6 border-gray-300 hover:bg-gray-50 flex items-center justify-center gap-2 rounded-md transition-colors duration-300 text-gray-700"
    >
      <GoogleIcon />
      <span className="text-lg">Continue with Google</span>
    </Button>
  )
}

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.8055 10.2275C19.8055 9.51821 19.7385 8.83571 19.6156 8.18213H10.2002V11.9729H15.6264C15.3919 13.1911 14.6915 14.2127 13.6478 14.8833V17.3482H16.8582C18.7386 15.6387 19.8055 13.1687 19.8055 10.2275Z" fill="#4285F4"/>
    <path d="M10.2002 20C12.8972 20 15.1669 19.1125 16.8583 17.3481L13.6478 14.8833C12.7587 15.4816 11.5852 15.8203 10.2002 15.8203C7.59062 15.8203 5.38299 14.0828 4.58921 11.7256H1.27148V14.2628C2.95286 17.6728 6.30862 20 10.2002 20Z" fill="#34A853"/>
    <path d="M4.58913 11.7256C4.38913 11.1274 4.28032 10.5349 4.28032 9.99998C4.28032 9.46508 4.40032 8.88256 4.58913 8.28437V5.7471H1.2714C0.564913 7.09168 0.200195 8.59047 0.200195 9.99998C0.200195 11.4095 0.564913 12.9083 1.2714 14.2628L4.58913 11.7256Z" fill="#FBBC05"/>
    <path d="M10.2002 4.17969C11.6238 4.17969 12.8861 4.66562 13.8738 5.60609L16.7115 2.76828C15.1669 1.33281 12.8972 0.5 10.2002 0.5C6.30862 0.5 2.95285 2.8271 1.27148 6.2371L4.58921 8.77438C5.38299 6.41719 7.59062 4.17969 10.2002 4.17969Z" fill="#EA4335"/>
  </svg>
)

export default GoogleSignInButton