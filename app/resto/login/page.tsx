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

const restoLoginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  restaurantId: z.string().min(1, "Restaurant ID is required"),
});

type RestoLoginFormValues = z.infer<typeof restoLoginSchema>;

export default function RestaurantLoginPage() {
  const { restaurantLogin, error, isLoading } = useAuth();
  const { toast } = useToast();
  
  // Restaurant Login form
  const restoLoginForm = useForm<RestoLoginFormValues>({
    resolver: zodResolver(restoLoginSchema),
    defaultValues: {
      email: "",
      password: "",
      restaurantId: "",
    },
  });
  
  // Handle restaurant login form submission
  const onRestoLoginSubmit = async (values: RestoLoginFormValues) => {
    try {
      await restaurantLogin(values.email, values.password, values.restaurantId);
      
      toast({
        title: "Restaurant login successful!",
        description: "Welcome to your restaurant dashboard.",
      });
    } catch (error) {
      toast({
        title: "Restaurant login failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container max-w-md mx-auto py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">NomNow Restaurant Portal</h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your restaurant</p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <Form {...restoLoginForm}>
            <form onSubmit={restoLoginForm.handleSubmit(onRestoLoginSubmit)} className="space-y-6">
              <FormField
                control={restoLoginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="restaurant@example.com" {...field} type="email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={restoLoginForm.control}
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
              
              <FormField
                control={restoLoginForm.control}
                name="restaurantId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Restaurant ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Your restaurant ID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login to Restaurant Portal"}
              </Button>
              
              <div className="text-center text-sm text-gray-500 mt-4">
                <Link href="/" className="text-orange-600 hover:underline">
                  Back to main site
                </Link>
              </div>
            </form>
          </Form>

          <div className="mt-6 p-4 bg-gray-50 rounded border border-gray-200">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Demo Credentials:</h3>
            <div className="text-xs text-gray-600">
              <p><strong>Email:</strong> restaurant@pizzaheaven.com</p>
              <p><strong>Password:</strong> resto12345</p>
              <p><strong>Restaurant ID:</strong> PIZZA001</p>
              <p className="mt-1 text-gray-500 italic">Note: Any email containing "resto" or "restaurant" will work with any password (for demo purposes)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
