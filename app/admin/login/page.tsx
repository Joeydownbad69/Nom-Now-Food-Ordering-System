"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AdminLoginFormValues = z.infer<typeof adminLoginSchema>;

export default function AdminLoginPage() {
  const { adminLogin, error, isLoading } = useAuth();
  const { toast } = useToast();
  
  // Admin Login form
  const adminLoginForm = useForm<AdminLoginFormValues>({
    resolver: zodResolver(adminLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  
  // Handle admin login form submission
  const onAdminLoginSubmit = async (values: AdminLoginFormValues) => {
    try {
      await adminLogin(values.email, values.password);
      
      toast({
        title: "Admin login successful!",
        description: "Welcome to the admin dashboard.",
      });
    } catch (error) {
      toast({
        title: "Admin login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container max-w-md mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">NomNow Admin</h1>
          <p className="text-muted-foreground mt-2">Sign in to access the admin dashboard</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Form {...adminLoginForm}>
            <form onSubmit={adminLoginForm.handleSubmit(onAdminLoginSubmit)} className="space-y-6">
              <FormField
                control={adminLoginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email</FormLabel>
                    <FormControl>
                      <Input placeholder="admin@nomnow.com" {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={adminLoginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder="Password" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login to Admin"}
              </Button>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                <Link href="/" className="text-blue-600 hover:underline">
                  Back to main site
                </Link>
              </div>
            </form>
          </Form>

          <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600">
              <p><strong>Email:</strong> admin@nomnow.com</p>
              <p><strong>Password:</strong> admin12345</p>
              <p className="mt-1 text-gray-500 italic">Note: Any email containing "admin" will work with any password (for demo purposes)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
