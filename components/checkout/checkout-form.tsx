'use client';

import { useState } from 'react';
import { useCartStore } from '@/lib/cart-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Loader2 } from 'lucide-react';
import { DeliveryMethod } from '@/lib/types';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';

const customerSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  address: z.string().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
});

type CustomerFormValues = z.infer<typeof customerSchema>;

interface CheckoutFormProps {
  onSubmit: () => void;
  isSubmitting: boolean;
}

export default function CheckoutForm({ onSubmit, isSubmitting }: CheckoutFormProps) {
  const { deliveryMethod, setDeliveryMethod } = useCartStore();
  
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: '',
    },
  });

  const handleDeliveryMethodChange = (value: DeliveryMethod) => {
    setDeliveryMethod(value);
  };

  const onFormSubmit = (data: CustomerFormValues) => {
    onSubmit();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Delivery Options</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup 
            value={deliveryMethod} 
            onValueChange={handleDeliveryMethodChange as (value: string) => void}
            className="space-y-4"
          >
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="delivery" id="delivery" />
              <div className="grid gap-1.5">
                <Label htmlFor="delivery" className="font-medium">
                  Delivery
                </Label>
                <p className="text-sm text-gray-500">
                  Get your food delivered to your doorstep
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="pickup" id="pickup" />
              <div className="grid gap-1.5">
                <Label htmlFor="pickup" className="font-medium">
                  Pickup
                </Label>
                <p className="text-sm text-gray-500">
                  Pick up your order from our restaurant
                </p>
              </div>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-6">
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="john@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input placeholder="(123) 456-7890" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              
              {deliveryMethod === 'delivery' && (
                <>
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="font-medium">Delivery Address</h3>
                    
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Street Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="New York" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="zipCode"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>ZIP Code</FormLabel>
                            <FormControl>
                              <Input placeholder="10001" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </>
              )}
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  'Place Order'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}